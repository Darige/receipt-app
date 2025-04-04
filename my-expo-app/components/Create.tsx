import React ,{useState} from 'react'
import {View, Text} from 'react-native'
import { TextInput,Button } from 'react-native-paper'



function Create(props){
    // change the body to be a photo with a list of images
    const [title,setTitle] = useState("")
    const [body, setBody] = useState("")

    const insertData = () => {
        fetch('http://192.168.1.110:3000/add',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({title:title, body:body})
        })
        .then(resp => resp.json())
        .then(data => {
            props.navigation.navigate('Home')
        })
        .catch(error => console.log(error))
    }

    return (
        <View className={styles.container}> 
            <TextInput className={styles.inputStyle}
            label = "Title"
            value = {title}
            mode = "outlined"
            onChangeText= {text => setTitle(text)}
            />

            <TextInput className={`my-10`}
            label = "Description"
            value = {body}
            mode = "outlined"
            multiline
            numberOfLines={10}
            onChangeText= {text => setBody(text)}
            />

            <Button className = {`my-1`}
            icon = 'pencil'
            mode = 'contained'
            buttonColor='black'
            onPress = {() => insertData()}
            > Insert Article</Button>
        </View>
        
    )
}

const styles = {
    container: `flex-1 bg-yellow-500`,
    inputStyle: `p-10 my-30`
}

export default Create;
