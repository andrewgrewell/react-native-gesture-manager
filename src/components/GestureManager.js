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
        addGestureHandler: PropTypes.func,
        removeGestureHandler: PropTypes.func
    },

    getChildContext() {
        return {
            addGestureHandler: this.addHandler,
            removeGestureHandler: this.removeHandler
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
                case 'onStartShouldSetResponder': return this.isAnyTruthy(returnValues);
                case 'onStartShouldSetResponderCapture': return this.isAnyTruthy(returnValues);
            }
        }
    },

    isAnyTruthy(returnValues) {
        return some(returnValues, v => v);
    },

    addHandler(eventName, handler) {
        this.registeredHandlers[eventName].push(handler);
    },

    removeHandler(eventName, handlerToRemove) {
        let removeCount = 0;
        if (eventName && handlerToRemove) {
            let handlers = this.registeredHandlers[eventName];
            forEach(handlers, (handler, i) => {
                if (handlerToRemove === handler) {
                    handlers.splice(i, 1);
                    removeCount += 1;
                }
            });
        }
        return removeCount;
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