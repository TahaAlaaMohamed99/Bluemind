import React, { useState } from "react";
import CustomInput from "../../Components/Form/CustomInput";
import TranslationText from "../../Components/TranslationText";
 import {  NavLink, useNavigate } from "react-router-dom";
import CustomCheckbox from "../../Components/Form/CustomCheckbox";
import CustomeBtn from "../../Components/CustomeBtn";
import { IconFacebook, IconGoogle } from "../../Assets/Icons/IconsSvg";
import { useDispatch } from "react-redux";
import { signIn } from "../../Store/slices/user-slice";
import * as Yup from "yup";
import { Formik,Form  } from "formik";
  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email("* In-Valid Email")
      .required("* Email Is Required"),
    password: Yup.string().required("* Password Is Required"),
    rememberMe: Yup.boolean(),
  });
export default function Login() {
  let dispatch = useDispatch();
  const [isLoading, setIsLoading] =  useState(false);
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    console.log(data,'data')
    const { email, password } = data;
    let userData = {
      email,
      password,
    };
    dispatch(signIn(userData));
    setIsLoading(true);
    // try {
    //   const formdata = new FormData();
    //   formdata.append("email", data.email);
    //   formdata.append("password", data.password);
    //   const response = await Api.post("/auth/login/", formdata);
    //   const { access, refresh, user } = response.data;
    //   localStorage.setItem("accessToken", access);
    //   localStorage.setItem("refreshToken", refresh);
    //   localStorage.setItem("user", JSON.stringify(user));
    //   window.location.reload()
    // } catch (error) {
    //   console.error("Login error:", error);
    // } finally {
    //   setIsLoading(false);
    // }
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

      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        validationSchema={SigninSchema}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <Form
            autoComplete="off"
            noValidate
             
          >
            {/* Email */}
            <CustomInput
              label="email"
              type="text"
              placeholder="enterYourEmail"
              Required
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.email}
              touched={touched.email}
            />

            {/* Password */}
            <CustomInput
              label="password"
              type="password"
              placeholder="enterYourPassword"
              className="form_group_icon"
              Required
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.password}
              touched={touched.password}
            />

             <div className="flex justify-between mb-6">
              <CustomCheckbox
                label="rememberMe"
                value={values.rememberMe}
                onChange={() => setFieldValue("rememberMe", !values.rememberMe)}
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
                className="btn-default btn_lg w-full"
              />
              <CustomeBtn
                type="button"
                icon={<IconFacebook className="w-6 h-6" />}
                title="signInWithFacebook"
                className="btn-default btn_lg w-full"
              />
            </div>
          </Form>
        )}
      </Formik>
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
