import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import logo from './assests/logo.png'

const NavBar = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.navbar}>
            <Image source={logo} style={{ width: 50, height: 50 }} />
            
            <Text onPress={() => navigation.navigate('Movies')} style={styles.navItems}>TV Shows</Text>
            <Text onPress={() => navigation.navigate('Trending')} style={styles.navItems}>Movies</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    navbar: {
        // backgroundColor: 'rgb(0,0,0)',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    navItems: {
        margin: 10,
        fontSize: 15,
        color: "white"
    }
})

export default NavBar