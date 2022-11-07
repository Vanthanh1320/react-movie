import React from "react";
import { Routes, Route} from "react-router-dom";

import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import Home from "../pages/Home";

const Config = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category/search/:keyword" element={<Catalog />} />
      <Route path="/:category" element={<Catalog />}/>
      <Route path="/:category/:id" element={<Detail />} />
    </Routes>
  );
};

export default Config;
