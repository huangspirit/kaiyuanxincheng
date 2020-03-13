<template>
    <div class="DeliveryCompany">
        <div style="display:flex;" class="orange">
            <p>优先选择：</p><ul class="list" v-if="defaultList.length" style="margin-top:0;">
                <template v-for="(item,k) in defaultList" >
                    <li :class="currentCode==item.code?'active':''" :key="k" @click="setItem(item,1)">{{item.name}}</li>
                </template>
                <li v-if="addSelf" :class="currentCode=='sjsh'?'active':''"  @click="setItem({name:'商家送货',code:'sjsh',id:0},1)">商家送货</li>
            </ul>
        </div>
        <div class="alphabet clear">
            <p v-for="(item,k) in alphabet" :key="k" :class="{'active':currentAlphabet==item}" @click="currentAlphabet=item">{{item}}</p>
        </div>
        <ul class="list" v-if="currentList.length" >
                <template v-for="(item,k) in currentList" >
                    <li :class="currentCode==item.code?'active':''" :key="k" @click="setItem(item)">{{item.name}}</li>
                </template>
        </ul>
    </div>
</template>
<style scoped lang="less">
    .DeliveryCompany{
        .alphabet{
            display: flex;
            width:100%;
            margin-top:10px;
            p{
                flex:1;
                background:#4a5a6a;
                color:#fff;
                text-align: center;
                margin-right:5px;
                line-height:28px;
                cursor: pointer;
                font-size:12px;
                &:hover{
                    color:peru;
                    font-weight:bolder;
                }
                &.active{
                    background: #0d94fb;
                    color:#fff;
                }
            }

        }
        .list{
            display:flex;
            margin-top:15px;
            li{
                padding:3px 10px;
                border:1px solid #e3e3e3;
                line-height:1;
                margin-right:8px;
                border-radius: 3px;
                cursor: pointer;
                &:hover{
                    color:#fff;
                    font-weight: bolder;
                    background: #0d94fb;
                }
                &.active{
                    color:#fff;
                    background:#0d94fb;
                }
            }
        }
    }
</style>
<script>
    import {mapActions} from 'vuex';
    export default {
        props:{
            addSelf:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                alphabet:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
                currentAlphabet:"",
                currentList:[],
                currentCode:"",
                defaultList:[],
            }
        },
        computed:{

        },
        watch:{
            currentAlphabet(val){
                this.getDeliveryCompany()
            }
        },
        mounted(){
            this.currentAlphabet="A";
            this.getdefault();
        },
        methods:{
            ...mapActions("Common",[
                "GetDeliveryCompany",
                "getDeliveryCompanyDefault"
            ]),
            getdefault(){
                this.getDeliveryCompanyDefault({start:0,length:10,is_default:true}).then(res=>{
                   
                    this.defaultList=res.data;
                })
            },
            setItem(item,mark){
                if(mark==1){
                    this.currentList=[]
                    this.currentAlphabet="0"
                }
                this.currentCode=item.code;
                this.$emit("handleCallBack",item)
            },
            getDeliveryCompany(){
                    //未请求过则不再请求
                    this.GetDeliveryCompany({"pfrixName":this.currentAlphabet.toLowerCase()}).then(res=>{
                        
                        this.currentList=res;
                    })

            }
        }
    }
</script>
