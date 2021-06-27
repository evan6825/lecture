const request = require('request')

let _CANDLES = {} //_MARKETS 에 들어가있는 코인들의 차트정보를 CANDLES에 저장

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
async function get(url){
    return new Promise(function(resolve, reject) {
        request(url, (error, response, body) => {
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
async function getCandlesWHILE(){
    // while(true){
        for(var i in _CANDLES_MARKETS){
            // await sleep(300)
            _CANDLES[i] = await get_candles(_CANDLES_MARKETS[i])
            // console.log(_CANDLES)
        }
        await sleep(2000)
        return _CANDLES
    // }
    
}
async function main(){
    

 while(true){//변동성돌파 식 캔들은 지금시간보다 전의 캔들을기준으로삼는다
    // balace = await getBalance() // getBalance에서 access키정보와 secret_key정보를 가져옴
    var _CANDLES = await getCandlesWHILE() //캔들 정보값을 갱신 
    // console.log(_CANDLES[0])
        for (var i in _CANDLES){
        market = _CANDLES[i][0].market//코인종류 string
        candle_date_time_kst = _CANDLES[i][0].candle_date_time_kst//캔들기준시각kst string
        close_price = parseInt(_CANDLES[i][0].trade_price)//종가 Double
        high_price =  parseInt(_CANDLES[i][0].high_price)//고가 Double
        low_price =   _CANDLES[i][0].low_price//저가 Double
        price = _CANDLES[i][1].trade_price//현재가격
        // console.log(market) // 10개의 코인이 제대로 찍히는 확인
        target_price = close_price + (high_price-low_price)*0.5//목표가
        //console.log(target_price) // 목표가 제대로 되었는지 확인

        if (target_price<price){
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
}
 
}
main()