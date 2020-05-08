import React from 'react'
import { Field, reduxForm } from 'redux-form'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { FormattedMessage } from 'react-intl'

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
  touched && error ? <RequieredSpan>{error}</RequieredSpan> : false

const WizardFormDynamicPage = props => {
  const {
    handleSubmit,
    previousPage,
    stepProps = {},
    pristine,
    submitting,
  } = props

  const validateField = () => {
    if (stepProps.type === 'radio') {
      return (
        <QuestionContainer>
          <span><FormattedMessage id={stepProps.question} /></span>
          <RadioContainer>
            <RadioOptions>
              {
                stepProps.options.map((item, idx) => (
                  <Label htmlFor={item} key={idx}>
                    <Field
                      id={idx}
                      name={stepProps.name}
                      component="input"
                      type="radio"
                      value={item}
                    />
                    {item}
                  </Label>
                ))
              }
            </RadioOptions>
            <Field name={stepProps.name} component={renderError} />
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
      {
        validateField()
      }
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
            stepProps.isLastStep
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
