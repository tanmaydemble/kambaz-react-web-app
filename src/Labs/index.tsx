import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC.tsx";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4/index.tsx";
import store from "./store";
import { Provider } from "react-redux";

export default function Lab() {
    console.log("Rendering Labs Component");
    return (
        <Provider store={store}>
            <div id="wd-labs">
                <TOC />
                <Routes>
                    <Route path="/" element={<Navigate to="Lab1" />} />
                    <Route path="Lab1" element={<Lab1 />} />
                    <Route path="Lab2" element={<Lab2 />} />
                    <Route path="Lab3/*" element={<Lab3 />} />
                    <Route path="Lab4/*" element={<Lab4 />} />
                </Routes>
            </div >
        </Provider>);
}