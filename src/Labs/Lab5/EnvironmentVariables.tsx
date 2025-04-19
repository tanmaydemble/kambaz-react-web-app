// const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const REMOTE_SERVER = "http://localhost:4000";

export default function EnvironmentVariables() {
    console.log('Remote Server:', process.env.VITE_REMOTE_SERVER);
    return (
        <div id="wd-environment-variables">
            <h3>Environment Variables</h3>
            <p>Remote Server: {REMOTE_SERVER}</p><hr />
        </div>
    );
}
