import React from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';

import GestureManager, { isComponentTypeInEvent, isComponentInEvent } from 'react-native-gesture-manager';
import TextField from './components/TextField';
import TestScreen from './components/TestScreen';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#cae1e9',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});

class App extends React.Component {

    constructor(props) {
      super(props);
      this.checkCloseKeyboard = this.checkCloseKeyboard.bind(this);
    }

    checkCloseKeyboard(e) {
        e.persist();
        if (!isComponentInEvent(e, TextField)) {
            Keyboard.dismiss();
        }
    }

    render() {
        return (
            <GestureManager style={styles.container}
                            onStartShouldSetResponderCapture={this.checkCloseKeyboard}>
                <TestScreen/>
            </GestureManager>
        )
    }
}


export default App;
