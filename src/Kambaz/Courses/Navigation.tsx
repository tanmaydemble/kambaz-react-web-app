import { Link, useParams, useLocation } from "react-router-dom";

export default function CourseNavigation() {
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
    const { pathname } = useLocation();
    const { cid } = useParams();
    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link key={link} to={`/Kambaz/Courses/${cid}/${link}`} id="wd-course-home-link"
                    className={pathname.includes(link) ? "list-group-item active border border-0" : "list-group-item text-danger border border-0"}> {link}</Link>
            ))
            }
        </div >
    );
}
