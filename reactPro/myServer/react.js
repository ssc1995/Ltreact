// vue 项目接口  路由模板

 var express = require("express");
 var router = express.Router();
 var {conn} = require("./utils/db");
 var {setError,aesEncrypt,aesDecrypt,keys} = require("./utils");
 var {ObjectID}  = require("mongodb");
 var {waterfall} = require("async");
 var util = require('./config/index.js');

 router.get("/",(req,res)=>{
     res.send("这是 react 项目接口");
 })

 // 首页图片路由
 router.get('/manga',(req,res)=>{
     conn((err,db)=>{
         setError(err,res,db);
         db.collection("manga").find({},{}).toArray((err,result)=>{
            setError(err,res,db);
            res.json({
                msg:"",
                code:200,
                result
            });
            db.close();
         })
     })
 })


 //分类路由
router.get("/getGoods",(req,res)=>{
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("manga").distinct("fenlei",(err,result)=>{
            setError(err,res,db);
            res.json({
                code:200,
                msg:"",
                type:1,
                result
            })
            db.close();
        })
    })
})

// 分类图片路由
router.get("/getAll",(req,res)=>{
    var good = req.query.good ||"奇幻";
    // console.log(good);
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("manga").find({fenlei:good},{}).toArray((err,result)=>{
            setError(err,res,db);
            res.json({
                msg:"",
                code:200,
                result
            })
            db.close()
        })
    })
})

//  详情页数据
router.get("/getList",(req,res)=>{
    var id = req.query.id;
    // console.log(id)
    var obj={}
    if(id){
        obj._id = ObjectID(id);
    }
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("manga").findOne(obj,(err,result)=>{
            setError(err,res,db);
            res.json({
                msg:"",
                code:200,
                result
            })
            db.close()
        })
    })
})

// search 页模糊查询
router.get("/pollGood",(req,res)=>{
    var query = req.query;
    var keyword = query.keyword || "";
    var obj={}; 
    if(keyword){
        obj = {
            $or:[
                {title:new RegExp(keyword)},
                {author:new RegExp(keyword)}
            ]
        }
    }
    conn((err,db)=>{
        setError(err,res,db);
        db.collection('xinxi').find(obj,{}).toArray((err,result)=>{
            setError(err,res,db);
            res.json({
                msg:"",
                code:200,
                result
            })
            db.close()
        })
    })
})



// 存入书架信息
router.get("/setList",(req,res)=>{
    let query = req.query;
    // console.log(query);
    let {mobile,id,title,img,tit} = query;
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("collect").findOne({id,mobile},(err,result)=>{
            if(result) {
                res.json({
                    msg:'已经添加过了',
                    code:201
                })
            }else{
                setError(err,res,db);
                db.collection("collect").insert({mobile,id,title,img,tit},(err,result)=>{
                    setError(err,res,db);
                    res.json({
                        msg:"",
                        code:200
                    })
                })
            }
            db.close();
        })
    })
})
 // 根据手机号获取收藏信息
router.get("/getColls",(req,res)=>{
    let mobile =req.query.mobile;
    // console.log(mobile)
    conn((err,db)=>{
        setError(err,res,db);
        db.collection('collect').find({mobile},{}).toArray((err,result)=>{
            setError(err,res,db);
            res.json({
                msg:"",
                code:200,
                result
            })
            db.close()
        })
    })
})

// 删除 收藏书籍
router.get("/delColl",(req,res)=>{
    let id =req.query.id;
    // console.log(id)
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("collect").deleteOne({id},(err,result)=>{
            setError(err,res,db);
            res.json({
                msg:"移除书籍成功",
                code:200
            })
            db.close();
        })
    })
})

// 社区信息路由信息
router.get("/getMuns",(req,res)=>{
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("commun").find({},{}).toArray((err,result)=>{
            setError(err,res,db);
            res.json({
                msg:"",
                code:200,
                type:1,
                result
            })
            db.close()
        })
    })
})

// 添加评论信息
router.get("/addComment",(req,res)=>{
    const query = req.query;
    let title = query.title;
    let mobile = query.mobile;
    let id = query.id;
    // console.log(query)
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("content").insert({mobile,title,id},(err,result)=>{
            setError(err,res,db);
            res.json({
                msg:"",
                code:200,
                type:1
            })
            db.close();
        })
    })

})

//获取评论信息
router.get("/getComment",(req,res)=>{
    // console.log(res)
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("content").find({},{}).toArray((err,result)=>{
            setError(err,res,db);
            res.json({
                msg:"",
                code:200,
                type:1,
                result
            })
            db.close();
        })
    })

})

// 排行榜 
router.get("/getMore",(req,res)=>{
    // console.log(res)
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("mores").find({},{}).toArray((err,result)=>{
            setError(err,res,db);
            res.json({
                msg:"获取排行榜",
                code:200,
                type:1,
                result
            })
            db.close();
        })
    })

})



const multer = require('multer');
var storage = multer.diskStorage({
    //将上传的文件存储在指定的位置（不存在的话需要手动创建）
    destination: function (req, file, cb) {
        cb(null, './public/avatar')
    },
    //将上传的文件做名称的更改
    filename: function (req, file, cb) {
        var fileformat = (file.originalname).split('.');
        console.log(file);
        cb(null, Date.now()+file.originalname);
    }
})
//创建multer对象
var upload = multer({ storage: storage })
const avatarUpload = upload.any();
// 头像上传 
router.post("/upload-avatar",avatarUpload,(req,res)=>{
    console.log(req.files);
    
    var newName = req.files[0].path;
    console.log(newName);

    var mobile =req.body.mobile
    console.log(mobile);
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("codes").update({
            mobile
        },{
            $set:{
                avatar:newName
            }
        },(err,result)=>{
            res.json({msg:"图片上传成功",code:200,imgUrl:newName});
            db.close();
        })
    })
})




//获取头像
router.get("/getTp",(req,res)=>{
    var mobile=req.query.mobile;
    console.log(mobile)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection("codes").findOne({mobile},(err,result)=>{
            setError(err,res,db);
            if(result){
                res.json({
                    code:200,
                    msg:"头像获取成功",
                    type:1,
                    result
                })
            }else{
                res.json({
                    code:200,
                    msg:"请您上传头像",
                    tupe:0,
                    result
                })
            }
        })
    })
 })





 // 获取短信验证码
 function getCode(){
    return 1000 + Math.floor(Math.random()*9000); // 获取随机四位数
}

router.post('/sendCode', function(req, res, next) {
    console.log(req.body);
    const mobile = req.body.mobile; //需要发送的号码
     var param = getCode(); //变量内容

    if (mobile == '') {
        res.json({
            msg:"手机号不能为空",
            code:200,
            type:0
        })
    }else{
        //云之讯发送验证码到手机
        util.getResult(param, mobile).then(function(response) {
            console.log(response.data);
            console.log(response.data.code);
            if (response.data.code == '000000') {
                conn((err,db)=>{
                    setError(err,res,db);
                    let codes = db.collection('codes');
                    // 数据库 判断验证码是否存在 
                    // 验证码不存在 直接插入
                    // 发送的验证码相同  改变插入时间 

                    waterfall([
                        (callback)=>{
                            codes.findOne({mobile,code:param},(err,result)=>{
                                callback(err,result);
                            })
                        },
                        (args,callback)=>{
                            if(args){
                                // 修改数据 时间
                                let time = new Date().getTime();
                                codes.update({
                                    mobile,
                                    code:param
                                },{
                                    $set:{
                                        time
                                    }
                                },(err,result)=>{
                                    callback(err,result);
                                })
                            }else{
                                codes.insert({
                                    mobile,
                                    code:param,
                                    time:new Date().getTime()
                                },(err,result)=>{
                                    callback(err,result);
                                })
                            }
                        }
                    ],(err,result)=>{
                        setError(err,res,db);
                        res.json({
                            msg:"验证码发送成功",
                            result:param,
                            code:200
                        })
                    })
                })
            } else {
                res.json({
                    msg:"发送验正码失败",
                    code:200,
                    type:0
                })
            }
    
        }, function(err) {
            res.json({
                msg:"云之讯数据库错误",
                code:200,
                type:0
            })
        })
    }
});


router.post("/testCode",(req,res)=>{
    var mobile = req.body.mobile; // 手机号
    var code = req.body.code * 1; // 验证码
    
    conn((err,db)=>{
        setError(err,res,db);
        var codes = db.collection("codes");

        codes.findOne({mobile,code},(err,result)=>{
            setError(err,res,db);
            if(result){
                var time = new Date().getTime();
                var alias = mobile + "wh1901" + code ;
                var token = aesEncrypt(alias,keys); // 设置token 
                req.session.token = token; // 存token
                if(time-result.time<180*1000){ // 过期时间
                    res.json({
                        code:200,
                        msg:"验证码通过",
                        type:1,
                        token
                    })
                }else{
                    res.json({
                        code:200,
                        msg:"验证码失效",
                        type:0,
                    })
                }
            }else{
                res.json({
                    msg:"验证码不匹配",
                    code:200,
                    type:0
                })
            }
        })

    })

})
 module.exports = router;