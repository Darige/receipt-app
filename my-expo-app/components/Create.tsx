import React ,{useState} from 'react'
import {View, Text} from 'react-native'
import { TextInput,Button } from 'react-native-paper'



function Create(){
    // change the body to be a photo with a list of images
    const [title,setTitle] = useState("")
    const [body, setBody] = useState("")

    return (
        <View> 
            <TextInput className={styles.inputStyle}
            label = "Title"
            value = {title}
            mode = "outlined"
            onChangeText= {text => setTitle(text)}
            />

            <TextInput className={`my-10`}
            label = "Description"
            value = {body}
            mode = "outlined"
            multiline
            numberOfLines={10}
            onChangeText= {text => setBody(text)}
            />

            <Button className = {`my-1`}
            icon = 'pencil'
            mode = 'contained'
            onPress = {() => console.log("Pressed")}
            > Insert Article</Button>
        </View>
        
    )
}

const styles = {
    inputStyle: `p-10 my-30`
}

export default Create;
