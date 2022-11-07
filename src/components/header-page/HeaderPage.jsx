import React from "react";

import bg from "../../assets/footer-bg.jpg";
import './header-page.scss';

const HeaderPage = (props) => {
  return (
    <div className="header-page" style={{ backgroundImage: `url(${bg})` }}>
      <h2>{props.children}</h2>
    </div>
  );
};

export default HeaderPage;
