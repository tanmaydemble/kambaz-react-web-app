import './App.css';
import Labs from './Labs';
import Kambaz from "./Kambaz";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import store from "./Kambaz/store";
import { Provider } from "react-redux";

function App() {
  console.log("rendering app component");
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Kambaz" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kambaz/*" element={<Kambaz />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App
