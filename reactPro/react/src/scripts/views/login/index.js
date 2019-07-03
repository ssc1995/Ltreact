
import {MHead} from "@/scripts/components/mHead"

import {List,InputItem,WhiteSpace,Button} from "antd-mobile"
import "./index.scss"

 export const mobileReg = /^1(3|5|7|8|9)\d{9}$/;
 export const codeReg = /\d{4}$/;
 import axios from "@/utils/axios"
 let timer = null;
 const bForceGet = true;
export class Login extends Component{

    state = {
        toggle:true,
        mobileDis:true,
        flag:true,
        count:120,
        txt:"获取验证码"
    }
    checkMobile=(mobile)=>{
        // console.log(mobile)
        if(this.state.flag){ //flag 控制输入框对input高亮的影响 false 为bottom 为false
            this.setState({
            mobileDis:!mobileReg.test(mobile),
            })
        }
    }

    startTime=()=>{
        timer=setInterval(()=>{
            if(this.state.count>0){
                this.setState({
                    count:--this.state.count,
                    txt:this.state.count+' s 后继续'
                })
            }else{
                clearInterval(timer);
                timer = null;
                this.setState({
                    txt:"获取验证码",
                    mobileDis:false,
                    flag:true,
                    count:60
                })
            }
        },1000)
    }

    getCode=()=>{

        axios.post("/react/sendCode",{
            mobile:this.refs.mobile.state.value,
        }).then(res=>{
            console.log(res);
        })

        this.setState({
            mobileDis:true,
            flag:false
        })
        // ajax 
        this.startTime();
    }

    checkCode = (val)=>{
        var mobile = this.refs.mobile.state.value;
        this.setState({
            toggle:!(codeReg.test(val)&&mobileReg.test(mobile))
        })
    }

    autoLogin=()=>{
        var mobile = this.refs.mobile.state.value;
        sessionStorage.setItem("mobile",mobile);
        var code = this.refs.code.state.value;

        axios.post("/react/testCode",{
            mobile,
            code
        }).then(res=>{
            // console.log(res);
            if(!!res.data.type){
                this.props.history.push("/app/mine");
                location.reload([bForceGet])
                var userInfo =  {
                    token:res.data.token
                }
                console.log(userInfo)
                sessionStorage.userInfo = JSON.stringify(userInfo) // 存token
            }else{
                delete sessionStorage['userInfo']
            }
        })
    }

    render(){
        const {
            toggle,
            mobileDis,
            txt
        } =this.state
        return(
            <div style={{marginTop:45}}>
                <MHead title="登录" show={true}></MHead>
                <div>
                <List>
                <WhiteSpace/>
                    <InputItem
                        type="tel"
                        placeholder="请输入手机号"
                        onChange={this.checkMobile}
                        ref="mobile"
                        clear
                    >手机号</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="tel"
                        placeholder="请输入验证码"
                        clear
                        ref="code"
                        onChange={this.checkCode}
                    >验证码</InputItem>
                    <Button className="l-btn" ref="btn" inline type="warning" onClick={this.getCode} disabled={mobileDis} > {txt}</Button>
                    <WhiteSpace/>
                    <Button type="primary" disabled={toggle} onClick={this.autoLogin}>马上登录</Button>
                    </List>
                    <div className="three">
                        <h2 className="h2">第三方登录</h2>
                        <div style={{overflow:"hidden"}}>
                            <div className="iconfont icon-QQ" style={{float:"left",margin:"50px 0 0 50px",fontSize:20,color:'red'}}>
                                <p>QQ登录</p>
                            </div>
                            <div className="iconfont icon-xiangmulan-weixinhao" style={{float:"right",margin:"50px 50px 0 0",fontSize:20,color:'red'}}>
                                <p>微信登录</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        )
    }
}