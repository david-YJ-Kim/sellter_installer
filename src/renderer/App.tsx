import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Hello from '../ui/routes/Hello';
import Home from '../ui/routes/Home';
import './App.css';
import Login from './../ui/routes/LogIn';
import BizAccount from './../ui/routes/BizAccount';
import SalesManagement from './../ui/routes/SalesManagement';
import KeywordCollection from './../ui/routes/KeywordCollection​';
import ItemDeploy from './../ui/routes/ItemDeploy';
import ItemCollection from './../ui/routes/ItemCollection';
import IpcTest from 'ui/routes/IpcTest';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<IpcTest />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bizAccount" element={<BizAccount />} />
        <Route path="/itemCollection" element={<ItemCollection />} />
        <Route path="/itemDeploy" element={<ItemDeploy />} />
        <Route path="/keywordCollection" element={<KeywordCollection />} />
        <Route path="/salesManagement" element={<SalesManagement />} />
      </Routes>
    </Router>
  );
}
