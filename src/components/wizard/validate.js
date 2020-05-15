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

  if (!values.age) {
    errors.age = "common.required"
  }
  if (!values.self_isolating) {
    errors.self_isolating = "common.required"
  }
  if (!values.social_distancing) {
    errors.social_distancing = "common.required"
  }
  if (!values.facemask) {
    errors.facemask = "common.required"
  }
  if (!values.wash_your_hands) {
    errors.wash_your_hands = "common.required"
  }
  if (!values.contact_with_covid19) {
    errors.contact_with_covid19 = "common.required"
  }
  if (!values.know_someone_with_covid19) {
    errors.know_someone_with_covid19 = "common.required"
  }
  if (!values.crowded_risk_places) {
    errors.crowded_risk_places = "common.required"
  }
  if (!values.eat_healthy_diet) {
    errors.eat_healthy_diet = "common.required"
  }
  if (!values.clean_surfaces_regularly) {
    errors.clean_surfaces_regularly = "common.required"
  }
  if (!values.order_food_with_delivery) {
    errors.order_food_with_delivery = "common.required"
  }
  if (!values.order_food_with_delivery) {
    errors.order_food_with_delivery = "common.required"
  }


  return errors
}

export default validate
