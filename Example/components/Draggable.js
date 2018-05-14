import React, { PropTypes } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { isInstanceInEvent, connectToGestureManager } from 'react-native-gesture-manager';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(10, 200, 235)',
        width: 50,
        height: 50,
        borderRadius: 15
    }
});

class Draggable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY({ x: 0, y: 0 })
        };

        this.checkSetResponder = this.checkSetResponder.bind(this);
        this.handleResponderMove = this.handleResponderMove.bind(this);
        this.onStopResponding = this.onStopResponding.bind(this);
        this.setLastPosition = this.setLastPosition.bind(this);
        this.getPositionDelta = this.getPositionDelta.bind(this);
        this.getEventPosition = this.getEventPosition.bind(this);
        this.getTransformStyle = this.getTransformStyle.bind(this);
    }

    checkSetResponder(e) {
        this.responding = isInstanceInEvent(e, this);
        if (this.responding) {
            this.setLastPosition(e);
        }
        return this.responding;
    }

    handleResponderMove(e) {
        if (this.responding) {
            let positionDelta = this.getPositionDelta(e);
            this.state.pan.setValue(positionDelta);
        }
    }

    onStopResponding(e) {
        this.responding = false;
        Animated.spring(
            this.state.pan,
            {
                toValue: { x: 0, y: 0 },
                velocity: 15,
                friction: 5,
                tension: 15,
                useNativeDriver: true
            }
        ).start();
    }

    setLastPosition(e) {
        let { x, y } = this.getEventPosition(e);
        this.lastX = x;
        this.lastY = y;
    }

    getPositionDelta(e) {
        let { x, y } = this.getEventPosition(e);
        return {
            x: x - this.lastX,
            y: y - this.lastY
        };
    }

    getEventPosition(e) {
        return {
            x: e.nativeEvent.pageX,
            y: e.nativeEvent.pageY
        };
    }

    getTransformStyle() {
        return {
            transform: this.state.pan.getTranslateTransform()
        };
    }

    render() {
        return <Animated.View style={[styles.container, this.props.style, this.getTransformStyle()]}/>
    }
}


export default connectToGestureManager({
    onStartShouldSetResponder: 'checkSetResponder',
    onResponderMove: 'handleResponderMove',
    onResponderRelease: 'onStopResponding'
})(Draggable);