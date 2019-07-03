
import {Head} from "@/scripts/components/head"
import "./index.scss";
import {observer} from "mobx-react"
import muns from "@/scripts/mobxs/mun"
import {WhiteSpace,WingBlank,InputItem,Button,Toast} from "antd-mobile"

const bForceGet = true;
@observer
export class Commun extends Component{

    componentWillMount(){
        muns.getMuns();
    }

    componentDidMount(){
        muns.getComment();
    }

    addCom=(id)=>{
        let title = document.getElementById('inp').value;
        let mobile = sessionStorage.getItem("mobile");
        if(!title==""&&mobile){
            muns.addComment(title,mobile,id);
            location.reload([bForceGet]);
        }else{
            Toast.fail('未输入内容或未登录', 1);
        }
        
    }


    render(){
        // const {communs,comments} = muns;
        return(
        <div style={{padding:"45px 0"}}>
            <Head title="社区"></Head>
            <ul>
                {
                    muns.communs.map((mun,i)=>{
                        return (
                            <li key={i} style={{width:"100%",backgroundColor:"#E0FFFF",margin:"10px 0"}}>
                                <WhiteSpace size="lg" />
                                <WingBlank size="md">
                                    <p className="iconfont icon-gangqinbiaoqian" style={{color:"red",fontSize:18}}>
                                        <b style={{color:'black',fontSize:20}}>{mun.title}(*╹▽╹*)</b>
                                    </p>
                                    <img src={mun.img} alt="" style={{width:"100%",height:250}}/>
                                    <div style={{overflow:"hidden"}}>
                                        <p style={{float:"left",margin:"5px 0",color:'#00FF00'}} className="iconfont icon-fabushijian">
                                            <i style={{color:'black'}}>{mun.date}</i>
                                        </p>
                                        <p className="iconfont icon-pinglun" style={{color:"#A52A2A",float:'right',margin:"5px 10px"}}>
                                            <span style={{color:'black'}}>{mun.comment}</span>
                                        </p>
                                        <p className="iconfont icon-dianzan2" style={{color:"#FFC125",float:'right',margin:"5px 10px"}}>
                                            <span style={{color:'black'}}>{mun.count}</span>
                                        </p>
                                    </div>
                                    {
                                        muns.comments.map((comment,index)=>{
                                            return (
                                               <p key={index}>
                                                   <b style={{fontSize:15}}>{comment.mobile}: <span>{comment.title}</span></b>
                                               </p> 
                                            )
                                        })
                                    }
                                    <div style={{overflow:'hidden'}}>
                                    <InputItem
                                    type="text"
                                    placeholder="请输入评论"
                                    id="inp"
                                    clear
                                    >
                                    </InputItem>   
                                    <Button inline type="warning" size='small' style={{float:'right',margin:5}} onClick={()=>this.addCom(mun._id)}>提交</Button>
                                    </div>
                                <WhiteSpace size="lg" />
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