import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
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
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import {
  BarChart,
  LineChart,
  ScatterChart,
  MicroBarChart,
} from "@ui5/webcomponents-react-charts";
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
  const [speciesTableColumnHeaders, setSpeciesTableColumnHeaders] = useState(
    []
  );
  const [speciesPage, setSpeciesPage] = useState(1);
  const [toggleCharts, setToggleCharts] = useState("lineChart");
  const [loading, setLoading] = useState(false);

  async function fetchspeciesList(x) {
    let species = await fetch(`https://swapi.dev/api/species/?page=${x}`);
    let speciesJSON = await species.json();
    return speciesJSON;
  }

  async function getListCount(data) {
    let initialList = await fetch(`https://swapi.dev/api/${data}/?page=1`);
    let initialListJSON = await initialList.json();
    return initialListJSON.count;
  }

  async function fetchspeciesListSchema() {
    const speciesSchemaResult = await fetch(
      "https://swapi.dev/api/species/schema"
    ).then((response) => response.json());
    const speciesTableColumnHeadersResult = speciesSchemaResult.required.map(
      (item) => {
        return {
          Header: item,
          accessor: item,
        };
      }
    );
    return speciesTableColumnHeadersResult;
  }

  const fetchList = async function () {
    setLoading(true);
    const max = await getListCount("species");
    const list = [];
    const requests = [];
    for (let i = 1; i <= max; i++) {
      const url = `https://swapi.dev/api/species/${i}`;
      const prom = fetch(url).then((r) => r.json());

      requests.push(prom);
    }
    //setLoading(false);
    return new Promise((resolve) => {
      Promise.all(requests)
        .then((proms) => proms.forEach((p) => list.push(p)))
        .then(() => resolve(list))
        .then(setLoading(false));
    });
  };

  useEffect(() => {
    //fetchspeciesList(speciesPage).then((result) => setSpeciesList(result));
    fetchspeciesListSchema().then((result) =>
      setSpeciesTableColumnHeaders(result)
    );
    fetchList().then((result) => setSpeciesList(result));
  }, []);

  console.log(speciesPage);
  console.log(speciesList);
  console.log(speciesTableColumnHeaders);

  // const sortedspeciesPopulationList = [...speciesList];
  // sortedspeciesPopulationList.sort(
  //   (a, b) => parseFloat(a.population) - parseFloat(b.population)
  // );

  // console.log(sortedspeciesPopulationList);

  // const sortedspeciesDiameterList = [...speciesList];
  // sortedspeciesDiameterList.sort(
  //   (a, b) => parseFloat(b.diameter) - parseFloat(a.diameter)
  // );

  // console.log(sortedspeciesDiameterList);

  return (
    <div>
      <FlexBox
        justifyContent={FlexBoxJustifyContent.Center}
        wrap={FlexBoxWrap.Wrap}
        style={spacing.sapUiContentPadding}
      >
        <Title level="H1">Species</Title>
      </FlexBox>
      <FlexBox
        justifyContent={FlexBoxJustifyContent.Center}
        wrap={FlexBoxWrap.Wrap}
        style={spacing.sapUiContentPadding}
      >
        {speciesList.map((species, i) => {
          return (
            <Card
              avatar={
                <Avatar
                  backgroundColor="Accent3"
                  icon="person-placeholder"
                  imageFitType="Cover"
                  shape="Circle"
                  size="S"
                />
              }
              headerInteractive={false}
              heading="Team Space"
              onHeaderClick={function noRefCheck() {}}
              status="3 of 5"
              style={{
                width: "300px",
                padding: "10px",
              }}
              subheading="Direct Reports"
            >
              <List
                busy={false}
                infiniteScroll={false}
                inset={false}
                mode="None"
                separators="All"
              >
                <StandardListItem
                  description="Software Architect"
                  iconEnd={false}
                  infoState="None"
                  selected={false}
                  type="Active"
                >
                  {speciesList[i].name}
                </StandardListItem>
                <StandardListItem
                  description="Visual Designer"
                  iconEnd={false}
                  infoState="None"
                  selected={false}
                  type="Active"
                >
                  Elena Petrova
                </StandardListItem>
                <StandardListItem
                  description="Quality Specialist"
                  iconEnd={false}
                  infoState="None"
                  selected={false}
                  type="Active"
                >
                  John Miller
                </StandardListItem>
              </List>
            </Card>
          );
        })}
      </FlexBox>
    </div>
  );
}
