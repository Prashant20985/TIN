import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { isAuthenticated } from "../../helper/authHelper";

function Navigation(props) {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lng) => {
    console.log(lng);
    i18n.changeLanguage(lng);
  };

  const loginLogoutLink = isAuthenticated() ? (
    <a type="button" className="loginLogout" onClick={props.handleLogout}>Logout</a>
  ) : (
    <Link className="loginLogout" to="/login">Login</Link>
  );

  return (
    <div className="navbar">
      <div className="header">
        <a>
          <Link className="pagenav" to="/">
            {t("nav.main-page")}
          </Link>
        </a>
      </div>
      <div className="navitems">
        <a>
          <Link className="pagenav" to="/cars">
            {t("nav.cars")}
          </Link>
        </a>
        <a>
          <Link className="pagenav" to="/customers">
            {t("nav.customers")}
          </Link>
        </a>
        <a>
          <Link className="pagenav" to="/rents">
            {t("nav.rents")}
          </Link>
        </a>
      </div>
      <div className="navitems">
      <a>{loginLogoutLink}</a>
        <a type="button" onClick={() => handleLanguageChange("pl")}>
          PL
        </a>{" "}
        |
        <a type="button" onClick={() => handleLanguageChange("en")}>
          EN
        </a>
      </div>
    </div>
  );
}

export default Navigation;
