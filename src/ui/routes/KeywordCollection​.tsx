/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BasicButton } from 'ui/component/atoms/BasicButton';
import { BasicLabel } from 'ui/component/atoms/BasicLabel';
import KeyWordTable from 'ui/component/organisms/KeyWordTable';
import Header from './Header';

const KeywordCollection = () => {
  return (
    <div>
      <Header />

      <div id="rootBody">
        <div id="leftSection" className="pr-4">
          <div className="bg-white">
            <BasicLabel labelFor={'html'} title={'키워드 입력'} />
          </div>
        </div>
        <div id="rightSection">
          <div className="bg-white">
            <BasicLabel labelFor={'html'} title={'상품 키워드 리스트'} />
            <BasicButton title={'키워드 추가'} textColor="white" />
            <BasicButton title={'키워드  삭제'} textColor="white" />
          </div>
          <KeyWordTable />
        </div>
      </div>
    </div>
  );
};

export default KeywordCollection;
