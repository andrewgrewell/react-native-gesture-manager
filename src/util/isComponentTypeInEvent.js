import InspectorUtils from 'InspectorUtils';
import some from 'lodash/some';


export default function isComponentTypeInEvent(e, componentType) {
    let targetHierarchy = InspectorUtils.getOwnerHierarchy(e._targetInst);
    return some(targetHierarchy, inst => inst._currentElement.type === componentType);
}