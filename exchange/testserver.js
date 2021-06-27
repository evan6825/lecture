var express     = require('express'),
http        = require('http');
app         = express();
bodyParser  = require ("body-parser")
const jwt = require('jsonwebtoken')
const config = require('./config/config.json')
const database = require('./mongodb.js')
const { v4: uuidv4 } = require('uuid');

let data = {};

var server = http.createServer(app);
server.listen(80); //1024 이하의 포트는 특정 cap 권한이 필요합니다.
//web 폴더 밑에 있는 파일들을 요청이 있을때 접근 가능하도록 합니다.
app.use(express.static(__dirname + '/web')); 
app.use(bodyParser.json());
app.get('/v1/accounts',(req,res)=>{
    let retJSON = verifyJWT(req)
    let accessKey = retJSON.accessKey
    if(typeof accessKey == "undefined") {
      res.statusCode = 400;   
      res.send({error:{"message" : ret.message, "name":"Access Key가 없어요."}})
      return;
    }
    console.log("[Server] /v1/accounts : "+accessKey)
    if(retJSON.result){
      res.statusCode = 200;
      res.send(_LOCAL_ALL_ACCOUNTS[accessKey].accounts)
    } else {
      res.statusCode = 401;
      message = "잘못된 엑세스 키입니다."
      database.saveErrorLog(accessKey, message)
      res.send({error:{"message" : message, "name":"invalid_access_key"}})
    }
})

app.post('/v1/orders',(req,res)=>{
    let retJSON = verifyJWT(req)
    let accessKey = retJSON.accessKey
    if(typeof accessKey == "undefined") {
      res.statusCode = 400;   
      res.send({error:{"message" : ret.message, "name":"Access Key가 없어요."}})
      return;
    }
      console.log("[Server] /v1/accounts : "+accessKey)
      if(retJSON.result){
         ret = order(req, accessKey)
         if(ret.result){
          io.sockets.emit('UPDATE_LOCAL_ALL_ACCOUNTS', _LOCAL_ALL_ACCOUNTS)
          res.send(ret.message)
         } else {
          res.statusCode = 400;   
          database.saveErrorLog(accessKey, ret.message)
          res.send({error:{"message" : ret.message, "name":"virtualUpbitServer"}})
         }
      } else {
        res.statusCode = 401;
        message = "잘못된 엑세스 키입니다."
        database.saveErrorLog(accessKey, message)
        res.send({error:{"message" : message, "name":"invalid_access_key"}})
      }
    
    
  })
  message = {
    market: 'KRW-BTT', //코인종류 string
    candle_date_time_kst: '2021-06-25T21:00:00', //캔들기준시각kst string
    opening_price: 2.8, //시가 Double
    high_price: 2.88,   //고가 Double
    low_price: 2.76,    //저가 Double
    candle_acc_trade_volume: 4419004917.223894, // Double
  }

