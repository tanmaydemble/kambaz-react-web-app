import { InputGroup, FormControl } from "react-bootstrap";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { GoTriangleDown } from "react-icons/go";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { setAssignments, deleteAssignment } from "./reducer";
import { useEffect } from "react";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleNewAssignment = () => {
        const newId = uuidv4();
        navigate(`/Kambaz/Courses/${cid}/Assignments/${newId}`);
    };
    const handleDeleteAssignment = async (assignmentId: string) => {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
    };
    const fetchAssignments = async () => {
        const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    };
    useEffect(() => {
        fetchAssignments();
    }, []);

    return (
        <div id="wd-assignments">
            <div className="d-flex align-items-center justify-content-between">
                <InputGroup className="w-50 me-4 rounded-1">
                    <InputGroup.Text><CiSearch /></InputGroup.Text>
                    <FormControl placeholder="Search..." />
                </InputGroup>
                <div>
                    <button className="btn btn-secondary me-1 text-dark bg-light rounded-1" type="button">
                        <FaPlus className="position-relative me-2 " style={{ bottom: "1px" }} />
                        Group
                    </button>
                    <button className="btn btn-danger rounded-1" type="button" onClick={handleNewAssignment}>
                        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                        Assignment
                    </button>
                </div>
            </div>
            <br /><br />
            <ul id="wd-assignments" className="list-group rounded-0 w-100">
                <li className="wd-module list-group-item p-0  fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <MdOutlineAssignment className="me-2" color="green" />
                        <GoTriangleDown className="me-2" />
                        ASSIGNMENTS
                        <div className="float-end">
                            <button className="rounded-5 border-1 bg-secondary fs-6">40% of Total</button>
                            <BsPlus />
                            <IoEllipsisVertical className="fs-4" />
                        </div>
                    </div>
                </li>
                {assignments.map((assignment: any) => (
                    <li key={assignment._id} className="wd-lesson list-group-item p-3 ps-1 bg-transparent">
                        <div className="d-flex align-items-center">
                            <BsGripVertical className="me fs-3 bg-transparent" />
                            <MdOutlineAssignment className="me-2" color="green" />
                            <div className="card-body">
                                <Link className="card-title text-dark no-underline"
                                    to={`/Kambaz/Courses/${assignment.course}/Assignments/${assignment._id}`}>
                                    <strong>{assignment.title}</strong>
                                </Link>
                                <div className="d-flex align-items-center">
                                    <h6 className="card-subtitle mb-0 text-danger me-1">Multiple Modules</h6>
                                    <p className="card-text text-muted mb-0">
                                        {assignment.availableFrom
                                            ? ` | Available from ${new Date(assignment.availableFrom).toLocaleDateString()} |`
                                            : " | Not available yet |"}
                                    </p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <p className="card-text text-muted mb-0 me-1">
                                        {assignment.dueDate
                                            ? `Due ${new Date(assignment.dueDate).toLocaleString()}`
                                            : "No due date"}
                                    </p>
                                    <p className="text-muted mb-0">
                                        {assignment.points ? ` | ${assignment.points} pts` : ""}
                                    </p>
                                </div>
                            </div>
                            <div onClick={(e) => e.stopPropagation()}>
                                <AssignmentControlButtons assignmentId={assignment._id}
                                    onDelete={handleDeleteAssignment} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    );
}

