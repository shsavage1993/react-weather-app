import React from 'react';
import { FC } from 'react';
import { LabelledWeatherLocation } from '../model/Weather';

interface LocationTableProps {
	locations: Array<LabelledWeatherLocation>;
	current: LabelledWeatherLocation | null;
	onSelect: (locationID: LabelledWeatherLocation) => void;
}

export const LocationTable: FC<LocationTableProps> = ({
	locations,
	current,
	onSelect,
}) => {
	return (
		<div>
			<h2>Locations</h2>
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{locations.map((location) => (
						<tr
							className={
								current?.id === location.id
									? 'table-primary'
									: ''
							}
							key={location.id}
							onClick={() => onSelect(location)}
						>
							<td>{location.label}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
