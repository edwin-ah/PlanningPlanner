import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { AuthContext } from '../context_api/AuthContext';

export default function SelectUserScreen() {
  const [user, setUser] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const onLogin = async () => {
    setIsLoading(true)

    const docRef = doc(db, "users", selectedUser.toLowerCase());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUser(
        {
          id: selectedUser.toLocaleLowerCase(), 
          username: docSnap.data().username
        }
      )
    }

    setIsLoading(false)
  }

  return (
    <View className="h-full bg-gray-50 flex flex-col justify-center">
      <View className="max-w-md w-full mx-auto">
        <Text className="text-center font-medium text-xl">Joannas & Edwins lista❤</Text>
        <Text className="text-center font-bold text-gray-900 mt-2 text-3xl">Identifiera dig tack</Text>
      </View>
      <View className="max-w-sm w-full mx-auto mt-5 bg-white p-8 border border-gray-100">
      {isLoading ? (
          <View className="mt-5">
            <ActivityIndicator color="0000ff" size="large" />
          </View>
        ) : ( 
          <View className="space-y-4">
            <TouchableOpacity className="mb-5"
              onPressOut={() => setSelectedUser("Joanna")}
            >
              <View className="border-l-4 border-indigo-300 p-3">
                <Text className="text-lg">Joanna</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPressOut={() => setSelectedUser("Edwin")}
            >
              <View className="border-l-4 border-indigo-300 p-3">
                <Text className="text-lg">Edwin</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="w-full py-2 px-4 bg-indigo-400 rounded-md"
              disabled={!selectedUser.length}
              onPress={onLogin}
            >
              <Text className="text-white text-small font-bold text-center">
                Logga in {selectedUser}
              </Text>
            </TouchableOpacity>

          </View>
        )}
      </View>
    </View>
  )
}