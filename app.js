//jshint esversion:6

const exp=require('express');
const bp=require('body-parser');
const http=require("https");
const app=exp();
app.use(bp.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    });
    app.post("/",function(rq,rs){
      console.log(rq.body);
      const que=rq.body.cName;
      const apk="738c2f292fb8e3507387495d2eac7331";
      const unt="metric";
      const url = "https://api.openweathermap.org/data/2.5/weather?q="+que+"&units="+unt+"&appid="+apk;
      http.get(url,function(rp){
        rp.on('data',function(d){
          const data=JSON.parse(d);
          rs.write("<h1 style='text-align:center'>Weather of "+data.name+" feels like "+data.main.feels_like+"</h1>");
          rs.write("<h2 style='text-align:center'> But the actual temperature is "+data.main.temp+"</h2>");
          const imgurl="https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
          rs.write("<img style='display:block;margin:auto' src="+imgurl+">");
          rs.write("<h1 style='text-align:center'>"+data.weather[0].description+"</h1>");
          rs.send();
        });
      });
    });


    // http.get(url,function(rp){
    //   console.log(rp.statusCode);
    //   console.log(rp.statusMessage);
    //   rp.on('data',function(d){
    //     const wdata=JSON.parse(d);
    //     console.log(wdata);
    //    console.log("City Temp is:"+wdata.main.temp_max+ " C");
    //     const ft="weather of "+wdata.name+" Feels like:"+wdata.main.feels_like+ " C";
    //     const wd="Weather description is"+wdata.weather[0].description;
    //
    //     rs.write("<p>"+wd+"</p>");
    //     const im="https://openweathermap.org/img/wn/"+wdata.weather[0].icon+"@2x.png";
    //     rs.write("<img src="+im+">");
    //     rs.send();
    //     });
    //   });


// app.post('/',function(req,revfds){
//   res.sendFile('_dir');
// });

app.listen(1409,function(){
  console.log("Port 1409 is on way and running");
});
