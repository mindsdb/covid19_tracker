import React, { useState, useEffect } from 'react';
import ConditionalLayout from '../components/conditionalLayout';
import SEO from '../components/seo';
import { MyResponsiveBar } from '@/components/ui/Bar';
import Pie from '@/components/ui/Pie';
import GridLoader from 'react-spinners/GridLoader';
import styled from '@emotion/styled';
import { useIntl, FormattedMessage } from 'react-intl';
import { Colors } from '@/components/layouts/utils/theme';

const SecondPage = () => {
	const intl = useIntl();

	const [ dataBar, setDataBar ] = useState([]);
	const [ dataPieSick, setdataPieSick ] = useState([]);
	const [ dataPieKnow, setdataPieKnow ] = useState([]);
	const [ dataPieContact, setdataPieContact ] = useState([]);
	const [ loading, setLoading ] = useState(false);

	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	let requestOptions;
	try {
		requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify({
				city: 'Ciudad de Mexico'
			}),
			redirect: 'follow'
		};
	} catch (e) {
		console.error(e);
	}
	useEffect(() => {
		setLoading(true);
		fetch(`https://us-central1-covid-19-mindsdb.cloudfunctions.net/filterData`, requestOptions)
			.then((res) => res.json())
			.then((cases) => {
				setDataBar([
					{
						symptoms: 'breathing problems',
						'breathing problemsColor': 'hsl(87, 70%, 50%)',
						'breathing problems': cases.breathingProblems
					},
					{
						symptoms: 'cough',
						cough: cases.cough,
						coughColor: 'hsl(23, 70%, 50%)'
					},
					{
						symptoms: 'coronary Heart Desease',
						coronaryHeartDesease: cases.coronaryHeartDesease,
						coronaryHeartDeseaseColor: 'hsl(243, 70%, 50%)'
					},
					{
						symptoms: 'diabetes',
						diabetes: cases.diabetes,
						diabetesColor: 'hsl(233, 70%, 50%)'
					},
					{
						symptoms: 'hypertension',
						hypertension: cases.hypertension,
						hypertensionColor: 'hsl(253, 70%, 50%)'
					},
					{
						symptoms: 'smoker',
						smoker: cases.smoker,
						smokerColor: 'hsl(113, 70%, 50%)'
					}
				]);
				setdataPieSick([
					{
						id: 'good',
						label: 'feels good',
						value: cases.good,
						color: 'hsl(176, 65%, 58%)'
					},
					{
						id: 'bad',
						label: 'feels bad',
						value: cases.bad,
						color: 'hsl(213, 70%, 50%)'
					}
				]);
				setdataPieKnow([
					{
						id: 'Know someone with COVID19',
						label: 'Know someone with COVID19',
						value: cases.know_someone_with_covid19,
						color: 'hsl(176, 65%, 58%)'
					},
					{
						id: 'not Know someone with COVID19',
						label: 'not know someone with COVID19',
						value: cases.totalData - cases.know_someone_with_covid19,
						color: 'hsl(213, 70%, 50%)'
					}
				]);
				setdataPieContact([
					{
						id: 'Know someone with COVID19',
						label: 'Know someone with COVID19',
						value: cases.contact_with_covid19,
						color: 'hsl(176, 65%, 58%)'
					},
					{
						id: 'not Know someone with COVID19',
						label: 'not know someone with COVID19',
						value: cases.totalData - cases.contact_with_covid19,
						color: 'hsl(213, 70%, 50%)'
					}
				]);
				setLoading(false);
			});
	}, []);

	const BarContainer = styled.div`display: grid;`;

	const SpinnerContainer = styled.div`
		display: block;
		margin: 0 auto;
		padding-top: 100px;
	`;

	const PieContainer = styled.div`
		display: grid;
		justify-content: center;
		grid-template-columns: repeat(3, 400px);
	`;

	return (
		<ConditionalLayout>
			<SEO title="More Information" />
			<h1>
				<FormattedMessage id="more.information" />
			</h1>
			<SpinnerContainer>
				<GridLoader size={15} margin={3} color={Colors.lightGreen} loading={loading} />
			</SpinnerContainer>
			{!loading && (
				<PieContainer>
					<div>
						<h4>
							<FormattedMessage id="wizard.static.question1" />
						</h4>
						<h1 />
						<Pie height={250} data={dataPieSick} />
					</div>
					<div>
						<h4>
							<FormattedMessage id="know.covid.person" />
						</h4>
						<Pie height={250} data={dataPieKnow} />
					</div>
					<div>
						<h4>
							<FormattedMessage id="contact.covid.person" />
						</h4>
						<Pie height={250} data={dataPieContact} />
					</div>
				</PieContainer>
			)}
			{!loading && (
				<BarContainer>
					<h4>Síntomas comunes</h4>
					<MyResponsiveBar dataBar={dataBar} />
				</BarContainer>
			)}
		</ConditionalLayout>
	);
};

export default SecondPage;
