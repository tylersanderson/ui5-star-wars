import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  List,
  StandardListItem,
  Title,
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import { Spinner } from "@ui5/webcomponents-react/lib/Spinner";
import "@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart.js";
import "@ui5/webcomponents-icons/dist/icons/line-chart.js";
import "@ui5/webcomponents-icons/dist/icons/list.js";
import "@ui5/webcomponents-icons/dist/icons/table-view.js";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-react/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package

export function Species() {
  const [speciesList, setSpeciesList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getListCount(data) {
    let initialList = await fetch(`https://swapi.dev/api/${data}/?page=1`);
    let initialListJSON = await initialList.json();
    return initialListJSON.count;
  }

  useEffect(() => {
    const fetchList = async function () {
      setLoading(true);
      const max = await getListCount("species");
      const list = [];
      const requests = [];
      for (let i = 1; i <= max; i++) {
        const url = `https://swapi.dev/api/species/${i}/`;
        const prom = fetch(url).then((r) => r.json());

        requests.push(prom);
      }
      return new Promise((resolve) => {
        Promise.all(requests)
          .then((proms) => proms.forEach((p) => list.push(p)))
          .then(() => resolve(list));
      });
    };
    fetchList()
      .then((result) => setSpeciesList(result))
      .then(() => setLoading(false));
  }, []);

  return (
    <div>
      <FlexBox
        justifyContent={FlexBoxJustifyContent.Center}
        wrap={FlexBoxWrap.Wrap}
        style={spacing.sapUiContentPadding}
      >
        <Title level="H1">Species</Title>
      </FlexBox>
      {loading ? (
        <Spinner />
      ) : (
        <FlexBox
          justifyContent={FlexBoxJustifyContent.Center}
          wrap={FlexBoxWrap.Wrap}
          style={spacing.sapUiContentPadding}
        >
          {speciesList.map((species, i) => {
            return (
              <Card
                key={i}
                avatar={
                  <Avatar
                    backgroundColor="Accent6"
                    icon="person-placeholder"
                    imageFitType="Cover"
                    shape="Circle"
                    size="S"
                  />
                }
                headerInteractive={false}
                heading={speciesList[i].name}
                onHeaderClick={function noRefCheck() {}}
                status={`${i + 1} of ${speciesList.length}`}
                style={{
                  width: "300px",
                  padding: "10px",
                }}
                subheading="Species"
              >
                <List
                  busy={false}
                  infiniteScroll={false}
                  inset={false}
                  mode="None"
                  separators="All"
                >
                  <StandardListItem
                    description="Classification"
                    iconEnd={false}
                    infoState="None"
                    selected={false}
                    type="Active"
                  >
                    {speciesList[i].classification}
                  </StandardListItem>
                  <StandardListItem
                    description="Languange"
                    iconEnd={false}
                    infoState="None"
                    selected={false}
                    type="Active"
                  >
                    {speciesList[i].language}
                  </StandardListItem>
                  <StandardListItem
                    description="Average Lifespan"
                    iconEnd={false}
                    infoState="None"
                    selected={false}
                    type="Active"
                  >
                    {speciesList[i].average_lifespan}
                  </StandardListItem>
                </List>
              </Card>
            );
          })}
        </FlexBox>
      )}
    </div>
  );
}
