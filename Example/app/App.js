import React from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';

import { color } from './constants';
import { HomeScene } from './scenes';
import { TextField } from './components';

import GestureManager, { isComponentTypeInEvent } from 'react-native-gesture-manager';


const App = React.createClass({

    checkCloseKeyboard(e) {
        if (!isComponentTypeInEvent(e, TextField)) {
            Keyboard.dismiss();
        }
    },

    render() {
        return (
            <GestureManager style={styles.container}
                            onStartShouldSetResponderCapture={this.checkCloseKeyboard}>
                <HomeScene />
            </GestureManager>
        )
    }
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: color.PRIMARY,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});


export default App;