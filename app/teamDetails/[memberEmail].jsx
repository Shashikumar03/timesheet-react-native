import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router'; // Correct import
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TeamMemberDetails() {
    const { memberEmail } = useLocalSearchParams();
    const [memberTask, setMemberTask] = useState([]);
    const [loading, setLoading] = useState(true); // Set initial loading state to true
    const { user } = useUser();
    const router = useRouter(); // Use the correct hook for navigation

    useEffect(() => {
        getTaskOfSelectMember();
    }, []);

    console.log(memberTask);
    console.log(memberEmail);

    const getTaskOfSelectMember = async () => {
        try {
            setLoading(true);
            const q = query(
                collection(db, "Task"),
                where('email', '==', memberEmail)
            );
            const querySnapshot = await getDocs(q);
            const taskData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setMemberTask(taskData);
        } catch (error) {
            console.error("Error fetching member tasks: ", error);
        } finally {
            setLoading(false);
        }
    };
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.taskText}>{item.task || 'No Task'}</Text>
            <Text style={styles.detailText}>{item.date || 'No Date'}</Text>
            <Text style={styles.detailText}>{item.time || 'No Time'}</Text>
            <Text style={styles.nameText}>{item.name || 'No Name'}</Text>
            <Text style={styles.nameText}>{item.email || 'No Email'}</Text>

        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleText}>Task List of {memberEmail}</Text>
            <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back-circle" size={30} color="black" /></TouchableOpacity>
            {!loading ?
                <FlatList
                    data={memberTask}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Text>No tasks found.</Text>
                        </View>
                    )} // Show message if list is empty
                /> : <View style={{alignItems:"center"}}><ActivityIndicator size={24} color="blue"/></View>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lokiMainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
