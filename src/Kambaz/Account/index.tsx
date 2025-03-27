import { Routes, Route, Navigate } from "react-router";
import AccountNavigation from "./Navigation";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import Users from "./users";

export default function Account() {
    return (
        <div id="wd-courses" className="d-flex">
            <AccountNavigation />
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="/Kambaz/Account/Signin" />} />
                    <Route path="/Signin" element={<Signin />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/Users" element={<Users />} />
                    <Route path="/Users/:uid" element={<Users />} />
                </Routes>
            </div>
        </div>
    );
}
