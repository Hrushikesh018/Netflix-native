import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MovieRow = ({ title, url }) => {
    const [movies, setMovies] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const movieData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };
        movieData();
    }, []);

    const navigateToMovieDetails = (movieId) => {
        navigation.navigate('Details', { movieId });
    };

    const renderMovieItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigateToMovieDetails(item.id)}
        >
            <Image
                style={styles.movieImage}
                source={{ uri: `https://image.tmdb.org/t/p/original/${item?.poster_path}` }}
            />
        </TouchableOpacity>
    );

    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={movies.slice(0, 5)}
                renderItem={renderMovieItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    movieImage: {
        width: 105,
        height: 152,
        borderRadius: 6,
        resizeMode: 'cover',
        margin: 10,
    },
});

export default MovieRow;
