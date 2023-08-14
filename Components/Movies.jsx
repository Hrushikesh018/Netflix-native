import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View, StyleSheet ,TouchableHighlight} from 'react-native';
import NavBar from '../NavBar';
import { useNavigation } from '@react-navigation/native';

function Movies() {
    const [movies, setMovies] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=b78a510d44abdaf53d4c9f3ddd2ebfe5&language=en-US`);
                const data = await response.json();

                setMovies(data.results.slice(0, 12));
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };
        fetchMovieData();
    }, []);

    const moviesInRows = [];
    const rowSize = 3;

    for (let i = 0; i < movies.length; i += rowSize) {
        const row = movies.slice(i, i + rowSize);
        moviesInRows.push(row);
    }

    return (
        <View style={styles.container}>
            <NavBar/>
            <Text style={styles.title}>TV Shows</Text>
            {moviesInRows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.rowContainer}>
                    {row.map((movie,id) => (
                         <TouchableHighlight key={id} onPress={() =>
                            navigation.navigate('Details', {
                              movieId: movie?.id
                            })
                          }>
                        <Image
                            key={movie.id.toString()} // Use movie ID as the key
                            style={styles.movieImage}
                            source={{ uri: `https://image.tmdb.org/t/p/original/${movie?.poster_path}` }}
                        />
                        </TouchableHighlight>
                    ))}
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
    rowContainer: {
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

export default Movies;
