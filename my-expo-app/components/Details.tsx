import React from 'react'

import {View,ScrollView,Text} from 'react-native';
import { TextInput,Button } from 'react-native-paper'

function Details(props: any){
    const data = props.route.params.data;

    const deleteData =  (data) => {
        fetch(`http://192.168.1.110:3000/delete/${data.id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type' : 'application/json'
            },
        })
        .then(data => {
            props.navigation.navigate('Home',{data:data})
        })
        .catch(error => console.log(error))
    }   


    return (
        <ScrollView className = {styles.container}>
            <View>
                <Text className= {styles.title}>
                    {data.title}
                </Text>

                <Text className= {styles.body}>
                    {data.body}
                </Text>

                <Text>
                    {data.date}
                </Text>


                <View className={styles.btnStyle}>
                <Button
                    icon = 'update'
                    mode = 'contained'
                    buttonColor='black'
                    onPress = {() => props.navigation.navigate("Edit",{data:data})}
                    >Delete
                </Button>

                <Button 
                    icon = 'delete'
                    mode = 'contained'
                    buttonColor='black'
                    onPress = {() => deleteData(data)}
                    >Delete
                </Button>

                </View>

            </View>
        </ScrollView>
    )
}

const styles = {
    container: `bg-yellow-500`,
    title: `text-2xl font-bold text-center mt-10`,
    body: `text-xl mt -10`,
    date: `mt-10`,
    btnStyle: `p-1 flew-row justify-around m-1`
};

export default Details