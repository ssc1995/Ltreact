
import {foots} from "../foot";
import "./index.scss";
import { TabBar } from 'antd-mobile'

export class MFoot extends Component{
    state = {
        selectedTab: 'home',
      };

      componentWillMount(){  // 刷新 默认到当前页
          const {location,history} = this.context.props;
          let name = location.pathname.split("/app/")[1];
            this.setState({
                selectedTab:name
            })
      }



    render(){
        return(
            <div className="footer">
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="black"
                    >
                    {
                        foots.map((foot,i)=>{
                            return(
                    <TabBar.Item
                        title={foot.txt}
                        key={i}
                        icon={<i 
                        className={"icon iconfont "+foot.icon}
                        style={{
                        width: '22px',
                        height: '22px',
                        display:"block",
                             }}
                        />
                        }
                        selectedIcon={<i 
                        className={"icon iconfont "+foot.icon}
                        style={{
                        width: '22px',
                        height: '22px',
                        display:"block",
                             }}
                        />
                        }
                        selected={this.state.selectedTab === foot.name}
                        onPress={() => {
                            // console.log(this.context);
                            const {history} = this.context.props;
                        this.setState({
                            selectedTab: foot.name,
                        });
                            history.push(foot.path)
                        }}
                        data-seed="logId"
                    >
                </TabBar.Item>
                            )
                        })
                    }
                </TabBar>
            </div>
        )
    }
}

import PropTypes from "prop-types"
MFoot.contextTypes ={
    props:PropTypes.object
}