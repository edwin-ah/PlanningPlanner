import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function AddActivityModal({ addModalVisible, setAddModalVisible }) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [dateText, setDateText] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (name.length > 0 && description.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true)
    }
  }, [name, description])

  const handleDataConfirm = (date) => {
    setDate(date)
    if (date == null) {
      setDateText("");
      return;
    }
    setDateText(moment(new Date(date)).format('DD-MM-YYYY'))
  }

  const handleSave = async () => {
    if (name.length <= 0 || description.length <= 0) {
      setErrorMessage("Namn och beskrivning måste vara längre än 0");
      return;
    }

    setIsLoading(true);

    try {
      await addDoc(collection(db, 'activities'), {
        name: name,
        description: description,
        plannedDate: date == null ? null : Timestamp.fromDate(date),
        status: date == null ? "unplanned" : "planned",
        dateAdded: Timestamp.now()
      });

      setStatusMessage(`Aktiviteten ${name} har lagts till 🤘`)
      setName("");
      setDescription("");
      setDatePickerVisible(false);

    } catch (err) {
      setErrorMessage(err);
    }

    setIsLoading(false);
  }

  return (
    <View className="relative w-5/6">
      {isLoading ? (
        <View>
          <ActivityIndicator color="0000ff" size="large" />
        </View>
      ) : (
        <View>
          <View className="absolute right-1 z-10 text-gray-800 text-xl font-bold mr-4">
            <TouchableOpacity onPress={() => setAddModalVisible(!addModalVisible)}>
              <AntDesign name="closecircle" size={24} color="#ff6242" />
            </TouchableOpacity>

          </View>

          <View className="space-y-6">
            <Text className="text-xl font-semibold tracking-wider">Ny aktivitet</Text>
            <Text>{statusMessage}</Text>
            
            <View>
              <Text className="text-sm font-bold text-gray-600 block tracking-wider">
                Namn
                <Text className="text-sm text-red-500"> *</Text>
              </Text>
              <TextInput
                className="p-2 w-full border border-gray-300 rounded mt-1"
                value={name}
                onChangeText={(e) => { setName(e) }}
              />
            </View>

            <View>
              <Text className="text-sm font-bold text-gray-600 block tracking-wider">
                Beskrivning
                <Text className="text-sm text-red-500"> *</Text>
              </Text>
              <TextInput
                className="p-2 w-full border border-gray-300 rounded mt-1"
                value={description}
                onChangeText={(e) => { setDescription(e) }}
              />
            </View>

            <View>
              <Text className="text-sm font-bold text-gray-600 block tracking-wider">Datum</Text>

              <TouchableOpacity
                onPress={() => { setDatePickerVisible(!datePickerVisible) }}>
                <TextInput
                  className="p-2 w-full border border-gray-300 rounded mt-1 text-black"
                  value={dateText}
                  editable={false}
                />
                <View className="justify-end items-end">
                  <Text>
                    {dateText.length > 0 ? 'Ändra datum' : 'Välj datum'}
                  </Text>
                </View>

              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                className={`${isButtonDisabled ? 'bg-gray-400' : 'bg-indigo-600'} w-full py-2 px-4 rounded-md`}
                disabled={isButtonDisabled}
                onPress={handleSave}
              >
                <Text className="text-white text-small font-bold text-center">
                  <Ionicons name="checkmark" size={24} color="white" />
                </Text>
              </TouchableOpacity>
            </View>

          </View>

          <DateTimePickerModal
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={handleDataConfirm}
            onCancel={() => {
              setDatePickerVisible(!datePickerVisible)
              handleDataConfirm(null)
            }}
          />
        </View>
      )}
    </View>
  )
}