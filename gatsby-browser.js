/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react'
import 'firebase/firestore'

import ReduxProvider from '@/store/index'
import AppProvider from '@/components/providers/App'
import Layout from '@/components/layouts/Main'

export const wrapRootElement = ({ element }) => (
  <ReduxProvider>
    <AppProvider>
      {element}
    </AppProvider>
  </ReduxProvider>
)

export const wrapPageElement = ({ element, props }) => {
  const { pageContext: { locale } } = props

  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Layout {...props} locale={locale}>{element}</Layout>
}
