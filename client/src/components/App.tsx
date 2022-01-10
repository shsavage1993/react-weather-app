import React, { useState } from 'react';
import './App.css';
import { LocationSearch } from './LocationSearch';
import { LocationTable } from './LocationTable';
import { City, LabelledWeatherLocation } from '../model/Weather';
import { ErrorAlert, WarningAlert } from './Alerts';
import {
	getCityLabel,
	searchWeatherLocation,
} from '../services/WeatherService';
import { WeatherSummary } from './WeatherSummary';

function App() {
	const [currentLocation, setCurrentLocation] =
		useState<LabelledWeatherLocation | null>(null);
	const [locations, setLocations] = useState<Array<LabelledWeatherLocation>>(
		[]
	);
	const [error, setError] = useState('');
	const [warning, setWarning] = useState('');

	const resetAlerts = () => {
		setError('');
		setWarning('');
	};

	const addLocation = async (city: City) => {
		resetAlerts();
		const location = await searchWeatherLocation(city.id);

		if (!location) {
			setError(`Location '${getCityLabel(city)}' not found`);
		} else if (locations.find((item) => item.id === location.id)) {
			setWarning(
				`Location '${getCityLabel(city)}' is already in the list.`
			);
		} else {
			console.log(`${location.name},${location.sys.country}`);
			setLocations([
				{ label: getCityLabel(city), ...location },
				...locations,
			]);
		}
	};

	return (
		<div className="container">
			<h1>Weather App</h1>
			<LocationSearch
				onAdd={addLocation}
				onReset={resetAlerts}
				onWarning={(message) => setWarning(message)}
				onError={(message) => setError(message)}
			/>
			<ErrorAlert message={error} />
			<WarningAlert message={warning} />
			<LocationTable
				locations={locations}
				current={currentLocation}
				onSelect={(location) => setCurrentLocation(location)}
			/>
			<WeatherSummary location={currentLocation} />
		</div>
	);
}

export default App;
