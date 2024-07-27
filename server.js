import * as dotenv from "dotenv/config";
import * as e from "http";
import * as f from "fs/promises";
const startServer=async ()=>{
    const files=await Promise.all(
        (await f.readdir("./RESPONSE","utf-8")).map (async (v)=>{
            return f.readFile(`./RESPONSE/${v}`,"utf8");
       })
    )
  
    const app=e.createServer((req,res)=>{ 
        const url=req.url;
        switch(url){
            case "/styles.css":
                res.writeHead(200,{'content-type':'text/css'});
                res.end(files[2]);
                break;
            case "/":
                res.writeHead(200,{'content-type':'text/html'});
                res.end(files[1]);
                break;
            case "/config.js":
                res.writeHead(200,{'content-type':'text/javascript'});
                res.end(`const config={
                    MY_API_KEY:"${process.env.MY_API_KEY}"
                    }`);
                break;
            case "/app.js":
                res.writeHead(200,{'content-type':'text/javascript'});
                res.end(files[0]);
                break;
            default:
                break;
        }
    });
    app.listen(process.env.port||3000,()=>{
        console.log("Server is listening");
    });
}

startServer();
