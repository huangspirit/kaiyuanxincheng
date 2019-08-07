<template>
    <div class="wrap">
        <ul v-if="list.length">
            <li v-for="(item,k ) in list" class="item">
                <div class="title">
                    <span class="fr time">{{item.messageTime | formatDate}}</span>
                    <h3>询价通知</h3>
                </div>
                <div class="cont clear">
                    <p class="fl mes">{{item.message}}</p>
                    <p class="del fr"><img src="@/assets/image/public/dele.png" alt="" @click="delEvent(k)"></p>
                    <!--                <p>您购买的商品{{item.parameter.goodsName}}（阿加¥500）卖家已发货，请注意物流状态</p>-->
<!--                    <p class="fr btn"><a>点击查看详情 >></a></p>-->
                </div>
            </li>
        </ul>
        <IndexPagination
            v-if="total>pageSize"
            @changecallback="handleCurrentChange"
            :pageIndex.sync="currentPage"
            :pageSize="pageSize"
            :total="total">
        </IndexPagination>
        <div class="nocontent" v-if="list.length==0">暂无消息通知</div>
    </div>

</template>
<script>
    import { TimeForma2 } from "@/lib/utils";
    import {axios,message} from "../../../api/apiObj";
    export default {
        name:'dg',
        data(){
            return{
                currentPage:1,
                pageSize:10,
                list:[],
                total:0
            }
        },
        mounted(){
            this.init();
        },
        computed:{
            start(){
                return (this.currentPage-1)*this.pageSize
            }
        },
        filters:{
            formatDate(value) {
                return TimeForma2(value);
            },
        },
        methods:{
            handleCurrentChange(x){
                this.currentPage=x;
                this.init();
            },
            init(){
                let obj = {
                    tag:'inquiry',
                    start:this.start,
                    length:this.pageSize
                }
                axios.request({...message.queryUserMessageList,params:obj}).then(res=>{
                    this.list=res.data.data.map(item=>{
                        item.parameter=JSON.parse(item.parameter)
                        return item;
                    });
                   this.total=res.data.total;

                })
            },
            delEvent(k){
                axios.request({...message.deleteMessage,params:{id:this.list[k].id,uid:this.list[k].uid}}).then(res=>{
                    this.init();
                })
            }
        }

    }
</script>
<style lang="less" scoped>
.wrap{
    position:relative;
    min-height:400px;
    .nocontent{
        text-align: center;
        font-size:18px;
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        color:#a6a6a6;
    }
    .item{
        color:rgba(102,102,102,1);
        margin-top:64px;
        line-height:1;
        .title{
            .time{
                color:rgba(153,153,153,1);
                font-size:16px;
            }
            h3{
                font-weight:600;
                font-size:24px;
                margin-bottom:28px;
            }
        }
        .cont{
            font-size:18px;
            display:flex;
            justify-items: end;
            .mes{
                width:90%;
                line-height:1.4;
            }
            .del{
                height: 100%;
                position: relative;
                text-align: right;
                flex:1;
                img{
                    cursor: pointer;
                }
            }
            .btn{
                height: 100%;
                position: relative;
                text-align: right;
                flex:1;
                a{
                    font-size:18px;
                    color:#009FF5;
                    /*position: absolute;*/
                    /*bottom:0;*/
                    /*right:0;*/
                    /*white-space: nowrap;*/
                }
            }
        }
    }
}
</style>
