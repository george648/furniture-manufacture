export function isEmpty (obj) {
    return Object.values(obj).some(element => !element.trim())
}
