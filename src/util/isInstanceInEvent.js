export default function isInstanceInEvent(e, instance) {
    let targetInstance = e._targetInst;
    while (targetInstance) {
        if (targetInstance.stateNode === instance) {
            break;
        }
        targetInstance = targetInstance.return;
    }
    return !!targetInstance;
}
