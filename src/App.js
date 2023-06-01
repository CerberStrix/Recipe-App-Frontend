import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import { Header } from './components';
import { Home, FullRecipe, AddRecipe } from './pages';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<FullRecipe />} />
          <Route path="/recipe/:id/edit" element={<AddRecipe />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
