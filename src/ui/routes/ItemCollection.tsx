/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import styled from 'styled-components';
import { BasicButton } from 'ui/component/atoms/BasicButton';
import { BasicLabel } from 'ui/component/atoms/BasicLabel';
import ButtonToggle from './../component/sample/ButtonToggle';
import KeyWordTable from 'ui/component/organisms/KeyWordTable';
import SampleItemList from 'ui/component/sample/ItemList/ItemListSample';

const ItemCollection = () => {
  return (
    <div>
      <Header />

      <div id="rootBody">
        <div id="leftSection" className="pr-4">
          <div className="bg-white">
            <BasicLabel labelFor={'html'} title={'상품 키워드 리스트'} />
            <div className="flex items-center justify-center">
              <BasicButton title={'키워드 삭제'} textColor="white" />
              <BasicLabel labelFor={'hmtl'} title={'자동수집설정'} />
              <ButtonToggle />
              <BasicButton title={'선택 상품 수집'} textColor="white" />
            </div>
            <KeyWordTable />
          </div>
        </div>
        <div id="rightSection">
          <div className="bg-white">
            <BasicLabel
              labelFor={'html'}
              title={'키워드별 상품 리스트 : 121개'}
            />
            <SampleItemList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCollection;
