import React from "react";
import {
  ShellBar,
  ShellBarItem,
  Avatar,
  StandardListItem,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/icons/add.js";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { People } from "./pages/people.component";
import { Films } from "./pages/films.component";
import { Home } from "./pages/home.component";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package

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
        primaryTitle={"UI5 Star Wars React App"}
        onLogoClick={handleLogoClick}
        menuItems={
          <div>
            <StandardListItem
              data-key="1"
              iconEnd={false}
              infoState="None"
              selected={false}
              type="Active"
            >
              <Link href="/">Home</Link>
            </StandardListItem>
            <StandardListItem
              data-key="2"
              iconEnd={false}
              infoState="None"
              selected={false}
              type="Active"
            >
              Films
            </StandardListItem>
            <StandardListItem
              data-key="3"
              iconEnd={false}
              infoState="None"
              selected={false}
              type="Active"
            >
              People
            </StandardListItem>
            <StandardListItem
              data-key="4"
              iconEnd={false}
              infoState="None"
              selected={false}
              type="Active"
            >
              Planets
            </StandardListItem>
          </div>
        }
      >
        <ShellBarItem src="sap-icon://add" text="Add" />
      </ShellBar>
      <Switch>
        <Route path="/people" component={People} />
        <Route path="/films" component={Films} />
        <Route path="/home" component={Home} />
        <Redirect from="/" to="/home" />
      </Switch>
    </>
  );
}
