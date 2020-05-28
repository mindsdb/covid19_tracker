import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { StaticQuery, graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import firebase from "gatsby-plugin-firebase"
import { reset } from "redux-form"
import { useIntl, FormattedMessage } from "react-intl"
import Cookies from "js-cookie"

import ShareThis from '@/components/ui/ShareThis'
import SubscribeEmail from '@/components/ui/SubscribeEmail'
import Pie from '@/components/ui/Pie'
import { Colors } from "@/components/layouts/utils/theme"
import { mq } from "@/components/layouts/utils/base"
import { css } from "@emotion/core"
import WizardForm from "@/components/wizard/WizardForm"
import Title from "@/components/ui/Title"
import SEO from "../components/seo"
// import flattenObject from "../lib/utils"

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
      render={data => {
        const imageData = data.device.childImageSharp.fluid
        return (
          <BackgroundImage
            Tag="section"
            className={className}
            fluid={imageData}
            backgroundColor={Colors.mirage}
          >
            {children}
          </BackgroundImage>
        )
      }}
    />
  )
}

const BackgroundContainer = styled(BackgroundContent)`
  width: 100%;
  height: 90vh;
  background-repeat: repeat-y;
  margin-bottom: 10px;

  ${mq.md(css`
    height: 90vh;
    margin-bottom: 60px;
  `)}
`
const Description = styled.p`
  width: 90%;
  text-align: center;
  margin: 0 auto 20px;
`
const WizardContainer = styled.div`
  background: white;
  margin: 20px 0;
  padding: 30px;
  border-radius: 5px;
  min-height: 560px;
  max-height: 560px;
  overflow: auto;
  box-shadow: 4px 4px 11px -7px rgba(0, 0, 0, 0.8);
  border: solid 1px rgba(93, 105, 112, 0.3);

  ${mq.md(css`
    overflow: none;
    overflow-x: hidden;
  `)}
`
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
  `)}
`
const ThanksColor = styled.span`
  color: ${Colors.lightGreen};
`
const Href = styled.a`
  color: ${Colors.linkColor};
  display: block;
  margin: 30px;
  text-decoration: none;
  font-weight: 600;
`
const paddingPie = css`
  ${mq.md(css`
    padding: 0 0 0 70px;
  `)}
`
const paddingMessage = css`
 ${mq.md(css`
    padding: 0px 60px 10px 0px;
  `)}
`

const TestPage = () => {
  const intl = useIntl()

  // const [mapsData, setMapsData] = useState()
  const [showForm, setShowForm] = useState(true)
  const [covidData, setCovidData] = useState([])
  const [country, setCountry] = useState()
  const [dataPie, setDataPie] = useState([])
  const [totalCensu, setTotalCensu] = useState(123)

  useEffect(() => {
    fetch(`https://coronavirus-19-api.herokuapp.com/countries/${country}`)
      .then(res => res.json())
      .then(cases => {
        setCovidData(cases)
        setDataPie([
          {
            "id": "Critical",
            "label": intl.formatMessage({ id: "nivo.graph.label1" }),
            "value": cases.critical,
            "color": "hsl(176, 65%, 58%)"
          },
          {
            "id": "Active",
            "label": intl.formatMessage({ id: "nivo.graph.label2" }),
            "value": cases.active,
            "color": "hsl(213, 70%, 50%)"
          },
          {
            "id": "Recovered",
            "label": intl.formatMessage({ id: "nivo.graph.label3" }),
            "value": cases.recovered,
            "color": "hsl(250, 70%, 50%)"
          },
          {
            "id": "Deaths",
            "label": intl.formatMessage({ id: "nivo.graph.label4" }),
            "value": cases.deaths,
            "color": "hsl(228, 70%, 50%)"
          }
        ])
      })

      fetch('https://us-central1-covid-19-mindsdb.cloudfunctions.net/totalData') 
        .then(res => res.json())
        .then(data => setTotalCensu(data.total + 120))

  }, [country, totalCensu, intl])

  // const updateMapsData = data => {
  //   setMapsData(data)
  // }

  const setAnswerData = async (values, dispatch) => {
    // values = flattenObject({ ...values, mapsData })

    if (values) {
      const answersCollection = firebase.firestore().collection("answers")
      const result = await answersCollection.add({
        ...values,
        submittedDate: new Date(),
      })

      if (result.id) {
        setShowForm(false)
        const mindsDBCovidCount = Cookies.get("mindsDBCovidCount")
          ? Cookies.get("mindsDBCovidCount")
          : 0

        const country = values?.country.normalize("NFKD").replace(/[\u0300-\u036F]/g, "")
        setCountry(country === "United State" || country === "Estados Unidos" ? "usa" : country)

        Cookies.set("mindsDBCovid", "completed")
        Cookies.set("mindsDBCovidCount", parseInt(mindsDBCovidCount) + 1)

        dispatch(reset("wizard"))
      }
    }
  }

  return (
    <>
      <SEO title="Censu" />
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
              {/* Wizard */}
              {showForm ? (
                <WizardContainer>
                  <WizardForm
                    // updateMapsData={updateMapsData}
                    onSubmit={setAnswerData}
                  />
                </WizardContainer>
              ) : (
                  <WizardContainer className="container-fluid">
                    <div className="row">
                      <div className="col-xs-12 col-md-5">
                        <div css={paddingPie}>
                          <Title max="10" min="20" color={Colors.mirage} textAlign="left">
                            <FormattedMessage id="wizard.confirmed.title" />: <span>{covidData?.cases}</span>
                          </Title>
                          <br />
                          <Pie height={320} data={dataPie} />
                          <Description>
                            <FormattedMessage id="finish.left.text" />
                            <Href href="https://covid-json-data.s3-us-west-2.amazonaws.com/answers_data.json">
                              <FormattedMessage id="download.dataset" />
                            </Href>
                          </Description>
                        </div>
                      </div>
                      <div className="col-xs-12 col-md-7">
                        <div css={paddingMessage}>
                          <Title max="10" min="20" color={Colors.mirage} textAlign="center">
                           <FormattedMessage id="wizard.title.right" />
                          </Title>
                          <br />
                          <Description>
                            <FormattedMessage id="wizard.finish.description1" />{' '}
                            <strong>{totalCensu}</strong>{' '}
                            <FormattedMessage id="wizard.finish.description2" />
                          </Description>
                          <SubscribeEmail />
                          <Title
                            marginTop="50px"
                            marginBottom="30px"
                            max="10"
                            min="33"
                            color="black"
                          >
                            {/* <FormattedMessage id="wizard.finish.description.strong.part1" /> */}
                            <ThanksColor>
                              &nbsp;
                              <FormattedMessage id="wizard.finish.description.strong.part2" />
                              &nbsp;
                            </ThanksColor>
                            <FormattedMessage id="wizard.finish.description.strong.part3" />
                          </Title>
                          <Description>
                            <FormattedMessage id="wizard.paragraph.righ" />
                          </Description>
                          <ShareThis />
                        </div>
                      </div>
                    </div>
                  </WizardContainer>
                )}
            </div>
          </div>
        </div>
      </BackgroundContainer>
    </>
  )
}

export default TestPage
