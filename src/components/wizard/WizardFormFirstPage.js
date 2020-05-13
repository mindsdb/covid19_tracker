import React from "react"
import { Field, reduxForm } from "redux-form"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { FormattedMessage } from "react-intl"
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"

import Title from "@/components/ui/Title"
import validate from "./validate"
import { Colors } from "@/components/layouts/utils/theme"
import Button from "@/components/ui/Button"
import { mq } from "@/components/layouts/utils/base"

const Form = styled.form`
  input {
    padding: 10px;
    border-radius: 3px;
    border: 1px solid ${Colors.silver};
  }
`
const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const RadioOptions = styled.div`
  margin: 40px auto;
  margin-bottom: 20px;
  display: flex;
  width: 230px;
  justify-content: space-between;

  label {
    text-transform: capitalize;
  }
`
const Label = styled.label`
  input {
    margin-right: 5px;
  }
`
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;

  ${mq.sm(css`
    justify-content: flex-end;
    margin: 40px 0px -30px 0px;
  `)}
`
const QuestionContainer = styled.div`
  text-align: center;

  span {
    font-weight: 900;
    font-size: 32px;
  }
`
const RequieredSpan = styled.p`
  font-size: 18px;
  font-weight: 900;
  color: ${Colors.burntSienna};
`

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <RequieredSpan><FormattedMessage id={error} /></RequieredSpan> : false

const WizardFormFirstPage = props => {
  const { handleSubmit } = props

  return (
    <Form onSubmit={handleSubmit}>
      <Title marginBottom="30px" max="10" min="25" color={Colors.mirage} >
        <FormattedMessage id="wizard.static.question1" />
      </Title>
      <QuestionContainer>
        <RadioContainer>
          <RadioOptions>
            <Label htmlFor="feeling">
              <Field
                name="feeling"
                component="input"
                type="radio"
                value="Great"
              />
              <FaThumbsUp /><FormattedMessage id="wizard.static.answer1" />
            </Label>
          </RadioOptions>
          <RadioOptions>
            <Label htmlFor="feeling">
              <Field
                name="feeling"
                component="input"
                type="radio"
                value="Not feeling well"
              />
              <FaThumbsDown /> <FormattedMessage id="wizard.static.answer2" />
            </Label>
          </RadioOptions>
          <Field name="feeling" component={renderError} />
        </RadioContainer>
      </QuestionContainer>
      <ButtonContainer>
        <Button
          type="submit"
          stylesType="common"
          backgroundColor={Colors.lightGreen}
          backgroundColorHover={Colors.white}
        >
          <FormattedMessage id="wizard.next.button" />
        </Button>
      </ButtonContainer>
    </Form>
  )
}

export default reduxForm({
  form: "wizard", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardFormFirstPage)
