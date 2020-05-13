import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { FormattedMessage } from "react-intl"

import { mq } from "@/components/layouts/utils/base"
import { Colors } from "@/components/layouts/utils/theme"
import Title from "@/components/ui/Title"
import Button from "@/components/ui/Button"
import Description from "@/components/ui/Description"

const StrongColor = css`
  color: ${Colors.lightGreen};
`

const marginDiv = css`
  margin-bottom: 20px;
`
const InformedContainer = styled.div`
  margin: 0;
  margin-bottom: 20px;

  .title-informed {
    background: ${Colors.lightGreen};
    width: 380px;
    margin: 0 auto;

    strong {
      color: ${Colors.white};
    }
  }

  ${mq.md(css`
    margin: 80px 0;
  `)}
`

const ButtonContainer = styled.div`
  margin: 40px auto;
  text-align: center;
  button:first-of-type {
    margin-bottom: 10px;
  }

  ${mq.md(css`
    display: flex;
    justify-content: center;

    button:first-of-type {
      margin-right: 20px;
    }
  `)}
`

const HowProtect = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <Title
            marginTop="40px"
            marginBottom="20px"
            max="8"
            min="28"
            textAlign="left"
          >
            <FormattedMessage id="howprotect.title" />{" "}
            <strong css={StrongColor}>
              <FormattedMessage id="howprotect.title.cure" />
            </strong>
          </Title>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-md-7">
          <div css={marginDiv}>
            <Title
              marginTop="10px"
              marginBottom="10px"
              max="8"
              min="20"
              textAlign="left"
            >
              <FormattedMessage id="howprotect.washyourhands.title" />
            </Title>
            <Description
              textAlign="justify"
              color={Colors.mirage}
              max="10"
              min="16"
              marginBottom="2rem"
            >
              <FormattedMessage id="howprotect.washyourhands.description" />
            </Description>
          </div>
          <div css={marginDiv}>
            <Title
              marginTop="10px"
              marginBottom="10px"
              max="8"
              min="20"
              textAlign="left"
            >
              <FormattedMessage id="howprotect.dontouchyourface.title" />
            </Title>
            <Description
              textAlign="justify"
              color={Colors.mirage}
              max="10"
              min="16"
              marginBottom="2rem"
            >
              <FormattedMessage id="howprotect.dontouchyourface.description" />
            </Description>
          </div>
          <div css={marginDiv}>
            <Title
              marginTop="10px"
              marginBottom="10px"
              max="8"
              min="20"
              textAlign="left"
            >
              <FormattedMessage id="howprotect.avoid.title" />
            </Title>
            <Description
              textAlign="justify"
              color={Colors.mirage}
              max="10"
              min="16"
              marginBottom="2rem"
            >
              <FormattedMessage id="howprotect.avoid.description" />
            </Description>
          </div>
          <div css={marginDiv}>
            <Title
              marginTop="10px"
              marginBottom="10px"
              max="8"
              min="20"
              textAlign="left"
            >
              <FormattedMessage id="howprotect.respitory.title" />
            </Title>
            <Description
              textAlign="justify"
              color={Colors.mirage}
              max="10"
              min="16"
              marginBottom="2rem"
            >
              <FormattedMessage id="howprotect.respitory.description" />
            </Description>
          </div>
          <div css={marginDiv}>
            <Title
              marginTop="10px"
              marginBottom="10px"
              max="8"
              min="20"
              textAlign="left"
            >
              <FormattedMessage id="howprotect.cough.title" />
            </Title>
            <Description
              textAlign="justify"
              color={Colors.mirage}
              max="10"
              min="16"
              marginBottom="2rem"
            >
              <FormattedMessage id="howprotect.cough.description" />
            </Description>
          </div>
          <br />
        </div>
        <div className="col-xs-12 col-md-5">
          <InformedContainer>
            <Title
              marginTop="10px"
              marginBottom="20px"
              max="8"
              min="28"
              textAlign="center"
            >
              <div className="title-informed">
                <FormattedMessage id="howprotect.right.title.part1" />{" "}
                <strong>
                  {" "}
                  <FormattedMessage id="howprotect.right.title.part2" />
                </strong>{" "}
                <FormattedMessage id="howprotect.right.title.part3" />
              </div>
            </Title>
            <Description
              textAlign="center"
              color={Colors.mirage}
              max="10"
              min="16"
            >
              <FormattedMessage id="howprotect.right.description" />
            </Description>
            <ButtonContainer>
              <Button
                type="button"
                stylesType="common"
                backgroundColor={Colors.lightGreen}
                backgroundColorHover={Colors.white}
              >
                <a
                  href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FormattedMessage id="howprotect.right.title.button1" />
                </a>
              </Button>
              {/* <Button
                type="button"
                stylesType="common"
                backgroundColor={Colors.lightGreen}
                backgroundColorHover={Colors.white}
              >
                <FormattedMessage id="howprotect.right.title.button2" />
              </Button> */}
            </ButtonContainer>
          </InformedContainer>
        </div>
      </div>
    </div>
  )
}

export default HowProtect
