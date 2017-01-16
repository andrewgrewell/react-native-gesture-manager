
export default function getOwnerHierarchy(instance) {
    var hierarchy = [];
    traverseOwnerTreeUp(hierarchy, instance);
    return hierarchy;
}

function traverseOwnerTreeUp(hierarchy, instance) {
    if (instance) {
        hierarchy.unshift(instance);
        traverseOwnerTreeUp(hierarchy, instance._currentElement._owner);
    }
}
