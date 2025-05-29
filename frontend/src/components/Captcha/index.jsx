import React, { useEffect, useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Captcha = ({ setRecaptchaToken }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleRecaptcha = useCallback(async () => {
    if (!executeRecaptcha) {
      console.error("reCAPTCHA not ready");
      return;
    }
    try {
      const token = await executeRecaptcha("contact_form");
      setRecaptchaToken(token);
    } catch (error) {
      console.error("reCAPTCHA execution failed:", error);
      setRecaptchaToken("");
    }
  }, [executeRecaptcha, setRecaptchaToken]);

  useEffect(() => {
    handleRecaptcha();
  }, [handleRecaptcha]);

  return null; 
};

export default Captcha;