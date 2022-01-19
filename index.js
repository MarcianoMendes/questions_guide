const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const QuestionsModel = require("./database/Questions");
const ResponsesModel = require("./database/Responses");
const { request, response } = require("express");

connection
    .authenticate()
    .then(() => {
        console.log("Conexão realizada com banco de dados")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (request, response) => {
    QuestionsModel.findAll({
        raw: true, order: [
            ['id', 'DESC']
        ]
    }).then(questions => {
        response.render("index", {
            questions: questions
        });
    });
});

app.get("/question", (request, response) => {
    response.render("question");
});

app.post("/savequestion", (request, response) => {
    var title = request.body.title
    var description = request.body.description
    QuestionsModel.create({
        title: title,
        description: description
    }).then(() => {
        response.redirect("/");
    });
});

app.get("/ask/:id", (request, response) => {
    var id = request.params.id;
    QuestionsModel.findOne({
        where: { id: id }
    }).then(question => {
        if (question != undefined) {
            ResponsesModel.findAll({
                where: { questionId: question.id },
                order: [
                    ['id', 'DESC']]
            }).then(responses => {
                response.render("ask", {
                    ask: question,
                    responses : responses
                });
            });
        } else {
            response.redirect("/");
        }
    });
});

app.post("/torespond", (request, response) => {
    var body = request.body.body
    var id_ask = request.body.idask
    console.log(body)
    console.log(id_ask)
    ResponsesModel.create({
        body: body,
        questionId: id_ask
    }).then(() => {
        response.redirect("/ask/" + id_ask);
    });
});

app.listen(8080, () => {
    console.log("App rodando!");
});