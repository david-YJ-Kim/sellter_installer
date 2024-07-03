import { useMemo } from 'react';
import { BasicCheckBoxInput } from '../atoms/BasicInput';
import Table from '../molecules/table/Table';

function KeyWordTable() {
  const col = useMemo(
    () => [
      {
        accessor: 'select',
        Header: '선택',
      },
      {
        accessor: 'number',
        Header: 'No.',
      },
      {
        accessor: 'sourcing',
        Header: '소싱',
      },
      {
        accessor: 'url',
        Header: 'URL',
      },
      {
        accessor: 'keyword',
        Header: '키워드',
      },
      {
        accessor: 'relatedKeyword',
        Header: '연관 키워드',
      },
      {
        accessor: 'createdDate',
        Header: '등록일',
      },
      {
        accessor: 'status',
        Header: '상태',
      },
      {
        accessor: 'itemCount',
        Header: '상품수',
      },
    ],
    []
  );

  const data = [
    {
      select: <BasicCheckBoxInput />,
      number: '1',
      sourcing: 'Aliexpress',
      url: 'https://',
      keyword: '털장갑',
      relatedKeyword: '여성 장갑, ....',
      createdDate: '2022-10-24',
      status: 'loading',
      itemCount: '60',
    },
    {
      select: <BasicCheckBoxInput />,
      number: '2',
      sourcing: 'Aliexpress',
      url: 'https://',
      keyword: '털장갑',
      relatedKeyword: '여성 장갑, ....',
      createdDate: '2022-10-24',
      status: 'loading',
      itemCount: '60',
    },
    {
      select: <BasicCheckBoxInput />,
    },
    {
      select: <BasicCheckBoxInput />,
    },
    {
      select: <BasicCheckBoxInput />,
    },
    {
      select: <BasicCheckBoxInput />,
    },
    {
      select: <BasicCheckBoxInput />,
    },
    {
      select: <BasicCheckBoxInput />,
    },
    {
      select: <BasicCheckBoxInput />,
    },
    {
      select: <BasicCheckBoxInput />,
    },
  ];

  return <Table columns={col} data={data} />;
}

export default KeyWordTable;
