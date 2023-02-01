import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context_api/AuthContext'
import { db } from '../firebase/firebase';
import { AntDesign } from '@expo/vector-icons';
import AddActivityModal from '../components/AddActivityModal';
import useActivitiesList from '../hooks/useActivitiesList';

export default function ActivitiesScreen() {
  const [user, setUser] = useContext(AuthContext);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [status, setStatus] = useState("planned");

  const { activitiesList, isLoading } = useActivitiesList(db, status);

  const handleOpenAddModal = () => {
    setAddModalVisible(true);
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
          <View className="w-11/12 self-center flex items-end border-b-2 border-gray-200 pt-2 pb-2">
            <TouchableOpacity className="flex justify-center items-center font-bold bg-green-500 rounded-full w-10 h-10" onPress={handleOpenAddModal}>
              <AntDesign className="mx-auto" name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="flex h-full justify-center items-center pt-2">
            <View className="h-full w-full">
              <FlatList data={activitiesList}
                renderItem={({ item }) => (
                  <View className="flex flex-row px-3 py-1">
                    <View className="flex flex-row justify-between bg-gray-200 rounded-r-lg rounded-l-sm w-full p-3 border-l-2 border-indigo-600">
                      <View>
                        <Text>{item.name}</Text>
                      </View>
                      <View>
                        <Text>Icons</Text>
                      </View>
                    </View>
                  </View>
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
        // <View className="flex flex-row justify-between w-full h-full">

        //   <View className="flex flex-1 flex-col">
        //     <TouchableOpacity className="flex justify-center items-center font-bold bg-green-500 rounded-full w-10 h-10 mr-5" onPress={handleOpenAddModal}>
        //       <AntDesign className="mx-auto" name="plus" size={24} color="white" />
        //     </TouchableOpacity>
        //   </View>


        //   <FlatList data={activitiesList}
        //     renderItem={({ item }) => (
        //       <View>
        //         <Text>{item.name}</Text>
        //       </View>
        //     )}
        //     keyExtractor={item => item.id}
        //   />

        // </View>
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