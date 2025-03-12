import { IoIosCheckmarkCircle } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { IoMdExit } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { IoBarChart } from "react-icons/io5";
import { TfiAnnouncement } from "react-icons/tfi";
import { IoIosNotifications } from "react-icons/io";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { useSelector } from "react-redux";
export default function CourseStatus() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    return (
        <div id="wd-course-status" style={{ width: "300px" }}>
            <h2>Course Status</h2>
            {currentUser.role === 'FACULTY' && (
                <>
                    <div className="d-flex">
                        <div className="w-50 pe-1">
                            <button id="wd-unpublish" className="btn btn-lg btn-secondary w-100 text-nowrap"
                                type="button"> <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish</button>
                        </div>
                        <div className="w-50">
                            <button id="wd-publish" className="btn btn-lg btn-success w-100"
                                type="button"> <IoIosCheckmarkCircle className="me-2 fs-5" /> Publish</button>
                        </div>
                    </div>
                </>)}<br />
            <button id="wd-import-existing-content" className="btn btn-lg mb-1 btn-secondary btn-equal-width"
                type="button"> <BiImport /> Import Existing Content</button><br />
            <button id="wd-import-from-commons" className="btn btn-lg mb-1 btn-secondary btn-equal-width"
                type="button"> <IoMdExit /> Import from Commons</button><br />
            <button id="wd-choose-home-page" className="btn btn-lg mb-1 btn-secondary btn-equal-width"
                type="button"> <MdHome /> Choose Home Page</button><br />
            <button id="wd-view-course-stream" className="btn btn-lg mb-1 btn-secondary btn-equal-width"
                type="button"> <IoBarChart /> View Course Screen</button><br />
            <button id="wd-new-announcement" className="btn btn-lg mb-1 btn-secondary btn-equal-width"
                type="button"> <TfiAnnouncement /> New Announcement</button><br />
            <button id="wd-view-course-stream" className="btn btn-lg mb-1 btn-secondary btn-equal-width"
                type="button"> <IoBarChart /> New Analytics</button><br />
            <button id="wd-view-course-notifications" className="btn btn-lg mb-1 btn-secondary btn-equal-width"
                type="button"> <IoIosNotifications />View Course Notifications</button>
        </div>);
}   