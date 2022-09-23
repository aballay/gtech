export default class HelperControllers{
    static isFirstTime = (pAttr) => {
        if (typeof pAttr === 'number') {
            return true
        }
        return false
    }
}