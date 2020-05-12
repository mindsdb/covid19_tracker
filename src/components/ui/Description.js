import React from "react"

import styled from "@emotion/styled"
import { Colors } from "@/components/layouts/utils/theme"
import { makeResponsive } from "@/components/layouts/utils/base"

const CustomDescription = styled.p`
  font-family: "Karla", sans-serif;
  color: ${props => props.color || Colors.mirage};
  text-align: ${props => props.textAlign || "justify"};
  margin-top: ${props => props.marginTop || "0px"};
  margin-bottom: ${props => props.marginBottom || "0px"};
  padding: ${props => props.padding || "0px"};
  width: ${props => props.width || "auto"};
  line-height: ${props => props.width || "1.5"};


  ${props =>
    makeResponsive([
      {
        property: "font-size",
        min: props.min,
        max: props.max,
        unit: "px",
      },
    ])}
`

const Description = props => {
  const {
    children,
    customClass,
    marginTop,
    marginBottom,
    color,
    textAlign,
    min,
    max,
    padding,
    width,
    lineHeight,
  } = props

  return (
    <CustomDescription
      css={customClass}
      marginTop={marginTop}
      marginBottom={marginBottom}
      color={color}
      textAlign={textAlign}
      min={min || 18}
      max={max || 18}
      padding={padding}
      width={width}
      lineHeight={lineHeight}
    >
      {children}
    </CustomDescription>
  )
}

export default Description
