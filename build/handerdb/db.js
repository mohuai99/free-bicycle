const mysql = require('mysql'),
    config = require('./dbconfig'),
    pool = mysql.createPool(config.localDb),
    poolSys = mysql.createPool(config.systemDb);

module.exports = {
    get getPool() {
        return pool;
    },
    get getSysPool() {
        return poolSys;
    },
    execSql: (pool, queryStr, args, res) => {
        // 使用连接
        pool.getConnection(function(err, connection) {
            if (!err) {
                // 使用连接执行查询
                connection.query(queryStr, args, function(err, rows) {
                    const result = { code: null, msg: null, data: null }
                    if (!err) {
                        result.code = 200
                        result.data = rows
                        res.status(200).send(JSON.stringify(result))
                    } else {
                        result.code = -1001
                        result.msg = err.message
                        res.status(500).send(JSON.stringify(result))
                    }
                    // 连接不再使用，返回到连接池
                    connection.release();
                });
            } else {
                console.log(err);
            }
        });
    },
    execSqlCallBack: (pool, queryStr, args, callback) => {
        pool.getConnection(function(err, connection) {
            if (!err) {
                connection.query(queryStr, args, function(err, rows) {
                    const result = { code: null, msg: null, data: null }
                    if (!err) {
                        result.code = 200
                        result.data = rows
                    } else {
                        result.code = -1001
                        result.msg = err.message
                    }
                    callback(JSON.stringify(result))
                    connection.release();
                });
            } else {
                console.log(err);
            }
        });
    }
}
