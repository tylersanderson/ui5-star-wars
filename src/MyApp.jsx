import React from "react";
import { ShellBar, Avatar, StandardListItem } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/icons/add.js";
import { Switch, Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { People } from "./pages/people.component";
import { Species } from "./pages/species.component";
import { Films } from "./pages/films.component";
import { Planets } from "./pages/planets.component";
import { Vehicles } from "./pages/vehicles.component";
import { Starships } from "./pages/starships.component";
import { Home } from "./pages/home.component";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package

export function MyApp() {
  const history = useHistory();
  const handleLogoClick = () => {
    history.push("./home");
  };

  const handleMenuItemClick = (item) => {
    switch (item.detail.item.dataset.key) {
      case "Home":
        history.push("./home");
        break;
      case "Films":
        history.push("./films");
        break;
      case "People":
        history.push("./people");
        break;
      case "Species":
        history.push("./species");
        break;
      case "Planets":
        history.push("./planets");
        break;
      case "Vehicles":
        history.push("./vehicles");
        break;
      case "Starships":
        history.push("./starships");
        break;
    }
  };

  return (
    <>
      <ShellBar
        logo={<img alt="logo" src="react-logo.png" />}
        profile={<Avatar image="ui5-logo.png" />}
        primaryTitle={"UI5 Star Wars React App"}
        onLogoClick={handleLogoClick}
        onMenuItemClick={handleMenuItemClick}
        menuItems={
          <div>
            <StandardListItem
              data-key="Home"
              iconEnd={false}
              infoState="None"
              selected={false}
              type="Active"
            >
              Home
            </StandardListItem>
            <StandardListItem
              data-key="Films"
              iconEnd={false}
              infoState="None"
              selected={false}
              type="Active"
            >
              Films
            </StandardListItem>
            <StandardListItem
              data-key="People"
              iconEnd={false}
              infoState="None"
              selected={false}
              type="Active"
            >
              People
            </StandardListItem>
            <StandardListItem
              data-key="Species"
              iconEnd={false}
              infoState="None"
              selected={false}
              type="Active"
            >
              Species
            </StandardListItem>
            <StandardListItem
              data-key="Planets"
              iconEnd={false}
              infoState="None"
              selected={false}
              type="Active"
            >
              Planets
            </StandardListItem>
            <StandardListItem
              data-key="Vehicles"
              iconEnd={false}
              infoState="None"
              selected={false}
              type="Active"
            >
              Vehicles
            </StandardListItem>
            <StandardListItem
              data-key="Starships"
              iconEnd={false}
              infoState="None"
              selected={false}
              type="Active"
            >
              Starships
            </StandardListItem>
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
        <Route path="/starships" component={Starships} />
        <Redirect from="/" to="/home" />
      </Switch>
    </>
  );
}
