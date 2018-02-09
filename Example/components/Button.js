import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 50,
        backgroundColor: '#ff9eee',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    text: {
        color: '#f6f6f6',
        fontSize: 18
    }
});

const Button = (props) => (
    <TouchableHighlight onPress={props.onPress}
                        style={[styles.container, props.style]}
                        underlayColor={'#68fffd'}>
        <Text style={styles.text}>
            {props.children}
        </Text>
    </TouchableHighlight>
);



export default Button;