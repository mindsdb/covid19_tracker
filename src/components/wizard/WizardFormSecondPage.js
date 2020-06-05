import React, { useState, useEffect } from "react"
import { Field, reduxForm } from 'redux-form'
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { useIntl, FormattedMessage } from "react-intl"
import "react-google-places-autocomplete/dist/index.min.css"

import renderField from './renderField'
import Title from "@/components/ui/Title"
import validate from "./validate"
import { Colors } from "@/components/layouts/utils/theme"
import Button from "@/components/ui/Button"
import { mq } from "@/components/layouts/utils/base"
import { MexicoState } from "../../utils/MexicoState"
import { Gender, Age } from "./questions/QuestionsSecondPage";

const Form = styled.form`
  input {
    padding: 10px;
    border-radius: 3px;
    border: 1px solid ${Colors.silver};
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

const WizardFormSecondPage = props => {
  const { handleSubmit, previousPage, authToken } = props
  const [ countries, setCountries ] = useState([])
  const [ states, setStates ] = useState([])
  const [ cities, setCities ] = useState([])
  const [ showCity, setshowCity ] = useState(true)
  const intl = useIntl()

  useEffect(() => {
    fetch(`${process.env.GATSBY_COUNTRY_API}/countries/`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(countries =>  setCountries(countries))
  }, [authToken])

  const getState = (state) => {
    fetch(`${process.env.GATSBY_COUNTRY_API}/states/${state}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(res => res.json())
    .then(states =>  setStates(states))
    .catch(e => console.error(e))
  }

  const getCity = (city) => {
    fetch(`${process.env.GATSBY_COUNTRY_API}/cities/${city}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(res => res.json())
    .then(cities =>  {
      const citiesList = city !== "Estado de Mexico" ? cities : MexicoState;
      setshowCity(citiesList.length > 0)
      setCities(citiesList)
    })
  }

  return (
    <Form onSubmit={handleSubmit}>

      <Title marginBottom="30px" max="10" min="25" color={Colors.mirage} >
       <FormattedMessage id="common.data.demo" />
      </Title>

      <Field 
        name="country"
        alias="country"
        type="select"
        data={countries}
        component={renderField}
        onChange={(e) => getState(e.target.value)}
        label={<strong>{intl.formatMessage({ id: "common.country" })}:</strong>}
      />
      <Field 
        name="state" 
        alias="state"
        type="select"
        data={states}
        component={renderField}
        onChange={(e) => getCity(e.target.value)}
        label={<strong>{intl.formatMessage({ id: "common.state" })}:</strong>}
      />
      {showCity &&
        <Field 
          name="city"
          alias="city" 
          type="select"
          data={cities}
          component={renderField}
          label={<strong>{intl.formatMessage({ id: "common.city" })}:</strong>}
        />
      }
      <Field
        name="postalcode"
        type="text"
        placeholder={intl.formatMessage({ id: "common.postalcode.placeholder"})}
        component={renderField}
        label={<strong>{intl.formatMessage({ id: "common.postalcode" })}:</strong>}
      />
      
      <Field 
          name="gender"
          alias="answer" 
          type="select"
          data={Gender.options}
          component={renderField}
          label={<strong>{intl.formatMessage({ id: Gender.question })}:</strong>}
        />

      <Field 
          name="age"
          alias="answer" 
          type="select"
          data={Age.options}
          component={renderField}
          label={<strong>{intl.formatMessage({ id: Age.question })}:</strong>}
        />

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
})(WizardFormSecondPage)
