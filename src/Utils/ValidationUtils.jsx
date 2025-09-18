import * as yup from "yup";

export const schemaLogin = yup.object().shape({
    email: yup.string().email("invalidEmailFormat").required("emailRequired"),
    password: yup
        .string()
        .min(6, "passwordMinLength")
        .matches(/[A-Z]/, "passwordMustIncludeCapital")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "passwordMustIncludeSpecial")
        .required("passwordRequired"),
});

export const schemaForgotPassword = yup.object().shape({
    email: yup.string().email("invalidEmailFormat").required("emailRequired"),
});
export const schemaOTPPassword = yup.object().shape({
    otp: yup.string()
        .matches(/^\d{5}$/, "The code must be exactly 5 digits.") // التحقق من أن الكود مكون من 6 أرقام فقط
        .required("Please enter the verification code.")
});
export const schemaNewPassword = yup.object().shape({
    password: yup
        .string()
        .min(6, "passwordMinLength")
        .matches(/[A-Z]/, "passwordMustIncludeCapital")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "passwordMustIncludeSpecial")
        .required("passwordRequired"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], "passwordsDoNotMatch")
        .required("confirmPasswordRequired"),
});


export const schemaRegister = yup.object().shape({
    fullName: yup
    .string()
    .min(5, "fullNameMinLength")
    .matches(/^[^\d]*$/, "fullNameNoNumbers") 
    .required("fullNameRequired"),
    phone: yup
      .string()
      .matches(/^\d{10,15}$/, "invalidPhoneNumberFormat")
      .required("phoneNumberRequired"),
      email: yup.string().email("invalidEmailFormat").required("emailRequired"),

  });