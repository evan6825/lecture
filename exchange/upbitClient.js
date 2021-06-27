const request = require('request')
const { v4: uuidv4 } = require('uuid'); //npm install uuidv4 --save
const sign = require('jsonwebtoken').sign
const crypto = require('crypto')
const queryEncode = require("querystring").encode
const WebSocket = require('ws')

const access_key = "TEST_ACCESSKEY3"
const secret_key = "TEST_SECRET_KET"
const server_url = "http://127.0.0.1"
let _MARKETS_STATUS = {}; //가격 정보들을 저장
let _MY_BALANCE = {}; //blance값을 json으로 저장
let _CANDLES = {} //_MARKETS 에 들어가있는 코인들의 차트정보를 CANDLES에 저장
/*
{
    KRW-ETH : []
    KRW-BTC : []
}
*/

let _MARKETS = [ //차트를 볼수있는 코인
    "KRW-BTC"
    ,"KRW-ETH"
    ,"KRW-NEO"
    ,"KRW-MTL"
    ,"KRW-LTC"
    ,"KRW-XRP"
    ,"KRW-ETC"
    ,"KRW-OMG"
    ,"KRW-SNT"
    ,"KRW-WAVES"
    ,"KRW-XEM"
    ,"KRW-QTUM"
    ,"KRW-LSK"
    ,"KRW-STEEM"
    ,"KRW-XLM"
    ,"KRW-ARDR"
    ,"KRW-ARK"
    ,"KRW-STORJ"
    ,"KRW-GRS"
    ,"KRW-REP"
    ,"KRW-ADA"
    ,"KRW-SBD"
    ,"KRW-POWR"
    ,"KRW-BTG"
    ,"KRW-ICX"
    ,"KRW-EOS"
    ,"KRW-TRX"
    ,"KRW-SC"
    ,"KRW-ONT"
    ,"KRW-ZIL"
    ,"KRW-POLY"
    ,"KRW-ZRX"
    ,"KRW-LOOM"
    ,"KRW-BCH"
    ,"KRW-BAT"
    ,"KRW-IOST"
    ,"KRW-RFR"
    ,"KRW-CVC"
    ,"KRW-IQ"
    ,"KRW-IOTA"
    ,"KRW-MFT"
    ,"KRW-ONG"
    ,"KRW-GAS"
    ,"KRW-UPP"
    ,"KRW-ELF"
    ,"KRW-KNC"
    ,"KRW-BSV"
    ,"KRW-THETA"
    ,"KRW-QKC"
    ,"KRW-BTT"
    ,"KRW-MOC"
    ,"KRW-ENJ"
    ,"KRW-TFUEL"
    ,"KRW-MANA"
    ,"KRW-ANKR"
    ,"KRW-AERGO"
    ,"KRW-ATOM"
    ,"KRW-TT"
    ,"KRW-CRE"
    ,"KRW-MBL"
    ,"KRW-WAXP"
    ,"KRW-HBAR"
    ,"KRW-MED"
    ,"KRW-MLK"
    ,"KRW-STPT"
    ,"KRW-ORBS"
    ,"KRW-VET"
    ,"KRW-CHZ"
    ,"KRW-STMX"
    ,"KRW-DKA"
    ,"KRW-HIVE"
    ,"KRW-KAVA"
    ,"KRW-AHT"
    ,"KRW-LINK"
    ,"KRW-XTZ"
    ,"KRW-BORA"
    ,"KRW-JST"
    ,"KRW-CRO"
    ,"KRW-TON"
    ,"KRW-SXP"
    ,"KRW-HUNT"
    ,"KRW-PLA"
    ,"KRW-DOT"
    ,"KRW-SRM"
    ,"KRW-MVL"
    ,"KRW-STRAX"
    ,"KRW-AQT"
    ,"KRW-BCHA"
    ,"KRW-GLM"
    ,"KRW-SSX"
    ,"KRW-META"
    ,"KRW-FCT2"
    ,"KRW-CBK"
    ,"KRW-SAND"
    ,"KRW-HUM"
    ,"KRW-DOGE"
    ,"KRW-STRK"
    ,"KRW-PUNDIX"
    ,"KRW-FLOW"
    ,"KRW-DAWN"
    ,"KRW-AXS"
    ,"KRW-STX"]

let _CANDLES_MARKETS =[
    "KRW-BTC"
,"KRW-ETH"
,"KRW-NEO"
,"KRW-LTC"
,"KRW-XRP"
,"KRW-ETC"
,"KRW-XLM"
,"KRW-EOS"
,"KRW-BCH"
,"KRW-BTT"

]
const sleep = (ms) => { //sleep함수를 사용하기위한 기본값
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

async function getBalance(){ //
    const payload = {
        access_key: access_key,
        nonce: uuidv4(),
    }
    const token = sign(payload, secret_key)
    const options = {
        method: "GET",
        url: server_url + "/v1/accounts",
        headers: {Authorization: `Bearer ${token}`},
    }
    return new Promise(function(resolve, reject) {
        request(options, (error, response, body) => {
            if (error) reject();
            console.log(response.statusCode) 
            resolve(body)
        })
    });
}

//얼마너치살건지
async function API_buyImmediate(market,price){  // 구매할 토큰 / 가격이 입력되어야함
    const body = { //바디라는 객체에 코인,side? , 량,
        market: market, //사이트에서 받아오는 코인이름
        side: 'bid', //주문종류
        volume: null, //주문수량(우리는 krw가격에 맞춰서 구매하기 때문에 누락한다)
        price: price.toString(), //사이트에서 받아오는 price를 문자열로 변환후 저장
        ord_type: 'price',//주문타입? 시장가로 구매?
    }
    const query = queryEncode(body)
    const hash = crypto.createHash('sha512')
    const queryHash = hash.update(query, 'utf-8').digest('hex')
    const payload = {
        access_key: access_key,
        nonce: uuidv4(),
        query_hash: queryHash,
        query_hash_alg: 'SHA512',
    }
    const token = sign(payload, secret_key)
    const options = {
        method: "POST",
        url: server_url + "/v1/orders",
        headers: {Authorization: `Bearer ${token}`},
        json: body
    }
    return new Promise(function(resolve, reject) {
        request(options, (error, response, body) => {
            if (error) reject();
            console.log(response.statusCode) 
            resolve(body)
        })
    });
}

//몇개팔건지
async function API_sellImmediate(market, volume){
    const body = {
        market: market,
        side: 'ask',
        volume: volume.toString(),
        price: null,
        ord_type: 'market',
    }
    const query = queryEncode(body)
    const hash = crypto.createHash('sha512')
    const queryHash = hash.update(query, 'utf-8').digest('hex')
    const payload = {
        access_key: access_key,
        nonce: uuidv4(),
        query_hash: queryHash,
        query_hash_alg: 'SHA512',
    }
    const token = sign(payload, secret_key)
    const options = {
        method: "POST",
        url: server_url + "/v1/orders",
        headers: {Authorization: `Bearer ${token}`},
        json: body
    }
    return new Promise(function(resolve, reject) {
        request(options, (error, response, body) => {
            if (error) reject();
            console.log(response.statusCode) 
            resolve(body)
        })
    });
}


async function get_candles(market){
    url = 'https://api.upbit.com/v1/candles/minutes/240?market='+market+'&count=2';
    candles = await get(url)
    return JSON.parse(candles);
}

async function get(url){
    return new Promise(function(resolve, reject) {
        request(url, (error, response, body) => {
            if (error) reject();
            console.log(response.statusCode) 
            resolve(body)
        })
    });
}
async function getCandlesWHILE(){
    while(true){
        for(var i in _CANDLES_MARKETS){
            // await sleep(300)
            _CANDLES[i] = await get_candles(_CANDLES_MARKETS[i])
            console.log(_CANDLES)
        }
        await sleep(1000 * 60 * 10)
    }
}
getCandlesWHILE()

volume = {}
async function main(){
    // getCandlesWHILE();
    while(true){
        ////////////변동성돌파///////

        ret = await get("http://kali.securekim.com:3082/view"); // 사이트에서 정보 추출해서 가져와 ret에 보관
        // console.log(ret) // ret안에 정보를 찍어볼수 있다.
        retJSON = JSON.parse(ret); //ret 안에 정보값을 JSON파일로 변경하여 키 와 값으로 저장
        // console.log(retJSON)
        balance = await getBalance()  //get balnce
        for (var i in retJSON){ //for문을 통해서 retJSON[i] 배열안에 .rsiSignal 값을 rsiSignal에 저장
            market = i ;
            rsiSignal = retJSON[i].rsiSignal;
            //console.log(rsiSignal) // rsiSingal에 제대로 들어갔는지 확인
            if (rsiSignal == "SHORT" || rsiSignal == "LONG"){ //rsiSignal의 값이 long이나 biglong인 애들만 갑을 저장
                // console.log("!!!!BUY!!!! MARKET : "+ market);
                body = await API_buyImmediate(market,50000); //(market : 코인 , 얼마치 구매를할지)
                if(typeof volume[market] == "undefined"){ //구매된 코인의 개수가 증가할때 
                    volume[market] = body.volume;
                    console.log(market+"이(가)"+body.volume+"개 구매되었습니다.")
                } else {
                    volume[market] += body.volume
                    console.log(market+"이(가)"+body.volume+"개 구매되어서. 총"+volume[market]+"개가 구매되었습니다.")
                }
            }
            else if (rsiSignal == "SHORT" || rsiSignal == "BIGSHORT"){ //판매하는식
                let volume;
                    for(var i in balance){
                        if("KRW-" + balance[i].currency == market){
                            volume = balance[i].balance;
                        }
                    }
                }
                if(volume > 0){
                await API_sellImmediate(market, volume[market]);
                }
                else{
                    console.log("토큰이 없습니다.")
                }
            }


            await sleep(3000)
         }
        }
    
//////////////WEBSOCKET////////////



async function init(){
    orderbookWS(_MARKETS) //252
    for(var i in _MARKETS){
        _MARKETS_STATUS[_MARKETS[i]] = {
          "ask_price" : ""
          ,"ask_volume": ""
          ,"bid_price": ""
          ,"bid_volume": ""
          ,"realTimeStamp": ""
          ,"bid_power": ""
          ,"ask_power": ""
        }
       }
       balance = await getBalance()
       _MY_BALANCE = JSON.parse(balance);
       
       main();
}



function orderbookWS(markets){
    ticket = uuidv4()
    var ws = new WebSocket('wss://api.upbit.com/websocket/v1');
    ws.on('open', ()=>{
        ws.send('[{"ticket":"'+ticket+'"},{"type":"orderbook","codes":["'
        +markets.join('","')+'"]},{"format":"SIMPLE"}]')
    })
    ws.on('close', ()=>{
        setTimeout(function() {
            orderbookWS(markets);
        }, 1000);
    })
    ws.on('message', (data)=>{
        try {
            var str = data.toString('utf-8')
            var json = JSON.parse(str)
            market = json.cd
            market_state = json.market_state
            _MARKETS_STATUS[market].ask_price = json.obu[0].ap;  //최저 판매가. 시장가 매수가능가격
            _MARKETS_STATUS[market].ask_volume = json.obu[0].as; 
            _MARKETS_STATUS[market].bid_price = json.obu[0].bp; //최저 구매가. 시장가 매도가능가격
            _MARKETS_STATUS[market].bid_volume = json.obu[0].bs;
            timeStamp = new Date(json.tms).toLocaleString();
            _MARKETS_STATUS[market].realTimeStamp = timeStamp
        } catch (e) {
            //console.log(e)
        }
    })
}

// init()