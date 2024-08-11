import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from "../../config/firebaseConfig"
import TeamList from './TeamList';
import { useRouter } from 'expo-router';

export default function LokiScreen() {
    const [teamMemeber, setTeamMember] = useState()
    const [loading, setLoading] = useState(true)
    const router= useRouter()
    useEffect(() => {
        getTeamList()
    }, [])

    const getTeamList = async () => {
        try {
            const q = query(collection(db, 'Team'));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setTeamMember(data);
            if (teamMemeber) {
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching slider data: ", error);
        }
    };
    // console.log(teamMemeber)
     const onTeamMemberpressHandler=(item)=>{

        router.push('/teamDetails/' + item.email)
     }
    return (
        <SafeAreaView style={styles.safeAreaViewContainer}>
            {teamMemeber && loading? 
                <View >
                    <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}>Hello Lead</Text>
                    <Text>Check your team's timesheet</Text>
                    <FlatList
                    data={teamMemeber}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item})=>(
                        <TouchableOpacity onPress={()=>onTeamMemberpressHandler(item)}>
                            <TeamList teamDetails={item}/>
                        </TouchableOpacity>
                    )}
                    />
                </View>
                : <View style={{flex:1,alignItems:"center", justifyContent:"center"}}><ActivityIndicator size={24} color="blue"/></View>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaViewContainer: {
        flex: 1,
        padding: 10,
        marginTop: StatusBar.currentHeight || 0, // Adjusts the margin for the status bar height
    },
    lokiMainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
