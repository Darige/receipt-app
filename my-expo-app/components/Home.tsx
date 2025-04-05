import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';


function Home(props: any) {


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
          onPress={() => props.navigation.navigate('ReceiptList')}
        >
          View Receipt List
        </Button>

        <Button
          mode="contained"
          style={{ width: 220, alignSelf: 'center' }}
          buttonColor="#F59E0B"
          onPress={() => {
            console.log('Download Receipts:');
          }}
        >
          Download Receipts
        </Button>
      </View>

    </View>
  );
}

const styles = {
  container: `flex-1 bg-[#FEFCE8] pt-16`, // softer yellow
  title: `text-lg font-semibold`,
  cardStyle: `mb-4 p-4 rounded-lg bg-white`,
};

export default Home;
