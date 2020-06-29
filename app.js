const express=require('express');
const request=require('request');
const app=express();
app.set('view engine','ejs');
app.use(express.static("public"));

app.get('/',function(req,res){
    res.redirect('/search');
});
app.get('/search',function(req,res){
    res.render('search');
    console.log('Homepage Displayed!');
});

app.get('/search/results',function(req,res){
    var query=req.query.search;
    if(query=='mushy bear'||'Mushy Bear'||'Mushy bear'){
        res.render('special');
    }else{
            var url='http://www.omdbapi.com/?apikey=thewdb&s='+query;
            request(url,function(error,response,body){
                console.log(query);
                if(!error&&response.statusCode==200){
                    var parsedData=JSON.parse(body);
                    if(parsedData.Response=='False'){
                            res.render('false',{name:query});
                            console.log('No movie found!');
                    }else{
                        res.render('results',{data: parsedData});
                        console.log('Results Displayed!');
                    }
                }else{
                    res.render('error',{name:query});
                    console.log('Someone Played!');
                }
            });
        }
});
app.get('/search/results/movie',function(req,res){
    var que=req.query.movie;
    var url='http://www.omdbapi.com/?apikey=thewdb&i='+que;
    request(url,function(error,response,body){
        if(!error&&response.statusCode==200){
            var parsedData=JSON.parse(body);
            res.render('show',{data: parsedData});
            console.log('Movie Data Displayed!');
        }
    });
});

var Port = 3000||process.env.PORT;
app.listen(Port,process.env.IP,function(){
    console.log("Server online!");
});