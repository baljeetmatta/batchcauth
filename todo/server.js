const express =require("express");
const fs=require("fs");
const app=express();
app.use(express.static("public"));
//app.use(express.urlencoded({extended:false}));
app.get("/alltasks",(req,res)=>{
   const records =fs.readFileSync("data.txt");
   const item=JSON.parse(records);
   res.json(item);
})

app.get("/addTasks",(req,res)=>{
    let item=fs.readFileSync("data.txt");
    let records=JSON.parse(item);
    let obj={};
    obj.title=req.query.title;
    records.push(obj);
    fs.writeFile("data.txt",JSON.stringify(records),()=>{});
    res.send("added");
})
app.listen(3000,(e)=>{
    console.log("server started");
})
