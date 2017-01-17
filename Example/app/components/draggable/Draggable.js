import React, { PropTypes } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { isComponentInEvent, connectToGestureManager } from 'react-native-gesture-manager';


const Draggable = React.createClass({

    getInitialState() {
        return {
            pan: new Animated.ValueXY({x: 0, y: 0 })
        };
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


export default connectToGestureManager({
    onStartShouldSetResponder: 'checkSetResponder',
    onResponderMove: 'handleResponderMove',
    onResponderRelease: 'onStopResponding'
})(Draggable);