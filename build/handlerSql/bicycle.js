module.exports = {
    getListsSql(isAll) {
        const _sqlpage = `select id, carnumber, carpassword, date_format(create_on,'%Y-%m-%d') as time from tbl_bicycle order by id desc limit ?, ?`;
        const _sqlall = `select id, carnumber, carpassword, date_format(create_on,'%Y-%m-%d') as time from tbl_bicycle order by id desc`;
        return isAll ? _sqlall : _sqlpage;
    },
    getAddSql() {
        const _sql = `insert into tbl_bicycle (carnumber, carpassword) values (?, ?)`;
        return _sql;
    },
    getUpdateSql() {
        const _sql = `update tbl_bicycle set carnumber=?, carpassword=? where id=?`;
        return _sql;
    },
    getDeleteSql() {
        const _sql = `delete from tbl_bicycle where id=?`;
        return _sql;
    },
    getQuerySql() {
        const _sql = 'select id, carnumber, carpassword from tbl_bicycle where carnumber=? limit 1';
        return _sql;
    },
    getTotalSql() {
        const _sql = `select count(*) as total from tbl_bicycle`;
        return _sql;
    }
}
