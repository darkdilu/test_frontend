import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Testing from './components/testing';
import Testing2 from './components/testing2';
import Animation from './components/animation';
import Testing3 from './components/testing3';
import Testing4 from './components/testing4';
import Testing5 from './components/testing5';
import Testing6 from './components/testing6';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/testing" element={<Testing />} />
        <Route exact path="/testing2" element={<Testing2 />} />
        <Route exact path="/animation" element={<Animation />} />
        <Route exact path="/testing3" element={<Testing3 />} />
        <Route exact path="/testing4" element={<Testing4 />} />
        <Route exact path="/testing5" element={<Testing5 />} />
        <Route exact path="/testing6" element={<Testing6 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;