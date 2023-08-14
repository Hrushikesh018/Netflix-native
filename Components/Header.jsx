import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image,TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import { ScrollView } from 'react-native-gesture-handler';
// import BannerStyles from './BannerStyles';
const BannerStyles = {
    banner: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // marginTop: 50
    },
    bannerImage: {
        width: '100%',
        height: 500,
        resizeMode: 'cover',
    },
    bannerContent: {
        position: 'absolute',
        bottom: 20,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    description: {
        fontSize: 12,
        color: 'white',
    },
    buttonContainer: {
        marginTop: 10,
    },
    button: {
        fontSize: 18,
        color: 'white',
        backgroundColor: '#e50914',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
    },
};


function Header() {
    
    const [movies, setMovies] = useState([]);
    const base_url = 'https://image.tmdb.org/t/p/original';
    const [movie, setMovie] = useState({});
    const navigation = useNavigation();
    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=b78a510d44abdaf53d4c9f3ddd2ebfe5&language=en-US`);
                const data = await response.json();

                setMovie(
                    data.results[
                    Math.floor(Math.random() * data.results.length - 1)
                    ],)
                // console.log(data.results);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };
        fetchMovieData();
    }, []);
    const handlePlayPress = () => {
        // Add your logic here for what happens when "Play" is pressed
        // For example, you can navigate to a video player screen
        const title = movie?.title || movie?.name || movie?.original_name;
        navigation.navigate('Player', { title });

    };


    const truncatedDescription =
        movie?.overview?.length > 150
            ? movie.overview.slice(0, 150) + '...' // Truncate at 150 characters
            : movie?.overview;

    return (
        <View style={styles.banner}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/original/${movie?.poster_path}` }}
                style={styles.bannerImage}
            />

            <View style={styles.bannerContent}>
                <Text style={styles.title}>
                    {movie?.name || movie?.original_name || movie?.title}
                </Text>
                <Text style={styles.description}>{truncatedDescription}</Text>
                <View style={styles.buttonContainer}>
                <TouchableOpacity
                        style={styles.button}
                        onPress={handlePlayPress}
                    >
                        <Text>Play ▶</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create(BannerStyles);

export default Header;
