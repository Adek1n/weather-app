require("dotenv").config();
const e=require("http");
const f=require("fs");
const app=e.createServer((req,res)=>{
    const url=req.url;
    switch(url){
        case "/styles.css":
            f.readFile(`RESPONSE/styles.css`,"utf8",(err,data)=>{
                if(err){
                    console.error(err);
                }
                res.end(data);
            })
            break;
        case "/":
            f.readFile("RESPONSE/index.html","utf8",(err,data)=>{
                if(err){
                    console.error(err);
                }
                res.end(data);
            })
            break;
        case "/config.js":
            res.end(`const config={
                MY_API_KEY:"${process.env.MY_API_KEY}"
                }`);
            break;
        case "/app.js":
            f.readFile(`RESPONSE/app.js`,"utf8",(err,data)=>{
                if(err){
                    console.error(err);
                }
                res.end(data);
            })
            break;
        default:
            break;
    }
});
app.listen(process.env.port||3000);