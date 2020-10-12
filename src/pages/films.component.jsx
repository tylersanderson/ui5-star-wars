import React, { useState, useEffect } from "react";
import {
  Card,
  Text,
  List,
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
import { NotificationListItem } from "@ui5/webcomponents-react/lib/NotificationListItem";

export function Films() {
  const [filmList, setFilmList] = useState([]);
  const [filmTableColumnHeaders, setFilmTableColumnHeaders] = useState([]);
  const [filmPage, setFilmPage] = useState(1);
  const [loading, setLoading] = useState(false);
  var filmListResults = filmList.results || [];

  async function fetchfilmList(x) {
    let film = await fetch(`https://swapi.dev/api/films/?page=${x}`);
    let filmJSON = await film.json();
    setLoading(false);
    return filmJSON;
  }
  async function fetchfilmListSchema() {
    const filmSchemaResult = await fetch(
      "https://swapi.dev/api/films/schema"
    ).then((response) => response.json());
    const filmTableColumnHeadersResult = filmSchemaResult.required.map(
      (item) => {
        return {
          Header: item,
          accessor: item,
        };
      }
    );
    return filmTableColumnHeadersResult;
  }

  useEffect(() => {
    fetchfilmList(filmPage).then((result) => setFilmList(result));
    fetchfilmListSchema().then((result) => setFilmTableColumnHeaders(result));
  }, []);

  console.log(filmPage);
  console.log(filmList);
  console.log(filmList.results);
  console.log(filmTableColumnHeaders);
  console.log(filmListResults);

  const handleNextPageClick = async () => {
    if (filmPage <= 8) {
      setLoading(true);
      const newPage = filmPage + 1;
      fetchfilmList(newPage).then((result) => setFilmList(result));
      setFilmPage(newPage);
    }
  };

  const handleBackPageClick = () => {
    if (filmPage >= 2) {
      const newPage = filmPage - 1;
      fetchfilmList(newPage).then((result) => setFilmList(result));
      setFilmPage(newPage);
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
        <Title level="H1">Films</Title>
      </FlexBox>
      <FlexBox
        justifyContent={FlexBoxJustifyContent.Center}
        wrap={FlexBoxWrap.Wrap}
        style={spacing.sapUiContentPadding}
      >
        <Card
          heading="Films"
          style={{ maxWidth: "1200px", ...spacing.sapUiContentPadding }}
          avatar={<Icon name="table-view" />}
        >
          <List>
            {filmListResults.map((film, i) => {
              return (
                <NotificationListItem
                  key={i}
                  heading={filmListResults[i].title}
                  footnotes={<Text>{filmListResults[i].release_date}</Text>}
                >
                  {filmListResults[i].opening_crawl}
                </NotificationListItem>
              );
            })}
          </List>
        </Card>
        <Card
          heading="Films"
          style={{ maxWidth: "1200px", ...spacing.sapUiContentPadding }}
          avatar={<Icon name="table-view" />}
        >
          <AnalyticalTable
            data={filmList.results}
            columns={filmTableColumnHeaders}
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
              disabled={filmList.previous == null ? true : false}
            >
              Back
            </Button>
            <Button
              icon="arrow-right"
              onClick={handleNextPageClick}
              disabled={filmList.next == null ? true : false}
            >
              Next
            </Button>
          </FlexBox>
        </Card>
      </FlexBox>
    </div>
  );
}
