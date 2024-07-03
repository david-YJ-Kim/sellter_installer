/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BasicLabel } from 'ui/component/atoms/BasicLabel';
import Header from './Header';
import ButtonToggle from './../component/sample/ButtonToggle';
import { BasicButton } from 'ui/component/atoms/BasicButton';
import ItemDeployTable from 'ui/component/organisms/ItemDeployTable';

const ItemDeploy = () => {
  return (
    <div>
      <Header />

      <div id="rootBody">
        <div>
          <div className="flex items-center justify-center">
            <BasicLabel labelFor={'html'} title="상품 키워드 리스트" />
            <BasicLabel labelFor={'hmtl'} title={'자동수집설정'} />
            <ButtonToggle />
            <BasicButton title={'선택 일괄 등록'} />
            <BasicButton title={'선택 일괄 삭제'} />
          </div>
          <div>
            <ItemDeployTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDeploy;
