import React, { useState, useEffect } from 'react';
import ConditionalLayout from '../components/conditionalLayout';
import SEO from '../components/seo';
import { MyResponsiveBar } from '@/components/ui/Bar';

const SecondPage = () => {
  const [dataBar, setDataBar] = useState([])

  const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions;
    try {
      requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          city: "Ciudad de Mexico"
        }),
        redirect: "follow"
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
            "symptoms": "breathing problems",
            "breathing problemsColor": "hsl(87, 70%, 50%)",
            "breathing problems": cases.breathingProblems,
          },
          {
            "symptoms": "cough",
            "cough": cases.cough,
            "coughColor": "hsl(23, 70%, 50%)",
          },
          {
            "symptoms": "coronary Heart Desease",
            "coronaryHeartDesease": cases.coronaryHeartDesease,
            "coronaryHeartDeseaseColor": "hsl(243, 70%, 50%)",
          },
          {
            "symptoms": "diabetes",
            "diabetes": cases.diabetes,
            "diabetesColor": "hsl(233, 70%, 50%)",
          },
          {
            "symptoms": "hypertension",
            "hypertension": cases.hypertension,
            "hypertensionColor": "hsl(253, 70%, 50%)",
          },
          {
            "symptoms": "smoker",
            "smoker": cases.smoker,
            "smokerColor": "hsl(113, 70%, 50%)",
          }
        ])
        console.log(cases);
      });
  }, []);
  
	return (
		<ConditionalLayout>
			<SEO title="More Information" />
			<h1>More Information</h1>
			<p>hacer modales aca</p>

			<div>
        <h3>Síntomas comunes</h3>  
        <MyResponsiveBar dataBar={dataBar} />
      </div>

			<p>
				Est quia omnis delectus fuga inventore. Perferendis aut aperiam magni adipisci. Adipisci alias est natus
				omnis.
			</p>
		</ConditionalLayout>
	);
};

export default SecondPage;
