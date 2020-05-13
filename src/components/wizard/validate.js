const validate = values => {
  const errors = {}
  if (!values.feeling) {
    errors.feeling = "common.required"
  }
  if (!values.gender) {
    errors.gender = "common.required"
  }
  if (!values.smoker) {
    errors.smoker = "common.required"
  }
  if (!values.hypertension) {
    errors.hypertension = "common.required"
  }
  if (!values.diabetes) {
    errors.diabetes = "common.required"
  }
  if (!values.coronaryHeartDesease) {
    errors.coronaryHeartDesease = "common.required"
  }
  if (!values.fatigue) {
    errors.fatigue = "common.required"
  }
  if (!values.breathingProblems) {
    errors.breathingProblems = "common.required"
  }
  if (!values.cough) {
    errors.cough = "common.required"
  }
  if (!values.sputum) {
    errors.sputum = "common.required"
  }
  if (!values.respiratoryRate) {
    errors.respiratoryRate = "common.required"
  }
  if (!values.fever) {
    errors.fever = "common.required"
  }
  if (!values.myalgia) {
    errors.myalgia = "common.required"
  }
  if (!values.nausea) {
    errors.nausea = "common.required"
  }
  if (!values.diarrhoea) {
    errors.diarrhoea = "common.required"
  }
  if (!values.exposed) {
    errors.exposed = "common.required"
  }

  return errors
}

export default validate
