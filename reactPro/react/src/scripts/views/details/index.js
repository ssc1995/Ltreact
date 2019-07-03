
import {MHead} from "@/scripts/components/mHead"
import {observer} from "mobx-react"
import "./index.scss"
import {Button,WingBlank,WhiteSpace ,Toast} from "antd-mobile"
import lists from "@/scripts/mobxs/list.js"

@observer
export class Detail extends Component{
    componentWillMount(){
        let {location} = this.props;
        let pathname = location.pathname;
        let id = pathname.split("/detail/")[1];
        lists.getList(id);
    }


    collect=()=>{
        let mobile = sessionStorage.getItem("mobile");
        let {location} = this.props;
        let pathname = location.pathname;
        let id = pathname.split("/detail/")[1];
        const {list} = lists;
        const {title,img,tit} = list;
        if(mobile){
            lists.setList(id,mobile,title,img,tit);
        }
        else{
            Toast.fail('亲,你还没有登录', 1)
        }
        
    }

    render(){
        const {
            list,
        } = lists

        return (           
            <div style={{padding:"45px 0"}}>
                <MHead title={list.title} show={true}></MHead>
                <div>
                    {/* <h2 style={{fontSize:20,textAlign:"center",padding:"10px 0",backgroundColor:'snow'}}>
                        <b><i style={{color:'orange'}}>{list.title}</i></b>
                    </h2> */}
                    <img className="detail" src={list.img} alt="" style={{width:"100%",height:250}}/>
                    <p style={{margin:"10px 10px",color:'orange',}}>作家: <b style={{fontSize:16,color:"red"}}>{list.tit}</b></p>
                    <p style={{margin:"10px 10px",color:'orange',}}>类型: <b style={{fontSize:16,color:"blue"}}>{list.fenlei}</b></p>
                    <p style={{fontSize:12,color:'orange',margin:"10px 10px"}}>人气: <b style={{fontSize:16,color:"lime"}}>{list.laud}</b></p>
                    <p style={{fontSize:14,color:'#DAA520',margin:"10px 5px 0 10px"}}>故事简介: <b style={{fontSize:14,color:"#aaa"}}>{list.text}</b></p>
                </div>
                <div style={{textAlign:"center"}}>
                    <h2 style={{fontSize:18,marginTop:20}}>全部章节</h2>
                </div>
                <div className="read">
                    <WingBlank/>
                    <WhiteSpace/>
                    <Button style={{marginLeft:40}} type="primary" inline>开始阅读</Button>
                    <Button style={{marginLeft:60}} type="warning" inline onClick={this.collect}>加入书架</Button>
                    <WhiteSpace/>
                </div>
            </div>
        )
    }
}