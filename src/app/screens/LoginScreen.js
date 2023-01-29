import { View, Text, ActivityIndicator, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { auth } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleLogin = () => {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setAuthUser(user.user)
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage('Login failed, please check password and email.')
      })
    setIsLoading(false)
  }

  return (
    <View className="h-full bg-gray-50 flex flex-col justify-center">
      <View className="max-w-md w-full mx-auto">
        <Text className="text-center font-medium text-xl">Joanna & Edwins lista</Text>
        <Text className="text-center font-bold text-gray-900 mt-2 text-3xl">Login</Text>
      </View>
      <View className="max-w-sm w-full mx-auto mt-5 bg-white p-8 border border-gray-300">
        {isLoading ? (
          <View className="mt-5">
            <ActivityIndicator color="0000ff" size="large" />
          </View>
        ) : (
          <View className="space-y-5">
            <View>
              <View className="flex flex-row items-center">
                <FontAwesome name="user" size={24} color="#60a5fa" />
                <Text className="text-sm font-bold text-gray-600 block pl-2">Email</Text>
              </View>
              <TextInput 
                className="p-2 w-full border border-gray-300 rounded mt-1" 
                value={email}
                onChangeText={(e) => {setEmail(e)}}
              />
            </View>
            <View>
              <View className="flex flex-row items-center">
                <FontAwesome name="lock" size={24} color="#60a5fa" className="pr-4" />
                <Text className="text-sm font-bold text-gray-600 block pl-2">Password</Text>
              </View>
              <TextInput 
                className="p-2 w-full border border-gray-300 rounded mt-1" 
                secureTextEntry={true} 
                value={password}
                onChangeText={(e) => {setPassword(e)}}
              />
            </View>
            <Pressable
              onPress={handleLogin}
              className="w-full py-2 px-4 bg-blue-600 rounded-md"
            >
              <Text className="text-white text-small text-center">Login</Text>
            </Pressable>
            <Pressable className="right-0">
              <Text className="text-white text-small text-blue-600">Register</Text>
            </Pressable>

            {errorMessage.length > 0 && <Text className="text-center">{errorMessage}</Text>}

          </View>
        )}

      </View>
    </View>
  )
}