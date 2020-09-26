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
  const [peopleListSchema, setPeopleListSchema] = useState([]);
  const [peopleTableColumnHeaders, setPeopleTableColumnHeaders] = useState([]);
  useEffect(() => {
    async function fetchPeopleList() {
      const peopleResult = await fetch(
        "https://swapi.dev/api/people/"
      ).then((response) => response.json());
      setPeopleList(peopleResult);
    }
    async function fetchPeopleListSchema() {
      const peopleSchemaResult = await fetch(
        "https://swapi.dev/api/people/schema"
      ).then((response) => response.json());
      setPeopleListSchema(peopleSchemaResult);
      const peopleTableColumnHeadersResult = peopleSchemaResult.required.map(
        (item) => {
          return {
            Header: item,
            accessor: item,
          };
        }
      );
      setPeopleTableColumnHeaders(peopleTableColumnHeadersResult);
    }
    fetchPeopleList();
    fetchPeopleListSchema();
  }, []);

  console.log(peopleList.results);
  console.log(peopleListSchema.required);
  console.log(peopleTableColumnHeaders);

  const [toggleCharts, setToggleCharts] = useState("lineChart");
  const [loading, setLoading] = useState(false);

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

  const history = useHistory();
  const handleProgressHeaderClick = () => {
    history.push("/detail");
  };

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
  const tableData = new Array(500).fill(null).map((_, index) => {
    return {
      name: `name${index}`,
      age: Math.floor(Math.random() * 100),
      friend: {
        name: `friend.Name${index}`,
        age: Math.floor(Math.random() * 100),
      },
    };
  });

  const tableColumns = [
    {
      Header: "Name",
      accessor: "name", // String-based value accessors!
    },
    {
      Header: "Height",
      accessor: "height",
    },
    {
      Header: "Friend Name",
      accessor: "friend.name",
    },
    {
      Header: "Friend Age",
      accessor: "friend.age",
    },
  ];

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
      <Card
        heading="People"
        style={{ maxWidth: "900px", ...spacing.sapUiContentPadding }}
        avatar={<Icon name="table-view" />}
      >
        <AnalyticalTable
          data={peopleList.results}
          columns={peopleTableColumnHeaders}
          visibleRows={5}
        />
      </Card>
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
        heading="Stock Price"
        style={{ width: "300px" }}
        headerInteractive
        onHeaderClick={handleHeaderClick}
        subheading={`Click here to switch to ${switchToChart}`}
      >
        <Text style={spacing.sapUiContentPadding}>{contentTitle}</Text>
        {toggleCharts === "lineChart" ? (
          <LineChart
            dimensions={[{ accessor: "month" }]}
            measures={[{ accessor: "data", label: "Stock Price" }]}
            dataset={dataset}
            loading={loading}
          />
        ) : (
          <BarChart
            dimensions={[{ accessor: "month" }]}
            measures={[{ accessor: "data", label: "Stock Price" }]}
            dataset={dataset}
            loading={loading}
          />
        )}
      </Card>
      <Card
        heading="Progress"
        subheading="List"
        style={{ width: "300px", ...spacing.sapUiContentPadding }}
        headerInteractive
        onHeaderClick={handleProgressHeaderClick}
        avatar={<Icon name="list" />}
      >
        <List>
          <StandardListItem info="finished" infoState={ValueState.Success}>
            Activity 1
          </StandardListItem>
          <StandardListItem info="failed" infoState={ValueState.Error}>
            Activity 2
          </StandardListItem>
          <StandardListItem
            info="in progress"
            infoState={ValueState.Warning}
            style={{ height: "80px" }}
          >
            <FlexBox direction={FlexBoxDirection.Column}>
              <Title level={TitleLevel.H5}>Activity 3</Title>
              <ProgressIndicator value={89} valueState={ValueState.Success} />
            </FlexBox>
          </StandardListItem>
          <StandardListItem
            info="in progress"
            infoState={ValueState.Warning}
            style={{ height: "80px" }}
          >
            <FlexBox direction={FlexBoxDirection.Column}>
              <Title level={TitleLevel.H5}>Activity 4</Title>
              <ProgressIndicator value={5} valueState={ValueState.Error} />
            </FlexBox>
          </StandardListItem>
        </List>
      </Card>
      <Card
        heading="AnalyticalTable"
        style={{ maxWidth: "900px", ...spacing.sapUiContentPadding }}
        avatar={<Icon name="table-view" />}
      >
        <AnalyticalTable
          data={tableData}
          columns={tableColumns}
          visibleRows={5}
        />
      </Card>
    </FlexBox>
  );
}
