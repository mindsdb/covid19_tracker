import React from 'react'
import PropTypes from 'prop-types'
import 'firebase/firestore'

import ReduxProvider from '@/store/index'
import Layout from '@/components/layouts/Main'

export const wrapRootElement = ({ element }) => (
  <ReduxProvider>
    {element}
  </ReduxProvider>
)

wrapRootElement.propTypes = {
  element: PropTypes.shape().isRequired,
}

export const wrapPageElement = ({ element, props }) => {
  const { pageContext: { locale } } = props

  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Layout {...props} locale={locale}>{element}</Layout>
}
