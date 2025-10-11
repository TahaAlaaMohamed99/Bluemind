import React from "react";
import CustomInput from "../../Components/Form/CustomInput";
import TranslationText from "../../Components/TranslationText";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import CustomeBtn from "../../Components/CustomeBtn";
import {
  IconArrowLeft,
  IconFacebook,
  IconGoogle,
} from "../../Assets/Icons/IconsSvg";
import axios from "axios";
import { notifyError, notifySuccess } from "../../Utils/Notification";
import * as yup from "yup";

// ✅ Validation Schema
const schemaSignUp = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone_number: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  password1: yup
    .string()
    .min(6, "passwordMinLength")
    .matches(/[A-Z]/, "passwordMustIncludeCapital")
    .matches(/[0-9]/, "password Must Include Number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "passwordMustIncludeSpecial")
    .required("passwordRequired"),

  password2: yup
    .string()
    .oneOf([yup.ref("password1"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function CreateAccount() {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(schemaSignUp),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      phone_number: "",
      password1: "",
      password2: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("phone_number", data.phone_number);
      formData.append("password1", data.password1);
      formData.append("password2", data.password2);

      const response = await axios.post(
        "http://54.235.109.101/auth/signup/",
        formData
      );

      if (response.status === 201) {
        notifySuccess("Account created successfully!");
        navigate("/auth/login");
      } else {
        notifyError("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      notifyError(error.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="from_editor_Auth">
      <Link to="/auth/login" className="btn_back">
        <span className="icon_back">
          <IconArrowLeft />
        </span>
        <TranslationText title="backToLogin" />
      </Link>

      <div className="text_Form_Layout">
        <h1 className="title">Create Account</h1>
        <p className="description">
          Sign up now and start your journey with us!
        </p>
      </div>

      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="Auth-form"
      >
        {/* Username */}
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <CustomInput
              label="username"
              type="text"
              placeholder="enterYourUsername"
              Required
              {...field}
              errors={errors.username?.message}
              touched={touchedFields.username}
            />
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <CustomInput
              label="email"
              type="text"
              placeholder="enterYourEmail"
              Required
              {...field}
              errors={errors.email?.message}
              touched={touchedFields.email}
            />
          )}
        />

        {/* Phone Number */}
        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => (
            <CustomInput
              label="phoneNumber"
              type="text"
              placeholder="enterYourPhoneNumber"
              Required
              {...field}
              errors={errors.phone_number?.message}
              touched={touchedFields.phone_number}
            />
          )}
        />

        {/* Password */}
        <Controller
          name="password1"
          control={control}
          render={({ field }) => (
            <CustomInput
              label="password"
              type="password"
              placeholder="enterYourPassword"
              className="form_group_icon"
              Required
              {...field}
              errors={errors.password1?.message}
              touched={touchedFields.password1}
            />
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="password2"
          control={control}
          render={({ field }) => (
            <CustomInput
              label="confirmPassword"
              type="password"
              placeholder="confirmYourPassword"
              className="form_group_icon"
              Required
              {...field}
              errors={errors.password2?.message}
              touched={touchedFields.password2}
            />
          )}
        />

        <CustomeBtn
          type="submit"
          title="Sign Up"
          isLoading={isLoading}
          className="btn-primary w-full"
        />
      </form>
    </div>
  );
}
