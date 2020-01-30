import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import Icon from "../Icon";
import LinksGroup from "./LinksGroup/LinksGroup";

import s from "./Sidebar.module.scss";

const Sidebar = () => (
  <nav className={s.root}>
    <header className={s.logo}>
      <Link to="/app/main">
        <Icon glyph="logo" />
      </Link>
    </header>
    <ul className={s.nav}>
      <LinksGroup header="Dashboard" headerLink="/app/main" glyph="dashboard" />
      {localStorage.getItem("role") === "Admin" ? (
        <LinksGroup
          header="Business"
          headerLink="/app/business"
          glyph="typography"
        />
      ) : (
        ""
      )}

      <LinksGroup
        header="Product Categories"
        headerLink="/app/product-category"
        glyph="typography"
      />
      <LinksGroup
        header="Products"
        headerLink="/app/products"
        glyph="typography"
      />
    </ul>
  </nav>
);

export default Sidebar;
