import React, { PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics'
import isObject from 'lodash/isObject';
import extend from 'lodash/extend';
import forEach from 'lodash/forEach';
import isString from 'lodash/isString';

// TODO: key added handlers to avoid removing the wrong handler in a remove call
export default function connectToGestureManager() {
    return function provideGesture(Component) {
        const GestureProvider = React.createClass({

            contextTypes: {
                addGestureHandler: PropTypes.func.isRequired,
                removeGestureHandler: PropTypes.func.isRequired
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
