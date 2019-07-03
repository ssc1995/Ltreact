

import {Route,Switch,Redirect} from "react-router-dom"
import "./index.scss";

import {Home} from "../home"
import {Commun} from "../commun"
import {Mine} from "../mine"
import {Classify} from "../classify"
import {MFoot} from "@/scripts/components/mFoot"

export class App extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route path="/app/home" component={Home}/>
                    <Route path="/app/commun" component={Commun}/>
                    <Route path="/app/mine" component={Mine}/>
                    <Route path="/app/classify" component={Classify}/>
                    <Route render={
                        ()=>(<Redirect to="/app/home"/>)
                    }/>
                </Switch>
                <MFoot></MFoot>
            </div>
        )
    }
}