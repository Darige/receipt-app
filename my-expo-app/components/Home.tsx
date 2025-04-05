import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';


function Home(props: any) {
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(true);

  const loadData = () => {
    fetch('http://192.168.1.166:3000/get', {
      method: 'GET',
    })
      .then((resp) => resp.json())
      .then((receipt) => {
        setData(receipt);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching receipts:', err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const clickedItem = (data: any) => {
    props.navigation.navigate('Details', { data: data });
  };

  const renderData = (item: any) => {
    return (
      <Card className={styles.cardStyle} mode="outlined">
        <Text className={styles.title} onPress={() => clickedItem(item)}>
          {item.title}
        </Text>
      </Card>
    );
  };

  return (
    <View className={styles.container}>
      <StatusBar backgroundColor="#FEFCE8" style="dark" />

      <Text className="text-3xl font-bold mb-8 text-center">📲 Receipt Manager</Text>

      {/* Buttons Row */}
      <View className="w-full px-4 mb-8">
        <Button
          mode="contained"
          style={{ width: 220, alignSelf: 'center', marginBottom: 12 }}
          buttonColor="#10B981"
          onPress={() => props.navigation.navigate('Create')}
        >
          Add Receipt
        </Button>

        <Button
          mode="contained"
          style={{ width: 220, alignSelf: 'center', marginBottom: 12 }}
          buttonColor="#3B82F6"
          onPress={() => console.log('Viewing list...')}
        >
          View Receipt List
        </Button>

        <Button
          mode="contained"
          style={{ width: 220, alignSelf: 'center' }}
          buttonColor="#F59E0B"
          onPress={() => {
            console.log('Download Receipts:', data);
          }}
        >
          Download Receipts
        </Button>
      </View>

      {/* List View (FlatList still here in case you want to show it) */}
      <FlatList
        data={data}
        renderItem={({ item }) => renderData(item)}
        keyExtractor={(item) => `${item.id}`}
        refreshing={loading}
        onRefresh={loadData}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = {
  container: `flex-1 bg-[#FEFCE8] pt-16`, // softer yellow
  title: `text-lg font-semibold`,
  cardStyle: `mb-4 p-4 rounded-lg bg-white`,
};

export default Home;
