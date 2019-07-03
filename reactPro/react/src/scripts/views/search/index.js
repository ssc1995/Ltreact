

import {WhiteSpace,WingBlank,SearchBar,PullToRefresh} from "antd-mobile"
import {MHead} from "@/scripts/components/mHead"
import {connect} from "react-redux"
import {pollGood} from "../../actions"
import "./index.scss"
@connect(
    state=>{
        return{
            ...state.data
            
        }
    }
)
export class Search extends Component{

    state = {
        refreshing:false,
        down:true,  // 下拉 
    }


    componentWillMount(){
        const {dispatch} =this.props;
        dispatch(pollGood({
            url:"/react/pollGood",params:{
                
            },
            cb(){}
        }))
    } 
    change=()=>{
        let keyword = this.refs.one.state.value;
        const {dispatch} =this.props;
        dispatch(pollGood({
            url:"/react/pollGood",params:{
                keyword
            },
            cb(){}
        }))
        
    }

    changeAllGoods=()=>{
        this.props.poll.reverse();
    }
    render(){
        // console.log(this.props);
        const {poll} =this.props;
        return(
            <div style={{padding:"45px 0"}}>
                <MHead title="搜索" show={true}></MHead>
                <SearchBar placeholder="search" ref="one" onBlur={this.change} />
                <PullToRefresh
                        damping={50}
                        ref={() =>"loadmore"}
                        indicator={  { deactivate: '下拉刷新' }}
                        direction={  'down' }
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({ refreshing: true }); // 正在刷新
                            setTimeout(() => {
                              this.changeAllGoods();
                            this.setState({ refreshing: false });  // 刷新结束 
                            }, 1000);
                          }}
                    >
                    <ul style={{width:"100%",overflow:"hidden"}}>
                    {
                        poll.map((item,i)=>{
                            return (
                                <li key={i} style={{width:"50%",float:'left'}}>
                                    <img src={item.img} alt="" style={{width:'96%',height:200}} className="tp"/>
                                    <p style={{margin:"5px 10px",fontSize:15,color:"orange",}}>{item.title}</p>
                                    <p style={{margin:"5px 10px",fontSize:13,color:"gold",}}>作者:{item.author}</p>
                                </li>
                            )
                        })
                    }
                </ul>
                    </PullToRefresh>
                <WhiteSpace />
                
                
            </div>
        )
    }
}