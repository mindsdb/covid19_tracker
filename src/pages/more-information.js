import React, { useState, useEffect } from 'react';
import ConditionalLayout from '../components/conditionalLayout';
import SEO from '../components/seo';
import { MyResponsiveBar } from '@/components/ui/Bar';
import Pie from '@/components/ui/Pie';

const SecondPage = () => {
  const [ dataBar, setDataBar ] = useState([]);
  const [dataPieSick, setdataPieSick] = useState([]);
  const [ dataPieKnow, setdataPieKnow ] = useState([]);
  const [ dataPieContact, setdataPieContact ] = useState([]);
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
		console.log(e);
	}
	useEffect(() => {
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
            "id": "good",
            "label": 'feels good',
            "value": cases.good,
            "color": "hsl(176, 65%, 58%)"
          },
          {
            "id": "bad",
            "label": 'feels bad',
            "value": cases.bad,
            "color": "hsl(213, 70%, 50%)"
          }
        ]);
        setdataPieKnow([
					{
            "id": "Know someone with COVID19",
            "label": "Know someone with COVID19",
            "value": cases.know_someone_with_covid19,
            "color": "hsl(176, 65%, 58%)"
          },
          {
            "id": "not Know someone with COVID19",
            "label": "not know someone with COVID19",
            "value": (cases.totalData - cases.know_someone_with_covid19),
            "color": "hsl(213, 70%, 50%)"
          }
        ]);
        setdataPieContact([
					{
            "id": "Know someone with COVID19",
            "label": "Know someone with COVID19",
            "value": cases.contact_with_covid19,
            "color": "hsl(176, 65%, 58%)"
          },
          {
            "id": "not Know someone with COVID19",
            "label": "not know someone with COVID19",
            "value": (cases.totalData - cases.contact_with_covid19),
            "color": "hsl(213, 70%, 50%)"
          }
				]);
				console.log(cases);
			});
	}, []);

	return (
		<ConditionalLayout>
			<SEO title="More Information" />
			<h1>More Information</h1>

			<div>
				<h3>Síntomas comunes</h3>
				<MyResponsiveBar dataBar={dataBar} />
			</div>
			<Pie height={320} data={dataPieSick} />
      <Pie height={320} data={dataPieKnow} />
      <Pie height={320} data={dataPieContact} />
			<p>
				Est quia omnis delectus fuga inventore. Perferendis aut aperiam magni adipisci. Adipisci alias est natus
				omnis.
			</p>
		</ConditionalLayout>
	);
};

export default SecondPage;
