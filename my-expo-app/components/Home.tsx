import { Text, View, Button, FlatList } from 'react-native';
import React , {useState,useEffect} from 'react'




import {Card, FAB} from 'react-native-paper';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

function Home(props){

  const [data,setData] = useState([])

  useEffect(() => {
    fetch('http://192.168.1.110:3000/get', {
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
    <View className={styles.container}>
      <FlatList
      data={data}
      renderItem={({item} ) => (
          renderData(item) 
      )}
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
