var storage1=120;
document.getElementById("storage1").innerText=storage1;
var storage2=76;
document.getElementById("storage2").innerText=storage2;
function supplier_reset1(){
document.getElementById("reset1").value="0";
}
function supplier_reset2(){
document.getElementById("reset2").value="0";
}
function supplier_reset3(){
document.getElementById("reset3").value="0";
}
function supplier_reset4(){
document.getElementById("reset4").value="0";
}
function in1(){
var put=document.getElementById("reset2").value;
storage1=Number(storage1)+Number(put);
document.getElementById("storage1").innerText=storage1;
}
function in2(){
var put=document.getElementById("reset4").value;
storage1=Number(storage2)+Number(put);
document.getElementById("storage2").innerText=storage1;
}
function out1(){
var put=document.getElementById("reset1").value;
if(Number(storage1)>=Number(put)){
storage1=Number(storage1)-Number(put);
document.getElementById("storage1").innerText=storage1;}
else
alert("您的库存不足，不能出库这么多数量！");
}
function out2(){
var put=document.getElementById("reset3").value;
if(Number(storage1)>=Number(put)){
storage1=Number(storage2)-Number(put);
document.getElementById("storage2").innerText=storage1;}
else
alert("您的库存不足，不能出库这么多数量！");
}