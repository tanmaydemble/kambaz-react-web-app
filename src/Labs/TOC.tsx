import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router";
export default function TOC() {
    const { pathname } = useLocation();
    return (
        <Nav variant="pills">
            <Nav.Item>
                <Nav.Link href="#/Labs">Labs</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#/Labs/Lab1" className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`}>Lab 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#/Labs/Lab2" className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`}>Lab 2</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#/Labs/Lab3" className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`}>Lab 3</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#/Labs/Lab4" className={`nav-link ${pathname.includes("Lab4") ? "active" : ""}`}>Lab 4</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#/Labs/Lab5" className={`nav-link ${pathname.includes("Lab5") ? "active" : ""}`}>Lab 5</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#/Kambaz">Kambaz</Nav.Link>
            </Nav.Item>
            <Nav.Item id="wd-github">
                <Nav.Link href="https://github.com/tanmaydemble/kambaz-react-web-app">Frontend GitHub Repo</Nav.Link>
            </Nav.Item>
            <Nav.Item id="wd-backend">
                <Nav.Link href="https://kambaz-node-server-app-flri.onrender.com">Backend</Nav.Link>
            </Nav.Item>
            <Nav.Item id="wd-backend">
                <Nav.Link href="https://github.com/tanmaydemble/kambaz-node-server-app">Backend GitHub Repo</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}
