import some from 'lodash/some';
import getOwnerHierarchy from './getOwnerHierarchy';

export default function isComponentInEvent(e, componentContext) {
    let targetHierarchy = getOwnerHierarchy(e._targetInst);
    return some(targetHierarchy, inst => inst === componentContext._reactInternalInstance);
}