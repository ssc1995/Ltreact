
// 获取社区数据
const Mobx = require("mobx");
const {observable, action, computed, autorun} =Mobx;
import axios from "@/utils/axios";

class Muns {
    @observable communs=[];
    @observable comments=[];

    @action getMuns=()=>{
        axios.get("/react/getMuns",{

        }).then(res=>{
            // console.log(res)
            this.communs = res.data.result;
        })
    }

    @action addComment=(title,mobile,id)=>{
        axios.get("/react/addComment",{
            params:{
                title,
                mobile,
                id
            }
        }).then(res=>{
            // console.log(res);
        })
    }

    @action getComment=()=>{
        axios.get("/react/getComment",{

        }).then(res=>{
            // console.log(res);
            this.comments=res.data.result;
        })
    }


}



export default new Muns();