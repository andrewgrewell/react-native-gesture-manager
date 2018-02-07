import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import hoistStatics from 'hoist-non-react-statics'
import isObject from 'lodash/isObject';
import extend from 'lodash/extend';
import forEach from 'lodash/forEach';
import isString from 'lodash/isString';


export default function connectToGestureManager(handlerMap) {
    return function provideGesture(Component) {
        const GestureProvider = createReactClass({

            contextTypes: {
                addGestureHandler: PropTypes.func.isRequired,
                removeGestureHandler: PropTypes.func.isRequired
            },

            componentDidMount() {
                if (isObject(handlerMap)) {
                    forEach(handlerMap, (handler, eventName) => {
                        handler = isString(handler) ? this.component[handler] : handler;
                        this.context.addGestureHandler(eventName, handler);
                    });
                }
            },

            componentWillUnmount() {
                if (isObject(handlerMap)) {
                    forEach(handlerMap, (handler, eventName) => {
                        handler = isString(handler) ? this.component[handler] : handler;
                        this.context.removeGestureHandler(eventName, handler);
                    });
                }
            },

            setComponentRef(component) {
                this.component = component;
            },

            render() {
                let additionalProps = {
                    addGestureHandler: this.context.addGestureHandler,
                    removeGestureHandler: this.context.removeGestureHandler
                };
                return (
                    <Component ref={this.setComponentRef} {...this.props} {...additionalProps} />
                );
            }

        });

        return hoistStatics(GestureProvider, Component);
    };
}
