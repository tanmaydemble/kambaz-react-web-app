import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/reactjs.jpg" width={200} />
                        <div>
                            <h5> CS1234 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/100/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/nodejs.jpg" width={200} />
                        <div>
                            <h5> CS100 Node JS </h5>
                            <p className="wd-dashboard-course-title">
                                Backend developer  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/101/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/expressjs.jpg" width={200} />
                        <div>
                            <h5> CS 101 Express JS </h5>
                            <p className="wd-dashboard-course-title">
                                Backend software developer  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/102/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/mongodb.jpg" width={200} />
                        <div>
                            <h5> CS102 MongoDB </h5>
                            <p className="wd-dashboard-course-title">
                                Database Engineer  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/103/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/api.jpg" width={200} />
                        <div>
                            <h5> CS103 API </h5>
                            <p className="wd-dashboard-course-title">
                                Integration </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/104/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/python.jpg" width={200} />
                        <div>
                            <h5> CS104 Python </h5>
                            <p className="wd-dashboard-course-title">
                                Data Analyst </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/105/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/javascript.jpg" width={200} />
                        <div>
                            <h5> CS105 Javascript </h5>
                            <p className="wd-dashboard-course-title">
                                Web Developer  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
