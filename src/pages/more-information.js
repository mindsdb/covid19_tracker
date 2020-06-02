import React, { useState, useEffect, Fragment } from 'react';
import SEO from '../components/seo';
import { MyResponsiveBar } from '@/components/ui/Bar';
import { StaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import Pie from '@/components/ui/Pie';
import GridLoader from 'react-spinners/GridLoader';
import styled from '@emotion/styled';
import { useIntl, FormattedMessage } from 'react-intl';
import { Colors } from '@/components/layouts/utils/theme';
import { mq } from '@/components/layouts/utils/base';
import { css } from '@emotion/core';
import Title from '@/components/ui/Title';

const SecondPage = () => {
	const intl = useIntl();

	const [ dataBar, setDataBar ] = useState([]);
	const [ dataPieSick, setdataPieSick ] = useState([]);
	const [ dataPieKnow, setdataPieKnow ] = useState([]);
	const [ dataPieContact, setdataPieContact ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ totalData, seTotalData ] = useState(0);

	const BackgroundContent = ({ className, children }) => {
		return (
			<StaticQuery
				query={graphql`
					query {
						device: file(relativePath: { eq: "banner.png" }) {
							childImageSharp {
								fluid(quality: 90) {
									...GatsbyImageSharpFluid_withWebp
								}
							}
						}
					}
				`}
				render={(data) => {
					const imageData = data.device.childImageSharp.fluid;
					return (
						<BackgroundImage
							Tag="section"
							className={className}
							fluid={imageData}
							backgroundColor={Colors.mirage}
						>
							{children}
						</BackgroundImage>
					);
				}}
			/>
		);
	};

	useEffect(() => {
			const myHeaders = new Headers();
			myHeaders.append('Content-Type', 'application/json');
			const requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: JSON.stringify({
						city: 'Ciudad de Mexico'
					}),
					redirect: 'follow'
				};
			setLoading(true);
			fetch(`https://us-central1-covid-19-mindsdb.cloudfunctions.net/filterData`, requestOptions)
				.then((res) => res.json())
				.then((cases) => {
					seTotalData(cases.totalData);
					setDataBar([
						{
							symptoms: 'fatigue',
							fatigue: cases.fatigue,
							fatigueColor: 'hsl(253, 70%, 50%)'
						},
						{
							symptoms: 'headache',
							headache: cases.headache,
							headacheColor: 'hsl(253, 70%, 50%)'
						},
						{
							symptoms: 'cough',
							cough: cases.cough,
							coughColor: 'hsl(23, 70%, 50%)'
						},
						{
							symptoms: 'smoker',
							smoker: cases.smoker,
							smokerColor: 'hsl(113, 70%, 50%)'
						},
						{
							symptoms: 'breathing problems',
							'breathing problemsColor': 'hsl(87, 70%, 50%)',
							'breathing problems': cases.breathingProblems
						},
						{
							symptoms: 'diarrhea',
							diarrhea: cases.diarrhea,
							diarrheaColor: 'hsl(253, 70%, 50%)'
						},
						{
							symptoms: 'nausea',
							nausea: cases.nausea,
							nauseaColor: 'hsl(253, 70%, 50%)'
						},
						{
							symptoms: 'fever',
							fever: cases.fever,
							feverColor: 'hsl(253, 70%, 50%)'
						},
						{
							symptoms: 'hypertension',
							hypertension: cases.hypertension,
							hypertensionColor: 'hsl(253, 70%, 50%)'
						},
						{
							symptoms: 'diabetes',
							diabetes: cases.diabetes,
							diabetesColor: 'hsl(233, 70%, 50%)'
						},
						{
							symptoms: 'coronary Heart Desease',
							coronaryHeartDesease: cases.coronaryHeartDesease,
							coronaryHeartDeseaseColor: 'hsl(243, 70%, 50%)'
						}
					]);
					setdataPieSick([
						{
							id: intl.formatMessage({ id: 'common.bad' }),
							label: `${(cases.bad / cases.totalData * 100).toFixed(2)}%`,
							value: cases.bad,
							color: 'hsl(213, 70%, 50%)'
						},
						{
							id: intl.formatMessage({ id: 'common.good' }),
							label: `${(cases.good / cases.totalData * 100).toFixed(2)}%`,
							value: cases.good,
							color: 'hsl(176, 65%, 58%)'
						}
					]);
					setdataPieKnow([
						{
							id: intl.formatMessage({ id: 'common.no' }),
							label: `${(cases.know_someone_with_covid19 / cases.totalData * 100).toFixed(2)}%`,
							value: cases.totalData - cases.know_someone_with_covid19,
							color: 'hsl(213, 70%, 50%)'
						},
						{
							id: intl.formatMessage({ id: 'common.yes' }),
							label: `${(cases.know_someone_with_covid19 / cases.totalData * 100).toFixed(2)}%`,
							value: cases.know_someone_with_covid19,
							color: 'hsl(176, 65%, 58%)'
						}
					]);
					setdataPieContact([
						{
							id: intl.formatMessage({ id: 'common.yes' }),
							label: `${(cases.contact_with_covid19 / cases.totalData * 100).toFixed(2)}%`,
							value: cases.contact_with_covid19,
							color: 'hsl(176, 65%, 58%)'
						},
						{
							id: intl.formatMessage({ id: 'common.no' }),
							label: `${((1 - cases.contact_with_covid19 / cases.totalData) * 100).toFixed(2)}%`,
							value: cases.totalData - cases.contact_with_covid19,
							color: 'hsl(213, 70%, 50%)'
						}
					]);
					setLoading(false);
				});
		},
		[ intl]
	);

	const BarContainer = styled.div`display: grid;`;

	const BackgroundContainer = styled(BackgroundContent)`
  width: 100%;
  height: auto;
  background-repeat: repeat-y;
  margin-bottom: 10px;

  ${mq.md(css`
		height: auto;
		margin-bottom: 60px;
	`)}
`;

	const WizardContainer = styled.div`
		background: white;
		margin: 20px 0;
		padding: 30px;
		border-radius: 5px;
		overflow: auto;
		box-shadow: 4px 4px 11px -7px rgba(0, 0, 0, 0.8);
		border: solid 1px rgba(93, 105, 112, 0.3);
		min-height: 600px;

		${mq.md(css`
			overflow: none;
			overflow-x: hidden;
		`)};
	`;

	const HighlightTitle = styled.span`
		color: white;
		margin: 40px 0 1% 0;
		background: #e65862;
		width: 140px;

		${mq.md(css`
			color: white;
			margin: 120px 0 1% 0;
			background: #e65862;
			width: 160px;
		`)};
	`;
	const SpinnerContainer = styled.div`
		margin: 0 auto;
		width: 10px;
		text-align: center;
		padding-top: 100px;
	`;

	const PieContainer = styled.div`
		display: grid;
		justify-content: center;
		align-items: baseline;
		grid-template-columns: repeat(3, 1fr);
	`;

	const ResultTittle = styled.h1`
		text-align: center;
		font-family: "Rubik", sans-serif;
		margin-bottom: 35px;
	`;

	const GraphTitle = styled.h4`
		font-family: "Rubik", sans-serif;
		color: #2c263f;
		margin: 0;
	`;

	const GraphSubTitle = styled.span`
		font-family: "Rubik", sans-serif;
		color: #2c263f;
		margin: 5px 0;
		font-size: 14px;
	`;

	return (
		<Fragment>
			<SEO title="More Information" />
			<BackgroundContainer>
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-md-12">
							<Title marginTop="60px" max="10" min="28" color="white">
								<HighlightTitle>
									<FormattedMessage id="covid.text" />
								</HighlightTitle>
								&nbsp;
								<FormattedMessage id="banner.leftSection.title" />
							</Title>
						</div>
						<div className="col-xs-12 col-md-12">
							<WizardContainer>
								{loading && (
									<SpinnerContainer>
										<GridLoader size={15} margin={3} color={Colors.lightGreen} loading={loading} />
									</SpinnerContainer>
								)}
								{!loading && <ResultTittle>Resultados Ciudad de Mexico</ResultTittle>}
								{!loading && (
									<PieContainer>
										<div>
											<GraphTitle>
												<FormattedMessage id="wizard.static.question1" />
											</GraphTitle>
											<GraphSubTitle>{totalData} (respuestas totales)</GraphSubTitle>
											<Pie height={250} data={dataPieSick} />
										</div>
										<div>
											<GraphTitle>
												<FormattedMessage id="know.covid.person" />
											</GraphTitle>
											<GraphSubTitle>{totalData} (respuestas totales)</GraphSubTitle>
											<Pie height={250} data={dataPieKnow} />
										</div>
										<div>
											<GraphTitle>
												<FormattedMessage id="contact.covid.person" />
											</GraphTitle>
											<GraphSubTitle>{totalData} (respuestas totales)</GraphSubTitle>
											<Pie height={250} data={dataPieContact} />
										</div>
									</PieContainer>
								)}
								{!loading && (
									<BarContainer>
										<GraphTitle>
											<FormattedMessage id="common.symptoms" />
										</GraphTitle>
										<GraphSubTitle>{totalData} (respuestas totales)</GraphSubTitle>
										<MyResponsiveBar dataBar={dataBar} />
									</BarContainer>
								)}
							</WizardContainer>
						</div>
					</div>
				</div>
			</BackgroundContainer>
		</Fragment>
	);
};

export default SecondPage;
