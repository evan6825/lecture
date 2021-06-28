const 암호화 = require("crypto-js"),
헥스를바이너리로 = require("hex-to-binary");


class Human {
    constructor (face, voice) {
    this.face = face
    this.voice = voice
    }
    }
    //studentA 를 생성한다
    //studentA.face 는 "Handsome",
    //studentA.voice 는 "Sweet"
    //값을 주고 싶다
    const studentA = new Human("Handsome", "Sweet");


class 블록 {
        constructor(인덱스, 해시, 이전해시, 시간, 데이터, 난이도, 논스) {
        this.인덱스 = 인덱스;
        this.해시 = 해시; // 이 값을 제외한 모든 값을 직렬화한 뒤 SHA256
        this.이전해시 = 이전해시;
        this.시간 = 시간;
        this.데이터 = 데이터; // TX
        this.난이도 = 난이도;
        this.논스 = 논스;
 
    }
}
const 시간가져오기 = () => Math.round(new Date().getTime() / 1000);
const 해시만들기 = (인덱스, 이전해시, 시간, 데이터, 난이도, 논스) =>
    암호화.SHA256(
    인덱스 + 이전해시 + 시간 + JSON.stringify(데이터) + 난이도 + 논스
    ).toString();

console.log(해시만들기(0, "", 시간가져오기(), "", 0, 0))

    const 제네시스블록 = new 블록(
        0, //인덱스
        "4d1bff8db689882e2bb4c5236d054d3513ad4f4500caebfb7b14b4531981aa45", //hash
        "", //이전해시
        1569523151, //시간
        "", //제네시스거래들
        0, //난이도
        0 //논스
    );
// 블록체인 선언 blockchain
let 블록체인 = [제네시스블록];

//가장 최신 블록
const 최신블록가져오기 = () =>블록체인[블록체인.length - 1];

//블록 체인 전체
const 블록체인가져오기 = () => 블록체인;
const 블록이올바른지 = (후보블록, 마지막블록) => {
    //TODO :
    // 블록 내부 구조 확인 (index는 숫자, hash는 문자열 등등)
    // 추가 하려는 블록 index 가 이전 index + 1 이 맞는지 확인
    // previousHash 값이 실제 이전 블록의 해시 값과 맞는지 확인
    // 현재 블록의 Hash 값이 맞는지 확인
    // timestamp가 가 현재 시각/이전 블록과 1분 이내 차이 인지 확인
    return true;
    };
const 블록을체인에더하라 = 후보블록 => {
    if (블록이올바른지(후보블록, 최신블록가져오기())) {
    //TODO : Tx 관련 작업
    블록체인.push(후보블록);
    return true;
    }
};
    
// const 새로운난이도계산 = (최신블록, 블록체인) => {
//     //TODO : 새로운 난이도 계산
//     return 0;
// };

const 난이도찾기 = () => {
    //TODO : 난이도 리턴 (새로운 난이도로 계산 할지, 기존 것 쓸 지)
    return
};

const 해시가난이도와일치하는지 = (해시, 난이도 = 0) => {
    const 바이너리의해시 = 헥스를바이너리로(해시);
    const 필요한0 = "0".repeat(난이도);
    console.log("난이도 시도:", 난이도, " 해시 : ", 바이너리의해시);
    return 바이너리의해시.startsWith(필요한0);    
};
            

        

const 블록캐기 = (인덱스, 이전해시, 시간, 데이터, 난이도) => {
    let 논스 = 0;
    while (true) {
    //console.log("Current nonce", nonce);
    const 해시 = 해시만들기(
    인덱스,
    이전해시,
    시간,
    데이터,
    난이도,
    논스
    );
    if (해시가난이도와일치하는지(해시, 난이도)) {
    return new 블록(
    인덱스,
    해시,
    이전해시,
    시간,
    데이터,
    난이도,
    논스
    );
    }
    논스++;
    }
    };

// 블록캐기(1, "4d1bff8db689882e2bb4c5236d054d3513ad4f4500caebfb7b14b4531981aa45", 시간가져오기
// (), "", 4);




const 블록채굴 = 데이터 => {
    const 이전블록 = 최신블록가져오기();
    const 새로운블록인덱스 = 이전블록.인덱스 + 1;
    const 새로운시간 = 시간가져오기();
    const 난이도 = 난이도찾기();
    const 새로운블록 = 블록캐기(
    새로운블록인덱스,
    이전블록.해시,
    새로운시간,
    데이터,
    난이도
    );
    블록을체인에더하라(새로운블록);
    //TODO : 새로운 블록 브로드 캐스팅
    return 새로운블록;
    };
    블록채굴({});
    const 새로운난이도계산 = (새로운블록, 블록체인) => {
        //현재 블록체인으로 부터 10 블록 전 블록을 가져옵니다.
        const 마지막으로계산된블록 =
        블록체인[블록체인.length - 난이도_조절_간격];
        //10 블록 * 1초 즉, 10 개 만들어지는데 10초가 예상 됩니다.
        const 예상시간 =
        블록_생성_간격 * 난이도_조절_간격;
        //현재 블록의 시각에서 10 블록전의 시각을 빼면 걸린 시간이 나옵니다.
        const 걸린시간 = 새로운블록.시간 - 마지막으로계산된블록.시간;
        if (걸린시간 < 예상시간) { // 채굴 시간이 예상한 시간보다 더 짧으면 난이도를 높입니다.
        console.log("걸린시간:"+걸린시간+", 예상시간:"+예상시간+
        " 난이도 + 1 = " + (마지막으로계산된블록.난이도 + 1));
        return 마지막으로계산된블록.난이도 + 1;
        } else if (걸린시간 > 예상시간) { // 채굴 시간이 예상 시간보다 더 걸리면 난이도를 낮춥니다.
        console.log("걸린시간 :"+걸린시간+", 예상시간:"+예상시간+
        " 난이도 - 1 = " + (마지막으로계산된블록.난이도 - 1));
        return 마지막으로계산된블록.난이도 - 1;
        } else { //아니면 난이도를 유지합니다.
        console.log("걸린시간 :"+걸린시간+", 예상시간:"+예상시간);
        return 마지막으로계산된블록.난이도;
        }
        };
        const 블록자동채굴 = () => {
            //TODO : CoinbaseTx
            console.log("채굴 !", 최신블록가져오기().인덱스 + 1,
            " 난이도 : ",최신블록가져오기().난이도);
            return 블록채굴({});
            };
while(true){블록자동채굴();}            

    // map이해하기
// arr = [1, 2, 4];
// arr.map((i) => {
//   console.log(i);
// });
// for (var i=0; i<arr; i++) {
//     console.log(i)};