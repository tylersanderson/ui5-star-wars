import React, { useState, useEffect } from "react";
import {
  Card,
  Text,
  Title,
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  AnalyticalTable,
  Icon,
  Button,
  Label,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
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
import { ObjectPage } from "@ui5/webcomponents-react/lib/ObjectPage";
import { ObjectPageSection } from "@ui5/webcomponents-react/lib/ObjectPageSection";

export function Vehicles() {
  const [vehiclesList, setVehiclesList] = useState([]);
  const [vehiclesTableColumnHeaders, setVehiclesTableColumnHeaders] = useState(
    []
  );
  const [vehiclesPage, setVehiclesPage] = useState(1);
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
      });
    };
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
            infiniteScrollOffset={0}
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
                  key={i}
                  style={{
                    height: "calc(100% - 1rem)",
                    marginTop: "2rem",
                    position: "relative",
                    width: "calc(100% - 10rem)",
                  }}
                >
                  <ObjectPage
                    headerContent={
                      <div>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Text renderWhitespace={false} wrapping>
                            Manufacturer: {vehiclesList[i].manufacturer}
                          </Text>
                          <Text renderWhitespace={false} wrapping>
                            Cost: {vehiclesList[i].cost_in_credits} Credits
                          </Text>
                        </div>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        ></div>
                      </div>
                    }
                    mode="Default"
                    style={{
                      height: "500px",
                    }}
                    subTitle={vehiclesList[i].model}
                    title={vehiclesList[i].name}
                  >
                    <ObjectPageSection
                      id="0"
                      isSection
                      title="Capacity"
                      titleUppercase
                    >
                      <Label
                        required={false}
                        showColon={false}
                        wrap={false}
                        wrapping
                      >
                        Cargo: {vehiclesList[i].cargo_capacity}
                      </Label>
                      <br></br>
                      <Label required={false} showColon={false} wrap={false}>
                        Consumables: {vehiclesList[i].consumables}
                      </Label>
                      <br></br>
                      <Label required={false} showColon={false} wrap={false}>
                        Crew: {vehiclesList[i].crew}
                      </Label>
                      <br></br>
                      <Label required={false} showColon={false} wrap={false}>
                        Passengers: {vehiclesList[i].passengers}
                      </Label>
                    </ObjectPageSection>
                    <ObjectPageSection
                      id="1"
                      isSection
                      title="Specifications"
                      titleUppercase
                    >
                      <Label required={false} showColon={false} wrap={false}>
                        Max Speed: {vehiclesList[i].max_atmosphering_speed}
                      </Label>
                      <br></br>
                      <Label required={false} showColon={false} wrap={false}>
                        Length: {vehiclesList[i].length}
                      </Label>
                    </ObjectPageSection>
                    <ObjectPageSection
                      id="2"
                      isSection
                      title="Class"
                      titleUppercase
                    >
                      <Label required={false} showColon={false} wrap={false}>
                        Class: {vehiclesList[i].vehicle_class}
                      </Label>
                    </ObjectPageSection>
                  </ObjectPage>
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
