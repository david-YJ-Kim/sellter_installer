import { useMemo } from 'react';
import Table from '../molecules/table/Table';

function SalesDashBoardTable() {
  const col = useMemo(
    () => [
      {
        accessor: 'bizUnit',
        Header: '사업자',
      },
      {
        accessor: 'market',
        Header: '마켓',
      },
      {
        accessor: 'newOrder',
        Header: '신규주문',
      },
      {
        accessor: 'distach',
        Header: '발주',
      },
      {
        accessor: 'intDelivery',
        Header: '배송중',
      },
      {
        accessor: 'legal',
        Header: '통관중',
      },
      {
        accessor: 'domDelivery',
        Header: '국내배송',
      },
      {
        accessor: 'comDelivery',
        Header: '배송완료',
      },
      {
        accessor: 'complete',
        Header: '구매확정',
      },
    ],
    []
  );

  const data = [
    {
      bizUnit: '사업자 A',
      market: '쿠팡',
      newOrder: '12',
      distaching: '0',
      intDelivery: '0',
      legal: '0',
      domDelivery: '0',
      comDelivery: '0',
      complete: '0',
    },
    {
      bizUnit: '사업자 A',
      market: '네이버',
      newOrder: '12',
      distaching: '0',
      intDelivery: '0',
      legal: '0',
      domDelivery: '0',
      comDelivery: '0',
      complete: '0',
    },
  ];

  return <Table columns={col} data={data} />;
}

// function SalesDashboradTable2() {
//
//   const colums = useMemo(
//     () => [
//       {
//         accessor: 'bizUnit',
//         Header: '사업자',
//       },
//       {
//         accessor: 'market',
//         Header: '마켓',
//       },
//       {
//         accessor: 'newOrder',
//         Header: '신규주문',
//       },
//       {
//         accessor: 'distach',
//         Header: '발주',
//       },
//       {
//         accessor: 'intDelivery',
//         Header: '배송중',
//       },
//       {
//         accessor: 'legal',
//         Header: '통관중',
//       },
//       {
//         accessor: 'domDelivery',
//         Header: '국내배송',
//       },
//       {
//         accessor: 'comDelivery',
//         Header: '배송완료',
//       },
//       {
//         accessor: 'complete',
//         Header: '구매확정',
//       },
//     ],
//     []
//   );
//
//   const data = [
//     {
//       bizUnit: '사업자 A',
//       market: '쿠팡',
//       newOrder: '12',
//       distaching: '0',
//       intDelivery: '0',
//       legal: '0',
//       domDelivery: '0',
//       comDelivery: '0',
//       complete: '0',
//     },
//     {
//       bizUnit: '사업자 A',
//       market: '네이버',
//       newOrder: '12',
//       distaching: '0',
//       intDelivery: '0',
//       legal: '0',
//       domDelivery: '0',
//       comDelivery: '0',
//       complete: '0',
//     },
//   ];
//
//
//   return <Table colums={colums} data={data}>;
// }

export default SalesDashBoardTable;
