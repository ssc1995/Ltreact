
import {Head} from "@/scripts/components/head"
import "./index.scss";
import {connect} from "react-redux";
import {getGoods,getAll} from "../../actions"
import history from "@/utils/history"


@connect(
    state=>{
        return{
            ...state.data
            
        }
    }
)
export class Classify extends Component{
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(getGoods({
            url:"/react/getGoods",
            params:{

            },
            cb(){}
        }))
    }
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(getAll({
            url:"/react/getAll",
            cb(){}
        }))
    }

    allgoods(good){
        // console.log(good);
        const {dispatch} = this.props;
        dispatch(getAll({
            url:"/react/getAll",
            params:{
                good
            },
            cb(){}
        }))
    }

    goDetail=(id)=>{

        history.push({pathname:`/detail/${id}`})
    }

    render(){
        const {goods,classify} = this.props;
        return(
            <div style={{padding:"45px 0",height:50}}>
                <Head title="分类"></Head>
               <div className="fen">
               <ul className="lei">
                    {
                        goods.map((good,i)=>{
                            return (
                                <li className="fenlei" key={i} onClick={()=>this.allgoods(good)}>
                                    <a className="dump" href="javascript:void(0)" >{good}</a>
                                </li>
                            )
                        })
                    }
                </ul>
                </div>
                <ul style={{backgroundColor:"snow",marginBottom:45}}>
                    {
                        classify.map((item,index)=>(
                        <li  key={index} style={{width:"100%"}}>
                            <img className="img2" src={item.img} alt="" onClick={()=>this.goDetail(item._id)}/>
                            <p style={{color:"black",margin:5,fontSize:14}}>标题: {item.title}</p>
                            {/* <p style={{color:"orange",margin:5,fontSize:12}}>作者: {item.tit}</p> */}
                            <p style={{color:"black",margin:5,fontSize:12}}>分类: {item.fenlei}</p>
                            {/* <p style={{color:"#aaa",margin:5}}>阅读量: {item.laud}</p> */}
                        </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}