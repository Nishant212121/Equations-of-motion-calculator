const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")

const app = express();

const port = process.env.PORT || 5000

var result = undefined;
var formula = undefined;
var siunit = undefined;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", function (req, res) {
    res.render("index");
})


app.get("/equation1", function (req, res) {
    let answer = "Result : " + result + siunit
    console.log(answer)
    res.render("equation1", {
        result: answer,
        formula: formula,
    });
});
app.post("/equation1", function (req, res) {
    // v = u + at
    // u = v - at
    // t = v-u / a
    let initial = req.body.initialV;
    let accel = req.body.accel;
    let time = req.body.time;
    const velocity = req.body.velocity;


    if (initial && time && accel) {
        formula = ("v = u + at")
        siunit = "m/s"
        let formulaResult1 = initial + (accel * time)
        console.log(formulaResult1)
        result = Math.round(formulaResult1 * 100) / 100
        console.log("formula 1 ")
    } else if (velocity && accel && time) {
        siunit = "m/s"
        formula = ("u = v - at")
        let formulaResult2 = velocity - (accel * time);
        result = Math.round(formulaResult2 * 100) / 100
        console.log("formula 2 ")

    } else if (velocity && initial && time) {
        formula = ("a = (v-u) / t")
        siunit = "m/s^2"
        let formulaResult3 = (velocity - initial) / time
        result = Math.round(formulaResult3 * 100) / 100
        console.log("Formula 3")
    } else if (velocity && initial && accel) {
        formula = ("t = v-u / a")
        siunit = "sec"
        let formulaResult4 = (velocity - initial) / accel
        result = Math.round(formulaResult4 * 100) / 100
        console.log("Formula 4")
    }
    res.redirect("/equation1")

});
app.listen(port, function (req, res) {
    console.log("Server running on port 3000!")
})