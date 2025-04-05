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
      method : 'GET'
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
    // somethings i took out
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

      
      />
    </View>

    //<View className={styles.container}>
    //<Text className={styles.title}>{title}</Text>
    //<View className={styles.separator} />
    //<EditScreenInfo path={path} />
    // {children}

  );
};
const styles = {
  container: `flex-1 bg-yellow-500 justify-start pt-20`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-500`,
  title: `text-xl font-bold`,
  cardStyle: `my-10 p-1` ,
  fab : `absolute my-1 right-0 bottom-5 bg-green-500`
};

export default Home
