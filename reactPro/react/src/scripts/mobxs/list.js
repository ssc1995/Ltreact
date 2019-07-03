
 // 获取小说详情 // 并加入书架
const Mobx = require("mobx");
const {observable, action, computed, autorun} =Mobx;
import axios from "@/utils/axios";

class Lists{
    @observable list = {};
    @observable count = 1000;

 
    @action getList = (id)=>{      
        axios.get("/react/getList",{
            params:{
                id
            }
        }).then(res=>{
            this.list = res.data.result;
        })
    }

    @action setList = (id,mobile,title,img,tit) =>{
        axios.get("/react/setList",{
            params:{
                id,mobile,title,img,tit
            }
        }).then(res=>{
            // console.log(res)
        })
    }
}


export default new Lists();