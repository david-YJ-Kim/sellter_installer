/* eslint-disable prettier/prettier */
import './CollapsibleTable.css';

function SimpleTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>사업자</th>
          <th>Total</th>
          <th>쿠팡</th>
          <th>네이버</th>
          <th>11번가</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>사업자A</td>
          <td>1,450,000</td>
          <td>1,450,000</td>
          <td>1,450,000</td>
          <td>1,450,000</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td>사업자B</td>
          <td>1,450,000</td>
          <td>1,450,000</td>
          <td>1,450,000</td>
          <td>1,450,000</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>총 합계</td>
          <td>1,450,000</td>
          <td>1,450,000</td>
          <td>1,450,000</td>
          <td>1,450,000</td>
        </tr>
      </tfoot>
    </table>
  );
}

const TableSample = () => {
  return (
    <div className="tableContainer">
      <b>11월 사업자별 매출 현황</b>
      <b>
        <button>월별 누적집계 확인</button>
      </b>
      <SimpleTable />
    </div>
  );
};

export default TableSample;
