import React, { useState } from "react"
import PropTypes from "prop-types"

import WizardFormFirstPage from "./WizardFormFirstPage"
import WizardFormSecondPage from "./WizardFormSecondPage"
import WizardFormDynamicPage from "./WizardFormDynamicPage"
import { questions } from "./questions.json"
import { questions_second } from "./questions_second.json"

const WizardForm = props => {
  const { onSubmit, updateMapsData } = props

  const [page, setPage] = useState(1)
  const [feeling, setFeeling] = useState(false)

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
          feeling={feeling}
          updateMapsData={updateMapsData}
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
