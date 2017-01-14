import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { color } from '../../constants';


const Home = () => (
    <View style={styles.container}>
        <Text>
            Hello World
        </Text>
    </View>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: color.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default Home;