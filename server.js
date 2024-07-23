require("dotenv").config();
const e=require("http");
const f=require("fs");
console.log("Server Active");
const app=e.createServer((req,res)=>{
    if(req.url=="/"){
        f.readFile("RESPONSE/index.html","utf8",(err,data)=>{
            if(err){
                console.error(err);
            }
            res.end(data);
        })
    }
    else if(req.url=="/config.js"){
        res.end(`const config={
        MY_API_KEY:"${process.env.MY_API_KEY}"
        }`);
    }
    else if(req.url=="/app.js"||req.url=="/styles.css"){
        f.readFile(`RESPONSE/${req.url}`,"utf8",(err,data)=>{
            if(err){
                console.error(err);
                console.log(req);
            }
            res.end(data);
        })
    }
    else{
        res.end("NOT FOUND");
    }
});
app.listen(3000);