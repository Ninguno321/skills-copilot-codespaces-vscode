//Create web server 
//Create a web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//Get all comments
app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
});

//Post a comment
app.post('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const comments = JSON.parse(data);
            const newComment = {
                id: comments.length + 1,
                name: req.body.name,
                comment: req.body.comment
            };
            comments.push(newComment);
            fs.writeFile('./comments.json', JSON.stringify(comments, null, 2), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(newComment);
                }
            });
        }
    });
});

//Delete a comment
app.delete('/comments/:id', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const comments = JSON.parse(data);
            const newComments = comments.filter(comment => comment.id !== parseInt(req.params.id));
            fs.writeFile('./comments.json', JSON.stringify(newComments, null, 2), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(newComments);
                }
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//End of comments.js
