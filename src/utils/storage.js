export default {
    getItem(key) {
        return JSON.parse(window.localStorage.getItem(key) || '[]')
    },
    setItem(key, item) {
        window.localStorage.setItem(key, JSON.stringify(item))
    }
}
