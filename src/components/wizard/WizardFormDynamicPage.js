import React from 'react'
import { Field, reduxForm } from 'redux-form'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

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

  span {
    color: ${Colors.burntSienna};
  }
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
  justify-content: center;
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
    font-size: 20px;
  }
`

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false

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
          <span>{stepProps.question}</span>
          <RadioContainer>
            <RadioOptions>
              {
                stepProps.options.map((item, idx) => (
                  <Label htmlFor={item}>
                    <Field
                      id={item}
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
          label={<strong css={CustomInputText}>{stepProps.question}</strong>}
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
          backgroundColor={Colors.mirage}
          backgroundColorHover={Colors.white}
          callback={previousPage}
        >
          Previous Question
        </Button>
        <Button
          type="submit"
          stylesType="common"
          backgroundColor={Colors.mirage}
          backgroundColorHover={Colors.white}
          disabled={pristine || submitting}
        >
          {
            stepProps.isLastStep
              ? 'Submit'
              : 'Next Question'
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
