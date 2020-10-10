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
import { Carousel } from "@ui5/webcomponents-react/lib/Carousel";
import { Spinner } from "@ui5/webcomponents-react/lib/Spinner";

export function Vehicles() {
  const [vehiclesList, setVehiclesList] = useState([]);
  const [vehiclesTableColumnHeaders, setVehiclesTableColumnHeaders] = useState(
    []
  );
  const [vehiclesPage, setVehiclesPage] = useState(1);
  const [toggleCharts, setToggleCharts] = useState("lineChart");
  const [loading, setLoading] = useState(false);

  async function fetchvehiclesList(x) {
    let vehicles = await fetch(`https://swapi.dev/api/vehicles/?page=${x}`);
    let vehiclesJSON = await vehicles.json();
    return vehiclesJSON;
  }

  async function getListCount(data) {
    let initialList = await fetch(`https://swapi.dev/api/${data}/?page=1`);
    let initialListJSON = await initialList.json();
    return initialListJSON.count;
  }

  async function fetchvehiclesListSchema() {
    const vehiclesSchemaResult = await fetch(
      "https://swapi.dev/api/vehicles/schema"
    ).then((response) => response.json());
    const vehiclesTableColumnHeadersResult = vehiclesSchemaResult.required.map(
      (item) => {
        return {
          Header: item,
          accessor: item,
        };
      }
    );
    return vehiclesTableColumnHeadersResult;
  }

  const fetchList = async function () {
    setLoading(true);
    const max = await getListCount("vehicles");
    const list = [];
    const requests = [];
    for (let i = 1; i <= max; i++) {
      const url = `https://swapi.dev/api/vehicles/${i}`;
      const prom = fetch(url).then((r) => r.json());

      requests.push(prom);
    }
    //setLoading(false);
    return new Promise((resolve) => {
      Promise.all(requests)
        .then((proms) => proms.forEach((p) => list.push(p)))
        .then(() => resolve(list));
      //.then(setLoading(false));
    });
  };

  const removeJunkFromList = function (array) {
    const list = [];
    for (let i = 1; i <= array.length; i++) {
      if (array[i] && array[i].name) {
        list.push(array[i]);
      }
    }
    setVehiclesList(list);
    setLoading(false);
  };

  useEffect(() => {
    //fetchvehiclesList(vehiclesPage).then((result) => setVehiclesList(result));
    fetchvehiclesListSchema().then((result) =>
      setVehiclesTableColumnHeaders(result)
    );
    fetchList().then((result) => removeJunkFromList(result));
  }, []);

  console.log(vehiclesPage);
  console.log(vehiclesList);
  console.log(vehiclesList.results);
  console.log(vehiclesTableColumnHeaders);
  //getListCount("vehicles");

  const sortedvehiclesPopulationList = [...vehiclesList];
  sortedvehiclesPopulationList.sort(
    (a, b) => parseFloat(a.population) - parseFloat(b.population)
  );

  console.log(sortedvehiclesPopulationList);

  const sortedvehiclesDiameterList = [...vehiclesList];
  sortedvehiclesDiameterList.sort(
    (a, b) => parseFloat(b.diameter) - parseFloat(a.diameter)
  );

  console.log(sortedvehiclesDiameterList);

  const handleNextPageClick = async () => {
    if (vehiclesPage <= 8) {
      setLoading(true);
      const newPage = vehiclesPage + 1;
      fetchvehiclesList(newPage).then((result) => setVehiclesList(result));
      setVehiclesPage(newPage);
    }
  };

  const handleBackPageClick = () => {
    if (vehiclesPage >= 2) {
      const newPage = vehiclesPage - 1;
      fetchvehiclesList(newPage).then((result) => setVehiclesList(result));
      setVehiclesPage(newPage);
      setLoading(true);
    }
  };

  return (
    <div>
      <FlexBox
        justifyContent={FlexBoxJustifyContent.Center}
        wrap={FlexBoxWrap.Wrap}
        style={spacing.sapUiContentPadding}
      >
        <Title level="H1">Vehicles</Title>
      </FlexBox>
      {loading ? (
        <FlexBox
          justifyContent={FlexBoxJustifyContent.Center}
          wrap={FlexBoxWrap.Wrap}
          style={spacing.sapUiContentPadding}
        >
          <Spinner style={{ justifyContent: "center", alignItems: "center" }} />
        </FlexBox>
      ) : (
        <FlexBox
          justifyContent={FlexBoxJustifyContent.Center}
          wrap={FlexBoxWrap.Wrap}
          style={spacing.sapUiContentPadding}
        >
          <Carousel
            arrowsPlacement="Content"
            cyclic={false}
            hideNavigation={false}
            infiniteScrollOffset={1}
            itemsPerPageL={1}
            itemsPerPageM={1}
            itemsPerPageS={1}
            onNavigate={function noRefCheck() {}}
            selectedIndex={0}
            loading={loading}
          >
            {vehiclesList.map((vehicles, i) => {
              return (
                <div
                  style={{
                    backgroundColor: "var(--sapInformationBackground)",
                    height: "300px",
                    width: "100%",
                  }}
                >
                  {vehiclesList[i].name}
                </div>
              );
            })}
          </Carousel>
        </FlexBox>
      )}
      <Card
        heading="Vehicles"
        style={spacing.sapUiContentPadding}
        avatar={<Icon name="table-view" />}
      >
        <AnalyticalTable
          data={vehiclesList}
          columns={vehiclesTableColumnHeaders}
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
            disabled={vehiclesList.previous == null ? true : false}
          >
            Back
          </Button>
          <Button
            icon="arrow-right"
            onClick={handleNextPageClick}
            disabled={vehiclesList.next == null ? true : false}
          >
            Next
          </Button>
        </FlexBox>
      </Card>
    </div>
  );
}
