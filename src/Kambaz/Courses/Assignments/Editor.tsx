export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name"><h3>Assignment Name</h3></label>
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description">
                The assignment is available online.
                Submit a link to the landing page of your Web application running on Netlify.

                The landing page should be the Kambaz application with a link to the Lab exercises.

                Lab 1 should be the landing page of the Lab exercises and should include the following:

                Your full name and section
                Links to each of the lab assignments
                Link to the Kambaz application
                Links to all relevant source code repositories
                The Kambaz application should include a link to navigate back to the landing page.
            </textarea>
            <br />
            <br />
            <table width="100%">
                <tr>
                    <td align="right">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr>
                <br />
                <tr>
                    <td valign="top" align="right">
                        <label htmlFor="wd-points">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td valign="top" align="right">
                        <label htmlFor="wd-points">Display Grade as </label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option value="Percentage" >Percentage</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td valign="top" align="right">
                        <label htmlFor="wd-points">Submission type </label>
                    </td>
                    <td>
                        <select id="wd-submission-type">
                            <option value="Percentage">Online</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td></td>
                    <td>
                        Online Entry Options <br />
                        <input type="checkbox" name="online-entry-options" id="wd-text-entry" />
                        <label htmlFor="wd-text-entry">Text Entry </label><br />

                        <input type="checkbox" name="online-entry-options" id="wd-website-url" />
                        <label htmlFor="wd-website-url">Website URL</label><br />

                        <input type="checkbox" name="online-entry-options" id="wd-media-recordings" />
                        <label htmlFor="wd-media-recordings">Media Recordings</label><br />

                        <input type="checkbox" name="online-entry-options" id="wd-student-annotation" />
                        <label htmlFor="wd-student-annotation">Student Annotation</label><br />

                        <input type="checkbox" name="online-entry-options" id="wd-file-upload" />
                        <label htmlFor="wd-file-upload">File Uploads</label>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right">
                        <label>Assign </label>
                    </td>
                    <td>
                        Assign to <br />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input id="wd-assign-to" value="Everyone" />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <label htmlFor="wd-text-fields-dob"> Due </label><br />
                        <input type="date"
                            value="2024-05-13"
                            id="wd-due-date" /><br />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <table>
                        <tr>
                            <td>Available from</td>
                            <td>Until</td>
                        </tr>
                        <tr>
                            <td><input type="date"
                                value="2024-05-06"
                                id="wd-available-from" />
                            </td>
                            <td>
                                <input type="date"
                                    value="2024-05-20"
                                    id="wd-available-until" />
                            </td>
                        </tr>
                    </table>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <hr />
                    </td>
                </tr>
                <tr>
                    <td align="right" colSpan={2}>
                        <button>Cancel</button>
                        <button>Save</button>
                    </td>
                </tr>
            </table>
        </div>
    );
}
