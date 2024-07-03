/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import icon from '../static/icon.svg';
import LoginOrAssignForm from '../component/molecules/BasicForm';

const Hello = () => {
  return (
    <div>
      <div className="Hello">
        {/* <img width="200" alt="icon" src={icon} /> */}
      </div>
      <div className="Hello">
        <LoginOrAssignForm></LoginOrAssignForm>
      </div>
    </div>
  );
};

export default Hello;
