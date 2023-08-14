import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import movieUrl from './movieUrl'
import MovieRow from './MovieRow';

const MovieRows = () => {
    const data = movieUrl;
    return (
        <View>
            {data.map((movie) => (
                <MovieRow key={movie.id} title={movie.name} url={movie.url} />
            ))}
            {/* <Text>MovieRows</Text> */}
        </View>
    );
}

export default MovieRows;
