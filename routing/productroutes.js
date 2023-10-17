const express=require("express");
const router=express.Router();
const client=require("mongodb").MongoClient;
const ObjectId=require("mongodb").ObjectId;
let dbinstance;
client.connect("mongodb://127.0.0.1:27017").then((data)=>{

dbinstance=data.db("EcommC");

})

router.get("/",(req,res)=>{
    dbinstance.collection("products").find({}).toArray().then((data)=>{
        res.render("products/ShowAllProducts",{products:data});

    })
    
})
router.get("/create",(req,res)=>{
res.render('products/Create')

})
router.post("/create",(req,res)=>{
    let obj={};
    obj.name=req.body.name;
    obj.price=req.body.price;
    obj.description=req.body.description;
    dbinstance.collection("products").insertOne(obj).then((data)=>{
        res.redirect("/products/")
    })  

})
router.get("/:id",(req,res)=>{
    dbinstance.collection("products").find({'_id':new ObjectId(req.params.id)}).toArray().then((data)=>{
        res.render("products/Show",{data:data});

    })
})

router.get("/edit/:id",(req,res)=>{

    dbinstance.collection("products").find({"_id":new ObjectId(req.params.id)}).toArray().then((data)=>{
        res.render("products/Edit",{data:data});
        
    })
})

router.post("/edit",(req,res)=>{

dbinstance.collection("products").updateOne({'_id':new ObjectId(req.body.id)},{$set:{'name':req.body.name,'price':req.body.price,'description':req.body.description}}).then((data)=>{

    res.redirect("/products")
})


})


router.get("/delete/:id",(req,res)=>{

    dbinstance.collection("products").find({"_id":new ObjectId(req.params.id)}).toArray().then((data)=>{
        res.render("products/Delete",{data:data});
        
    })
})

router.post("/delete",(req,res)=>{

dbinstance.collection("products").deleteOne({'_id':new ObjectId(req.body.id)}).then((data)=>{

    res.redirect("/products")
})


})
module.exports=router;
