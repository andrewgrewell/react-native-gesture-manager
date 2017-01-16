import React, { PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics'
import isFunction from 'lodash/isFunction';
import extend from 'lodash/extend';


export default function connectToGestureManager(mapProps) {
    return function provideGesture(Component) {
        const GestureProvider = React.createClass({

            contextTypes: {
                registerGestureHandler: PropTypes.func.isRequired
            },

            render() {
                let additionalProps = {
                    registerGestureHandler: this.context.registerGestureHandler
                };
                if (isFunction(mapProps)) {
                    additionalProps = extend(mapProps(this.props), additionalProps);
                }
                return (
                    <Component {...this.props} {...additionalProps} />
                );
            }

        });

        return hoistStatics(GestureProvider, Component);
    };
}
