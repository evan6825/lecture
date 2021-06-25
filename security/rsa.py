# 
def GCD (a,b) :
    while True :
        if (a<b) :
            tmp2 = b
            b = a
            a = tmp2

        if (a%b == 0):
            return b
        else :
            tmp = a%b
            a = b
            b = tmp

a = int(input("정수를 입력하세요"))
b = int(input("정수를 입력하세요"))
e = int(input("정수를 입력하세요"))
d = int(input("정수를 입력하세요"))
m = int(input("보내려는 숫자를 입력하세요."))
N=a*b
P=(a-1)*(b-1)
def secretcode() :
    if (e<P , GCD(P,e) == 1) :
        if(m<N):
            c = m^e%N
            return c


def decryption() :
    


            
