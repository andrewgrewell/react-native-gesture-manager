import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 50,
        paddingHorizontal: 15,
        marginVertical: 5,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }
});

const TextField = (props) => (
    <TextInput {...props} style={styles.container}/>
);

TextField.propTypes = {};

TextField.displayName = 'TextField';


export default TextField;