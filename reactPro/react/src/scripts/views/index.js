

import {HashRouter as Router,Route,Switch,Redirect} from "react-router-dom"
import { Guide } from "./guide";
import PropTypes from "prop-types";
import {App} from "./app"
import {Search} from "./search"
import {Login} from "./login"
import {Detail} from "./details"
import {Collect} from "./collect"
import {Special} from "./special"
import {More} from "./more"
export default class IndexViews extends Component{
    render(){
        return(
            // 根组件
            <Router>  
                <div>
                    <Route path="" exact component={Layout}></Route>
                </div>
            </Router>
        )
    }
}

export class Layout extends Component{

    getChildContext(){
        
        return {
            props:this.props
        }
    }
    render(){
        return(
            <div>
               <Switch>
                   <Route path="/guide" component={Guide}/>
                   <Route path="/app/" component={App}/>
                   <Route path="/search" component={Search}/>
                   <Route path="/login" component={Login}/>
                   <Route path="/detail" component={Detail}/>
                   <Route path="/collect" component={Collect}/>
                   <Route path="/special" component={Special}/>
                   <Route path="/more" component={More}/>
                   <Route render={
                        ()=>(<Redirect to="/guide"/>)
                    }/>
               </Switch>
            </div>
        )
    }
}

Layout.childContextTypes = { // 隔空传递数据
    props:PropTypes.object
}