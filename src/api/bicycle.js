import Vue from 'vue'
const vue = new Vue();

export default {
    queryPassword(cartNumber) {
        const url = '/api/bicycle/query?cartNumber=' + cartNumber;
        return new Promise((resolve, reject) => {
            vue.$http.get(url).then((response) => {
                const { body: result } = response;
                resolve(result);
            }).catch((response) => {
                reject(response);
            });
        });
    }
}
