import { useMemo } from 'react';
import { BasicCheckBoxInput } from '../atoms/BasicInput';
import { BasicButton } from 'ui/component/atoms/BasicButton';
import Table from '../molecules/table/Table';

function ItemDeployTable() {
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
      {
        accessor: 'coupang',
        Header: 'Coupang',
      },
      {
        accessor: 'naver',
        Header: 'Naver',
      },
      {
        accessor: 'gmarket',
        Header: 'Gmarket',
      },
      {
        accessor: 'eleventSt',
        Header: '11st',
      },
      {
        accessor: 'coupang_amount',
        Header: 'Coupang',
      },
      {
        accessor: 'naver_amount',
        Header: 'Naver',
      },
      {
        accessor: 'gmarket_amount',
        Header: 'Gmarket',
      },
      {
        accessor: 'eleventSt_amount',
        Header: '11st',
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
      coupang: <BasicButton title={'등록'} textColor="white" />,
      naver: <BasicButton title={'등록'} textColor="white" />,
      gmarket: <BasicButton title={'등록'} textColor="white" />,
      eleventSt: <BasicButton title={'등록'} textColor="white" />,
      coupang_amount: '',
      naver_amount: '',
      gmarket_amount: '',
      eleventSt_amount: '',
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
      coupang: <BasicButton title={'등록'} textColor="white" />,
      naver: <BasicButton title={'삭제'} textColor="white" />,
      gmarket: <BasicButton title={'삭제'} textColor="white" />,
      eleventSt: <BasicButton title={'등록'} textColor="white" />,
      coupang_amount: '',
      naver_amount: '',
      gmarket_amount: '',
      eleventSt_amount: '',
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

export default ItemDeployTable;
