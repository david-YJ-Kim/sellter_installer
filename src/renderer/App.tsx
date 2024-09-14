import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import IpcTest from 'ui/routes/IpcTest';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<IpcTest />} />
      </Routes>
    </Router>
  );
}
