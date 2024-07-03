/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TableSample from 'ui/component/molecules/CollapsibleTable';
import { LineChartApp } from 'ui/component/molecules/MultiAxexLineChart';
import Header from './Header';
import SalesReportTable from 'ui/component/organisms/SalesReportTable';
import SalesDashBoardTable from 'ui/component/organisms/SalesDashBoardTable';
import { BasicLabel } from 'ui/component/atoms/BasicLabel';

const StyledH3 = styled.h3`
  color: red;
`;

const Home = () => {
  return (
    <div>
      <Header />
      <div id="rootBody">
        <div className="pr-4">
          <div className="bg-white">
            <BasicLabel labelFor={'html'} title={'11월 사업자별 매출 현황'} />
            <SalesReportTable />
          </div>

          <div className="mt-2 bg-white">
            <BasicLabel labelFor={'html'} title={'사업자별 매출 현황'} />
            <LineChartApp />
          </div>

          <div className="mt-2 bg-white">
            <BasicLabel labelFor={'html'} title={'매출 증가 상품 목록'} />
            <div className="h-60"></div>
          </div>
        </div>

        <div className="bg-white">
          <BasicLabel labelFor={'html'} title={'사업자별 주문/배송 현황'} />
          <SalesDashBoardTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
