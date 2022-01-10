import { WeatherLocation } from '../model/Weather';
import { City, Weather } from '../model/Weather';

const key: string = process.env.REACT_APP_OPEN_WEATHER_API_KEY as string;
if (key === undefined) {
	throw new Error(
		'No Open Weather API Key defined - ensure you set a variable called REACT_APP_OPEN_WEATHER_API_KEY'
	);
}

const keyQuery = `appid=${key}`;
const server = 'http://api.openweathermap.org/data/2.5';

export function getCityLabel(city: City) {
	return `${city.name}, ${city.state ? city.state + ',' : ''} ${
		city.country
	}`;
}

export async function searchCity(term: string): Promise<Array<City>> {
	// const cityList: Array<City> | void =
	const result = await fetch(`http://localhost:3001/?q=${term}`);

	console.log(`Express fetch : ${result.status}`);

	// if (result.status === 404) {
	// 	return undefined;
	// }
	// if (result.status !== 200) {
	// 	throw new Error('Failed to read location data');
	// }

	return await result.json();
}

export async function searchWeatherLocation(
	locationID: number
): Promise<WeatherLocation | undefined> {
	const result = await fetch(
		`${server}/weather?id=${locationID}&${keyQuery}`
	);

	console.log(result.status);

	if (result.status === 404) {
		return undefined;
	}
	if (result.status !== 200) {
		throw new Error('Failed to read location data');
	}

	return await result.json();
}

export function getIconUrl(code: string): string {
	return `http://openweathermap.org/img/wn/${code}.png`;
}

export async function getWeather(locationID: number): Promise<Weather> {
	const result = await fetch(
		`${server}/weather?id=${locationID}&${keyQuery}&units=metric`
	);

	if (result.status !== 200) throw new Error('Failed to read location data');

	return await result.json();
}

export async function getForecast(locationID: number): Promise<Array<Weather>> {
	const result = await fetch(
		`${server}/forecast?id=${locationID}&${keyQuery}&units=metric&cnt=8`
	);

	if (result.status !== 200) throw new Error('Failed to read location data');

	return (await result.json()).list;
}
