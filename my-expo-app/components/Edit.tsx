import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

function Edit(props) {
  const data = props.route.params.data;

  const [title, setTitle] = useState(data.title);
  const [body, setBody] = useState(data.body);

  const confirmUpdate = () => {
    Alert.alert(
      'Update Receipt',
      'Are you sure you want to update this receipt?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Update', onPress: updateData },
      ]
    );
  };

  const updateData = () => {
    fetch(`http://192.168.1.166:3000/update/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title, body: body }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        props.navigation.navigate('Home', { data: data });
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Title"
        value={title}
        mode="outlined"
        onChangeText={(text) => setTitle(text)}
      />

      <TextInput
        style={styles.textArea}
        label="Description"
        value={body}
        mode="outlined"
        multiline
        numberOfLines={10}
        onChangeText={(text) => setBody(text)}
      />

      <Button
        icon="update"
        mode="contained"
        buttonColor="#059669"
        style={styles.button}
        onPress={confirmUpdate}
      >
        Update Article
      </Button>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FEFCE8',
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 20,
  },
  textArea: {
    marginBottom: 30,
  },
  button: {
    width: 200,
    alignSelf: 'center',
  },
};

export default Edit;
