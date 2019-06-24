var price1=120;
document.getElementById("price1").innerText="￥"+price1+".00";
var price2=150;
document.getElementById("price2").innerText="￥"+price2+".00";

function good1(){
    var quantity=document.getElementById("quantity1").value;
    price1=120*Number(quantity);
    document.getElementById("price1").innerText="￥"+price1+".00";
}

function good2(){
    var quantity=document.getElementById("quantity2").value;
    price2=150*Number(quantity);
    document.getElementById("price2").innerText="￥"+price2+".00";
}
function reset1() {
    document.getElementById("quantity1").value="1";
    document.getElementById("price1").innerText="￥120.00";
}
function reset2() {
    document.getElementById("quantity2").value="1";
    document.getElementById("price2").innerText="￥150.00";
}