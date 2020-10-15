import React, { useState, useEffect } from "react";
import {
  Title,
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
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
import { Spinner } from "@ui5/webcomponents-react/lib/Spinner";
import { Panel } from "@ui5/webcomponents-react/lib/Panel";

export function Starships() {
  const [starshipsList, setStarshipsList] = useState([]);
  const [
    starshipsTableColumnHeaders,
    setStarshipsTableColumnHeaders,
  ] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchstarshipsList(x) {
    let starships = await fetch(`https://swapi.dev/api/starships/?page=${x}`);
    let starshipsJSON = await starships.json();
    return starshipsJSON;
  }

  async function getListCount(data) {
    let initialList = await fetch(`https://swapi.dev/api/${data}/?page=1`);
    let initialListJSON = await initialList.json();
    return initialListJSON.count;
  }

  async function fetchstarshipsListSchema() {
    const starshipsSchemaResult = await fetch(
      "https://swapi.dev/api/starships/schema"
    ).then((response) => response.json());
    const starshipsTableColumnHeadersResult = starshipsSchemaResult.required.map(
      (item) => {
        return {
          Header: item,
          accessor: item,
        };
      }
    );
    return starshipsTableColumnHeadersResult;
  }

  const removeJunkFromList = function (array) {
    const list = [];
    for (let i = 1; i <= array.length; i++) {
      if (array[i] && array[i].name) {
        list.push(array[i]);
      }
    }
    setStarshipsList(list);
    setLoading(false);
  };

  useEffect(() => {
    const fetchList = async function () {
      setLoading(true);
      const max = await getListCount("starships");
      const list = [];
      const requests = [];
      for (let i = 1; i <= 11; i++) {
        const url = `http://swapi.dev/api/starships/${i}/`;
        const prom = fetch(url).then((r) => r.json());

        requests.push(prom);
      }
      //https://swapi.dev/api/starships/12 was giving cors error...
      for (let i = 13; i <= max; i++) {
        const url = `http://swapi.dev/api/starships/${i}/`;
        const prom = fetch(url).then((r) => r.json());

        requests.push(prom);
      }
      return new Promise((resolve) => {
        Promise.all(requests)
          .then((proms) => proms.forEach((p) => list.push(p)))
          .then(() => resolve(list));
      });
    };
    fetchstarshipsListSchema().then((result) =>
      setStarshipsTableColumnHeaders(result)
    );
    fetchList().then((result) => removeJunkFromList(result));
  }, []);

  return (
    <div>
      <FlexBox
        justifyContent={FlexBoxJustifyContent.Center}
        wrap={FlexBoxWrap.Wrap}
        style={spacing.sapUiContentPadding}
      >
        <Title level="H1">Starships</Title>
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
          {starshipsList.map((starships, i) => {
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
                <Panel
                  accessibleRole="Form"
                  collapsed={true}
                  fixed={false}
                  header={null}
                  headerLevel="H2"
                  headerText={starshipsList[i].name}
                >
                  Model: {starshipsList[i].model}
                  <br></br>
                  <br></br>
                  Manufacturer: {starshipsList[i].manufacturer}
                  <br></br>
                  <br></br>
                  Cost: {starshipsList[i].cost_in_credits}
                  <br></br>
                  <br></br>
                  Length: {starshipsList[i].length}
                  <br></br>
                  <br></br>
                  Max Speed: {starshipsList[i].max_atmosphering_speed}
                  <br></br>
                  <br></br>
                  Crew Size: {starshipsList[i].crew}
                  <br></br>
                  <br></br>
                  Passenger Capacity: {starshipsList[i].passengers}
                  <br></br>
                  <br></br>
                  Cargo Capcity: {starshipsList[i].cargo_capacity}
                </Panel>
              </div>
            );
          })}
        </FlexBox>
      )}
    </div>
  );
}
