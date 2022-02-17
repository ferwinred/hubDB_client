import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Form from './components/Form';
import UpdateForm from './components/UpdateForm';
import NotFound from './components/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Form />} />
        <Route path="/update/:id" element={<UpdateForm />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
