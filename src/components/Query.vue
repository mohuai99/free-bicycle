<template>
  <div class="page">
    <el-row class="row">
        <el-col :span="20" :offset="2">
            <el-input type="number" placeholder="请输入单车编号" v-model.number="cartNumber" @focus="handleClear"></el-input>
        </el-col>
    </el-row>
    <el-row class="row">
        <el-col :span="20" :offset="2">
            <el-input type="number" placeholder="开锁密码" v-model.number="password"></el-input>
        </el-col>
    </el-row>
    <el-row class="row">
        <el-col :span="20" :offset="2" class="btn">
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button @click="handleAdd">添加</el-button>
        </el-col>
    </el-row>
  </div>
</template>

<script>
    import Storage from '../utils/storage'
    import * as types from '../store/mutation-types'
    export default {
        name: 'query',
        data() {
            return {
                password: '',
                cartNumber: '',
                historyList: []
            }
        },
        mounted(){
            this.historyList = Storage.getItem('wsq_free_bicycle_lists');
            this.$store.dispatch('getHistory', this.historyList)
        },
        methods: {
            handleQuery() {
                // 页面加载是先初始化获取用户localstorage 里面的历史记录并写进state
                // 查询时首先查询state 是否有该记录，有记录则使用 state 的数据返回
                // state 查询不到则继续查询数据库，然后把记录写入state 并存入用户的 localstorage
                const key = this.cartNumber;
                if(this.regNumber(key, true)){
                    debugger;
                    let record = this.queryFromHistoryList(key);
                    if(!record){
                        this.$store.dispatch('getQuery', key).then((result) => {
                            const { code, data } = result;
                            if(code === 200 && data.length > 0){
                                this.password = data[0]['carpassword'];
                            }else{
                                this.$message.error('系统暂无该数据！');
                            }
                        }).catch((result) => {
                            debugger;
                            this.$message.error(result.status +'  '+ result.statusText);
                        });
                    }else{
                        this.password = record.password;
                    }
                }else{
                    this.cartNumber = ''
                    this.$message.error('单车编号是 6-8 位数字');
                }
            },
            handleAdd() {
                const key = this.cartNumber;
                const pwd = this.password;
                if(!this.regNumber(key, true)){
                    this.$message.error('单车编号是 6-8 位数字');
                    return false;
                }

                if(!this.regNumber(pwd, false)){
                    this.$message.error('开锁密码是 4 位数字');
                    return false;
                }

                if(this.historyList.hasOwnProperty(key)){
                    this.$message.info('该记录已存在！');
                    return false;
                }

                
                this.$message.success('记录添加成功！');
            },
            handleClear() {
                this.cartNumber = '';
                this.password = '';
            },
            regNumber(val, isNum) {
                let reg = isNum ? new RegExp(/^\d{6,8}$/) : new RegExp(/^\d{4}$/);
                return reg.test(val);
            },
            queryFromHistoryList(key) {
                this.historyList = this.$store.getters.getHistoryLists;
                const record = this.historyList.find(item => {
                    return item.number == key;
                });
                return record;
            }
        }

    }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row{
    margin: 24px 0;
}

.btn {
    text-align: left;
}

</style>
