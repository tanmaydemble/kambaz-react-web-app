import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";
import { Link, useParams } from "react-router-dom";
import * as courseClient from "../client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PeopleTable({ users = [] }: { users?: any[] }) {
    const { cid } = useParams();
    // console.log("trying to print cid");
    // console.log(cid);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [courseUsers, setCourseUsers] = useState<any[]>([]);
    const isCoursePeoplePage = !!cid; // Check if we're on a course people page
    const isAdmin = currentUser?.role === "ADMIN";

    useEffect(() => {
        if (!isCoursePeoplePage) return; // Only fetch if we're on a course people page

        const fetchUsers = async () => {
            if (!cid) return;
            const courseUsers = await courseClient.findUsersForCourse(cid);
            setCourseUsers(courseUsers);
        };
        fetchUsers();
    }, [cid, isCoursePeoplePage]);

    const displayUsers = isCoursePeoplePage ? courseUsers : users;
    return (
        <div id="wd-people-table">
            {isAdmin && !isCoursePeoplePage && <PeopleDetails />}
            <table className="table table-striped">
                <thead>
                    <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
                </thead>
                <tbody>
                    {displayUsers
                        // .filter((usr) =>
                        //     enrollments.some((enrollment) => enrollment.user === usr._id && enrollment.course === cid)
                        // )
                        .map((user: any) => (
                            <tr key={user._id}>
                                {/* <td className="wd-full-name text-nowrap">
                                    <Link to={`/Kambaz/Account/Users/${user._id}`} className="text-decoration-none text-danger">
                                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                                        <span className="wd-first-name me-1">{user.firstName}</span>
                                        <span className="wd-last-name">{user.lastName}</span>
                                    </Link>
                                </td> */}
                                <td className="wd-full-name text-nowrap">
                                    {!isCoursePeoplePage ? (
                                        <Link to={`/Kambaz/Account/Users/${user._id}`} className="text-decoration-none text-danger">
                                            <FaUserCircle className="me-2 fs-1 text-secondary" />
                                            <span className="wd-first-name me-1">{user.firstName}</span>
                                            <span className="wd-last-name">{user.lastName}</span>
                                        </Link>
                                    ) : (
                                        <>
                                            <FaUserCircle className="me-2 fs-1 text-secondary" />
                                            <span className="wd-first-name me-1">{user.firstName}</span>
                                            <span className="wd-last-name">{user.lastName}</span>
                                        </>
                                    )}
                                </td>
                                <td className="wd-login-id">{user.loginId}</td>
                                <td className="wd-section">{user.section}</td>
                                <td className="wd-role">{user.role}</td>
                                <td className="wd-last-activity">{user.lastActivity}</td>
                                <td className="wd-total-activity">{user.totalActivity}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>);
}