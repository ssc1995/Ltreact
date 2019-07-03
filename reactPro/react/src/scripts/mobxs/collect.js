
 // 获取 收藏到书架的数据
const Mobx = require("mobx");
const {observable, action, computed, autorun} =Mobx;
import axios from "@/utils/axios";
class Collect {
    
    @observable colls=[];
    // 获取收藏信息
    @action getColls=(mobile)=>{
        axios.get("/react/getColls",{
            params:{
                mobile
            }
        }).then(res=>{
            this.colls=res.data.result;
        })
    }
    // 删除数据
    @action delColl=(id)=>{
        axios.get('/react/delColl',{
            params:{
                id
            }
        }).then(res=>{
            // console.log(res)
        })
    }
}

export default new Collect();