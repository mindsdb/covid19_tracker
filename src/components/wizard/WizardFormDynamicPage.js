import React from 'react'
import { Field, reduxForm } from 'redux-form'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { useIntl, FormattedMessage } from 'react-intl'

import validate from './validate'
import renderField from './renderField'
import { Colors } from '@/components/layouts/utils/theme'
import Button from '@/components/ui/Button'
import { mq } from '@/components/layouts/utils/base'

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
  margin: 20px 0 20px 25px;
  margin-bottom: 10px;
  display: flex;
  width: 250px;
  justify-content: space-between;
  flex-flow: wrap;

  label {
    display: flex;
    margin-top: 10px;
  }
`
const Label = styled.label`
  input {
    margin-right: 5px;
  }
`
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  ${mq.sm(css`
    flex-direction: row;
  `)}

  button:last-child {
    margin-top: 10px;

    ${mq.sm(css`
      margin-top: 0px;
      margin-left: 10px;
    `)}
  }
`
const CustomInputText = css`
  text-align: center;
  margin: 0 auto 20px;
  display: block;
`
const QuestionContainer = styled.div`
  text-align: left;
  margin-top: 10px;

  span {
    font-weight: 900;
    font-size: 1.2rem;
    font-family: "Rubik", sans-serif;
    line-height: 1.5;
    color: #2c263f;

  }
`
const RequieredSpan = styled.p`
  font-size: 18px;
  font-weight: 900;
  color: ${Colors.burntSienna};
`

const TitleQuestion = styled.span`
  color: ${Colors.mirage};
  font-family: "Rubik", sans-serif;
  margin-top: 10px;
`


const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <RequieredSpan><FormattedMessage id={error} /></RequieredSpan> : false

const WizardFormDynamicPage = props => {
  const {
    handleSubmit,
    previousPage,
    stepProps = {},
    pristine,
    submitting,
    section = []
  } = props
  
  const intl = useIntl()

  const validateField = (section) => {
    if (stepProps.type === 'radio') {
      return (
        <QuestionContainer>
          <TitleQuestion><FormattedMessage id={section.question} /></TitleQuestion>
          <RadioContainer>
            <RadioOptions>
              {
                section.options.map((item, idx) => (
                  <Label htmlFor={item} key={idx}>
                    <Field
                      id={idx}
                      name={section.name}
                      component="input"
                      type="radio"
                      value={intl.formatMessage({ id: item })}
                    />
                    {intl.formatMessage({ id: item })}
                  </Label>
                ))
              }
            </RadioOptions>
            <Field name={section.name} component={renderError} />
          </RadioContainer>
        </QuestionContainer>
      )
    }

    if (stepProps.type === 'number') {
      return (
        <Field
          name={stepProps.name}
          type="number"
          component={renderField}
          label={<strong css={CustomInputText}><FormattedMessage id={stepProps.question} /></strong>}
          placeholder={stepProps.placeholder}
        />
      )
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <QuestionContainer>
      {section.questions.map((sections, idx) => (
        <div key={idx}>
          {validateField(sections)}
        </div>
      ))}
      </QuestionContainer>
      <ButtonContainer>
        <Button
          stylesType="common"
          backgroundColor="#fedc8c"
          backgroundColorHover={Colors.white}
          callback={previousPage}
        >
         <FormattedMessage id="wizard.previous.button" />
        </Button>
        <Button
          type="submit"
          stylesType="common"
          backgroundColor={Colors.lightGreen}
          backgroundColorHover={Colors.white}
          disabled={pristine || submitting}
        >
          {
            section.isLastStep
              ? <FormattedMessage id="wizard.submit.button" />
              : <FormattedMessage id="wizard.next.button" />
          }
        </Button>
      </ButtonContainer>
    </Form>
  )
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormDynamicPage)
