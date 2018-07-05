import React from "react";

import styled from "styled-components";

import ApiTest from "./ApiTest";
import Chat from "./chat/Ui";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 39% 59%;
  grid-gap: 15px;
  height: 100vh;
  background: linear-gradient(90deg, MediumVioletRed, BlueViolet);
`;

const GridColumn = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 1;
  margin: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  text-align: center;
`;

const Layout = () => (
  <Grid>
    <GridColumn>
      <Chat />
    </GridColumn>
    <GridColumn>
      <ApiTest />
    </GridColumn>
  </Grid>
);

export default Layout;
