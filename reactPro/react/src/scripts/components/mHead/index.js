
import { NavBar, Icon } from 'antd-mobile';

import "./index.scss"
import history from "@/utils/history"
export class MHead extends Component{

    goback(show){
        // console.log(this.context)
        if(show){
            history.go(-1);
        }
    }

    getMore=()=>{
        alert("666")
    }

    render(){   
        const {title,show} = this.props;

        return(
            <div className="head">
                <NavBar
                    mode="dark"
                    style={{backgroundColor:'black'}}
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.goback(show)}
                    rightContent={[
                        <Icon key="1" type="ellipsis" onClick={this.getMore}/>,
                      ]}
                >{title}</NavBar>
            </div>
        )
    }
}