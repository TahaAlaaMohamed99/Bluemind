import React from "react";

import { IconlogoSvg, IconTextLogoSvg } from "../Assets/Icons/IconsSvg";
export default function Loader() {
  return (
    <div className="loader-container">
      <span className="loader" />
      <div className="loader-logo">
        <span className="icon_logo">
          <IconlogoSvg />
        </span>
      </div>
      <div className="loader_text">
        <IconTextLogoSvg />
      </div>
    </div>
  );
}
