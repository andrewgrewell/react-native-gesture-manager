import React, { PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics'
import isObject from 'lodash/isObject';
import extend from 'lodash/extend';
import forEach from 'lodash/forEach';

// TODO: key added handlers to avoid removing the wrong handler in a remove call
export default function connectToGestureManager(handlerMap) {
    return function provideGesture(Component) {
        const GestureProvider = React.createClass({

            contextTypes: {
                addGestureHandler: PropTypes.func.isRequired,
                removeGestureHandler: PropTypes.func.isRequired
            },

            componentWillMount() {
                if (isObject(handlerMap)) {
                    forEach(handlerMap, (handler, eventName) => {
                        this.context.addGestureHandler(eventName, handler);
                    });
                }
            },

            componentWillUnmount() {
                if (isObject(handlerMap)) {
                    forEach(handlerMap, (handler, eventName) => {
                        this.context.removeGestureHandler(eventName, handler);
                    });
                }
            },

            render() {
                let additionalProps = {
                    addGestureHandler: this.context.addGestureHandler,
                    removeGestureHandler: this.context.removeGestureHandler
                };
                return (
                    <Component {...this.props} {...additionalProps} />
                );
            }

        });

        return hoistStatics(GestureProvider, Component);
    };
}
