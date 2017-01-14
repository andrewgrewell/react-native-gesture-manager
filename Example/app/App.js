import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GestureManager from '../src'
import { Home } from './scenes';


const App = () => (
    <GestureManager style={styles.container}>
        <Home />
    </GestureManager>
);


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});


export default App;