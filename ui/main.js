//counter code

var button=document.getElementById('counter');
button.onclick=function()
{
    //Make a request to counter end point
    var request=new XMLHttpRequest();
    
    //capture the response and store it in a variable
    request.onreadystatechange=function() {
        if(request.readyState == XMLHttpRequest.DONE){
            //Take some action
            if(request.status == 200)
            {
                var counter=request.responseText;
                var span = document.getElementById('count');
                span.innerHTML=counter.toString();
            }
        }
    };
    
    //Make a request
    request.open('GET','http://zunaidsorathiya9.imad.hasura-app.io',true);
    request.send(null);
};