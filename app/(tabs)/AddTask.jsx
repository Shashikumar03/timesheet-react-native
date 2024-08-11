import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from "./../../config/firebaseConfig";

export default function AddTask() {
  const { isLoaded, isSignedIn } = useAuth();
  const [task, setTask] = useState('');
  const [isSaving, setIsSaving] = useState(false); // State to track saving process
  const { user } = useUser();

  if (!isSignedIn) {
    return (
      <View>
        <Text>Please log in</Text>
      </View>
    );
  }

  const saveTaskDetails = async () => {
    if (!task.trim()) {
      console.error("Task cannot be empty");
      ToastAndroid.show("Task cannot be empty", ToastAndroid.SHORT);
      setTask("")
      return;
    }

    // Get the current date and time
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // e.g., 18:09
    const date = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }); // e.g., 11 August 2024

    setIsSaving(true); // Start the saving process

    try {
      console.log("Adding task...");
      const newTaskDocRef = doc(collection(db, "Task"));
      await setDoc(newTaskDocRef, {
        task: task,
        email: user?.primaryEmailAddress?.emailAddress,
        name: user?.firstName,
        time: time,
        date: date,
      });
      console.log("Task added successfully");
      ToastAndroid.show("add successfully",ToastAndroid.BOTTOM,ToastAndroid.LONG)
      setTask(''); // Clear the input field after saving
    } catch (error) {
      console.error("Error saving task details:", error);
    } finally {
      setIsSaving(false); // End the saving process
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'lightgray',
        gap: 10,
      }}
    >
      <View
        style={{
          borderWidth: 2,
          borderColor: 'blue',
          padding: 10,
          borderRadius: 10,
          width: '80%',
        }}
      >
        <TextInput
          placeholder='Write your task'
          value={task}
          onChangeText={text => setTask(text)}
          style={{
            height: 40,
            paddingHorizontal: 10,
          }}
        />
      </View>
      
      {isSaving ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
          }}
          onPress={saveTaskDetails}
          disabled={isSaving} // Disable button when saving
        >
          <Text style={{ color: 'white' }}>Add Task</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
