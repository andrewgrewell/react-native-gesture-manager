import React, { PropTypes } from 'react';
import { View } from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';
import extend from 'lodash/extend';
import reduce from 'lodash/reduce';
import isBoolean from 'lodash/isBoolean';
import map from 'lodash/map';
import some from 'lodash/some';

const GESTURE_EVENTS = [
    'onStartShouldSetResponder',
    'onStartShouldSetResponderCapture',
    'onMoveShouldSetResponder',
    'onMoveShouldSetResponderCapture',
    'onResponderGrant',
    'onResponderMove',
    'onResponderReject',
    'onResponderRelease',
    'onResponderTerminate',
    'onResponderTerminationRequest'
];

const GESTURE_EVENT_PROP_TYPES = reduce(GESTURE_EVENTS, (result, eventName) => {
    result[eventName] = PropTypes.func;
    return result;
}, {});


const GestureManager = React.createClass({

    propTypes: extend({

    }, GESTURE_EVENT_PROP_TYPES),

    childContextTypes: {
        registerGestureHandler: PropTypes.func
    },

    getChildContext() {
        return {
            registerGestureHandler: this.registerHandler
        };
    },

    componentWillMount() {
        this.registeredHandlers = reduce(GESTURE_EVENTS, (result, eventName) => {
            result[eventName] = this.props[eventName] ? [this.props[eventName]] : [];
            return result;
        }, {});

        this.viewResponderHandlers = reduce(GESTURE_EVENTS, (result, eventName) => {
            result[eventName] = (e) => this.handleGesture(eventName, e);
            return result;
        }, {});
    },

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    },

    handleGesture(eventName, e) {
        let handlers = this.registeredHandlers[eventName];
        if (handlers.length) {
            let returnValues = map(handlers, handler => handler(e));
            switch (eventName) {
                case 'onStartShouldSetResponder': return some(returnValues, v => v);
            }
        }
    },

    registerHandler(eventName, handler) {
        this.registeredHandlers[eventName].push(handler);
    },

    render() {
        return (
            <View style={this.props.style} {...this.viewResponderHandlers}
                  onResponderGrant={() => console.log('responding...')}>
                {this.props.children}
            </View>
        );
    }
});


export default GestureManager;