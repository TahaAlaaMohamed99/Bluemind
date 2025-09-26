import React from "react";
import CustomInput from "../../Components/Form/CustomInput";
import TranslationText from "../../Components/TranslationText";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink } from 'react-router-dom';
import CustomCheckbox from '../../Components/Form/CustomCheckbox';
import CustomeBtn from '../../Components/CustomeBtn';
import { IconFacebook, IconGoogle } from '../../Assets/Icons/IconsSvg';
import { schemaLogin } from '../../Utils/ValidationUtils';
import axios from 'axios';
export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schemaLogin),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data) => {
   const formdata = new FormData();
formdata.append("email", data.email);
formdata.append("password",  data.password);

fetch("http://54.235.109.101/auth/login/", {
  method: "POST",
  body: formdata,
})
  .then((response) => response.json())
  .then((result) => console.log("Login response:", result))
  .catch((error) => console.error("Error:", error));

  };

  return (
    <div className="from_editor_Auth">
      <div className="text_Form_Layout">
        <h1 className="title">
          <TranslationText title="logInToYourAccount" />
        </h1>
        <p className="description">
          <TranslationText title="welcomeBackMessage" />
        </p>
      </div>
      <form
        autoComplete="off"
        noValidate="noValidate"
        onSubmit={handleSubmit(onSubmit)}
        className="Auth-form"
      >
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

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <CustomInput
              label="password"
              type="password"
              placeholder="enterYourPassword"
              className="form_group_icon"
              Required
              {...field}
              errors={errors.password?.message}
              touched={touchedFields.password}
            />
          )}
        />
        <div className="flex justify-between mb-6">
          <CustomCheckbox
            label="rememberMe"
            value={watch("rememberMe")}
            onChange={() => setValue("rememberMe", !watch("rememberMe"))}
            lang={true}
          />

          <NavLink
            className="font-semibold text-sm text-secondary dark:text-primary hover:underline"
            to={`/ForgotPassword/${btoa(1)}/${btoa("key")}`}
          >
            <TranslationText title="forgotPassword" />
          </NavLink>
        </div>
        <CustomeBtn
          type="submit"
          title="signIn"
          isLoading={isLoading}
          className="btn-primary w-full"
        />
        <div className="grid grid-cols-2 gap-4 mt-6">
          <CustomeBtn
            type="button"
            icon={<IconGoogle className="w-6 h-6" />}
            title="signInWithGoogle"
            className="btn-default btn_lg  w-full"
          />
          <CustomeBtn
            type="button"
            icon={<IconFacebook className="w-6 h-6" />}
            title="signInWithFacebook"
            className="btn-default btn_lg  w-full"
          />
        </div>
      </form>
      <div className=" text-center mt-2">
        <p className="text-sm text-titleColor-light dark:text-titleColor-dark">
          <TranslationText title="noAccount" />
          <NavLink
            className="font-semibold ms-0.5  text-secondary dark:text-primary hover:underline"
            to={`/Register/${btoa(1)}/${btoa("key")}`}
          >
            <TranslationText title="createAccount" />
          </NavLink>
        </p>
      </div>
    </div>
  );
}
