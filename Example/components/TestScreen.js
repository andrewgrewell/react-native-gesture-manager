import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Draggable from './Draggable';
import Form from './Form';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30,
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    descriptionText: {
        fontSize: 14,
        textAlign: 'center'
    },
    sectionContainer: {
        marginVertical: 12,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },
    draggableContainer: {
        flexDirection: 'row'
    },
    draggable: {
        margin: 8
    }
});

const TestScreen = () => (
    <View style={styles.container}>
        <Text style={styles.descriptionText}>
            Click outside a field to close the keyboard. Notice clicking another field does not trigger a close.
        </Text>
        <View style={styles.sectionContainer}>
            <Form />
        </View>
        <Text style={styles.descriptionText}>
            You could have a pan responder on each draggable component. However having one class manage the gesture
            allows for coordination between gesture enabled components that might otherwise get complex
        </Text>
        <View style={[styles.sectionContainer, styles.draggableContainer]}>
            <Draggable style={styles.draggable}/>
            <Draggable style={styles.draggable}/>
            <Draggable style={styles.draggable}/>
        </View>
    </View>
);


export default TestScreen;