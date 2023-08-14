import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import movieTrailer from 'movie-trailer';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import NavBar from '../NavBar';
import { WebView } from 'react-native-webview';
import MovieRows from './MovieRows';


export default function Player() {
    const route = useRoute();
    const navigation = useNavigation();
    const { title } = route.params;
    const [playing, setPlaying] = useState(true);
    const [videoId, setVideoId] = useState('');
    const togglePlaying = () => {
        setPlaying(prev => !prev);
    };

    useEffect(() => {
        const handleClick = () => {
            if (title) {
                movieTrailer(title)
                    .then(url => {
                        // const parsedUrl = new URL(url);
                        console.log('Trailer URL:', url);
                        const parsedUrl = queryString.parseUrl(url); // Parse query parameters
                        const query = parsedUrl.query;
                        setVideoId(query.v);
                    })
                    .catch(error => console.log(error));
            }
        };
        handleClick();
    }, [title]);

    return (
        <View style={{ backgroundColor: '#000', flex: 1 }}>
            
                <NavBar />
                <View>
                    <YoutubePlayer
                        apiKey="AIzaSyAjtyuqb8j0Pq9m2lmIikvROhL6U4eet_Y"
                        height={200}
                        play={playing}
                        videoId={videoId}
                        onChangeState={state => {
                            if (state === 'ended') {
                                setPlaying(false);
                                // You can add your own logic here when the video ends
                            }
                        }}
                    />
                    <MovieRows />
                </View>
          


        </View>
    )
}
const styles = StyleSheet.create({
  
  });