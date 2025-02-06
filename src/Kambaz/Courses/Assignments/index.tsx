import { InputGroup, FormControl } from "react-bootstrap";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { GoTriangleDown } from "react-icons/go";
import { IoEllipsisVertical } from "react-icons/io5";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { MdOutlineAssignment } from "react-icons/md";

export default function Assignments() {
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
                    <button className="btn btn-danger rounded-1" type="button">
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
                <li className="wd-lesson list-group-item p-3 ps-1 bg-transparent">
                    <div className="d-flex align-items-center">
                        <BsGripVertical className="me fs-3 bg-transparent" />
                        <MdOutlineAssignment className="me-2" color="green" />
                        <div className="card-body">
                            <a className="card-title text-dark stretched-link no-underline" href="#/Kambaz/Courses/1234/Assignments/123">
                                <strong>A1</strong>
                            </a>
                            <div className="d-flex align-items-center">
                                <h6 className="card-subtitle mb-0 text-danger me-1">Multiple Modules </h6>
                                <p className="card-text text-muted mb-0"> | Not available until May 6 at 12:00am |</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="card-text text-muted mb-0 me-1">Due May 13 at 11:59pm </p>
                                <p className="text-muted mb-0"> | 100 pts</p>
                            </div>
                        </div>
                        <LessonControlButtons />
                    </div>
                </li>
                <li className="wd-lesson list-group-item p-3 ps-1 bg-transparent">
                    <div className="d-flex align-items-center">
                        <BsGripVertical className="me fs-3 bg-transparent" />
                        <MdOutlineAssignment className="me-2" color="green" />
                        <div className="card-body">
                            <a className="card-title text-dark stretched-link no-underline" href="#/Kambaz/Courses/1234/Assignments/124">
                                <strong>A2</strong>
                            </a>
                            <div className="d-flex align-items-center">
                                <h6 className="card-subtitle mb-0 text-danger me-1">Multiple Modules </h6>
                                <p className="card-text text-muted mb-0"> | Not available until May 13 at 12:00am |</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="card-text text-muted mb-0 me-1">Due May 20 at 11:59pm </p>
                                <p className="text-muted mb-0"> | 100 pts</p>
                            </div>
                        </div>
                        <LessonControlButtons />
                    </div>
                </li>
                <li className="wd-lesson list-group-item p-3 ps-1 bg-transparent">
                    <div className="d-flex align-items-center">
                        <BsGripVertical className="me fs-3 bg-transparent" />
                        <MdOutlineAssignment className="me-2" color="green" />
                        <div className="card-body">
                            <a className="card-title text-dark stretched-link no-underline" href="#/Kambaz/Courses/1234/Assignments/125">
                                <strong>A3</strong>
                            </a>
                            <div className="d-flex align-items-center">
                                <h6 className="card-subtitle mb-0 text-danger me-1">Multiple Modules </h6>
                                <p className="card-text text-muted mb-0"> | Not available until May 20 at 12:00am |</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="card-text text-muted mb-0 me-1">Due May 27 at 11:59pm </p>
                                <p className="text-muted mb-0"> | 100 pts</p>
                            </div>
                        </div>
                        <LessonControlButtons />
                    </div>
                </li>
            </ul>
        </div>
    );
}
