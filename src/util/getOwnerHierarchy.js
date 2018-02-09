export default function getOwnerHierarchy(instance) {
    let hierarchy = [];
    addInstanceToHierarchy(hierarchy, instance);
    return hierarchy;
}

function addInstanceToHierarchy(hierarchy, instance) {
    if (instance) {
        hierarchy.unshift(instance);
        addInstanceToHierarchy(hierarchy, instance._debugOwner);
    }
}
