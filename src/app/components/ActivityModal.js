import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function ActivityModal({ activityModalVisible, setActivityModalVisible, activityId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [activity, setActivity] = useState({});
  const [errorText, setErrorText] = useState("");

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
    <View>
      {isLoading ? (
        <View>
          <ActivityIndicator color="0000ff" size="large" />
        </View>
      ) : (
        <View>
          <Text>{activity.name}</Text>
        </View>
      )}
    </View>
  )
}