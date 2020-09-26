import React from "react";
import { ShellBar, ShellBarItem, Avatar } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/icons/add.js";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./Home";
import { Detail } from "./Detail";
import { useHistory } from "react-router-dom";

export function MyApp() {
  const history = useHistory();
  const handleLogoClick = () => {
    history.push("./");
  };

  return (
    <>
      <ShellBar
        logo={<img src="react-logo.png" />}
        profile={<Avatar image="ui5-logo.png" />}
        primaryTitle={"My App"}
        onLogoClick={handleLogoClick}
      >
        <ShellBarItem src="sap-icon://add" text="Add" />
      </ShellBar>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/detail" component={Detail} />
        <Redirect from="/" to="/home" />
      </Switch>
    </>
  );
}
