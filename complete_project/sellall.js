const request = require('request')
const { v4: uuidv4 } = require('uuid'); //npm install uuidv4 --save
const sign = require('jsonwebtoken').sign
const crypto = require('crypto')
const queryEncode = require("querystring").encode
const str = 'a\nb\nc\n';
let _CANDLES_MARKETS =[
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
    ,"KRW-STX"
]
let _CANDLES = {}
const access_key = "evan6825"
const secret_key = "lPRnRdGckqpi85uUdCV1xDNU+GOg/2t8PYRWkHwX8gQ="
const server_url = "http://ubuntu.securekim.com"


const sleep = (ms) => { //sleep함수를 사용하기위한 기본값
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
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
async function getBalance(){
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
async function API_buyImmediate(market, price){ 
    const body = {
        market: market,
        side: 'bid',
        volume: null,
        price: price.toString(),
        ord_type: 'price',
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
async function get_candles(market){ // 캔들정보를 가져오는 함수
    url = 'https://api.upbit.com/v1/candles/minutes/5?market='+market+'&count=2'
    candles = await get(url)
    return JSON.parse(candles);
}


async function getCandlesWHILE(){ //캔들정보를 5초마다 가져오는함수
     while(true){
        for(var i in _CANDLES_MARKETS){
            await sleep(250)
            _CANDLES[i] = await get_candles(_CANDLES_MARKETS[i])
            // console.log(_CANDLES[i])
            
        }
        console.log("캔들정보 끝 !")
        await sleep(10000*6)

     }
    
}

async function buyWHILE_CANDLE(){ // 변동성전략을 이용한 구매하는 함수
    while(true){
        await sleep(1000*10)
        if(Object.keys(_CANDLES).length < _CANDLES_MARKETS.length) continue; //캔들의 갯수에 맞춰서 불러지면 실행   
        for (var i in _CANDLES){
            market = _CANDLES[i][0].market//코인종류 string
            candle_date_time_kst = _CANDLES[i][1].candle_date_time_kst//캔들기준시각kst string
            close_price = parseFloat(_CANDLES[i][1].trade_price)//종가 Double
            high_price =  parseFloat(_CANDLES[i][1].high_price)//고가 Double
            low_price =   _CANDLES[i][1].low_price//저가 Double
            price = _CANDLES[i][0].trade_price//현재가격
            current_high_price = parseFloat(_CANDLES[i][0].high_price)
            // console.log(market) // 10개의 코인이 제대로 찍히는 확인
            target_price = close_price+(high_price-low_price)*0.8//목표가  //원래는 0.5지만 단타를 위해 수정
            console.log(_CANDLES[i][0].market) // 목표가 제대로 되었는지 확인
            console.log(target_price+"목표가를 갱신했습니다.")
            console.log(price+"현재가")
            console.log(close_price+"이전종가")
                // console.log(target_price)
                // console.log(candle_date_time_kst)
                // console.log(price)
            if (target_price<price){
                // body = await API_buyImmediate("KRW-ETH", 2000000);   // 정상 구매 
                // console.log("이더리움구매완료?")
                body = await API_buyImmediate(market,1000000)
                if(typeof volume[market] == "undefined"){ //구매된 코인의 개수가 증가할때 
                    volume[market] = body.volume;
                    console.log(market+"이(가)"+body.volume+"개 구매되었습니다.")
                } else {
                    volume[market] += body.volume
                    console.log(market+"이(가)"+body.volume+"개 구매되어서. 총"+volume[market]+"개가 구매되었습니다.")
                }
            
            }
            
        }
        await sleep(1000*30)
    }    
}
volume = {} // 볼륨이 들어갈 공간을 만들어준다
async function SellWHILE_CANDLE(){
    balance = await getBalance()  //get balnce
    balance = JSON.parse(balance)
    while(true){
        await sleep(1000*10)  
        for (var i in _CANDLES){
            market = _CANDLES[i][0].market//코인종류 string
            candle_date_time_kst = _CANDLES[i][1].candle_date_time_kst//캔들기준시각kst string
            close_price = parseFloat(_CANDLES[i][1].trade_price)//종가 Double
            high_price =  parseFloat(_CANDLES[i][1].high_price)//고가 Double
            low_price =   _CANDLES[i][1].low_price//저가 Double
            price = _CANDLES[i][0].trade_price//현재가격
            current_high_price = parseFloat(_CANDLES[i][0].high_price)
            // console.log(market) // 10개의 코인이 제대로 찍히는 확인
            target_price = close_price+(high_price-low_price)*0.8//목표가  //원래는 0.5지만 단타를 위해 수정
            // console.log(_CANDLES[i][0].market) // 목표가 제대로 되었는지 확인
            // console.log(target_price+"목표가를 갱신했습니다.")
            // console.log(price+"현재가")
            // console.log(close_price+"이전종가")
            if(close_price > price){ // 현재 가격이 떨어진다면 그 즉시 판매 상승장에서 하락장 조짐이 보이면 판매 //내가 느끼기엔 이게 정답이다 
        //else if(high_price*0.98>price){//1시간전 고가에 -2퍼를 한 가격이 현재 가격보다 높으면 판매를 한다.
        // else if (low_price>price){//코인 단타칠때 손절라인을 빠르게 잡아서 손해를 보지않는다
            //고민이 된다... 이걸 현재 캔들로 할지 이전캔들로할지 의문이 든다.
            //계산을 해보니 상승할때는 조금 손해를 보고 팔게되고 하락장에서는 더 많은 손해를 볼수있다.
            for(var i in balance){ //현재 내 지갑에 있는 정보를 가져온다.
                if("KRW-" + balance[i].currency == market){
                    volume = balance[i].balance; //
                }
                // console.log(market)
            }
        }
        if(volume > 0){
        await API_sellImmediate(market, volume[market]);
            
            console.log(market+"을"+retJSON[i].avg_buy_price+"에 판매했습니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        }
        else{
            console.log("전략에 맞는 판매가능한 토큰이 없습니다.")
        }
        
}
console.log("sell함수 끝남")
await sleep(1000*30)
    }
}
async function rsi(){
    while(true){
    ret = await get("http://kali.securekim.com:3082/view"); // 사이트에서 정보 추출해서 가져와 ret에 보관
    // console.log(ret) // ret안에 정보를 찍어볼수 있다.
    retJSON = JSON.parse(ret); //ret 안에 정보값을 JSON파일로 변경하여 키 와 값으로 저장
    // console.log(retJSON)
    balance = await getBalance()  //get balnce
    balance = JSON.parse(balance)
    
    for (var i in retJSON){ //for문을 통해서 retJSON[i] 배열안에 .rsiSignal 값을 rsiSignal에 저장
        market = i ;
        rsiSignal = retJSON[i].rsiSignal;
        rsisignal15 = retJSON[i].rsiSignal_target
        console.log("rsi작동중")
        //console.log(rsiSignal) // rsiSingal에 제대로 들어갔는지 확인
        if (rsiSignal == "BIGLONG" || rsisignal15 == "BIGLONG"){ //rsiSignal의 값이 long이나 biglong인 애들만 갑을 저장
            // console.log("!!!!BUY!!!! MARKET : "+ market);
            body = await API_buyImmediate(market,2000000); //(market : 코인 , 얼마치 구매를할지)
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
                console.log(market+"을"+retJSON[i].avg_buy_price+"에 판매했습니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            }
            else{
                console.log("rsi에 충족되는 판매가능한 코인이 없습니다.")
            }
        }


        await sleep(1000*30)
        for (let i in balance){
            console.log(balance[i].currency+"의 갯수는"+balance[i].balance+"\n평균 가격은"+balance[i].avg_buy_price)
        }
    }
}
async function sellAll() { //전부 판매하는식
    _balance = await getBalance();
    _balance = JSON.parse(_balance);
    for (let i in _balance) {
      market = "KRW-" + _balance[i].currency;
      balance = _balance[i].balance;
      if (market != "KRW-KRW" && balance > 0) {
        API_sellImmediate(market, balance);
      }
      console.log(market)
      console.log(balance)
    }
  }

async function main(){
    //변동성돌파 식 캔들은 지금시간보다 전의 캔들을기준으로삼는다
        // balace = await getBalance() // getBalance에서 access키정보와 secret_key정보를 가져옴
        // await getCandlesWHILE() //캔들 정보값을 갱신 
        // // console.log("캔들구매 프로그램을 불러옵니다")
        // // buyWHILE_CANDLE() //사고팔고.
        // console.log("판매함수 시작")
        // SellWHILE_CANDLE()
        
        // console.log("rsi지표 프로그램을 불러옵니다.")
        // rsi()
        sellAll()
        // console.log(_CANDLES[0])
        // body = await API_buyImmediate("KRW-META", 2000000);   // 정상 구매
        // console.log("구매완료")
        // body = await API_sellImmediate("KRW-DKA", );     // 정상 판매
}

main()

 
    //while문 끝나는 곧
    //// ERROR TEST - BUY ////
    //body = await getBalance()
    //body = await API_buyImmediate("KRW-ETH", 2000000);   // 정상 구매 
    //
    //36609686
    //36604449
    //1.0138627037817458
    //1.014008084593923
    //348583.84272261686
    //353695.55995306565
    // body = await API_buyImmediate("KRW-ETH", 100000);   // 정상 구매
    // console.log(body);
    // body = await API_buyImmediate("KRW-DKA", 500000);   // 정상 구매
    // body = await API_sellImmediate("KRW-BTC", 1.0);     // 정상 판매
    // body = await API_buyImmediate("KRW-BTC", -1);       // 범위 에러
    // body = await API_buyImmediate("KRW-BTC", 1);        // 최소 에러
    // body = await API_buyImmediate("KRW-BTC", 5234);     // 단위 에러..안남
    // body = await API_buyImmediate("KRW-BTC", "");       // 가격 에러
    // body = await API_buyImmediate("KRW-BTC", 100000000);  // 가격 에러
    // body = await API_buyImmediate("KRW-ABC", 10000);    // 마켓 에러
    // body = await API_buyImmediate("", 10000);           // 마켓 에러
    // body = await API_buyImmediate("KRW-ABC-BTC", 10000);// 마켓 에러
    // body = await API_sellImmediate("KRW-BTC", 100);      // 개수 에러