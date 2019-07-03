import {MHead} from "@/scripts/components/mHead"
import {observer} from "mobx-react"
import "./index.scss"
import manys from "@/scripts/mobxs/more"
@observer
export class More extends Component{

    componentWillMount(){
        manys.getMore();
    }
    render(){
        const {muchs} = manys;
        return (
            <div style={{paddingTop:45}}>
                <MHead title="排行榜" show={true}></MHead>
                <ul>
                    {
                        muchs.map((much,i)=>{
                            return (
                            <li key={i} style={{backgroundColor:'snow'}}>
                                <div>
                                    <h2 style={{color:'red',fontSize:25,margin:'10px 0 10px 10px',textAlign:"center"}}>
                                        <b>{much.bang}</b>
                                    </h2>
                                    <div style={{overflow:"hidden",marginLeft:10}}>
                                        <img className="dh" src={much.img} alt="" style={{width:'45%',height:200,float:'left'}}/>
                                        <div style={{width:'50%',float:"right"}}>
                                            <p style={{fontSize:17}}><b>{much.title1}</b></p>
                                            <p style={{color:"red",fontSize:16,margin:"7px 0"}}>作者:{much.author}</p>
                                            <span style={{color:"blue",fontSize:15}}>类型:{much.labels}</span>&nbsp;
                                            <span style={{color:"blue",fontSize:10}}>{much.labels1}</span>
                                            <p style={{margin:"7px 0",fontSize:15}}>简介:{much.description}</p>
                                            <p style={{color:"orange",fontSize:20}}>最新更新:{much.new}</p>
                                        </div>
                                    </div>
                                    <p style={{fontSize:18,padding:'10px 0 10px 10px'}}>
                                        <i>2.{much.title2}</i>&nbsp;&nbsp;&nbsp;
                                        <span style={{color:"orange",fontSize:14}}>{much.author1}</span>
                                    </p>       
                                    <p style={{fontSize:18,padding:'10px 0 10px 10px'}}>
                                        <i>3.{much.title3}</i>&nbsp;&nbsp;&nbsp;
                                        <span style={{color:"orange",fontSize:14}}>{much.author2}</span>
                                    </p>
                                    <p style={{fontSize:18,padding:'10px 0 10px 10px'}}>
                                        <i>4.{much.title4}</i>&nbsp;&nbsp;&nbsp;
                                        <span style={{color:"orange",fontSize:14}}>{much.author3}</span>
                                    </p>
                                    <p style={{fontSize:18,padding:'10px 0 10px 10px'}}>
                                        <i>5.{much.title5}</i>&nbsp;&nbsp;&nbsp;
                                        <span style={{color:"orange",fontSize:14}}>{much.author4}</span>
                                    </p>  
                                    <p style={{fontSize:18,padding:'10px 0 10px 10px'}}>
                                        <i>6.{much.title6}</i>&nbsp;&nbsp;&nbsp;
                                        <span style={{color:"orange",fontSize:14}}>{much.author5}</span>
                                    </p>
                                    <p style={{fontSize:18,padding:'10px 0 10px 10px'}}>
                                        <i>7.{much.title7}</i>&nbsp;&nbsp;&nbsp;
                                        <span style={{color:"orange",fontSize:14}}>{much.author6}</span>
                                    </p>  
                                    <p style={{fontSize:18,padding:'10px 0 10px 10px'}}>
                                        <i>8.{much.title8}</i>&nbsp;&nbsp;&nbsp;
                                        <span style={{color:"orange",fontSize:14}}>{much.author7}</span>
                                    </p>
                                    <p style={{fontSize:18,padding:'10px 0 10px 10px'}}>
                                        <i>9.{much.title9}</i>&nbsp;&nbsp;&nbsp;
                                        <span style={{color:"orange",fontSize:14}}>{much.author8}</span>
                                    </p>
                                    <p style={{fontSize:18,padding:'10px 0 20px 10px'}}>
                                        <i>10.{much.title10}</i>&nbsp;&nbsp;&nbsp;
                                        <span style={{color:"orange",fontSize:14}}>{much.author9}</span>
                                    </p>       
                                </div>   
                            </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}