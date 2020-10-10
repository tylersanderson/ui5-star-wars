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

export function Planets() {
  const [planetsList, setPlanetsList] = useState([]);
  const [planetsTableColumnHeaders, setPlanetsTableColumnHeaders] = useState(
    []
  );
  const [planetsPage, setPlanetsPage] = useState(1);
  const [toggleCharts, setToggleCharts] = useState("lineChart");
  const [loading, setLoading] = useState(false);

  async function fetchplanetsList(x) {
    let planets = await fetch(`https://swapi.dev/api/planets/?page=${x}`);
    let planetsJSON = await planets.json();
    return planetsJSON;
  }

  async function getListCount(data) {
    let initialList = await fetch(`https://swapi.dev/api/${data}/?page=1`);
    let initialListJSON = await initialList.json();
    return initialListJSON.count;
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
    setLoading(true);
    const max = await getListCount("planets");
    const list = [];
    const requests = [];
    for (let i = 1; i <= max; i++) {
      const url = `https://swapi.dev/api/planets/${i}`;
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
    //fetchplanetsList(planetsPage).then((result) => setPlanetsList(result));
    fetchplanetsListSchema().then((result) =>
      setPlanetsTableColumnHeaders(result)
    );
    fetchList().then((result) => setPlanetsList(result));
  }, []);

  console.log(planetsPage);
  console.log(planetsList);
  console.log(planetsList.results);
  console.log(planetsTableColumnHeaders);
  //getListCount("planets");

  const sortedPlanetsPopulationList = [...planetsList];
  sortedPlanetsPopulationList.sort(
    (a, b) => parseFloat(a.population) - parseFloat(b.population)
  );

  console.log(sortedPlanetsPopulationList);

  const sortedPlanetsDiameterList = [...planetsList];
  sortedPlanetsDiameterList.sort(
    (a, b) => parseFloat(b.diameter) - parseFloat(a.diameter)
  );

  console.log(sortedPlanetsDiameterList);

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

  const handleHeaderClick = () => {
    if (toggleCharts === "lineChart") {
      setToggleCharts("barChart");
    } else {
      setToggleCharts("lineChart");
    }
  };

  const contentTitle =
    toggleCharts === "lineChart" ? "Line Chart" : "Bar Chart";
  const switchToChart =
    toggleCharts === "lineChart" ? "Bar Chart" : "Line Chart";

  return (
    <FlexBox
      justifyContent={FlexBoxJustifyContent.Center}
      wrap={FlexBoxWrap.Wrap}
      style={spacing.sapUiContentPadding}
    >
      <Title level="H1">Planets</Title>
      <Card
        avatar={
          <Icon
            name={
              toggleCharts === "lineChart"
                ? "line-chart"
                : "horizontal-bar-chart"
            }
          />
        }
        heading="Planet Population"
        style={spacing.sapUiContentPadding}
        headerInteractive
        onHeaderClick={handleHeaderClick}
        subheading={`Click here to switch to ${switchToChart}`}
      >
        <Text style={spacing.sapUiContentPadding}>{contentTitle}</Text>
        {toggleCharts === "lineChart" ? (
          <LineChart
            dimensions={[{ accessor: "name" }]}
            measures={[{ accessor: "population", label: "Population" }]}
            dataset={sortedPlanetsPopulationList.slice(0, 10)}
            loading={loading}
          />
        ) : (
          <BarChart
            dimensions={[{ accessor: "name" }]}
            measures={[{ accessor: "population", label: "Population" }]}
            dataset={sortedPlanetsPopulationList.slice(0, 10)}
            loading={loading}
          />
        )}
      </Card>

      <Card
        avatar={<Icon name={"horizontal-bar-chart-2"} />}
        heading="Planet Diameter"
        style={{ ...spacing.sapUiContentPadding }}
        //headerInteractive
        subheading={""}
      >
        <Text style={spacing.sapUiContentPadding}>MicroBarChart</Text>
        <MicroBarChart
          dimension={{ accessor: "name" }}
          measure={{ accessor: "diameter" }}
          dataset={sortedPlanetsDiameterList.slice(0, 10)}
          loading={loading}
        />
      </Card>

      <Card
        heading="Planets"
        style={spacing.sapUiContentPadding}
        avatar={<Icon name="table-view" />}
      >
        <AnalyticalTable
          data={planetsList}
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
