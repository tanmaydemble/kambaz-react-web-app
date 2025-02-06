import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                to="/Kambaz/Courses/1234/Home">
                                <img src="/images/reactjs.jpg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title"> CS1234 React JS </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Full Stack software developer  </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link to="/Kambaz/Courses/100/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark" >
                                <img src="/images/nodejs.jpg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title"> CS100 Node JS </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Backend developer  </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link to="/Kambaz/Courses/101/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark" >
                                <img src="/images/expressjs.jpg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title"> CS 101 Express JS </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Backend software developer  </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link to="/Kambaz/Courses/102/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark" >
                                <img src="/images/mongodb.jpg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title"> CS102 MongoDB </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Database Engineer  </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link to="/Kambaz/Courses/103/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark" >
                                <img src="/images/api.jpg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title"> CS103 API </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Integration </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link to="/Kambaz/Courses/104/Home"
                                className="wd-dashboard-course-link  text-decoration-none text-dark" >
                                <img src="/images/python.jpg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title"> CS104 Python </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Data Analyst </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link to="/Kambaz/Courses/105/Home"
                                className="wd-dashboard-course-link  text-decoration-none text-dark" >
                                <img src="/images/javascript.jpg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title"> CS105 JavaScript </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Web Developer </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
