import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

function Home(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.110:3000/get', {
      method: 'GET',
    })
      .then((resp) => resp.json())
      .then((receipt) => {
        setData(receipt);
        console.log('Receipts fetched:', receipt);
      })
      .catch((err) => console.error('Error fetching receipts:', err));
  }, []);

  return (
    <View className={styles.container}>
      <Text className="text-3xl font-bold mb-8 text-center">📲 Receipt Manager</Text>

      <Button
        mode="contained"
        style={{ width: 220, marginBottom: 16 }}
        buttonColor="#10B981"
        onPress={() => props.navigation.navigate('Create')}
      >
        Add Receipt
      </Button>

      <Button
        mode="contained"
        style={{ width: 220, marginBottom: 16 }}
        buttonColor="#3B82F6"
        onPress={() => props.navigation.navigate('ReceiptList')}
      >
        View Receipts
      </Button>

      <Button
        mode="contained"
        style={{ width: 220 }}
        buttonColor="#F59E0B"
        onPress={() => {
          console.log('Ready to download:', data);
        }}
      >
        Download
      </Button>
    </View>
  );
}

const styles = {
  container: `flex-1 bg-yellow-50 items-center justify-center px-4`,
};

export default Home;
