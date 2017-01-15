import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';

import { TextField} from '../../../components';


const Form = () => (
    <View style={styles.container}>
        <TextField />
        <TextField />
    </View>
);


const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        minHeight: 50,
        alignSelf: 'stretch'
    }
});

export default Form;