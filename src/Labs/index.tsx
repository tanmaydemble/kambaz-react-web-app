import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";

export default function Lab() {
    console.log("Rendering Labs Component");
    return (<div><h2>Labs</h2>
    <Lab1/>
    <Lab2/>
    <Lab3/>
    </div>);
}