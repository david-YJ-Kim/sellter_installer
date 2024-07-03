/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import AppContent from '../component/sample/ProjectManagementDashboard/DashBoard';
const StyledH3 = styled.h3`
  color: red;
`;

const Home = () => {
  return (
    <div>
      <Header />
      <StyledH3>Welcome Home</StyledH3>
      <AppContent></AppContent>
      <Link to="/">
        <button type="button">Go Back</button>
      </Link>
    </div>
  );
};

export default Home;
