import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { FormattedMessage } from 'react-intl'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import SocialMedia from './SocialMedia'
import { mq } from '@/components/layouts/utils/base'
import { Colors } from '@/components/layouts/utils/theme'

const logoContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: end;

  .last-logo {
    margin: 13px 20px;
  }
`
const Container = styled.footer`
  width: 100%;
  height: 260px;
  color: ${Colors.silverChalice};

  ${mq.md(css`
    height: 200px;
  `)}
`
const BottomContainer = styled.div`
  height: 80px;
  background-color: ${Colors.white};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;

  ${mq.md(css`
    font-size: 16px;
  `)}
`
const FooterList = styled.ul`
  line-height: 0.9;
  margin-top: 10px;
  list-style: none;
  margin-left: 0px;
`
const Href = styled.a`
  color: ${Colors.silverChalice};
  text-decoration: none;
`
const centerItems = css`
  display: inline-flex;
  div:last-child {
    margin-left: 50px;
  }
`
const Logos = () => {
  const data = useStaticQuery(graphql`
    query {
      skyAlertImage: file(relativePath: { eq: "skyalert-logo.png" }) {
        childImageSharp {
          fixed(width: 109, height: 60) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      
      mindsdbImage: file(relativePath: { eq: "mindsdb-logo.png" }) {
        childImageSharp {
          fixed(width: 113, height: 20) {
            ...GatsbyImageSharpFixed
          }
        }
      }

    }
  `)

  return data
}


const Footer = (props) => {
  const images = Logos()

  return (
    <Container className="container-fluid">
      <BottomContainer className="row">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-8" css={centerItems}>
              <div>
                <strong><FormattedMessage id="footer.minds.title" /></strong>
                <FooterList>
                  <li>
                    <Href href="https://www.mindsdb.com/policies/privacy-policy" target="_blank">
                      <FormattedMessage id="footer.minds.link1" />
                    </Href>
                  </li>
                  <li>
                    <Href href="https://www.mindsdb.com/policies/cookie-policy" target="_blank">
                      <FormattedMessage id="footer.minds.link2" />
                    </Href>
                  </li>
                  <li>
                    <Href href="https://www.mindsdb.com/policies/terms" target="_blank">
                      <FormattedMessage id="footer.minds.link3" />
                    </Href>
                  </li>
                </FooterList>
              </div>
              <div>
                <strong>Dataset</strong>
                <FooterList>
                  <li>
                    <Href href="https://covid-json-data.s3-us-west-2.amazonaws.com/answers_data.json">
                      <FormattedMessage id="common.download" />
                    </Href>
                  </li>
                </FooterList>
              </div>
            </div>
            <div className="col-xs-12 col-md-4" css={logoContainer}>
              <Img fixed={images.skyAlertImage.childImageSharp.fixed} />
              <Img fixed={images.mindsdbImage.childImageSharp.fixed} className="last-logo" />
            </div>
            <div className="col-xs-6 col-md-10">
              <span>® 2020 MindsDB. <FormattedMessage id="footer.copyright" /></span>
            </div>
            <div className="col-xs-3 col-md-2">
              <SocialMedia />
            </div>
          </div>
        </div>
      </BottomContainer>
    </Container>
  )
}

export default Footer
