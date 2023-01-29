import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context_api/AuthContext'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { AntDesign } from '@expo/vector-icons'; 
import AddActivityModal from '../components/AddActivityModal';

export default function ActivitiesScreen() {
  const [user, setUser] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [activitiesList, setActivitiesList] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);

  useEffect(() => {
    console.log("in use effect")
    getIncompleteActivities();
  }, [])

  const logout = () => {
    setUser(null);
  }

  const getIncompleteActivities = async () => {
    setIsLoading(true);

    const q = query(collection(db, "activities"), where("status", "==", "pendingApproval"));

    let activities = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let activity = {
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        dateAdded: doc.data().dateAdded
      }
      activities.push(activity);
    });
    setActivitiesList(activities);
    setIsLoading(false);
  }

  const handleOpenAddModal = () => {
    setAddModalVisible(true);
  }

  return (
    <View className="h-full bg-gray-50 flex flex-col">
      <View className="pt-10 shadow-xl" style={styles.topBar}>
        <View>
          <TouchableOpacity onPress={logout} style={styles.topBar}>
            <Text className="self-end px-6">Logga ut</Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-between px-6 py-1">
          <TouchableOpacity>
            <Text className="font-semibold py-2 text-gray-400">Oplanerade</Text>
          </TouchableOpacity>
          <TouchableOpacity className="">
            <Text className="font-semibold py-2 px-6 border-b-2 border-gray-500">Planerade</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="font-semibold py-2 text-gray-400">Genomförda</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View>
          <ActivityIndicator color="0000ff" size="large" />
        </View>
      ) : (
        <View className="flex flex-row justify-between w-full">

          <View className="">
            <FlatList data={activitiesList}
              renderItem={({item}) => (
                <View>
                  <Text>{item.name}</Text>
                </View>
              )}
              keyExtractor={item => item.id}
            />  
          </View>

          <View className="">
            <TouchableOpacity className="flex justify-center items-center font-bold bg-green-500 rounded-full w-10 h-10 mr-5" onPress={handleOpenAddModal}>
                <AntDesign className="mx-auto" name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Modal animationType='slide' transparent={true} visible={addModalVisible} onRequestClose={() => {
        setAddModalVisible(!addModalVisible)
      }}>
        <View className="h-full pt-10 shadow z-10 bg-gray-50 items-center justify-center">
          <AddActivityModal addModalVisible={addModalVisible} setAddModalVisible={setAddModalVisible} />
        </View>
      </Modal>
      
    </View>
  )
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#ffffff"
  }
})