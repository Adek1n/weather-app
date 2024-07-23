const e=require("http");
const app=e.createServer((req,res)=>{
    res.end("hello world");
});
app.listen(3000);