import React, { useState } from "react"
import styled from "@emotion/styled"
import { StaticQuery, graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import firebase from "gatsby-plugin-firebase"
import { reset } from "redux-form"
import { FormattedMessage } from "react-intl"
import Cookies from "js-cookie"

import Button from "@/components/ui/Button"
import { Colors } from "@/components/layouts/utils/theme"
import { mq } from "@/components/layouts/utils/base"
import { css } from "@emotion/core"
import WizardForm from "@/components/wizard/WizardForm"
import Title from "@/components/ui/Title"
import SEO from "../components/seo"
import flattenObject from "../lib/utils"

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
    height: 70vh;
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
  box-shadow: 4px 4px 11px -7px rgba(0, 0, 0, 0.8);
  border: solid 1px rgba(93, 105, 112, 0.3);
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
const ButtonContainer = styled.div`
  margin: 10px auto;
  text-align: center;

  ${mq.md(css`
    margin: 70px auto;
  `)}
`
const Href = styled.a`
  color: ${Colors.linkColor};
  display: block;
  margin: 30px;
  font-weight: 600;
`

const TestPage = () => {
  const [showForm, setShowForm] = useState(true)
  const [likCopied, setlikCopied] = useState(false)
  const [mapsData, setMapsData] = useState()

  const updateMapsData = data => {
    setMapsData(data)
  }

  const setAnswerData = async (values, dispatch) => {
    values = flattenObject({ ...values, mapsData })
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

        Cookies.set("mindsDBCovid", "completed")
        Cookies.set("mindsDBCovidCount", parseInt(mindsDBCovidCount) + 1)

        dispatch(reset("wizard"))
      }
    }
  }

  const copyTextToClipboard = () => {
    navigator.clipboard.writeText(window.location.host)
    setlikCopied(true)
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
                    updateMapsData={updateMapsData}
                    onSubmit={setAnswerData}
                  />
                </WizardContainer>
              ) : (
                <WizardContainer>
                  <Title marginTop="40px" marginBottom="40px" max="10" min="20">
                    <FormattedMessage id="wizard.finish.title" />
                  </Title>
                  <Description>
                    <FormattedMessage id="wizard.finish.description" />
                    <Href href="https://covid-json-data.s3.amazonaws.com/data.json">
                      Download Dataset
                    </Href>
                  </Description>
                  <Title
                    marginTop="50px"
                    marginBottom="30px"
                    max="10"
                    min="28"
                    color="black"
                  >
                    <FormattedMessage id="wizard.finish.description.strong.part1" />
                    <ThanksColor>
                      &nbsp;
                      <FormattedMessage id="wizard.finish.description.strong.part2" />
                      &nbsp;
                    </ThanksColor>
                    <FormattedMessage id="wizard.finish.description.strong.part3" />
                  </Title>
                  <ButtonContainer>
                    <Button
                      type="button"
                      stylesType="common"
                      backgroundColor={Colors.lightGreen}
                      backgroundColorHover={Colors.white}
                      callback={copyTextToClipboard}
                    >
                      <FormattedMessage id="wizard.finish.button" />
                    </Button>
                    &nbsp;
                    {likCopied && <strong>Copied!</strong>}
                  </ButtonContainer>
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
