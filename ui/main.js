console.log('Loaded!');
//changing text

var element=document.getElementById('main-text');
element.innerHTML='ZHS welcomes you!';

//move image
var ele=document.getElementById('zhs');
var marginleft=0;
function moveRight()
{
    marginLeft=marginLeft+10;
    ele.style.marginLeft=marginLeft+'px';
}
ele.onclick=function()
{
   var interval=setInterval(moveRight,50) ;
}
