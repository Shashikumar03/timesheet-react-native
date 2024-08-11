import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function TeamList({teamDetails}) {
    console.log(teamDetails.imageUrl)
    return (
        <View style={styles.itemContainer}>
          <View style={styles.boxShadow}>
            <Image source={{ uri: teamDetails?.imageUrl }} style={styles.image} />
            <Text style={styles.text}>{teamDetails.name}</Text>
            
          </View>
          
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      boxShadow: {
        padding: 5,
        backgroundColor: '#fff', // Ensure background color for shadow visibility
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 10,
        borderRadius: 10,
        overflow: 'hidden',
      },
      itemContainer: {
        marginRight: 20,
        padding: 5,
        marginStart: 10,
        marginTop: 10,
      },
      
      text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5,
      },
      main:{
        borderBottomWidth:3,
        borderColor:"#ddd",
      },
      itemContainer: {
        marginRight: 1,
        padding:5,
        marginStart: 10,
        marginTop:1
    
      },
      loadingDiv:{
        
        marginTop:50,
      
        
    
      },
      borderApply:{
        borderRadius: 10,
        borderWidth: 2, // 2px border width
        borderColor: 'green', // border color
      },
      image: {
        height: 80,
        width: 100,
        resizeMode: 'contain',
        // borderRadius: 10,
        // borderWidth: 1,
        // borderColor: '#ddd',
        // marginBottom: 10,
      },
      boxShodow: {
        padding: 5,
        backgroundColor: '#fff', // Ensure background color for shadow visibility
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 10,
        borderRadius: 10, 
        overflow: 'hidden', 
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
    