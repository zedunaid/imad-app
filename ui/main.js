//login check

var submit=document.getElementById('submitButton');
submit.onclick=function()
{
    //Make a request to counter end point
    var request=new XMLHttpRequest();
    
    //capture the response and store it in a variable
    request.onreadystatechange=function() {
        if(request.readyState === XMLHttpRequest.DONE){
            //Take some action
            if(request.status === 200)
            {
                alert('Successfully Logged In');
            }
            
           else if(request.status === 403)
            {
                alert('invalid username/password');
            }
            
              else if(request.status === 500)
            {
                alert('OOPs ! Something Went Wrong!');
            }
        }
    };
    
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    console.log(username);
    console.log(password);
    
    //Make a request
    request.open('POST','/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username: username, password: password}));
};





/*//counter code

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
    request.open('GET','http://zunaidsorathiya9.imad.hasura-app.io/login',true);
    request.send(null);
};*/