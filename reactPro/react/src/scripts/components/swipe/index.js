
import propTypes from "prop-types"

export default class Swipe extends Component{


    render(){

        let {
            id,
            children
        } = this.props
        // console.log(this.props);
        return (
            <div className="swiper-container" id={id} style={{height:"100%"}}>
                <div className="swiper-wrapper">
                    {
                        children&&children.map((child,i)=>{
                            return(
                                child
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    componentDidMount(){
        let {id,options} = this.props;
        let mySwiper = new Swiper("#" + id,options);
    }
}

Swipe.propTypes = {
    id:propTypes.string.isRequired,
    options:propTypes.object.isRequired,
}


// 静态属性  
Swipe.item  =  (props)=>{
    // console.log(props);  // this.props; 
    return (
        <div className="swiper-slide" >
            {props.children}
        </div>
    )
} 