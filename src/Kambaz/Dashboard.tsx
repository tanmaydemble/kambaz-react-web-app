import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { enrollInCourse, unenrollFromCourse } from "./Courses/Enrollments/reducer";
import { enroll, unenroll } from "./Courses/Enrollments/client";

export default function Dashboard({ courses, course, allCourses, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
        courses: any[]; course: any; setCourse: (course: any) => void; allCourses: any[];
        addNewCourse: () => void; deleteCourse: (course: any) => void;
        updateCourse: () => void;
    }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const enrollments = useSelector((state: any) => state.enrollments.enrollments);
    const [showAllCourses, setShowAllCourses] = useState(false);

    const isEnrolled = (courseId: string) => {
        return enrollments.some(
            (enrollment: { user: string; course: string }) =>
                enrollment.user === currentUser._id &&
                enrollment.course === courseId
        );
    };

    const filteredCourses = currentUser.role === 'STUDENT'
        ? (showAllCourses
            ? allCourses.map(c => ({ ...c, isEnrolled: isEnrolled(c._id) }))
            : courses)
        : courses;

    const dispatch = useDispatch();

    const handleEnrollmentToggle = async (courseId: string) => {
        if (isEnrolled(courseId)) {
            await unenroll(currentUser._id, courseId);
            dispatch(unenrollFromCourse({
                user: currentUser._id,
                course: courseId
            }));
        } else {
            await enroll(currentUser._id, courseId);
            dispatch(enrollInCourse({
                user: currentUser._id,
                course: courseId
            }));
        }
    };
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            {currentUser.role === 'STUDENT' && (
                <button className="btn btn-primary float-end mb-3"
                    onClick={() => setShowAllCourses(!showAllCourses)}>
                    {showAllCourses ? "Show Enrolled" : "Show All Courses"}
                </button>
            )}
            {currentUser.role === 'FACULTY' && (
                <>
                    <h5>New Course
                        <button className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={addNewCourse} > Add </button>
                        <button className="btn btn-warning float-end me-2"
                            onClick={updateCourse} id="wd-update-course-click">
                            Update
                        </button>
                    </h5>
                    <br />
                    <input value={course.name} className="form-control mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    <textarea value={course.description} className="form-control"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                    <hr />
                </>
            )}
            <h2 id="wd-dashboard-published">Published Courses ({filteredCourses.length})</h2>
            <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {filteredCourses.map((course) => (
                        <div key={course._id} className="wd-dashboard-course col" style={{ width: "300px" }}>
                            <div className="card rounded-3 overflow-hidden">
                                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                                    className="wd-dashboard-course-link text-decoration-none text-dark" >
                                    <img src={course.img} width="100%" height={160} />
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title"> {course.name} </h5>
                                        <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                                            {course.description}  </p>
                                        <button className="btn btn-primary"> Go </button>
                                        {currentUser.role === 'STUDENT' && (
                                            <button
                                                className={`btn ${isEnrolled(course._id)
                                                    ? 'btn-danger'
                                                    : 'btn-success'
                                                    } float-end`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleEnrollmentToggle(course._id);
                                                }}
                                            >
                                                {isEnrolled(course._id) ? 'Unenroll' : 'Enroll'}
                                            </button>
                                        )}
                                        {currentUser.role === 'FACULTY' && (
                                            <>
                                                <button onClick={(event) => {
                                                    event.preventDefault();
                                                    deleteCourse(course._id);
                                                }} className="btn btn-danger float-end"
                                                    id="wd-delete-course-click">
                                                    Delete
                                                </button>
                                                <button id="wd-edit-course-click"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        setCourse(course);
                                                    }}
                                                    className="btn btn-warning me-2 float-end" >
                                                    Edit
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}


