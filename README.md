# react-native-gesture-manager
The GestureManager is a high level component meant to be rendered at the root of the app.
Easily add handlers for any of the View gesture hooks. The motivation for making this was to have a high
level component that could be used to close the keyboard when the user pressed outside an input.

#### Note about using helpers
There are some helpers `isComponentInEvent` and `isInstanceInEvent` that use internal React information to traverse the
instances involved with a touch event. **this is not stable** and could break with each React Native upgrade, use them at your own risk.
When using `isComponentInEvent` the component must have a `displayName` property in order to be able to identify it. If it does not
you will get unexpected results.

#### Running example
```bash
git clone git@github.com:andrewgrewell/react-native-gesture-manager.git
cd react-native-gesture-manager
cd Example
npm install
react-native run-ios #or react-native run-android
```

## Installation
```bash
npm install --save react-native-gesture-manager
```

## Usage
below shows how to close the keyboard any time the user presses outside an input element.

```
...
import { TextInput } from 'react-native';
import GestureManager, { isComponentTypeInEvent } from 'react-native-gesture-manager';

const App = React.createClass({

    checkCloseKeyboard(e) {
        // if a TextInput is not in the hierarchy of the event, close the keyboard
        if (!isComponentTypeInEvent(e, TextInput)) {
            Keyboard.dismiss();
        }
    },

    render() {
        return (
            <GestureManager style={styles.container}
                            onStartShouldSetResponderCapture={this.checkCloseKeyboard}>
                <HomeScene />
            </GestureManager>
        );
    }
});
```

##API
* `GestureManager` - Component for handling gestures
  * `context.addGestureHandler(eventName, handler)` - add a handler for a gesture event
  * `context.removeGestureHandler(eventName, handler)` - remove a handler
  
* `isInstanceInEvent(event, instanceContext)` - check if a given component instance is present in the event hierarchy
* `isComponentInEvent(event, component)` - check if a given component is in the event hierarchy (requires component.displayName to be present)
* `connectComponentToGesture(handlerMap)(Component)` - wraps a component in a higher order component that provides `addGestureHandler` and `removeGestureHandler` on props. You can also pass in a map with keys of event names and values of handler functions or handler names. if the handler is a string it will look for a function set on the component by that name
