const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/",(request, response) => {
    response.render("index");
});

app.get("/question",(request, response) => {
    response.render("question");
});

app.post("/savequestion",(request, response) => {
    response.send("Formulário recebido!");
});

app.listen(8080,()=>{
    console.log("App rodando!");
});