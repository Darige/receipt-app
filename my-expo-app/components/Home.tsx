import { Text, View, FlatList } from 'react-native';
import React , {useState,useEffect} from 'react'

import {Button} from 'react-native-paper';



import {Card, FAB} from 'react-native-paper';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

function Home(props: any){

  const [data,setData] = useState([])
  const [loading,setIsLoading] = useState(true)

  const loadData = () => {
    fetch('http://192.168.1.110:3000/get', {
      method: 'GET',
    })
    .then(resp => resp.json())
    .then(receipt => {
        setData(receipt)
        setIsLoading(false)
    })
  }

  useEffect(() => {
    loadData()
  },[])

  const clickedItem = (data) => {
    props.navigation.navigate('Details', {data:data})
  }



  const renderData = (item : any) => {
    return (
      <Card className={styles.cardStyle}>
        <Text className = {styles.title} onPress = {() => clickedItem(item)}>{item.title}</Text>
      </Card>
    )
  }

  return (
    <View className={styles.container}>
      <FlatList
      data={data}
      renderItem={({item} ) => (
          renderData(item) 
      )}
      onRefresh= {() => loadData}
      refreshing = {loading}
      keyExtractor={ item => `${item.id}`}
      />
      <FAB 
      className = {styles.fab}
      icon = "plus"
      onPress = {() => props.navigation.navigate('Create')}

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
