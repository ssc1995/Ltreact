
import {MHead} from "@/scripts/components/mHead"
import {observer} from "mobx-react"
import collect from "@/scripts/mobxs/collect"
import {Toast,Button,WhiteSpace,WingBlank } from "antd-mobile"
import "./index.scss"
@observer
export class Collect extends Component{

    componentWillMount(){
        const mobile = sessionStorage.getItem("mobile");
        if(mobile){
            collect.getColls(mobile);
        }else{
            Toast.fail('亲,你还没有登录', 1)
        }
    }

    goDetail=(id)=>{
        this.props.history.push({pathname:`/detail/${id}`})
    }

    del=(id,i)=>{
        const {colls} = collect;
        colls.splice(i,1);
        collect.delColl(id);
    }



    render(){
        const {colls} = collect;
        return (
            <div style={{paddingTop:45}}>
                <MHead title="我的书架" show={true}></MHead>
                <ul>
                    {
                        colls.map((col,i)=>{
                            return(
                            <li key={i} className="col">
                                <WhiteSpace size="lg" />
                                <WingBlank size="md">
                                <img src={col.img} alt="" className="colimg" onClick={()=>this.goDetail(col.id)}/>
                                <div style={{float:'left',overflow:"hidden"}}>
                                    <p style={{fontSize:18,padding:"5px 10px"}}><b>{col.title}</b></p>
                                    <p style={{fontSize:13,paddingLeft:10}}>{col.tit}</p>
                                </div>
                                <Button style={{float:"right"}} type="ghost" inline size="small" onClick={()=>this.del(col.id,i)}>移除书籍</Button>
                                </WingBlank>
                            </li>
                            )
                        })
                    }
                </ul>
        </div>
        )
    }
}