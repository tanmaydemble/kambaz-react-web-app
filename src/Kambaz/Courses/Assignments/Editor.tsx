import { Row, Col, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addAssignment, updateAssignment } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client"

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const existingAssignment = assignments.find(
        (a: { _id: string }) => a._id === aid
    );
    // console.log({ ...existingAssignment });
    const [form, setForm] = useState({
        _id: aid,
        title: existingAssignment?.title || 'New Assignment',
        course: cid || '',
        description: existingAssignment?.description || 'New description',
        points: existingAssignment?.points || 100,
        dueDate: existingAssignment?.dueDate || '',
        availableFrom: existingAssignment?.availableFrom || '',
        availableUntil: existingAssignment?.availableUntil || ''
    });
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (existingAssignment) {
            // console.log("update case")
            await assignmentsClient.updateAssignment(form);
            dispatch(updateAssignment(form));
        } else {
            // console.log("add case")
            // console.log({ ...form })
            const assignment = await coursesClient.createAssignmentForCourse(cid as string, { ...form, course: cid });
            dispatch(addAssignment(assignment));
        }
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    return (
        <Container id="wd-assignments-editor">
            <Row className="mb-3">
                <Col xs={3} className="text-end">
                    <label htmlFor="wd-name">Assignment Name</label>
                </Col>
                <Col xs={9}>
                    <input
                        id="wd-name"
                        value={form.title}
                        onChange={(e) => setForm({
                            ...form,
                            title: e.target.value
                        })}
                        className="form-control"
                        placeholder="Enter assignment title"
                    />
                </Col>
            </Row>
            {/* Description Textarea */}
            < Row className="mb-3" >
                <Col xs={3}></Col>
                <Col xs={9} >
                    <textarea
                        id="wd-description"
                        className="form-control"
                        rows={10}
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                </Col>
            </Row>

            {/* Points Input */}
            <Row className="mb-3">
                <Col xs={3} className="text-end">
                    <label htmlFor="wd-points">Points</label>
                </Col>
                <Col xs={9}>
                    <input
                        id="wd-points"
                        type="number"
                        value={form.points}
                        onChange={(e) => setForm({ ...form, points: Number(e.target.value) })}
                        className="form-control"
                    />
                </Col>
            </Row>

            {/* Assignment Group Dropdown */}
            <Row className="mb-3">
                <Col xs={3} className="text-end">
                    <label htmlFor="wd-group">Assignment Group</label>
                </Col>
                <Col xs={9}>
                    <select id="wd-group" className="form-select">
                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                    </select>
                </Col>
            </Row>

            {/* Display Grade As Dropdown */}
            <Row className="mb-3">
                <Col xs={3} className="text-end">
                    <label htmlFor="wd-display-grade-as">Display Grade as</label>
                </Col>
                <Col xs={9}>
                    <select id="wd-display-grade-as" className="form-select">
                        <option value="Percentage">Percentage</option>
                    </select>
                </Col>
            </Row>

            {/* Submission Type Dropdown */}
            <div className="m-3">
                <Row className="mb-3">
                    <Col xs={3} className="text-end">
                        <label htmlFor="wd-submission-type">Submission type</label>
                    </Col>
                    <Col xs={9} className="border mb-3">
                        <br />
                        <select id="wd-submission-type" className="form-select">
                            <option value="Online">Online</option>
                        </select><br />
                        <label className="fw-bolder">Online Entry Options</label><br /><br />
                        {["Text Entry", "Website URL", "Media Recordings", "Student Annotation", "File Uploads"].map((option, index) => (
                            <div key={index} className="form-check">
                                <input type="checkbox" className="form-check-input" id={`wd-option-${index}`} />
                                <label className="form-check-label" htmlFor={`wd-option-${index}`}>{option}</label>
                            </div>
                        ))}
                    </Col>
                </Row>

                {/* Online Entry Options */}
                {/* <Row>

                </Row> */}
            </div>
            {/* Assign To Section */}
            <Row className="mb-3">
                <Col xs={3} className="text-end">
                    <label>Assign</label>
                </Col>
                <Col xs={9} className="border mb-3">
                    <br />
                    <Col>
                        <label>Assign to</label>
                        <input id="wd-assign-to" value="Everyone" className="form-control" />
                    </Col>
                    <br />
                    <Col>
                        <label htmlFor="wd-due-date">Due</label>
                        <input
                            type="date"
                            id="wd-due-date"
                            value={form.dueDate}
                            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                            className="form-control"
                        />
                    </Col>
                    <br />
                    <Col>
                        <Row>
                            <Col xs={12} sm={6} md={4} lg={3}><label>Available from</label></Col>
                            <Col xs={12} sm={6} md={4} lg={3}><label>Until</label></Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6} md={4} lg={3}>
                                <input
                                    type="date"
                                    value={form.availableFrom}
                                    onChange={(e) => setForm({ ...form, availableFrom: e.target.value })}
                                    className="form-control"
                                />
                            </Col>
                            <Col xs={12} sm={6} md={4} lg={3}>
                                <input
                                    type="date"
                                    value={form.availableUntil}
                                    onChange={(e) => setForm({ ...form, availableUntil: e.target.value })}
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                    </Col>
                    <br />
                </Col>
            </Row>
            <hr />
            {/* Buttons */}

            <Row className="mt-4">
                <Col className="text-end">
                    <div>
                        {/* Cancel Button */}
                        <button
                            onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)}
                            className="btn btn-secondary me-2"
                        >
                            Cancel
                        </button>

                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            className="btn btn-danger"
                        >
                            Save
                        </button>
                    </div>
                </Col>
            </Row>
        </Container >
    );
}
