
import axios from  "@/utils/axios"

export const getManga = ({url,cb})=>{
    return axios.get(url,{
        
    }).then(res=>{
        // console.log(res);
        cb();
        return {
            type:"getManga",
            manga:res.data.result
        }
    })
}


export const getGoods = ({url,cb})=>{
    return axios.get(url,{

    }).then(res=>{
        // console.log(res);
        cb();
        return {
            type:"getGoods",
            goods:res.data.result
        }
    })
}

export const getAll = ({url,params,cb})=>{
    return axios.get(url,{params  
    }).then(res=>{
        // console.log(res);
        cb();
        return {
            type:"getAll",
            classify:res.data.result
        }
    })
}

export const pollGood = ({url,params,cb})=>{
    return axios.get(url,{
        params
    }).then(res=>{
        cb();
        return {
            type:"pollGood",
            poll:res.data.result
        }
    })
}

export const setList = ({url,params})=>{
    return axios.get(url,{
        params
    }).then(res=>{
        return {
            type:'setList'
        }
    })
}