import React, { useState, useEffect } from 'react';
import { FlatList, Image, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
function Trending() {
    const [movies, setMovies] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=b78a510d44abdaf53d4c9f3ddd2ebfe5&language=en-US`);
                const data = await response.json();

                setMovies(data.results.slice(0, 12));
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };
        fetchMovieData();
    }, []);
   
    const renderMovieRow = (data) => {
        return (
            
            
            <View style={styles.movieRow}>
                {data.map((movie,id) => (
                     <TouchableHighlight key={id} onPress={() =>
                        navigation.navigate('Details', {
                          movieId: movie?.id
                        })
                      }>
                     <Image
                         style={styles.movieImage}
                         source={{ uri: `https://image.tmdb.org/t/p/original/${movie?.poster_path}` }}
                     />
                 </TouchableHighlight>
                ))}
            </View>
        );
    };

    const rows = [];
    for (let i = 0; i < movies.length; i += 3) {
        rows.push(movies.slice(i, i + 3));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trending</Text>
            {rows.map((row, index) => (
                <View key={index}>
                    {renderMovieRow(row)}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
        marginLeft: 10,
    },
    movieRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    movieImage: {
        width: 100,
        height: 150,
        borderRadius: 6,
        resizeMode: 'cover',
    },
});

export default Trending;
