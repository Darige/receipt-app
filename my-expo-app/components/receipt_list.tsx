import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

function ReceiptList(props: any) {
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
      <Card
        mode="outlined"
        className={styles.cardStyle}
        onPress={() => clickedItem(item)}
      >
        <View className="p-4">
          <Text className="text-xl font-bold text-gray-800">{item.title}</Text>
          <Text className="text-sm text-gray-500 mt-1">
            Tap to view details
          </Text>
        </View>
      </Card>
    );
  };

  const renderEmpty = () => (
    <View className="items-center mt-20">
      <Text className="text-gray-500 text-lg">No receipts found.</Text>
    </View>
  );

  return (
    <View className={styles.container}>
      <StatusBar backgroundColor="#FEFCE8" style="dark" />

      {loading ? (
        <ActivityIndicator size="large" className="mt-10" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => renderData(item)}
          keyExtractor={(item) => `${item.id}`}
          refreshing={loading}
          onRefresh={loadData}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        />
      )}
    </View>
  );
}

const styles = {
  container: `flex-1 bg-[#FEFCE8] pt-4`,
  cardStyle: `mb-4 rounded-xl shadow bg-white`,
  title: `text-lg font-semibold`,
};

export default ReceiptList;
