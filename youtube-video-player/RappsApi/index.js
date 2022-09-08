const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const {v4: uuid} = require("uuid");
const {readFileSync, promises: fsPromises, read} = require('fs');


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
        fs.writeFile(filename, res, {flag: 'a+'}, err=>{{}})
    }catch(err){
        console.log(err);
    }
}

history = [];
bookmarks = [];

app.get("/display", (req, res)=> {
    history = readFile('./History.txt').reverse();
    bookmarks =readFile('Bookmark.txt')
    res.json({
        hist: history,
        book: bookmarks
    });
})

app.post("/add", (req, res) => {
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