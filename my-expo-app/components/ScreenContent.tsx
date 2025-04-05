import { Text, View, Button, FlatList } from 'react-native';
import React , {useState,useEffect} from 'react'



import Create from './Create'
import Home from './Home'
import Details from './Details'
import Edit from './Edit'



import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()




function ScreenContent(){
  return (
    <View className={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: 'black'},
          headerTintColor: 'white', // Color of the header text and back button
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      >

        <Stack.Screen name = "Home" component = {Home} />
        <Stack.Screen name = "Create" component= {Create} />
        <Stack.Screen name = "Details" component= {Details} />
        <Stack.Screen name = "Edit" component={Edit} />
      </Stack.Navigator>
    </View>
  );
};

export default() => {
  return (
    <NavigationContainer>
      <ScreenContent/>
    </NavigationContainer>
  )
}

const styles = {
  container: `flex-1 bg-yellow-500 justify-start pt-20`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-500`,
  title: `text-xl font-bold`,
  cardStyle: `my-10 p-1` ,
  fab : `absolute my-1 right-0 bottom-5 bg-green-500`
};
