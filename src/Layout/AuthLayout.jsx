import React from "react";
import { Link, Outlet } from "react-router-dom";
import AuthHeader from "../Components/AuthHeader";

import TranslationText from "../Components/TranslationText";
import { IconArrowRight } from "../Assets/Icons/IconsSvg";
import { ToastContainer } from "react-toastify";
export default function AuthLayout() {
  return (
    <div className="Auth_Layout">
      <div>
        <AuthHeader />
        <div className="text_Layout">
          <h1 className="title">
            <TranslationText title="transformDataIntoDecisions" />
          </h1>
          <p>
            <TranslationText title="blueMindIntro" />
          </p>
        </div>
      </div>
      <div>
        <div className="container_Form_Layout">
          <div className="header_Form_Layout">
            <Link to="/auth/login" className="Back_To_Web">
              <TranslationText title="backToWebsite" />
              <span className="Icon_Back">
                <IconArrowRight />
              </span>
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>

  );
}
