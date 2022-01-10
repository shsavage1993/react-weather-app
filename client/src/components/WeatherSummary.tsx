import React from 'react';
import { FC, useState, useEffect } from 'react';
import { LabelledWeatherLocation, Weather } from '../model/Weather';
import { getForecast, getWeather } from '../services/WeatherService';
import { WeatherEntry } from './WeatherEntry';

interface WeatherSummaryProps {
	location: LabelledWeatherLocation | null;
}

export const WeatherSummary: FC<WeatherSummaryProps> = ({ location }) => {
	const [weather, setWeather] = useState<Weather | null>(null);
	const [forecast, setForecast] = useState<Array<Weather> | null>(null);

	useEffect(() => {
		(async function () {
			if (location) {
				const [weather, forecast] = await Promise.all([
					getWeather(location.id),
					getForecast(location.id),
				]);
				setWeather(weather);
				setForecast(forecast);
			}
		})();
	}, [location]);

	if (!location || !weather || !forecast) {
		return null;
	}

	return (
		<div>
			<hr />
			<h2>{location.label}</h2>
			<WeatherEntry weather={weather} />

			<h2>Forecast</h2>
			<div>
				<ol style={{ whiteSpace: 'nowrap', overflowX: 'scroll' }}>
					{forecast.map((timePoint) => (
						<li
							style={{
								borderRight: '1px solid black',
								padding: '10px',
								listStyleType: 'none',
								display: 'inline-block',
								// '&:hover': { background: 'lightgray' },
							}}
							key={timePoint.dt}
						>
							<WeatherEntry weather={timePoint} />
						</li>
					))}
				</ol>
			</div>
		</div>
	);
};
