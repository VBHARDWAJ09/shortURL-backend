const filterKeysFromArray = (objects, keys) => {
    return objects.map(object => {
        const newObj = {}
        keys.forEach(key => {
            if (object[key]) {
                newObj[key] = object[key]
            }
        });
        return newObj;
    })
}

module.exports = { filterKeysFromArray }