import Tree from './components/TreeView';
import { Route, Routes } from 'react-router';
import Home from './pages/Home/Home';
import Sign from './pages/Register/Sign/Sign';
import Login from './pages/Register/Login/Login';
import MyTree from './pages/Tree/MyTree'
import './App.css';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/mytree" element={<MyTree />} />
        <Route path="/tree/:newNoteId" element={<Tree />} />
      </Routes>
    </>
  );
}

export default App;
