
//原创 排行榜 的接口
const Mobx = require("mobx");
const {observable, action, computed, autorun} =Mobx;
import axios from "@/utils/axios";

class Manys{
    @observable muchs=[];
    @observable num=10;

    @action getMore=()=>{
        axios.get("/react/getMore",{

        }).then(res=>{
            console.log(res);
            this.muchs = res.data.result;
        })
    }
}

export default new Manys();