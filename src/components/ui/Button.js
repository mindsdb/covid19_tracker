import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { Colors } from '@/components/layouts/utils/theme'

const getBackgroungColor = (props) => {
  const {
    disabled,
    backgroundColor,
  } = props
  if (disabled) {
    return 'transparent'
  }

  if (backgroundColor) {
    return backgroundColor
  }

  return 'transparent'
}

const CustomButton = styled.button`
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  background-color: ${props => getBackgroungColor(props)};
  border: ${props => props.disabled ? `1px solid ${Colors.mirage}` : 'none'};
  color: ${props => props.disabled ? Colors.mirage : Colors.white};

  &:hover {
    color: ${props => props.disabled ? Colors.mirage : Colors.lightGreen};
    background-color: ${props => props.disabled ? getBackgroungColor(props) : (props.backgroundColorHover || props.backgroundColor)};
  
    border: ${props => props.disabled ? `1px solid ${Colors.mirage}` : `1px solid ${Colors.lightGreen}`};
    svg {
      path {
        fill: ${props => props.fillIconColorHover || Colors.white};
      }
    }
  }

  svg {
    path {
      fill: ${props => props.fillIconColor || Colors.white};
    }
  }

  a {
    text-decoration: none;
    color: ${Colors.white};

    &:hover {
      color: ${Colors.lightGreen};
    }
  }
`
const common = css`
  width: 290px;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;
`
const link = css`
  color: ${Colors.burntSienna};
  font-size: 16px;
  border-bottom: 1px solid transparent;

  &:hover {
    color: ${Colors.burntSienna};
    border-bottom: 1px solid ${Colors.burntSienna};
  }
`
const icon = css`
  height: 34px;

  svg {
    height: 34px;
    width: 34px;
  }
`

const buttonStylesType = {
  common,
  link,
  icon,
}

const Button = (props) => {
  const {
    children,
    icon,
    customClass,
    callback,
    stylesType,
    ariaLabel,
    disabled,
    fillIconColor,
    fillIconColorHover,
    backgroundColor,
    backgroundColorHover,
    type = 'button',
  } = props

  const Icon = icon

  return (
    <CustomButton
      {...props}
      css={buttonStylesType[stylesType] || customClass}
      onClick={() => disabled ? () => {} : callback && callback()}
      aria-label={ariaLabel}
      fillIconColor={fillIconColor}
      fillIconColorHover={fillIconColorHover}
      backgroundColor={backgroundColor}
      backgroundColorHover={backgroundColorHover}
      disabled={disabled}
      type={type}
    >
      {
        icon
          ? <Icon />
          : children
      }
    </CustomButton>
  )
}

export default Button
