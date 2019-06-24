var price1=120;
document.getElementById("price1").innerText="￥"+price1;
var price2=150;
document.getElementById("price2").innerText="￥"+price2;

function good1(){
    var quantity=document.getElementById("quantity1").value;
    price1=Number(price)*Number(quantity);
    document.getElementById("price1").innerText="￥"+price1;
}

function good2(){
    var quantity=document.getElementById("quantity2").value;
    price2=Number(price)*Number(quantity);
    document.getElementById("price2").innerText="￥"+price2;
}