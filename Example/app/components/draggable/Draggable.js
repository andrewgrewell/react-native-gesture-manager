import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';

import { isComponentInEvent } from '../../../src';


const Draggable = React.createClass({

    propTypes: {

    },

    contextTypes: {
        registerGestureHandler: PropTypes.func
    },

    componentWillMount() {
        this.context.registerGestureHandler('onStartShouldSetResponder', this.checkSetResponder);
        this.context.registerGestureHandler('onResponderMove', this.handleResponderMove);
        this.context.registerGestureHandler('onResponderRelease', this.onStopResponding);
    },

    checkSetResponder(e) {
        this.responding = isComponentInEvent(e, this);
        return this.responding;
    },

    handleResponderMove(e) {
        if (this.responding) {
            console.log('handle move', e);
        }
    },

    onStopResponding(e) {
        this.responding = false;
    },

    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(10, 200, 235)',
        width: 50,
        height: 50,
        borderRadius: 15
    }
});


export default Draggable;