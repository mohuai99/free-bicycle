import Bicycle from '../../api/bicycle'
import Storage from '../../utils/storage'
import * as types from '../mutation-types'

// initial state
const state = {
    all: [],
    history: []
}

// getters
const getters = {
    getAllLists: state => state.all,
    getHistoryLists: state => state.history,
}

// actions
const actions = {
    getQuery({ commit }, cartNumber) {
        return new Promise(function(resolve, reject) {
            Bicycle.queryPassword(cartNumber).then(result => {
                const { code, data } = result;
                if (code === 200 && data.length > 0) {
                    commit(types.CART_QUERY_HISTORY, result.data);
                }
                resolve(result);
            }).catch(result => {
                reject(result);
            })
        });
    },
    getHistory({ commit }, lists) {
        commit(types.CART_INIT_HISTORY, lists);
    },
    isExist({}, cartNumber) {
        return new Promise((resolve, reject) => {
            Bicycle.queryPassword(cartNumber).then(result => {
                const { code, data } = result;
                if (code === 200 && data.length > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(result => {
                reject(result);
            })
        });
    },
    addRecord({ commit }, item) {
        return new Promise((resolve, reject) => {
            Bicycle.insert(item).then(result => {
                const { code, data } = result;
                item.id = data.insertId;
                if (code === 200 && data.affectedRows > 0) {
                    commit(types.ADD_CART_NUMBER, item);
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(result => {
                reject(result);
            })
        });
    }
}

// mutations
const mutations = {
    [types.CART_QUERY_HISTORY](state, data) {
        const { carnumber, carpassword } = data[0];
        const record = state.history.find(item => item.number === carnumber);
        if (!record) {
            state.history.push({
                number: carnumber,
                password: carpassword,
                quantity: 1
            })
        } else {
            record.quantity++
        }
        // 写入 localstorage
        Storage.setItem('wsq_free_bicycle_lists', state.history);
    },
    [types.CART_INIT_HISTORY](state, list) {
        state.history = list;
    },
    [types.ADD_CART_NUMBER](state, data) {
        state.all.push(data);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
