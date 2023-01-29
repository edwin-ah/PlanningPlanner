import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'; 

export default function AddActivityModal({ addModalVisible, setAddModalVisible }) {
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();
  
  return (
    <View className="relative w-5/6">
      <View className="absolute right-1 z-10 text-gray-800 text-xl font-bold mr-4">
        <TouchableOpacity onPress={() => setAddModalVisible(!addModalVisible)}>
          <AntDesign name="closecircle" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View className="space-y-5">
        <Text className="text-xl font-semibold">Ny aktivitet</Text>
        <View>
          <View className="flex flex-row items-center">
            <Text className="text-sm font-bold text-gray-600 block pl-2">Namn</Text>
          </View>
          <TextInput 
            className="p-2 w-full border border-gray-300 rounded mt-1"
            value={name}
            onChangeText={(e) => {setName(e)}}
          />
        </View>
        <View>
          <View className="flex flex-row items-center">
            <Text className="text-sm font-bold text-gray-600 block pl-2">Beskrivning</Text>
          </View>
          <TextInput 
            className="p-2 w-full border border-gray-300 rounded mt-1"
            value={description}
            onChangeText={(e) => {setDescriptionexpo(e)}}
          />
        </View>
      </View>
    </View>
  )
}