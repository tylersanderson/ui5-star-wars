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
import { Panel } from "@ui5/webcomponents-react/lib/Panel";

export function Starships() {
  const [starshipsList, setStarshipsList] = useState([]);
  const [
    starshipsTableColumnHeaders,
    setStarshipsTableColumnHeaders,
  ] = useState([]);
  const [starshipsPage, setStarshipsPage] = useState(1);
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
        const url = `https://swapi.dev/api/starships/${i}`;
        const prom = fetch(url).then((r) => r.json());

        requests.push(prom);
      }
      for (let i = 13; i <= max; i++) {
        const url = `https://swapi.dev/api/starships/${i}`;
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
    fetchstarshipsListSchema().then((result) =>
      setStarshipsTableColumnHeaders(result)
    );
    fetchList().then((result) => removeJunkFromList(result));
  }, []);

  console.log(starshipsPage);
  console.log(starshipsList);
  console.log(starshipsList.results);
  console.log(starshipsTableColumnHeaders);
  //getListCount("starships");

  const sortedstarshipsPopulationList = [...starshipsList];
  sortedstarshipsPopulationList.sort(
    (a, b) => parseFloat(a.population) - parseFloat(b.population)
  );

  console.log(sortedstarshipsPopulationList);

  const sortedstarshipsDiameterList = [...starshipsList];
  sortedstarshipsDiameterList.sort(
    (a, b) => parseFloat(b.diameter) - parseFloat(a.diameter)
  );

  console.log(sortedstarshipsDiameterList);

  const handleNextPageClick = async () => {
    if (starshipsPage <= 8) {
      setLoading(true);
      const newPage = starshipsPage + 1;
      fetchstarshipsList(newPage).then((result) => setStarshipsList(result));
      setStarshipsPage(newPage);
    }
  };

  const handleBackPageClick = () => {
    if (starshipsPage >= 2) {
      const newPage = starshipsPage - 1;
      fetchstarshipsList(newPage).then((result) => setStarshipsList(result));
      setStarshipsPage(newPage);
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
                  {starshipsList[i].name}
                </Panel>
              </div>
            );
          })}
        </FlexBox>
      )}
      <Card
        heading="starships"
        style={spacing.sapUiContentPadding}
        avatar={<Icon name="table-view" />}
      >
        <AnalyticalTable
          data={starshipsList}
          columns={starshipsTableColumnHeaders}
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
            disabled={starshipsList.previous == null ? true : false}
          >
            Back
          </Button>
          <Button
            icon="arrow-right"
            onClick={handleNextPageClick}
            disabled={starshipsList.next == null ? true : false}
          >
            Next
          </Button>
        </FlexBox>
      </Card>
    </div>
  );
}
