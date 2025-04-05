import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

function Create(props) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const insertData = () => {
    fetch('http://192.168.1.166:3000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title, body: body }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        props.navigation.navigate('Home');
      })
      .catch((error) => console.log(error));
  };

  return (
    <View className={styles.container}>
      <TextInput
        className={styles.inputStyle}
        label="Title"
        value={title}
        mode="outlined"
        onChangeText={(text) => setTitle(text)}
        multiline={false}
        numberOfLines={1}
      />

      <TextInput
        className="my-10"
        label="Description"
        value={body}
        mode="outlined"
        multiline
        numberOfLines={6}
        onChangeText={(text) => setBody(text)}
      />

      <Button
        icon="pencil"
        mode="contained"
        buttonColor="#059669"
        style={{ width: 200, alignSelf: 'center', marginTop: 10 }}
        onPress={insertData}
      >
        Insert Receipt
      </Button>
    </View>
  );
}

const styles = {
  container: `flex-1 bg-yellow-50 p-4 justify-center`,
  inputStyle: `mb-6`,
};

export default Create;
