export default function isComponentInEvent(e, component) {
    let targetInstance = e._targetInst;
    while (targetInstance) {
        let componentType =  component.displayName;
        let targetType;
        if (targetInstance.type) {
            targetType = targetInstance.type.displayName;
        }
        if (componentType != null && (componentType === targetType)) {
            break;
        }
        targetInstance = targetInstance.return;
    }
    return !!targetInstance;
}
