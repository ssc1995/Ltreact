

import "./index.scss"

import {Link,NavLink} from "react-router-dom"

import {Badge} from "antd-mobile"

export const foots =  [
    {txt:"最新",path:"/app/home",name:"home",icon:"icon-zuixin"},
    {txt:"分类",path:"/app/classify",name:"classify",icon:"icon-leimupinleifenleileibie--"},
    {txt:"社区",path:"/app/commun",name:"commun",icon:"icon-gengduo"},
    {txt:"我的",path:"/app/mine",name:"mine",icon:"icon-minefill"}
]

export class Foot extends Component{
    render(){
        return(
            <footer>
                {
                    foots.map((foot,i)=>{
                        return(
                            <div key={i}>
                                <NavLink activeClassName="nav-active" to={foot.path}>
                                <i className={"iconfont icon" + foot.icon} ></i>
                                <span> {foot.txt}</span>
                                {/* {i==2&&<Badge className="hot" text={8} style={{ marginLeft: 12 }}></Badge>} */}
                                </NavLink>
                            </div>
                        )
                    })
                }
            </footer>
        )
    }
}