import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image ,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import NavBar from '../NavBar';
import Trending from './Trending';
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


function MovieDetails() {
    const route = useRoute();
    const { movieId } = route.params;
    const base_url = 'https://image.tmdb.org/t/p/original';
    const [movie, setMovie] = useState({});
    const navigation = useNavigation();
    useEffect(() => {

        async function fetchData() {
            const request = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=956bc59cec62b55741365cda6ad66d4a`)
            setMovie(request.data);
            return request;
        }
        fetchData();
    }, [movieId]);
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
        <View style={{ backgroundColor: '#000', flex: 1 }}>
        <View style={[styles.banner]}>
            <NavBar />
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
            <Trending/>
        </View>
        </View>
    );
};

const styles = StyleSheet.create(BannerStyles);

export default MovieDetails;
