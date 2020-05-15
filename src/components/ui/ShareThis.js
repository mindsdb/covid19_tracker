import React from "react"
import { InlineShareButtons } from 'sharethis-reactjs'
import { useIntl } from "react-intl"

const ShareThis =  () => {
  const intl = useIntl()

  return (
    <div>
     <InlineShareButtons
        config={{
          alignment: 'center',  // alignment of buttons (left, center, right)
          color: 'social',      // set the color of buttons (social, white)
          enabled: true,        // show/hide buttons (true, false)
          font_size: 16,        // font size for the buttons
          language: 'en',       // which language to use (see LANGUAGES)
          networks: [           // which networks to include (see SHARING NETWORKS)
            'whatsapp',
            'linkedin',
            'messenger',
            'facebook',
            'twitter'
          ],
          padding: 12,          // padding within buttons (INTEGER)
          radius: 4,            // the corner radius on each button (INTEGER)
          size: 40,             // the size of each button (INTEGER)

          // OPTIONAL PARAMETERS
          url: 'https://covid.skyalert.mx', // (defaults to current url)
          image: 'https://images.unsplash.com/photo-1588611911587-7bc55b45d588?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1287&q=80',  // (defaults to og:image or twitter:image)
          description: intl.formatMessage({ id:"banner.leftSection.desription2" }),     // (defaults to og:description or twitter:description)
          title: `COVID-19: ${intl.formatMessage({ id:"banner.leftSection.desription1" })}`,            // (defaults to og:title or twitter:title)
          message: intl.formatMessage({ id:"banner.leftSection.desription1" }),     // (only for email sharing)
          subject: 'support@mindsdb.com' ,  // (only for email sharing)
          username: 'SkyAlertMx' // (only for twitter sharing)
        }}
      />
    </div>
  )
}

export default ShareThis
