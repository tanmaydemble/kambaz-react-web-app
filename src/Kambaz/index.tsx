import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import './styles.css'
import { useEffect, useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { setEnrollments, addEnrollment } from "./Courses/Enrollments/reducer";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import * as enrollmentClient from "./Courses/Enrollments/client";

export default function Kambaz() {
    const [allCourses, setAllCourses] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [course, setCourse] = useState<any>({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    });
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const enrollments = useSelector((state: any) => state.enrollments.enrollments);

    const fetchCourses = async () => {
        try {
            if (currentUser.role === 'FACULTY') {
                const facultyCourses = await userClient.findMyCourses();
                setCourses(facultyCourses);
            } else {
                const allCourses = await courseClient.fetchAllCourses();
                setAllCourses(allCourses);
                const enrolledCourses = allCourses.filter((c: { _id: any; }) =>
                    enrollments.some((e: { user: any; course: any; }) => e.user === currentUser._id && e.course === c._id)
                );
                setCourses(enrolledCourses);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeEnrollments = async () => {
            if (currentUser) {
                try {
                    const userEnrollments = await enrollmentClient.fetchUserEnrollments(currentUser._id);
                    dispatch(setEnrollments(userEnrollments));
                } catch (error) {
                    console.error("Failed to load enrollments:", error);
                }
            }
        };
        initializeEnrollments();
    }, [currentUser, dispatch]);

    useEffect(() => {
        fetchCourses();
    }, [currentUser, enrollments]);



    const addNewCourse = async () => {
        const newCourse = await userClient.createCourse(course);
        setCourses([...courses, newCourse]);
        if (currentUser.role === 'FACULTY') {
            console.log("role is faculty")
            dispatch(addEnrollment({
                userId: currentUser._id,
                courseId: newCourse._id
            }));
        }
    };
    const deleteCourse = async (courseId: any) => {
        await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
    };
    const updateCourse = async () => {
        await courseClient.updateCourse(course);
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                } else {
                    return c;
                }
            })
        );
    };
    return (
        <Session>
            <div id="wd-kambaz">
                <KambazNavigation />
                {/* <h1>Kambaz</h1> */}
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Account" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="/Dashboard" element={<ProtectedRoute><Dashboard
                            courses={courses}
                            course={course}
                            allCourses={allCourses}
                            setCourse={setCourse}
                            addNewCourse={addNewCourse}
                            deleteCourse={deleteCourse}
                            updateCourse={updateCourse} /></ProtectedRoute>} />
                        <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
                        <Route path="/Calendar" element={<h1>Calendar</h1>} />
                        <Route path="/Inbox" element={<h1>Inbox</h1>} />
                    </Routes>
                </div>
            </div >
        </Session>
    );
}
