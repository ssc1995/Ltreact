
import {Head} from "@/scripts/components/head"
import axios from "@/utils/axios";
import "./index.scss";
import {Button,WhiteSpace,Icon,WingBlank,Toast} from "antd-mobile"
 

const bg = {
    width:"100%",
    // height:100,
    background: `url(${require("@/assets/images/02.jpg")})`,
    backgroundSize:"100% 100%",
    display:'inline-block',
    textAlign:"center"  
}

const bag = {
    width:"100%",
    // height:100,
    background: `url(${require("@/assets/images/2.gif")})`,
    backgroundSize:"100% 100%", 
}


const bForceGet = true;

export class Mine extends Component{

    state={
        imgUrl:""
    }

    componentWillMount(){
        if (sessionStorage.mobile) {
            var mobile = sessionStorage.mobile;
            const instance = axios.create({
                withCredentials: true
            })
            instance.get('/react/getTp', {
                params: {
                    mobile
                }
            }).then(res => {
                // console.log(res)
                this.setState({
                    // userImg: res.data.result.avatar.replace(/public/, 'http://localhost:1901'),
                    userImg: res.data.result.avatar.replace(/public/, 'http://47.102.144.188:1902'),
                })
                localStorage.userTp = JSON.stringify({ avatar: res.data.result.avatar });
            })
        } else {
            // Toast.fail("请您登录后再修改头像", 1)
        }
    }



    goLogin=()=>{
        let userInfo =sessionStorage.getItem('userInfo');
        const {history} = this.props;
        if(userInfo){  
            // history.push("/mine");
        }
        else{
           history.push("/login")
        }    
    }

    change=()=>{
        delete sessionStorage['userInfo'];
        delete sessionStorage['mobile'];
        // const {history} = this.props;
        location.reload([bForceGet])
    }

    goCollect=()=>{
        const {history} = this.props;
        history.push("/collect")
    }

     //换头像
     onChange = (e) => {
        console.log("换头像")
        let $target = e.target || e.srcElement
        let file = $target.files[0];
        if (sessionStorage.mobile) {
            let data = new FormData();    // 构建表单数据对象  
            data.append('avatar', file);  // 需要上传到 服务器 的数据
            data.append('mobile', sessionStorage.mobile);
            const instance = axios.create({
                withCredentials: true
            })
            instance.post('/react/upload-avatar', data).then(res => {
                console.log(res)
                this.setState({
                    // userImg: res.data.imgUrl.replace(/public/, 'http://localhost:1901')
                    userImg: res.data.imgUrl.replace(/public/, 'http://47.102.144.188:1902')
                })
                localStorage.userTp = JSON.stringify({ avatar: res.data.imgUrl });
                console.log(localStorage.userTp)
            })
        } else {
            Toast.fail("请您登录后再修改头像", 1)
        }

    };

    goMore=()=>{
        const {history} = this.props;
        history.push("/more")
    }
    
    



    render(){
        let userInfo =sessionStorage.getItem('userInfo');
        let mobile = sessionStorage.getItem("mobile");

        return(
            <div style={{padding:"45px 0",height:'100%'}}>
                <Head title="个人中心" show={true}></Head>
                <div style={bg}>
                    <p onClick={this.goLogin} style={{fontSize:18,color:"lime",fontWeight:900,margin:"10px 0"}}>{userInfo?"欢迎用户"+mobile:"马上登录"}</p>               
                    {/* <img src={require("@/assets/images/30.jpg")} alt="" className="tp1"/> */}
                    <div className="upload-container">
                        <input type="file" name="image" className='headerInput' onChange={this.onChange} />
                        <h3 >
                            <img src={this.state.userImg} alt="" id='userHeader' className='headerImg' style={{ borderRadius: '50%' }} />
                        </h3>
                    </div>
                    <p style={{fontSize:16,padding:"10px 0",color:"red",fontWeight:900}}><b>更换头像</b></p>
                </div>
                <div style={bag}>
                    <p className="iconfont icon-chengweihuiyuan" style={{fontWeight:900,padding:'10px 10px',color:'orange'}}>开通会员</p>
                    <p className="iconfont icon-pc-qingxiaoshuo" style={{fontWeight:900,padding:'10px 10px',color:'orange'}} onClick={this.goCollect}>我的书架</p>
                    <p className="iconfont icon-lishijilu" style={{fontWeight:900,padding:'10px 10px',color:'orange'}}>历史记录</p>
                    <p className="iconfont icon-wodeshoucang" style={{fontWeight:900,padding:'10px 10px',color:'orange'}}>我的收藏</p>
                    <p className="iconfont icon-xiaoxitongzhi" style={{fontWeight:900,padding:'10px 10px',color:'orange'}}>消息通知</p>
                    <p className="iconfont icon-paihangbang" style={{fontWeight:900,padding:'10px 10px',color:'orange'}} onClick={this.goMore}>排行榜</p>
                    <p className="iconfont icon-yijianfankui" style={{fontWeight:900,padding:'10px 10px',color:'orange'}}>意见反馈</p>
                    <p className="iconfont icon-shezhi" style={{fontWeight:900,padding:'10px 10px',color:'orange'}}>设置</p>
                </div>
                <WhiteSpace/>
                <WingBlank>
                <Button type="warning" onClick={this.change}>退出</Button>
                </WingBlank>
            </div>
        )
    }
}