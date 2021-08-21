const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/wikiDb", { useNewUrlParser: true, useUnifiedTopology: true });


articleSchema = new mongoose.Schema({
    title:String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);


app.route("/articles").get((req, res) => {
    Article.find((err, foundArticles) => {
        if(err) console.log(err);
        else res.send(foundArticles);
    });
})
.post((req, res) => {
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save((err)=>{
        if(err) console.log(err);
        else{
        console.log("Successfully added a new article");
        res.json({output: "Added a new article"});
    }
    });
})
.delete((req, res) => {
    Article.deleteMany((err)=>{
        if(err) console.log(err);
        else res.send("successfully deleted all articles");
    });
});





/////////////////////////////////getting a single article////////////////////////////////////////////////////////

app.route("/articles/:articleName")
.get((req, res) => {
   
    Article.findOne({title:req.params.articleName}, (err, foundArticle) => {
        if(err) console.log(err);
        else res.send(foundArticle);
    })
})
.put((req, res) => {
    Article.update(
        {title: req.params.articleName},
        {title: req.body.title, content: req.body.content},
        (err) => {
            if(!err) res.send("Successfully updated");
            else res.send(err);
        }
    )
})

.patch((req, res) => {
    console.log(req.body);
    Article.update(
        {title: req.params.foundArticle},
        {$set: req.body},
        (err) => {
            if(!err) res.send("Successfully updated");
            else res.send(err);
        }
    )
})

.delete((req, res) => {
    Article.deleteOne({title: req.params.foundArticle},
        (err) => {
            if(!err) res.send("Successfully deleted1");
            else res.send(err);
        });
    
})


app.listen(3000, () => console.log("Server is up and running"));