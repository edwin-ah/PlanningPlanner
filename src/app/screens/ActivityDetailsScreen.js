import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ActivityDetailsScreen({ route }) {
  const { activityId } = route.params;
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [activity, setActivity] = useState({});

  useEffect(() => {
    getActivity();
  }, [])

  async function getActivity() {
    try {
      const docRef = doc(db, 'activities', activityId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.log("Could not find activity, id: ", activityId);
      }

      let dateAddedWithDay = docSnap.data().dateAdded.toDate().toDateString();
      let dateAddedWithoutDay = dateAddedWithDay.split(' ').slice(1).join(' ');

      setActivity({
        name: docSnap.data().name,
        description: docSnap.data().description,
        dateAdded: dateAddedWithoutDay
      })

    } catch(err) {
      console.log(err);
    }

    setIsLoading(false);
  }

  return (
    <SafeAreaView className="h-full bg-gray-50">
      <View className="py-2 ml-2 shadow-xl">
        <View>
          <TouchableOpacity onPress={() => {navigation.goBack()}}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ? (
        <View>
          <ActivityIndicator color="0000ff" size="large" />
        </View>
      ) : (
        <View className="flex justify-center items-center">
          <Text>{activity.name}</Text>
          <Text>{activity.description}</Text>
          <Text>Tillagd: {activity.dateAdded}</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#ffffff"
  }
})