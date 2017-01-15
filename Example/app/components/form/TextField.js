import React, { PropTypes } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';


const TextField = React.createClass({

    propTypes: {},

    render() {
        return <TextInput style={styles.container} />
    }
});

const styles = StyleSheet.create({
    container: {
        height: 50,
        paddingHorizontal: 15,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }
});


export default TextField;