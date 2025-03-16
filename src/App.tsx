import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Box } from '@mui/material';
import Header from './components/Header';
import CollectionsPage from './pages/CollectionsPage';
import CollectionDetailsPage from './pages/CollectionDetailsPage';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<CollectionsPage />} />
            <Route path="/collections/:id" element={<CollectionDetailsPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;