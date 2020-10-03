import React, { useState, useEffect } from "react";
import {
  Card,
  Text,
  List,
  StandardListItem,
  ValueState,
  ProgressIndicator,
  Title,
  TitleLevel,
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  FlexBoxDirection,
  AnalyticalTable,
  Icon,
  Button,
  ProductSwitchItem,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import { BarChart, LineChart } from "@ui5/webcomponents-react-charts";
import "@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart.js";
import "@ui5/webcomponents-icons/dist/icons/line-chart.js";
import "@ui5/webcomponents-icons/dist/icons/list.js";
import "@ui5/webcomponents-icons/dist/icons/table-view.js";
import { useHistory } from "react-router-dom";
import "@ui5/webcomponents/dist/Assets.js";
import { ProductSwitch } from "@ui5/webcomponents-react/lib/ProductSwitch";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package
import { NotificationListItem } from "@ui5/webcomponents-react/lib/NotificationListItem";
import { Switch, Route, Redirect, Link, NavLink } from "react-router-dom";

export function Home() {
  useEffect(() => {}, []);

  const history = useHistory();
  const handleProgressHeaderClick = () => {
    history.push("/detail");
  };

  return (
    <FlexBox
      justifyContent={FlexBoxJustifyContent.Center}
      wrap={FlexBoxWrap.Wrap}
      style={spacing.sapUiContentPadding}
    >
      <ProductSwitch>
        <ProductSwitchItem
          heading="Films"
          icon="attachment-video"
          subtitle="UI5 Notification Item List"
          target="_self"
          targetSrc="/#/films"
        ></ProductSwitchItem>
        <ProductSwitchItem
          heading="People"
          icon="company-view"
          subtitle="Analytical Table"
          target="_self"
          targetSrc="#/people/"
        />
        <ProductSwitchItem
          heading="Species"
          icon="work-history"
          subtitle="Concur"
          target="_self"
          targetSrc="#/species/"
        />
        <ProductSwitchItem
          heading="Planets"
          icon="world"
          subtitle="Line Chart, Bar Chart, Micro Bar Chart"
          target="_self"
          targetSrc="#/planets/"
        />
        <ProductSwitchItem
          heading="Vehicles"
          icon="shipping-status"
          subtitle="Concur"
          target="_self"
          targetSrc="#/vehicles/"
        />

        <ProductSwitchItem
          heading="Starships"
          icon="flight"
          subtitle="Concur"
          target="_self"
        />
      </ProductSwitch>
    </FlexBox>
  );
}
