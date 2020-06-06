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

const renderField = ({ input, alias, label, placeholder, data, type, meta: { touched, error } }) => {
  return (
    <FieldContainer error={touched && error}>
      <label>{label}</label>
      <div>
        {type === 'select' ?
          <Select {...input} placeholder={placeholder || label}>
            <option selected>Seleccionar</option>
            {data?.map((item, idx) => 
              <option 
                key={idx} 
                id={item.country_phone_code} 
                value={item[`${alias}_name`]}
              >
                {item[`${alias}_name`]}
              </option>
            )}
          </Select>
        :
         <input {...input} placeholder={placeholder || label} type={type} />
        } 
      </div>
    </FieldContainer>
  ) 
}

export default renderField
