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
                commit(types.CART_QUERY_HISTORY, result.data);
                resolve(result);
            }).catch(result => {
                reject(result);
            })
        });
    },
    getHistory({ commit }, lists) {
        commit(types.CART_INIT_HISTORY, lists);
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
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
