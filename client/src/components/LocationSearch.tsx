import React from 'react';
import { FC, useState, useEffect, useRef } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';

import { City } from '../model/Weather';
import { getCityLabel, searchCity } from '../services/WeatherService';

interface LocationSearchProps {
	onAdd: (city: City) => void;
	onReset: () => void;
	onWarning: (message: string) => void;
	onError: (message: string) => void;
}

export const LocationSearch: FC<LocationSearchProps> = ({
	onAdd,
	onReset,
	onWarning,
	onError,
}) => {
	const [locationSearch, setLocationSearch] = useState<string>('');
	const [matchedLocations, setMatchedLocations] = useState<Array<City>>([]);
	const [selectedLocation, setSelectedLocation] = useState<City | null>(null);
	const [disableAddLocation, setDisableAddLocation] = useState<boolean>(true);

	const inputElement = useRef<HTMLInputElement>(null);

	const disableSearch = locationSearch.trim() === '';

	const searchLocation = async (term: string) => {
		onReset();
		const matches = await searchCity(term);
		setMatchedLocations(matches);

		if (matches.length === 0) {
			onError(`Location '${term}' not found`);
		}
	};

	const searchAddLocation = () => {
		if (disableAddLocation) {
			//Search mode
			searchLocation(locationSearch);
			if (inputElement && inputElement.current) {
				inputElement.current.getElementsByTagName('input')[0].focus();
			}
		} else {
			// Add mode
			if (selectedLocation) {
				onAdd(selectedLocation);
				setDisableAddLocation(true);
				setLocationSearch('');
			}
		}
	};

	// Delete matches if input element 'x' is pressed
	useEffect(() => {
		if (inputElement && inputElement.current) {
			inputElement.current.addEventListener('search', function () {
				setMatchedLocations([]);
			});
			return inputElement.current.removeEventListener(
				'search',
				function () {
					setMatchedLocations([]);
				}
			);
		}
	}, []);

	return (
		<div>
			<label>
				<Autocomplete
					ref={inputElement}
					className="ml-1 mr-1"
					freeSolo
					openOnFocus={true}
					value={selectedLocation}
					onChange={(event: any, newValue: string | City | null) => {
						if (typeof newValue != 'string') {
							setSelectedLocation(newValue);
							newValue === null
								? setDisableAddLocation(true)
								: setDisableAddLocation(false);
						}
					}}
					inputValue={locationSearch}
					onInputChange={(event, newInputValue) => {
						setDisableAddLocation(true);
						setLocationSearch(newInputValue);
					}}
					options={matchedLocations}
					getOptionLabel={(option) => getCityLabel(option)}
					style={{ width: 250 }}
					renderInput={(params) => (
						// <TextField
						// 	{...params}
						// 	placeholder="Search..."
						// 	// margin="dense"
						// 	variant="outlined"
						// />
						<div ref={params.InputProps.ref}>
							<input
								style={{ height: '2.5em', width: 250 }}
								type="search"
								placeholder="Search..."
								{...params.inputProps}
							/>
						</div>
					)}
				/>
			</label>
			<button
				className={
					disableAddLocation ? 'btn btn-primary' : 'btn btn-success'
				}
				onClick={() => searchAddLocation()}
				disabled={disableSearch}
			>
				{disableAddLocation ? 'Search' : 'Add'}
			</button>
		</div>
	);
};
