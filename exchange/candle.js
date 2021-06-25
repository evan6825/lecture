async function main(){
    getCandlesWHILE();
    while(true){
        ////////////변동성돌파///////

        ret = await get("http://kali.securekim.com:3082/view"); // 사이트에서 정보 추출해서 가져와 ret에 보관
        // console.log(ret) // ret안에 정보를 찍어볼수 있다.
        retJSON = JSON.parse(ret); //ret 안에 정보값을 JSON파일로 변경하여 키 와 값으로 저장
        // console.log(retJSON)
        balance = await getBalance()
        for (var i in retJSON){ //for문을 통해서 retJSON[i] 배열안에 .rsiSignal 값을 rsiSignal에 저장
            market = i ;
            rsiSignal = retJSON[i].rsiSignal;
            //console.log(rsiSignal) // rsiSingal에 제대로 들어갔는지 확인
            if (rsiSignal == "LONG" || rsiSignal == "BIGLONG"){ //rsiSignal의 값이 long이나 biglong인 애들만 갑을 저장
                // console.log("!!!!BUY!!!! MARKET : "+ market);
                body = await API_buyImmediate(market, 50000); //(market : 코인 , 얼마치 구매를할지)
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