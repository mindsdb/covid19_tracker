import React from 'react'

import styled from '@emotion/styled'
import { Colors } from '@/components/layouts/utils/theme'

const Select = styled.select`
  padding: 10px;
  border-radius: 3px;
  border: 1px solid #CDCDCD;
`
const FieldContainer = styled.div`
  span {
    color: ${Colors.burntSienna};
  }

  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  
  input, select {
    border: ${props => props.error ? `1px solid ${Colors.burntSienna}` : 'auto'};
  }
`

const renderField = ({ input, label, placeholder, type, meta: { touched, error } }) => (
  <FieldContainer error={touched && error}>
    <label>{label}</label>
    <div>
      {type === 'select' ?
        <Select {...input} placeholder={placeholder || label}>
          <option selected>Seleccionar</option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </Select>
      :
       <input {...input} placeholder={placeholder || label} type={type} />
      } 
    </div>
  </FieldContainer>
)

export default renderField
