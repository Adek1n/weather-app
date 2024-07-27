import * as dotenv from "dotenv/config";
import express from "express";

const api_key=process.env.MY_API_KEY;
const app=express();

app.use(express.static("./RESPONSE"));

app.get("/api/v1/query",async (req,res)=>{
    const {city}=req.query;
    if(city){
        const fetched=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`);
        const jsonData=await fetched.json();
        return res.status(200).json(jsonData);
    }
    return res.status(404).json({
        cod:404,
        message:"city not found"
    })
})

app.all("/*",(req,res)=>{
    return res.status(404).send("This resource cannot be found");
})



app.listen(process.env.port||3000,()=>{
    console.log("Server is listening");
});