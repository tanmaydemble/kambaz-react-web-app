import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
    const { pathname } = useLocation();
    const active = (path: string) => (pathname.includes(path) ? "active " : "text-danger");

    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            {/* <Link to={`/Kambaz/Account/Signin`} className="list-group-item active border border-0" > Signin  </Link>
            <Link to={`/Kambaz/Account/Signup`} className="list-group-item border border-0 text-danger" > Signup  </Link>
            <Link to={`/Kambaz/Account/Profile`} className="list-group-item border border-0 text-danger"> Profile </Link> */}
            {links.map((link) => (
                <Link key={link} to={`/Kambaz/Account/${link}`} className={`list-group-item border border-0 ${active(link)}`}> {link} </Link>
            ))}
            {currentUser && currentUser.role === "ADMIN" && (
                <Link to={`/Kambaz/Account/Users`} className={`list-group-item border border-0 ${active("Users")}`}> Users </Link>)}
        </div>
    );
}
