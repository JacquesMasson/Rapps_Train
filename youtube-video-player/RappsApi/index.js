const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
require("lodash");
const {readFileSync} = require('fs');
//DONE: Toujours enlever les imports inutilisés!

const app = express();

app.use(express.json());
app.use(cors());

function readFile(filename){
    try{
    const res = readFileSync(filename, 'utf-8').split(/\r?\n/);
    return(res);
    }
    catch(err){
        console.log(err);
    }
}

function writeFile(filename, content){
    try{
        const res= "\n"+content;
        fs.writeFile(filename, res, {flag: 'a+'}, ()=>{{}})
    }catch(err){
        console.log(err);
    }
}

history = [];
bookmarks = [];

//DONE: faire deux routes: une pour les bookmarks,une pour les histories
app.get("/displayHistory", (req, res)=> {
    history = readFile('./History.txt').reverse();
    res.json({
        links: history,
    });
})

app.get("/displayBookmaks", (req, res)=> {
    bookmarks =readFile('Bookmark.txt')
    res.json({
        links: bookmarks
    });
})

//DONE: si cette route sert à récup les histories, il faudrait quelle soit "/addHistory", il faut garder de la cohérence dans le nommage!
app.post("/addHistory", (req, res) => {
    const link = req.body.content;
    if (!link){
        return res.sendStatus(400);
    }
    writeFile('./History.txt',link);
    return res.sendStatus(200).json;
})

app.post("/addBook", (req, res) => {
    const link = req.body.content;
    if (!link){
        return res.sendStatus(400);
    }
    writeFile('./Bookmark.txt',link);
    return res.sendStatus(200).json;
})

app.listen(8000, () => console.log("Api server is running"));