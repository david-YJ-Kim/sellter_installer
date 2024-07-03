/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BasicButton } from 'ui/component/atoms/BasicButton';
import { BasicLabel } from 'ui/component/atoms/BasicLabel';
import { TailWindSampleGrid } from 'ui/component/sample/Grid/TailWindGridSample';
import Header from './Header';

const BizAccount = () => {
  return (
    <div>
      <Header />
      <div id="rootBody">
        <div className="pr-4">
          <div className="bg-white">
            <BasicLabel labelFor={'html'} title={'사업자 관리'} />

            {/* 사업자 추가 버튼 */}
            <div className="w-80 text-black">
              <b> + </b>
              <b>사업자 추가</b>
            </div>

            {/* 사업자 내용 그리드 */}
            <div id="bizAccountGrid">
              <TailWindSampleGrid />
            </div>
          </div>
        </div>

        <div className="bg-white h-60 w-80">
          <BasicLabel labelFor={'html'} title={'사업자별 마켓 관리'} />
          {/* <BasicButton type={'input'} /> */}
        </div>
      </div>
    </div>
  );
};

export default BizAccount;
