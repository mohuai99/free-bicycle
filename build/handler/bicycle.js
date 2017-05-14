const DB = require('../handerdb/db'),
    SQL = require('../handlerSql')


module.exports = {
    list(req, res) {
        // let { currpage = 1, pagesize = 10 } = req.query
        // currpage = parseInt(currpage, 10);
        // pagesize = parseInt(pagesize, 10);
        // (currpage - 1) * pagesize, pagesize
        DB.execSql(DB.getPool, SQL.bicycle.getListsSql(true), [], res)
    },
    add(req, res) {
        const body = req.body
        let args = []
        Object.keys(body).forEach((item) => {
            args.push(body[item])
        })
        DB.execSql(DB.getPool, SQL.bicycle.getAddSql(), args, res)
    },
    update(req, res) {
        const body = req.body
        let args = []
        Object.keys(body).forEach((item) => {
            args.push(body[item])
        })
        DB.execSql(DB.getPool, SQL.bicycle.getAddSql(), args, res)
    },
    hide(req, res) {
        const body = req.body
        let args = []
        Object.keys(body).forEach((item) => {
            args.push(body[item])
        })
        DB.execSql(DB.getPool, SQL.bicycle.getHideSql(), args, res)
    },
    query(req, res) {
        const { cartNumber } = req.query
        DB.execSql(DB.getPool, SQL.bicycle.getQuerySql(), [cartNumber], res)
    },
    total(req, res) {
        DB.execSql(DB.getPool, SQL.bicycle.getTotalSql(), [], res)
    }
}
