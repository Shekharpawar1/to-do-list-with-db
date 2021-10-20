//require all the installation 

const express = require("express")
const mongoose = require("mongoose")
const port = 3000
// const mongoose= require('mongoose')
// const lodash=require('lodash')


//connect with mongoose
mongoose.connect("mongodb+srv://shekhar:Shekharpawar@cluster0.ozetg.mongodb.net/todolistDB", {
    useNewUrlParser: true
})

const app = express();


app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({
    extended: true
}))



//new item schema
const itemSchema = new mongoose.Schema({
    name: String,
})

//mongoose model 
const Item = new mongoose.model("List", itemSchema)

//document 
const item1 = new Item({
    name: "task1"
});
const item2 = new Item({
    name: "task2"
});
const item3 = new Item({
    name: "task3"
});

const defaultItems = [item1, item2, item3]



app.get("/", (req, res) => {
    let items = Item.find({}, (err, foundItems) => {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("success")
                }
            })
        } else {
            res.render("home", {
                heading: day,
                list: foundItems
            })
        }
    });
    let today = new Date();
    let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    let day = today.toLocaleDateString("en-US", options)
})



app.post("/delete",(req,res)=>{
    const checkboxId=req.body.checkbox;
    Item.findByIdAndRemove({checkboxId},(err)=>{
        if(!err){
            console.log("removed")
            res.redirect(
                "/"
            )
        }
    })
       

})

app.post("/", (req, res) => {
    let itemName = req.body.textInput;
    let item = new Item({
        name: itemName

    })
    item.save()

    res.redirect("/")
})







app.listen( port,() => {
    console.log("server started at " + port)
})