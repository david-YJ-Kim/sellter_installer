import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import JobSelectionPage from 'ui/routes/JobSelectionPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<JobSelectionPage />} />
      </Routes>
    </Router>
  );
}
