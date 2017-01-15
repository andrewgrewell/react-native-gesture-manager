import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { color } from '../../constants';
import Form from './components/Form';
import { Draggable } from '../../components';


const HomeScene = () => (
    <View style={styles.container}>
        <Text>
            Gesture Manager Example
        </Text>
        <Draggable />
    </View>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center'
    }
});


export default HomeScene;