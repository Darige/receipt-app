import React, { useState } from 'react';
import { View , Image ,Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

function Create(props) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image,setImage] = useState(null);

  const choosePhoto = async () => {
    // Request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission required", "Permission to access media library is required!");
      return;
    }
    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    // If the user didn't cancel, set the image result
    if (!result.cancelled) {
      setImage(result);
    }
  };
  
  //const insertData = () => {
  //  fetch('http://192.168.1.166:3000/add', {
  //    method: 'POST',
  //    headers: {
  //      'Content-Type': 'application/json',
  //    },
  //    body: JSON.stringify({ title: title, body: body }),
  //  })
  //    .then((resp) => resp.json())
  //    .then((data) => {
  //      props.navigation.navigate('Home');
  //    })
  //    .catch((error) => console.log(error));
  //};

  const takePhoto = async () => {
    // Request permission to access the camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission required", "Permission to access camera is required!");
      return;
    }
    // Launch the camera
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const insertData = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (image) {
      formData.append('photo', {
        uri: image.uri,
        name: 'photo.jpg', // You might want to generate a unique name here
        type: 'image/jpeg', // Adjust the type based on the selected image if needed
      });
    }

    try {
      const response = await fetch('http://192.168.1.166:3000/add', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          // Do not set Content-Type header when using FormData to let it set boundaries automatically
        },
        body: formData,
      });
      const data = await response.json();
      props.navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
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
        icon="image"
        mode="contained"
        onPress={choosePhoto}
        style={{ marginVertical: 10 }}
      >
        Select Image
      </Button>

      <Button
        icon="camera"
        mode="contained"
        onPress={takePhoto}
        style={{ marginVertical: 10 }}
      >
        Take Photo
      </Button>

      {image && (
        <Image 
          source={{ uri: image.uri }} 
          style={{ width: 200, height: 200, alignSelf: 'center', marginVertical: 10 }} 
        />
      )}

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
  container: `flex-1 bg-yellow-50 p-4 `,
  inputStyle: `mb-6`,
};

export default Create;
