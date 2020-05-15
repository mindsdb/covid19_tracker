import React from "react"
import { Map, GoogleApiWrapper, Marker } from "google-maps-react"
import styled from "@emotion/styled"

const OverMap = styled.div`
  div:first-of-type {
    position: relative !important;
    border-radius: 10px;
  }
`

const MapContainer = props => {
  const { lat, lng } = props
  const mapStyles = [
    {
      "stylers": [
        {
          "hue": "#007fff"
        },
        {
          "saturation": 89
        }
      ]
    },
    {
      "featureType": "water",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]
  const _mapLoaded = (mapProps, map) => {
    map.setOptions({
       styles: mapStyles
    })
 }

  return (
    <OverMap>
      {lat & lng ? (
        <Map
          google={props.google}
          zoom={18}
          initialCenter={{ lat, lng }}
          onReady={(mapProps, map) => _mapLoaded(mapProps, map)}
        >
          <Marker position={{ lat, lng }} />
        </Map>
      ) : null}
    </OverMap>
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.GATSBY_GOOGLE_MAPS_API_KEY,
})(MapContainer)
