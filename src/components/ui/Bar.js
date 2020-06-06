import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

export const MyResponsiveBar = ({ dataBar }) => {
	return (
		<div style={{ height: '300px' }}>
			<ResponsiveBar
				data={dataBar}
				keys={[
					'breathing problems',
					'cough',
					'coronaryHeartDesease',
					'diabetes',
					'hypertension',
					'diarrhea',
					'fatigue',
					'headache',
					'nausea',
					'fever',
					'smoker'
				]}
				indexBy="symptoms"
				margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
				padding={0.3}
				colors={[ '#5ab16d', '#e65861', '#70dbca', '#f7db8c', '#6751ae', '#7fd7b6', '#efacb0' ]}
				defs={[]}
				fill={[]}
				borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: -15,
					legend: '',
					legendPosition: 'middle',
					legendOffset: 32
				}}
				axisLeft={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'People',
					legendPosition: 'middle',
					legendOffset: -40
				}}
				labelSkipWidth={12}
				labelSkipHeight={12}
				labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
				legends={[]}
				isInteractive={false}
				animate={true}
				motionStiffness={90}
				motionDamping={15}
			/>
		</div>
	);
};
