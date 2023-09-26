const express=require("express");
const app=express();
const path=require("path");
const fs=require("fs");
const cookieparser=require("cookie-parser");
const session=require("express-session");
const oneday=1000*60*60*24;
app.use(cookieparser());
app.use(express.urlencoded());
app.set("view engine","ejs");

app.use(session({
    saveUninitialized:true,
    resave:false,
    secret:'asd#$3112',
    cookie:{maxAge:oneday}
}))
const authRoutes=require("./routing/authroutes")
app.use("/users",auth,authRoutes);
app.use(express.static("public"));
function auth(req,res,next)
{
    if(req.session.username)
    next();
    else
    res.redirect("/");

}

app.get("/login",(req,res)=>{
    res.render("login",{message:""})
})
app.post("/login",(req,res)=>{
    //fs.readFileSync("users.txt","utf-8")8
    fs.readFile("users.txt","utf-8",(err,data)=>{
        let results=JSON.parse(data);
      let resultarray=  results.filter((item)=>{
            if(item.username==req.body.username && item.password==req.body.password)
            return true;
        })
        if(resultarray.length==0)
       // res.send("Invalid user/password");
      res.render("login",{message:"Invalid user/password"})
    else
    {
       
        req.session.username=req.body.username;
        req.session.name=resultarray[0].Name;

    res.redirect("/users/dashboard");
    }



    })

})
app.get("/",(req,res)=>{

    fs.readFile("products.json","utf-8",(err,data)=>{
        let productsData=JSON.parse(data);

        res.render("index",{products:productsData});
    })
   

})
app.get("/productDetails/:id",(req,res)=>{

    fs.readFile("products.json","utf-8",(err,data)=>{
        let productsData=JSON.parse(data);
        let results=productsData.filter((item)=>{
            if(item.id==req.params.id)
            return true;
        })

        res.render("index",{products:results});
    })

})
app.listen(3000,(err)=>{
    console.log("Server Started...");

})