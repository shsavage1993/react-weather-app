export interface Coordinates {
	lon: number;
	lat: number;
}

export interface WeatherLocation {
	coord: Coordinates;
	id: number;
	name: string;
	sys: { country: string };
}

export interface LabelledWeatherLocation extends WeatherLocation {
	label: string;
}

export interface City {
	id: number;
	name: string;
	state: string;
	country: string;
	coord: Coordinates;
}

export interface WeatherConditions {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface MainWeatherData {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
}

export interface Weather {
	weather: Array<WeatherConditions>;
	main: MainWeatherData;
	dt: number;
}
