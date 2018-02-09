import getOwnerHierarchy from './getOwnerHierarchy';
import some from 'lodash/some';


export default function isComponentTypeInEvent(e, componentType) {
    let targetHierarchy = getOwnerHierarchy(e._targetInst);
    return some(targetHierarchy, inst => inst.type === componentType.name);
}