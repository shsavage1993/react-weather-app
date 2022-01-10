"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cityList = require('./city.list.json');
var PORT = process.env.PORT || 3001;
var app = express_1.default();
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/', function (req, res) {
    var term = String(req.query.q).trim().toLowerCase();
    var matchedCityList = [];
    var statusCode = 404;
    if (term) {
        matchedCityList = cityList.filter(function (location) { return term === location.name.toLowerCase(); });
    }
    else {
        term = undefined;
    }
    if (matchedCityList.length > 0) {
        statusCode = 200;
    }
    console.log(term + " : " + matchedCityList.length);
    res.status(statusCode).send(matchedCityList);
});
app.listen(PORT, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at: http://localhost:" + PORT + "/?q=");
});
