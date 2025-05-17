const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'))

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id : uuidv4(),
        username : "brooklyn",
        content : "Visca el barca"
    },
    {
        id : uuidv4(),
        username : "kai",
        content : "MESSI IS GOAT"
    },
    {
        id : uuidv4(),
        username : "eve",
        content : "BARCA VS ARG (3-2)"
    },
]

app.get("/posts" , (req,res) => {
    res.render("index.ejs" , {posts});
});

app.get("/posts/new" , (req,res) => {
    res.render("new.ejs");
});

app.post("/posts" , (req,res) => {
    let {username , content } = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id" , (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);  //arrow function
    res.render("show.ejs" , {post});
});

app.patch("/posts/:id" , (req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);  //arrow function
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit" , (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs" , {post});
});

app.delete("/posts/:id" , (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
    
});

app.listen(port, () => {
    console.log(`listening to port : ${port}`);
});