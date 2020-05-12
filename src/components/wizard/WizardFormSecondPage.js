import React, { useState } from "react"
import { reduxForm } from "redux-form"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { FormattedMessage } from "react-intl"
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete"
import "react-google-places-autocomplete/dist/index.min.css"

import Title from "@/components/ui/Title"
import validate from "./validate"
import { Colors } from "@/components/layouts/utils/theme"
import Button from "@/components/ui/Button"
import { mq } from "@/components/layouts/utils/base"
import Map from "@/components/ui/Map"

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
  const { handleSubmit, previousPage, feeling, updateMapsData } = props

  const [lat, setLat] = useState()
  const [lng, setLng] = useState()
  const [addressData, setaddressData] = useState()

  const validateField = () => {
    return addressData
      ? !Object.keys(addressData).every(x => addressData[x] !== "")
      : true
  }

  const getAddressInfo = data => {
    setLat()
    setLng()

    setTimeout(() => {
      if (data.place_id) {
        geocodeByPlaceId(data.place_id)
          .then(results => {
            const data = {}

            results[0].address_components.forEach(x => {
              if (x.types.includes("locality")) {
                data.city = x.long_name
              } else if (x.types.includes("country")) {
                data.country = x.long_name
              } else if (x.types.includes("administrative_area_level_1")) {
                data.state = x.long_name
              } else if (x.types.includes("sublocality")) {
                data.neighborhood = x.long_name
              } else if (x.types.includes("postal_code")) {
                data.postal_code = x.long_name
              }
            })

            const geo = results[0].geometry.location

            updateMapsData(data)
            setaddressData(data)
            setLat(geo.lat())
            setLng(geo.lng())
          })
          .catch(error => console.error(error))
      }
    }, 500)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Title marginBottom="30px" max="10" min="25" color={Colors.mirage} >
       <FormattedMessage id="wizard.static.question2" />
      </Title>
      <>
        <GooglePlacesAutocomplete
          apiKey={process.env.GATSBY_GOOGLE_MAPS_API_KEY}
          onSelect={getAddressInfo}
        />

        {lat & lng ? <Map lat={lat} lng={lng} /> : null}
      </>
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
          onClick={updateMapsData(addressData)}
          backgroundColor={Colors.lightGreen}
          backgroundColorHover={Colors.white}
          disabled={validateField()}
        >
          {feeling ? (
            <FormattedMessage id="wizard.submit.button" />
          ) : (
            <FormattedMessage id="wizard.next.button" />
          )}
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
