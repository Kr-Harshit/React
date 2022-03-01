import { useState } from "react";

import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Content from "./Content/Content";
import "./Admin.css";

function Admin() {
  const [activePath, setActivePath] = useState("Kitchen");

  const activeOptionHandler = (selectedOption) => {
    setActivePath(selectedOption);
  };

  return (
    <div className="admin">
      <Sidebar getActiveOption={activeOptionHandler} />
      <div className="column-container">
        <Header active={activePath} />
        <Content />
      </div>
    </div>
  );
}

export default Admin;
