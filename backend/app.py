from flask import Flask,jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
#from PIL import Image add these packages later
#import pytesseract

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Receipts(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    title = db.Column(db.String(100)) #name of the receipt
    body = db.Column(db.Text()) #body contents receipt information
    date = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self,title,body):
        self.title = title
        self.body = body


class ReceiptsSchema(ma.Schema):
    class Meta:
        fields = ('id','title','body','date')


receipt_schema = ReceiptsSchema()
receipts_schema = ReceiptsSchema(many = True)


@app.route('/get', methods = ['GET'])
def get_receipts():
    all_receipts = Receipts.query.all()
    results = receipts_schema.dump(all_receipts)
    return jsonify(results)

#potential problem with fetching id out of bounds
@app.route('/get/<id>', methods = ['GET'])
def post_details(id):
    receipt = Receipts.query.get(id)
    return receipt_schema.jsonify(receipt)



@app.route('/add',methods = ['POST'])
def add_receipt():
    title = request.form.get('title')
    body = request.form.get('body')

    receipts = Receipts(title,body)
    db.session.add(receipts)
    db.session.commit()
    return receipt_schema.jsonify(receipts)

@app.route('/add_receipt',methods = ['POST'])
def add_receipt_image():
    title = request.form.get('title')
    body = request.form.get('body')
    image = request.form.get('photo')
    
    body = ""
    #body = pytesseract.image_to_string(image)
    receipts = Receipts(title,body)
    db.session.add(receipts)
    db.session.commit()
    return receipt_schema.jsonify(receipts)



@app.route('/update/<id>', methods = ['PUT'])
def update_receipt(id):
    receipt = Receipts.query.get(id)

    title = request.json['title']
    body = request.json['body']

    receipt.title = title
    receipt.body = body 

    db.session.commit()
    return receipt_schema.jsonify(receipt)

@app.route('/delete/<id>', methods = ['DELETE'])
def delete_receipt(id):
    receipt = Receipts.query.get(id)
    db.session.delete(receipt)
    db.session.commit()

    return receipt_schema.jsonify(receipt)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    #local is 3000
    app.run(host = '192.168.1.110',port=3000,debug = True)