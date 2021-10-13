import React, { useState, useEffect } from "react";
import {
  Card,
  Title,
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  AnalyticalTable,
  Icon,
  Button,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import "@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart.js";
import "@ui5/webcomponents-icons/dist/icons/line-chart.js";
import "@ui5/webcomponents-icons/dist/icons/list.js";
import "@ui5/webcomponents-icons/dist/icons/table-view.js";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package

export function People() {
  const [peopleList, setPeopleList] = useState([]);
  const [peopleTableColumnHeaders, setPeopleTableColumnHeaders] = useState([]);
  const [peoplePage, setPeoplePage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function fetchPeopleList(x) {
    let people = await fetch(`https://swapi.dev/api/people/?page=${x}`);
    let peopleJSON = await people.json();
    return peopleJSON;
  }
  async function fetchPeopleListSchema() {
    const peopleSchemaResult = await fetch(
      "https://swapi.dev/api/people/schema"
    ).then((response) => response.json());
    const peopleTableColumnHeadersResult = peopleSchemaResult.required.map(
      (item) => {
        return {
          Header: item,
          accessor: item,
        };
      }
    );
    return peopleTableColumnHeadersResult;
  }

  const peopleColumnHeaders = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Height",
      accessor: "height",
    },
    {
      Header: "Mass",
      accessor: "mass",
    },
    {
      Header: "Hair Color",
      accessor: "hair_color",
    },
    {
      Header: "Eye Color",
      accessor: "eye_color",
    },
    {
      Header: "Birth Year",
      accessor: "birth_year",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    //   name: "name",
    // height: "height",
    // mass: "mass",
    // hair_color: "hair_color",
    // skin_color: "skin_color",
    // eye_color: "eye_color",
    // birth_year: "birth_year",
    // gender: "gender",
    // homeworld: "homeworld",
    // films: "films",
    // species: "species",
    // vehicles: "vehicles",
    // starships: "starships",
    // created: "created",
    // edited: "edited",
    // url: "url,
    //}
  ];

  useEffect(() => {
    setLoading(true);
    fetchPeopleList(peoplePage)
      .then((result) => setPeopleList(result))
      .then(() => setLoading(false));
    // fetchPeopleListSchema().then((result) =>
    //   setPeopleTableColumnHeaders(result)
    setPeopleTableColumnHeaders(peopleColumnHeaders);
  }, []);

  const handleNextPageClick = async () => {
    if (peoplePage <= 8) {
      setLoading(true);
      const newPage = peoplePage + 1;
      fetchPeopleList(newPage)
        .then((result) => setPeopleList(result))
        .then(() => setLoading(false));
      setPeoplePage(newPage);
    }
  };

  const handleBackPageClick = () => {
    if (peoplePage >= 2) {
      setLoading(true);
      const newPage = peoplePage - 1;
      fetchPeopleList(newPage)
        .then((result) => setPeopleList(result))
        .then(() => setLoading(false));
      setPeoplePage(newPage);
    }
  };

  return (
    <div>
      <FlexBox
        justifyContent={FlexBoxJustifyContent.Center}
        wrap={FlexBoxWrap.Wrap}
        style={spacing.sapUiContentPadding}
      >
        <Title level="H1">People</Title>
      </FlexBox>

      <FlexBox
        justifyContent={FlexBoxJustifyContent.Center}
        wrap={FlexBoxWrap.Wrap}
        style={spacing.sapUiContentPadding}
      >
        <Card
          heading="People"
          style={{ maxWidth: "1200px", ...spacing.sapUiContentPadding }}
          avatar={<Icon name="table-view" />}
        >
          <AnalyticalTable
            data={peopleList.results}
            columns={peopleTableColumnHeaders}
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
              disabled={peopleList.previous == null ? true : false}
            >
              Back
            </Button>
            <Button
              icon="arrow-right"
              onClick={handleNextPageClick}
              disabled={peopleList.next == null ? true : false}
            >
              Next
            </Button>
          </FlexBox>
        </Card>
      </FlexBox>
    </div>
  );
}
