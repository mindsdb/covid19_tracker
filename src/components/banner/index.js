import React, { useState } from "react"
import styled from "@emotion/styled"
import BackgroundImage from "gatsby-background-image"
import { StaticQuery, graphql, navigate } from "gatsby"
import ReCAPTCHA from "react-google-recaptcha"
import { FormattedMessage } from "react-intl"
import Cookies from "js-cookie"

import Button from "@/components/ui/Button"
import Description from "@/components/ui/Description"
import { css } from "@emotion/core"

import Title from "@/components/ui/Title"
import { mq } from "@/components/layouts/utils/base"
import { Colors } from "@/components/layouts/utils/theme"

const BackgroundContent = ({ className, children }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          device: file(relativePath: { eq: "banner.png" }) {
            childImageSharp {
              fluid(quality: 100) {
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
  height: auto;
  background-repeat: repeat-y;

  ${mq.md(css`
    height: 60vh;
  `)}
`
const HighlightTitle = styled.h2`
  font-family: "Rubik", sans-serif;
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
const DivContainer = styled.div`
  background: white;
  height: 430px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 1px 2px 10px -2px rgba(0, 0, 0, 0.8);

  ${mq.md(css`
    height: 500px;
    margin-top: 70px;
    margin-bottom: 20px;
  `)}
`
const ButtonContainer = styled.div`
  margin: 10px auto;
  text-align: center;

  ${mq.md(css`
    margin: 30px auto;
  `)} /* button {
    width: 185px;
    height: 32px;
    font-size: 12px;
    border-radius: 7px;
  } */
`
const CaptchaContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  ${mq.md(css`
    margin-top: 30px;
  `)}
`
const customDescription = css`
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: bold;
`
const SepareteSpan = styled.span`
  margin: 10px;
  display: block;
`

const BannerComponent = ({ urlPrefix }) => {
  const goto = () => {
    navigate(`${urlPrefix}/test`)
  }

  const mindsDBCovid = Cookies.get("mindsDBCovid")
  const [mindsDBCovidState] = useState(mindsDBCovid)
  const [isValidRecaptcha, setIsValidRecaptcha] = useState(false)
  const onRecaptchaValidated = recaptchaToken => {
    setIsValidRecaptcha(!!recaptchaToken)
  }

  return (
    <BackgroundContainer>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-7">
            <div>
              <HighlightTitle>
                <FormattedMessage id="covid.text" />
              </HighlightTitle>
              <Title
                marginTop="5px"
                marginBottom="10px"
                max="10"
                min="25"
                textAlign="left"
                color="white"
              >
                <FormattedMessage id="banner.leftSection.title" />
              </Title>
              <Description
                textAlign="left"
                color="white"
                max="10"
                min="18"
                customClass={customDescription}
              >
                <FormattedMessage id="banner.leftSection.desription1" />
                <SepareteSpan />
                <FormattedMessage id="banner.leftSection.desription2" />
              </Description>
            </div>
          </div>
          <div className="col-xs-12 col-md-5">
            <DivContainer>
              {/* <Title marginTop="20px" marginBottom="20px" max="10" min="22" textAlign="center" color="black">
              <FormattedMessage id="banner.rightSection.title" />
            </Title> */}
              <Description textAlign="left" color="#5d6970" max="10" min="14">
                <FormattedMessage id="banner.rigthSection.description1" />
              </Description>
              <Description
                marginTop="5px"
                textAlign="left"
                color="#5d6970"
                max="10"
                min="14"
              >
                <FormattedMessage id="banner.rigthSection.description2" />
              </Description>
              <CaptchaContainer>
                <ReCAPTCHA
                  sitekey={process.env.GATSBY_GOOGLE_RECAPTCHA_KEY}
                  onChange={onRecaptchaValidated}
                />
              </CaptchaContainer>
              <ButtonContainer>
                <Button
                  type="button"
                  stylesType="common"
                  backgroundColor={Colors.lightGreen}
                  backgroundColorHover={Colors.white}
                  callback={goto}
                  disabled={
                    !isValidRecaptcha || mindsDBCovidState === "completed"
                  }
                >
                  <FormattedMessage id="banner.rigthSection.button" />
                </Button>
              </ButtonContainer>
            </DivContainer>
          </div>
        </div>
      </div>
    </BackgroundContainer>
  )
}

export default BannerComponent
