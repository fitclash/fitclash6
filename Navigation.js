import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import  Camera  from "./screens/Camera";
import MeetingRoom from "./screens/MeetingRoom";

function Navigation() {
   const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initalRouteName={Home}>
                <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}} 
                />
                <Stack.Screen
                name="Room"
                component={MeetingRoom}
                options={{
                    title: 'Start A Meeting',
                    headerStyle: {
                        backgroundColor: '#1c1c1c',
                        shadowOpacity: 0
                    },
                    headerTintColor: 'white'
                }}
                />
                 <Stack.Screen
                name="Camera"
                component={Camera}
                options={{
                    title: 'Start A Meeting',
                    headerStyle: {
                        backgroundColor: '#1c1c1c',
                        shadowOpacity: 0
                    },
                    headerTintColor: 'white'
                }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation