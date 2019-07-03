
import { NavBar, Icon } from 'antd-mobile';

import "./index.scss"
import history from "@/utils/history"
export class Head extends Component{


    // goback(show){
    //     const {history}= this.context.props;
    //     // console.log(this.context)
    //     if(show){
    //         history.go(-1);
    //     }
    // }

    goSearch(){
        history.push("/search")
    }

    render(){   
        const {title} = this.props;

        return(
            <div className="head">
                <NavBar
                    mode="dark"
                    style={{backgroundColor:'black'}}
                    // icon={<Icon type="left"/>}
                    // onLeftClick={() => this.goback(show)}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={this.goSearch} />,
                    ]}
                >{title}</NavBar>
            </div>
        )
    }
}
