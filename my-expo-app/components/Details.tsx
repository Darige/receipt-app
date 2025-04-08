import React from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

function Details(props: any) {
  const data = props.route.params.data;

  const confirmDelete = () => {
    Alert.alert(
      'Delete Receipt',
      'Are you sure you want to delete this receipt?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteData(data),
        },
      ]
    );
  };

  const deleteData = (data: any) => {
    fetch(`http://192.168.1.166:3000/delete/${data.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        props.navigation.navigate('ReceiptList');
      })
      .catch((error) => console.log(error));
  };

  return (
    <ScrollView className={styles.container}>
      <StatusBar backgroundColor="#FEFCE8" style="dark" />

      <View className="p-6">
        <Text className={styles.title}>{data.title}</Text>

        <Text className={styles.body}>{data.body}</Text>

        <Text className={styles.date}>{data.date}</Text>

        <View className={styles.btnGroup}>
          <Button
            icon="update"
            mode="contained"
            buttonColor="#059669"
            style={{ width: 140 }}
            onPress={() => props.navigation.navigate('Edit', { data })}
          >
            Update
          </Button>

          <Button
            icon="delete"
            mode="contained"
            buttonColor="#DC2626"
            style={{ width: 140 }}
            onPress={confirmDelete}
          >
            Delete
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = {
  container: `flex-1 bg-[#FEFCE8]`,
  title: `text-3xl font-bold text-center mb-6 text-gray-800`,
  body: `text-lg text-gray-700 mb-4`,
  date: `text-sm text-gray-500 mb-8 text-right`,
  btnGroup: `flex-row justify-between mt-4 px-4 gap-4`,
};

export default Details;
