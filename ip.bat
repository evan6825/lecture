@echo off
set a=1
echo 스캔을 원하는 아이피 대역
set /p ip=
:start
ping to %ip%.%a% -n 1 >> scan.txt
echo ping %ip%.%a%
set /A a+=1
if %a% NEQ 255 goto start
:end