import React, { useState, useEffect } from "react";
import {
  Card,
  Text,
  List,
  Title,
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  Icon,
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
      </FlexBox>
    </div>
  );
}
