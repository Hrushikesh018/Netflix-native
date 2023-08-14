import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import NavBar from '../NavBar'
import Header from './Header'
import Trending from './Trending'
import MovieRows from './MovieRows'

const Home = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <NavBar />
      <ScrollView >

        <Header />

        <MovieRows />
      </ScrollView>

    </View>
  )
}

export default Home