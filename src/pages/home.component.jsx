import React, { useEffect } from "react";
import {
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  ProductSwitchItem,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import "@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart.js";
import "@ui5/webcomponents-icons/dist/icons/line-chart.js";
import "@ui5/webcomponents-icons/dist/icons/list.js";
import "@ui5/webcomponents-icons/dist/icons/table-view.js";
import "@ui5/webcomponents/dist/Assets.js";
import { ProductSwitch } from "@ui5/webcomponents-react/lib/ProductSwitch";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package

export function Home() {
  useEffect(() => {}, []);

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
          targetSrc="#/films"
        ></ProductSwitchItem>
        <ProductSwitchItem
          heading="People"
          icon="company-view"
          subtitle="UI5 Analytical Table"
          target="_self"
          targetSrc="#/people"
        />
        <ProductSwitchItem
          heading="Species"
          icon="work-history"
          subtitle="UI5 Card"
          target="_self"
          targetSrc="#/species"
        />
        <ProductSwitchItem
          heading="Planets"
          icon="world"
          subtitle="UI5 Line Chart, Bar Chart, Micro Bar Chart"
          target="_self"
          targetSrc="#/planets"
        />
        <ProductSwitchItem
          heading="Vehicles"
          icon="shipping-status"
          subtitle="UI5 Carousel and Object Page"
          target="_self"
          targetSrc="#/vehicles"
        />

        <ProductSwitchItem
          heading="Starships"
          icon="flight"
          subtitle="UI5 Panel"
          target="_self"
          targetSrc="#/starships"
        />
      </ProductSwitch>
    </FlexBox>
  );
}
