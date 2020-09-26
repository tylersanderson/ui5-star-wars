import {
  FlexBox,
  FlexBoxAlignItems,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  Link,
  LinkDesign,
  ShellBar,
} from "@ui5/webcomponents-react";
import { ThemeProvider } from "@ui5/webcomponents-react/lib/ThemeProvider";
import React from "react";
import "./App.css";
import { MyApp } from "./MyApp";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <MyApp />
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
