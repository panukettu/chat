import React from "react";

import styled from "styled-components";

import ApiTest from "./ApiTest";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 15px;
  height: 100vh;
  background: linear-gradient(90deg, MediumVioletRed, BlueViolet);
`;

const GridColumn = styled.div`
  opacity: 0.9;
  margin: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  text-align: center;
`;

const Layout = () => (
  <Grid>
    <GridColumn>
      <h2>Hello</h2>
    </GridColumn>
    <GridColumn>
      <ApiTest />
    </GridColumn>
  </Grid>
);

export default Layout;
