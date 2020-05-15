import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { useIntl, FormattedMessage } from "react-intl"
import styled from "@emotion/styled"

import Button from "@/components/ui/Button"
import { Colors } from "@/components/layouts/utils/theme"

const CustomInput = styled.input`
  width: 90%;
  height: 29px;
  border-radius: 5px;
  box-shadow: 2px 2px 6px -3px rgba(0, 0, 0, 0.8);
  border: solid 1px rgba(93, 105, 112, 0.3);
  background-color: var(--white);
  padding: 10px;
  margin-bottom:10px;
`
const DivContainer = styled.div`
  text-align: center;
`

const CustomForm = ({ status, message, onValidated }) => {

  const intl = useIntl()
  let email;

  const submit = () =>
    email &&
    email.value.indexOf("@") > -1 &&
    onValidated({ EMAIL: email.value });

  return (
    <>
      <strong>
        <FormattedMessage id="wizard.finish.suscribe.title" />
      </strong>
      {status === "sending" && <div style={{ color: Colors.mirage }}>{intl.formatMessage({ id:"common.sending" })}...</div>}
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: Colors.lightGreen }}
          dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id:"wizard.suscribe.success" }) }}
        />
      )}
      <br />
      <CustomInput
        ref={node => (email = node)}
        type="email"
        placeholder={intl.formatMessage({ id: "wizard.finish.email.suscribe" })}
      />
      <br />
      <Button
        type="button"
        stylesType="common"
        backgroundColor={Colors.lightGreen}
        backgroundColorHover={Colors.white}
        callback={submit}
      >
        <FormattedMessage id="wizard.finish.suscribe" />
      </Button>
    </>
  );
};

const SubscribeEmail = () => {
  return (
    <DivContainer>
      <MailchimpSubscribe
        url={process.env.GATSBY_MAILCHIMP_ACCESS}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={formData => subscribe(formData)}
          />
        )}
      />
    </DivContainer>
  );
}

export default SubscribeEmail
