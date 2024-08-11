import { View, Text, FlatList, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { collection, query, getDocs,where } from 'firebase/firestore';
import { db } from "./../../config/firebaseConfig";
import { useFocusEffect } from '@react-navigation/native';
import LokiScreen from '../../components/LokiPage/LokiScreen';

export default function Home() {
  const { user } = useUser();
  const [taskList, setTaskList] = useState([]); 
  const [loading, setLoading] = useState(true); 

  if(user?.primaryEmailAddress.emailAddress=="ss@gmail.com" || user?.primaryEmailAddress.emailAddress=="lokesh.sadagopan@card91.io"){
    return (<LokiScreen/>)
    
  }

  // Function to fetch tasks
  const getTaskList = useCallback(async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return; // Check if user is authenticated

    setLoading(true); // Start loading indicator

    try {
      const q = query(collection(db, "Task"),
      where("email",'==',user?.primaryEmailAddress.emailAddress)
    );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log(data)
      setTaskList(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching task data: ", error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  }, [user]);

  // Fetch data whenever the screen gains focus
  useFocusEffect(
    useCallback(() => {
      getTaskList();
    }, [getTaskList])
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.taskText}>{item.task || 'No Task'}</Text>
      <Text style={styles.detailText}>{item.date || 'No Date'}</Text>
      <Text style={styles.detailText}>{item.time || 'No Time'}</Text>
      <Text style={styles.nameText}>{item.name || 'No Name'}</Text>
      <Text style={styles.nameText}>{item.email || 'No Email'}</Text>
      
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
        <Text>....one moment plzzz</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Task List of {user?.primaryEmailAddress?.emailAddress}</Text>
      <FlatList
        data={taskList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text>No tasks found.</Text>
          </View>
        )} // Show message if list is empty
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'gray',
    marginTop:10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginVertical: 5,
    borderRadius: 10,
    lineHeight: 3,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Offset for X and Y axis
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // Blur radius
    elevation: 5, // Elevation for Android
  },
  
  taskText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 14,
  },
  nameText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lokiMainContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
});
