/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
const StyledH3 = styled.h3`
  color: red;
`;

const SalesManagement = () => {
  return (
    <div>
      <Header />
      <div id="rootBody">

      <StyledH3>Welcome SalesManagement</StyledH3>
        </div>
    </div>
  );
};

export default SalesManagement;
