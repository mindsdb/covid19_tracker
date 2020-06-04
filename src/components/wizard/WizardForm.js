import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import WizardFormFirstPage from "./WizardFormFirstPage"
import WizardFormSecondPage from "./WizardFormSecondPage"
import WizardFormDynamicPage from "./WizardFormDynamicPage"
import { questions } from "./questions.json"
import { questions_second } from "./questions_second.json"

const WizardForm = props => {
  const { onSubmit } = props

  const [ authToken, setAuthToken ] = useState('')
  const [page, setPage] = useState(1)
  const [feeling, setFeeling] = useState(false)

  useEffect(() => {
    fetch(`${process.env.GATSBY_COUNTRY_API}/getaccesstoken`, {
      headers: {
        'Accept': 'application/json',
        'api-token': process.env.GATSBY_COUNTRY_REST_TOKEN,
        'user-email': process.env.GATSBY_COUNTRY_REST_EMAIL
      }
    })
    .then(res => res.json())
    .then(auth => {
      setAuthToken(auth.auth_token)
    })

  }, [authToken])

  const nextPage = values => {
    if (values && values.feeling) {
      setFeeling(values.feeling === "Great" ? true : false)
    }

    setPage(page + 1)
  }

  const previousPage = () => {
    setPage(page - 1)
  }

  const getDynamicStep = () => {
    const stepProps = feeling ? questions_second.find(item => page === item.page) 
      : questions.find(item => page === item.page)

    console.log('stepProps', stepProps);
    console.log('feeling', feeling);
    if (stepProps && stepProps.page) {
      return (
        <WizardFormDynamicPage
          stepProps={stepProps}
          previousPage={previousPage}
          onSubmit={stepProps.isLastStep ? onSubmit : nextPage}
        />
      )
    }

    return null
  }

  return (
    <>
      {page === 1 && <WizardFormFirstPage onSubmit={nextPage} />}
      {page === 2 && (
        <WizardFormSecondPage
          authToken={authToken}
          feeling={feeling}
          // updateMapsData={updateMapsData}
          previousPage={previousPage}
          onSubmit={nextPage}
        />
      )}
      {getDynamicStep()}
    </>
  )
}

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default WizardForm
