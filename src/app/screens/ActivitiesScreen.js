import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context_api/AuthContext'
import { db } from '../firebase/firebase';
import { AntDesign } from '@expo/vector-icons';
import AddActivityModal from '../components/AddActivityModal';
import useActivitiesList from '../hooks/useActivitiesList';
import ActivityModal from '../components/ActivityModal';
import { useNavigation } from '@react-navigation/native';

export default function ActivitiesScreen() {
  const [user, setUser] = useContext(AuthContext);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [status, setStatus] = useState("planned");
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState("");
  
  const navigation = useNavigation(); 
  const { activitiesList, isLoading } = useActivitiesList(db, status);

  const handleOpenAddModal = () => {
    setAddModalVisible(true);
  }

  const handleOpenActivityModal = (item) => {
    setSelectedActivityId(item.id);
    setActivityModalVisible(true);
  }

  const logout = () => {
    setUser(null);
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
          <TouchableOpacity onPress={() => setStatus("unplanned")}>
            <Text className={`font-semibold py-2 ${status == "unplanned" ? 'border-b-2 border-gray-500' : 'text-gray-400 '}`}>Oplanerade</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStatus("planned")}>
            <Text className={`font-semibold py-2 ${status == "planned" ? 'border-b-2 border-gray-500' : 'text-gray-400 '}`}>Planerade</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStatus("done")}>
            <Text className={`font-semibold py-2 ${status == "done" ? 'border-b-2 border-gray-500' : 'text-gray-400 '}`}>Genomförda</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View>
          <ActivityIndicator color="0000ff" size="large" />
        </View>
      ) : (
        <View className="w-full h-full">
          <View className="w-11/12 self-center flex flex-row justify-between border-b-2 border-gray-200 pt-2 pb-2">
            <View className="self-center">
              <Text className="font-bold">{new Date().toDateString()}</Text>
            </View>
            <TouchableOpacity className="flex justify-center items-center font-bold bg-green-500 rounded-full w-10 h-10" onPress={handleOpenAddModal}>
              <AntDesign className="mx-auto" name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="flex h-full justify-center items-center pt-2">
            <View className="flex flex-1 grow">
              <FlatList data={activitiesList} className="h-full"
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => { navigation.navigate('ActivityDetails', { activityId: item.id })}}>
                    <View className="flex flex-row px-3 py-3">
                      <View className="flex flex-row justify-between bg-gray-100 rounded-r-lg rounded-l-lg w-full p-3">
                        <View>
                          <Text className="text-md tracking-wide pl-5">{item.name}</Text>
                        </View>
                        <View>
                          <AntDesign name="arrowright" size={24} color="black" />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </View>

          <View className=" right-0 top-5">
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

      <Modal animationType='slide' transparent={true} visible={activityModalVisible} onRequestClose={() => {
        setActivityModalVisible(!activityModalVisible)
      }}>
        <View className="h-full pt-10 shadow z-10 bg-gray-50 items-center justify-center">
          <ActivityModal activityModalVisible={activityModalVisible} setActivityModalVisible={setActivityModalVisible} activityId={selectedActivityId} />
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