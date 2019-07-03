

import "./index.scss";
import Swipe from "@/scripts/components/swipe"

const Item = Swipe.item;



export class Guide extends Component{
    state = {
        imgs:[
            require("@/assets/images/1.jpg"),
            require("@/assets/images/2.jpg"),
            require("@/assets/images/3.jpg"),
            require("@/assets/images/4.jpg"),
            require("@/assets/images/5.jpg"),
        ]
    }

    gotoApp(id){
        const {history} = this.props;
        if(id==this.state.imgs.length-1){
            history.push("/app/home");
        }
    }

    componentWillMount(){
        if(localStorage.pcount){
            localStorage.pcount++;
            if(localStorage.pcount>3){
                const {history} = this.props;
                history.push("/app/home");

            }   
        }else{
            localStorage.pcount=1
        }
    }




    render(){
        return(
            <div className="guidee"> 
                <Swipe id="guide" options={{loop:false}}>
                {
                    this.state.imgs.map((img,i)=>{
                        return(
                            <Item key={i} style={{height:"100%"}}>
                               <img src={img} alt="" className="img1" onClick={()=>this.gotoApp(i)}/> 
                            </Item>
                        )
                    })
                }
            </Swipe>
            </div>
        )
    }
}