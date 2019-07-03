
import {MHead} from "@/scripts/components/mHead"
import "./index.scss";
import {WingBlank,WhiteSpace} from "antd-mobile"
export class Special extends Component{

    state={
        imags:[
            {path:require("@/assets/images/220.jpg"),txt:"故事的主角岩谷尚文是一名 20 岁的大二学生，在图书馆无意间发现了一本《四圣武器书》结果被召唤到了一个异世界当中，还莫名其妙的就成为了「盾之勇..."},
            {path:require("@/assets/images/221.jpg"),txt:"晚唐年间，国师发动民众大量捕蛇。前去刺杀国师的白蛇意外失忆，被捕蛇村少年救下。为帮助少女找回..."},
            {path:require("@/assets/images/222.jpg"),txt:"《一拳超人》的第二季动画将于2019年四月播出。按照原漫画的改编，一拳系列也将迎来KING篇，吹雪篇以及饿狼篇的剧情！"},
            {path:require("@/assets/images/223.jpg"),txt:"《你的名字》是由新海诚执导，由神木隆之介、上白石萌音担任主要配音的一部原创日本动画电影。作品于2016年8月26日在日本上映..."},
            {path:require("@/assets/images/224.jpg"),txt:"2019年5月7日 - 《全职高手》是蝴蝶蓝连载于起点中文网的网游小说。书名取自主角叶修是荣耀网游全职业精通的“全职高手..."},
            {path:require("@/assets/images/225.jpg"),txt:"《魔法的禁书目录》是日本小说家镰池和马执笔、插画师灰村清孝负责插画的轻小说系列，也是原作者镰池和马的出道作品... "}
        ]
    }
    render(){
        const {imags}= this.state;
        return (
            <div style={{margin:"45px 0"}}>
                <MHead title="专题" show={true}></MHead>
                <div>
                    <ul>
                        {
                            imags.map((img,i)=>{
                                return (
                                    <li key={i} style={{overflow:"hidden"}}>
                                        <WhiteSpace size="lg"/>
                                        <WingBlank size="md">
                                        <img src={img.path} alt=""  className="img3"/>
                                        <p className="wz">
                                            <b>
                                                {img.txt}
                                            </b>
                                        </p>
                                        </WingBlank>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}