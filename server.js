const express=require('express');
const hbs =require('hbs');
//tabe fs roye file ha read mikone 
const fs=require('fs');


var app= express();

app.use(express.static(__dirname+'/public'))
app.set('view engine ','hbs');
//nahve tarife middleWare be sorate zir ast  :mesle police mimone to system 
app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now} : ${req.method} ${req.url}`
    console.log(log);
    fs.writeFileSync('server.log',log+'\n')
    next();
})
app.use((req,res,next)=>{
    res.render('offline.hbs')
})
hbs.registerPartials(__dirname+'/views/partials')
//اگر بخوایم یک سری توابع به پروزه امون اضافه کنیم طبق زیر عمل میکنیم
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
})
hbs.registerHelper('upperCase',(text)=>{
    return text.toUpperCase();
})

//GET POST PUT PATCH DELETE ------------->HTTP REQUEST
//http://www.roxo.ir/vuejs -------------->GET REQUEST
//localhost:3000 :address server flash
//به اینا که بعد اسلش در متد گت زدیم "فانکشن کلوژر " میگن 
app.get('/',(req,res)=>{
    // res.send('<h1>Hello Express</h1>')
        res.render('home.hbs',{
            pageTitle:'صفحه اصلی سایت',
            welcomeMessages:'welcome to my page ',
           
        })

})
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'صفحه درباره ما  ',
        
    })
})
app.get('/bad',(req,res)=>{
    res.send({
        error: 'Uable to fetch data '
    })
})
app.listen(3000  ,()=>{
    console.log('Server run on port 3000')
});