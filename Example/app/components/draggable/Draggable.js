import React, { PropTypes } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { isComponentInEvent } from '../../../src';


const Draggable = React.createClass({

    contextTypes: {
        registerGestureHandler: PropTypes.func
    },

    getInitialState() {
        return {
            pan: new Animated.ValueXY({x: 0, y: 0 })
        };
    },

    componentWillMount() {
        this.context.registerGestureHandler('onStartShouldSetResponder', this.checkSetResponder);
        this.context.registerGestureHandler('onResponderMove', this.handleResponderMove);
        this.context.registerGestureHandler('onResponderRelease', this.onStopResponding);
    },

    checkSetResponder(e) {
        this.responding = isComponentInEvent(e, this);
        if (this.responding) {
            this.setLastPosition(e);
        }
        return this.responding;
    },

    handleResponderMove(e) {
        if (this.responding) {
            let positionDelta = this.getPositionDelta(e);
            console.log('handle move', positionDelta);
            this.state.pan.setValue(positionDelta);
        }
    },

    onStopResponding(e) {
        this.responding = false;
        Animated.spring(
            this.state.pan,
            {
                toValue: { x: 0, y: 0 },
                velocity: 15,
                friction: 5,
                tension: 15
            }
        ).start();
    },

    setLastPosition(e) {
        let { x, y } = this.getEventPosition(e);
        this.lastX = x;
        this.lastY = y;
    },

    getPositionDelta(e) {
        let { x, y } = this.getEventPosition(e);
        return {
            x: x - this.lastX,
            y: y - this.lastY
        };
    },

    getEventPosition(e) {
        return {
            x: e.nativeEvent.pageX,
            y: e.nativeEvent.pageY
        };
    },

    render() {
        return (
            <Animated.View style={[styles.container, this.props.style, this.state.pan.getLayout()]}>

            </Animated.View>
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