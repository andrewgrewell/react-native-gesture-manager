import InspectorUtils from 'InspectorUtils';
import some from 'lodash/some';


export default function isComponentInEvent(e, componentContext) {
    let targetHierarchy = InspectorUtils.getOwnerHierarchy(e._targetInst);
    return some(targetHierarchy, inst => inst === componentContext._reactInternalInstance);
}