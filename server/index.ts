import express from 'express';
const cityList: Array<City> = require('./city.list.json');

const PORT = process.env.PORT || 3001;

interface Coordinates {
	lon: number;
	lat: number;
}

interface City {
	id: number;
	name: string;
	state: string;
	country: string;
	coord: Coordinates;
}

const app = express();

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.get('/', function (req, res) {
	let term: string | undefined = String(req.query.q).trim().toLowerCase();

	let matchedCityList: Array<City> = [];
	let statusCode = 404;

	if (term) {
		matchedCityList = cityList.filter(
			(location) => term === location.name.toLowerCase()
		);
	} else {
		term = undefined;
	}

	if (matchedCityList.length > 0) {
		statusCode = 200;
	}

	console.log(`${term} : ${matchedCityList.length}`);
	res.status(statusCode).send(matchedCityList);
});

app.listen(PORT, () => {
	console.log(
		`⚡️[server]: Server is running at: http://localhost:${PORT}/?q=`
	);
});
