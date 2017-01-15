import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';

import { TextField} from '../../../components';


const Form = () => (
    <View style={styles.container}>
        <TextField />
    </View>
);


const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        backgroundColor: 'rgba(244, 244, 244, 0.5)',
        minHeight: 50,
        alignSelf: 'stretch'
    }
});

export default Form;