import { useMemo } from 'react';
import Table from '../molecules/table/Table';
import { BasicLabel } from './../../atoms/BasicLabel';

function SalesReportTable() {
  const colums = useMemo(
    () => [
      {
        accessor: 'bizUnit',
        Header: '사업자',
      },
      {
        accessor: 'total',
        Header: 'Total',
      },
      {
        accessor: 'coupang',
        Header: 'Coupang',
      },
      {
        accessor: 'naver',
        Header: 'Naver',
      },
      {
        accessor: 'eleventSt',
        Header: '11st',
      },
    ],
    []
  );

  const data = [
    {
      bizUnit: '사업자 A',
      total: '3,000,000 원',
      coupang: '1,000,000 원',
      naver: '1,000,000 원',
      eleventSt: '1,000,000 원',
    },
    {
      bizUnit: '사업자 B',
      total: '3,000,000 원',
      coupang: '1,000,000 원',
      naver: '1,000,000 원',
      eleventSt: '1,000,000 원',
    },
    {
      bizUnit: '사업자 C',
      total: '3,000,000 원',
      coupang: '1,000,000 원',
      naver: '1,000,000 원',
      eleventSt: '1,000,000 원',
    },
    {
      bizUnit: '전체 매출',
      total: '9,000,000 원',
      coupang: '3,000,000 원',
      naver: '3,000,000 원',
      eleventSt: '3,000,000 원',
    },
  ];

  return <Table columns={colums} data={data} />;
}

export default SalesReportTable;
