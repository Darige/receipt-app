import { Text, View, Button, FlatList } from 'react-native';
import React , {useState,useEffect} from 'react'


import { EditScreenInfo } from './EditScreenInfo';

import Create from './Create'

import {Card, FAB} from 'react-native-paper';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {

  const [data,setData] = useState([])

  useEffect(() => {
    fetch('http://192.168.1.110/get', {
      method : 'GET'
    })
    .then(resp => resp.json())
    .then(receipt => {
        setData(receipt)
    })
  },[])




  const renderData = (item) => {
    return (
      <Card className={styles.cardStyle}>
        <Text className = {styles.title}>{item.title}</Text>
        <Text>{item.body}</Text>
      </Card>
    )
  }

  return (
    // somethings i took out
    //<Text className={styles.title}>{title}</Text>
    //<View className={styles.separator} />
    //<EditScreenInfo path={path} />
    // {children}
    
    //<View className={styles.container}>
    //  <FlatList
    //  data={data}
    //  renderItem={({item} ) => (
    //      renderData(item) 
    //  )}
    //  keyExtractor={ item => `${item.id}`}
    //  />
    //  <FAB 
    //  className = {styles.fab}
    //  icon = "plus"
    //  onPress = {() => console.log("Pressed")}
//
    //  
    //  />
    //</View>
    <View className={styles.container}>
        <Create/>
    </View>
  );
};
const styles = {
  container: `flex-1 bg-yellow-500 justify-start pt-20`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-500`,
  title: `text-xl font-bold`,
  cardStyle: `my-10 p-1` ,
  fab : `absolute my-1 right-0 bottom-5 bg-green-500`
};
