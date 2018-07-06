import React from 'react';

import styled from 'styled-components';

import Chat from './chat/Ui';

const Container = styled.div`
  text-align: center;
`;

const Layout = () => (
  <Container>
    <Chat />
  </Container>
);

export default Layout;
