import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import StartMeeting from "../components/StartMeeting";
import { io } from 'socket.io-client';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';

let socket;

function MeetingRoom(){
    const [name, setName ] = useState()
    const [roomId, setRoomId] = useState()
    const [activeUsers, setActiveUsers] = useState();
    const [startCamera, setStartCamera ] = useState(false);
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();

    
    const __startCamera = async () => {
        const {status} = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
          // start the camera
          setStartCamera(true)
        } else {
          Alert.alert('Access denied')
        }
      }

    const joinRoom = ()=> {
        __startCamera();
        socket.emit('join-room', { roomId: roomId, userName: name })
    }

    useEffect(()=> {
        const API_URL = 'http://192.168.0.76:3001'
        socket = io(`${API_URL}`);
        console.log('yooooooooo');
        socket.on('connection', ()=>console.log('connected'))
        socket.on('all-users', users => {
            console.log('Active Users');
            console.log(users)
            setActiveUsers(users)
        })
    }, [])
    
    return(
            <View style={styles.container}>            
           {startCamera ? (
           <Camera 
                type={'front'}
                style={{ width: '100%', height: 600 }}
           ></Camera>
        ) :(
            <StartMeeting 
    name={name}
    setName={setName}
    roomId={roomId}
    setRoomId={setRoomId}
    joinRoom={joinRoom}
/>

           )}


            </View>

        )

}

export default MeetingRoom

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1c1c1c',
        flex: 1
    },

})