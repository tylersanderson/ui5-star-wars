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
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import { BarChart, LineChart } from "@ui5/webcomponents-react-charts";
import "@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart.js";
import "@ui5/webcomponents-icons/dist/icons/line-chart.js";
import "@ui5/webcomponents-icons/dist/icons/list.js";
import "@ui5/webcomponents-icons/dist/icons/table-view.js";
import { useHistory } from "react-router-dom";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package

export function Planets() {
  const [planetsList, setPlanetsList] = useState([]);
  const [planetsTableColumnHeaders, setPlanetsTableColumnHeaders] = useState(
    []
  );
  const [planetsPage, setPlanetsPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function fetchplanetsList(x) {
    let planets = await fetch(`https://swapi.dev/api/planets/?page=${x}`);
    let planetsJSON = await planets.json();
    setLoading(false);
    return planetsJSON;
  }

  async function getListCount(data) {
    let initialList = await fetch(`https://swapi.dev/api/${data}/?page=1`);
    let initialListJSON = await initialList.json();
    return initialListJSON.count;
    //console.log(initialListJSON.count);
  }

  async function fetchplanetsListSchema() {
    const planetsSchemaResult = await fetch(
      "https://swapi.dev/api/planets/schema"
    ).then((response) => response.json());
    const planetsTableColumnHeadersResult = planetsSchemaResult.required.map(
      (item) => {
        return {
          Header: item,
          accessor: item,
        };
      }
    );
    return planetsTableColumnHeadersResult;
  }

  const fetchList = async function () {
    const max = await getListCount("planets");
    const list = [];
    const requests = [];
    for (let i = 1; i <= max; i++) {
      const url = `https://swapi.dev/api/planets/${i}`;
      const prom = fetch(url).then((r) => r.json());

      requests.push(prom);
    }
    return new Promise((resolve) => {
      Promise.all(requests)
        .then((proms) => proms.forEach((p) => list.push(p)))
        .then(() => resolve(list));
    });
  };

  fetchList().then(console.log);

  useEffect(() => {
    fetchplanetsList(planetsPage).then((result) => setPlanetsList(result));
    fetchplanetsListSchema().then((result) =>
      setPlanetsTableColumnHeaders(result)
    );
  }, []);

  console.log(planetsPage);
  console.log(planetsList);
  console.log(planetsList.results);
  console.log(planetsTableColumnHeaders);
  //getListCount("planets");

  const handleNextPageClick = async () => {
    if (planetsPage <= 8) {
      setLoading(true);
      const newPage = planetsPage + 1;
      fetchplanetsList(newPage).then((result) => setPlanetsList(result));
      setPlanetsPage(newPage);
    }
  };

  const handleBackPageClick = () => {
    if (planetsPage >= 2) {
      const newPage = planetsPage - 1;
      fetchplanetsList(newPage).then((result) => setPlanetsList(result));
      setPlanetsPage(newPage);
      setLoading(true);
    }
  };

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
      <Card
        heading="Planets"
        style={{ maxWidth: "1200px", ...spacing.sapUiContentPadding }}
        avatar={<Icon name="table-view" />}
      >
        <AnalyticalTable
          data={planetsList.results}
          columns={planetsTableColumnHeaders}
          visibleRows={10}
          scaleWidthMode={"Grow"}
          loading={loading}
        />
        <FlexBox
          justifyContent={FlexBoxJustifyContent.Center}
          wrap={FlexBoxWrap.Wrap}
          style={spacing.sapUiContentPadding}
        >
          <Button
            icon="arrow-left"
            onClick={handleBackPageClick}
            disabled={planetsList.previous == null ? true : false}
          >
            Back
          </Button>
          <Button
            icon="arrow-right"
            onClick={handleNextPageClick}
            disabled={planetsList.next == null ? true : false}
          >
            Next
          </Button>
        </FlexBox>
      </Card>
    </FlexBox>
  );
}
