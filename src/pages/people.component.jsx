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

export function People() {
  const [peopleList, setPeopleList] = useState([]);
  const [peopleTableColumnHeaders, setPeopleTableColumnHeaders] = useState([]);
  const [peoplePage, setPeoplePage] = useState(1);
  const [toggleCharts, setToggleCharts] = useState("lineChart");
  const [loading, setLoading] = useState(false);

  async function fetchPeopleList(x) {
    let people = await fetch(`https://swapi.dev/api/people/?page=${x}`);
    let peopleJSON = await people.json();
    setLoading(false);
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

  useEffect(() => {
    fetchPeopleList(peoplePage).then((result) => setPeopleList(result));
    fetchPeopleListSchema().then((result) =>
      setPeopleTableColumnHeaders(result)
    );
  }, []);

  console.log(peoplePage);
  console.log(peopleList);
  console.log(peopleList.results);
  console.log(peopleTableColumnHeaders);

  const handleNextPageClick = async () => {
    if (peoplePage <= 8) {
      setLoading(true);
      const newPage = peoplePage + 1;
      fetchPeopleList(newPage).then((result) => setPeopleList(result));
      setPeoplePage(newPage);
    }
  };

  const handleBackPageClick = () => {
    if (peoplePage >= 2) {
      const newPage = peoplePage - 1;
      fetchPeopleList(newPage).then((result) => setPeopleList(result));
      setPeoplePage(newPage);
      setLoading(true);
    }
  };

  const handleHeaderClick = () => {
    if (toggleCharts === "lineChart") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setToggleCharts("barChart");
      }, 2000);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setToggleCharts("lineChart");
      }, 2000);
    }
  };

  // const history = useHistory();
  // const handleProgressHeaderClick = () => {
  //   history.push("/detail");
  // };

  const dataset = [
    {
      month: "January",
      data: 65,
    },
    {
      month: "February",
      data: 59,
    },
    {
      month: "March",
      data: 80,
    },
    {
      month: "April",
      data: 81,
    },
    {
      month: "May",
      data: 56,
    },
    {
      month: "June",
      data: 55,
    },
    {
      month: "July",
      data: 40,
    },
  ];

  const contentTitle =
    toggleCharts === "lineChart" ? "Line Chart" : "Bar Chart";
  const switchToChart =
    toggleCharts === "lineChart" ? "Bar Chart" : "Line Chart";

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
