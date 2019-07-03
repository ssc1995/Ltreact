
import { Carousel ,NoticeBar} from "antd-mobile"
import "./index.scss";
import {connect} from "react-redux"
import {Head} from "@/scripts/components/head"
import {getManga} from "../../actions"
import history from "@/utils/history"
@connect(
    state=>{
        return{
            ...state.data
            
        }
    }
)
export class Home extends Component{
    state = {
        imgs:[
            require("@/assets/images/21.jpg"),
            require("@/assets/images/22.jpg"),
            require("@/assets/images/23.jpg"),
            require("@/assets/images/24.jpg"),
        ],   
        imgHeight: 200,
        // manga:[]
      }

      componentWillMount(){
        const {dispatch} = this.props;
        dispatch(getManga({
            url:"/react/manga",
            params:{
                // limit:5
            },
            cb(){}
        }))
        
    }

    goDetail=(id)=>{
        history.push({pathname:`/detail/${id}`})
    }

    goMore(){
        history.push("/more")
    }



   render(){
    //    console.log(this.props)
       const {manga} = this.props;
       return(
           <div style={{marginTop:45}}>
                <Head title="最新"></Head>
                <NoticeBar style={{color:"black"}} mode="closable" marqueeProps={{ loop: true, style: { height:50,margin: '0 7.5px' } }}>
                烟花烟花漫天飞，我为谁妩媚？不过是醉眼看花，花也醉。流沙流沙漫天飞，我为谁憔悴？不过是缘来缘散，缘如水
                </NoticeBar>
                <Carousel
                autoplay={true}
                infinite={true}
                >
                {this.state.imgs.map((val,i) => (
                    <a
                    key={i}
                    href="#/special"
                    style={{ display: 'inline-block',
                    width: '100%',
                    height: this.state.imgHeight,
                }}
                    >
                    <img
                        src={val}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                        window.dispatchEvent(new Event('resize'));
                        this.setState({ imgHeight: 'auto' });
                        }}
                    />
                    </a>
                ))}
                </Carousel>
                <ul className="lf">
                    <li className="iconfont icon-gangqinbiaoqian one" onClick={this.goMore}>
                        <p className="yc">原创</p>
                    </li>
                    <li className="iconfont icon-paihangbang one" onClick={this.goMore}>
                    <p className="yc">排行榜</p>
                    </li>
                    <li className="iconfont icon-pc-qingxiaoshuo one" onClick={this.goMore}>
                    <p className="yc">轻小说</p>
                    </li>
                    <li className="iconfont icon-dujia one" onClick={this.goMore}>
                    <p className="yc">独家</p>
                    </li>
                </ul>
                <div style={{backgroundColor:"snow",paddingBottom:50}}>
                    <h2 className="iconfont icon-deng-" style={{fontSize:15,padding:10,color:"black"}}>最新连载(*╹▽╹*)</h2>
                    <ul style={{overflow:'hidden'}}>
                        {
                            manga.map((item,index)=>(
                            <li  key={index} style={{float:"left",width:"33.33%",height:180}}>
                                <img src={item.img} alt="" style={{width:'92%',margin:"auto",height:130}} className="img1" onClick={()=>this.goDetail(item._id)}/>
                                <p style={{color:"black",margin:5,fontSize:12}}>标题: {item.title}</p>
                                <p style={{color:"#black",margin:5}}>阅读量: {item.laud}</p>
                            </li>
                            ))
                        }
                    </ul>
                </div>
           </div>
       )
   }
}