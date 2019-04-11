export const isSame = (a: any, b: any) => a === b;

export const isEqual = (a: any, b: any) => {
    if (isSame(a, b)) {
        return true;
    }

    if (typeof a !== "object" || typeof b !== "object") {
        return false;
    }

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
        return false;
    }

    return aKeys.every(key => b.hasOwnProperty(key) && a[key] === b[key]);
};
