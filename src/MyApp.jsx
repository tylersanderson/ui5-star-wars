import React from "react";
import { ShellBar, Avatar, StandardListItem } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/icons/add.js";
import { Link } from "@ui5/webcomponents-react/lib/Link";
import { Switch, Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { People } from "./pages/people.component";
import { Species } from "./pages/species.component";
import { Films } from "./pages/films.component";
import { Planets } from "./pages/planets.component";
import { Vehicles } from "./pages/vehicles.component";
import { Home } from "./pages/home.component";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package

export function MyApp() {
  const history = useHistory();
  const handleLogoClick = () => {
    history.push("./home");
    console.log("react logo clicked!");
  };

  return (
    <>
      <ShellBar
        logo={<img alt="logo" src="react-logo.png" />}
        profile={<Avatar image="ui5-logo.png" />}
        primaryTitle={"UI5 Star Wars React App"}
        onLogoClick={handleLogoClick}
        menuItems={
          <div>
            <Link href="#/home">
              <StandardListItem
                data-key="1"
                iconEnd={false}
                infoState="None"
                selected={false}
                type="Active"
              >
                Home
              </StandardListItem>
            </Link>
            <Link href="#/films">
              <StandardListItem
                data-key="2"
                iconEnd={false}
                infoState="None"
                selected={false}
                type="Active"
              >
                Films
              </StandardListItem>
            </Link>
            <Link href="#/people">
              <StandardListItem
                data-key="3"
                iconEnd={false}
                infoState="None"
                selected={false}
                type="Active"
              >
                People
              </StandardListItem>
            </Link>
            <Link href="#/species">
              <StandardListItem
                data-key="3"
                iconEnd={false}
                infoState="None"
                selected={false}
                type="Active"
              >
                Species
              </StandardListItem>
            </Link>
            <Link href="#/planets">
              <StandardListItem
                data-key="3"
                iconEnd={false}
                infoState="None"
                selected={false}
                type="Active"
              >
                Planets
              </StandardListItem>
            </Link>
            <Link href="#/vehicles">
              <StandardListItem
                data-key="3"
                iconEnd={false}
                infoState="None"
                selected={false}
                type="Active"
              >
                Vehicles
              </StandardListItem>
            </Link>
            <Link href="#/starships">
              <StandardListItem
                data-key="3"
                iconEnd={false}
                infoState="None"
                selected={false}
                type="Active"
              >
                Starships
              </StandardListItem>
            </Link>
          </div>
        }
      ></ShellBar>
      <Switch>
        <Route path="/people" component={People} />
        <Route path="/species" component={Species} />
        <Route path="/films" component={Films} />
        <Route path="/planets" component={Planets} />
        <Route path="/home" component={Home} />
        <Route path="/vehicles" component={Vehicles} />
        <Redirect from="/" to="/home" />
      </Switch>
    </>
  );
}
