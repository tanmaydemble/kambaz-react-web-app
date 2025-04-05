import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
// export const REMOTE_SERVER = "http://localhost:4000";
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/users`;

export const enroll = async (userId: string, courseId: string) => {
    const response = await axios.post(
        `${ENROLLMENTS_API}/${userId}/enroll/${courseId}`
    );
    return response.data;
};

export const unenroll = async (userId: string, courseId: string) => {
    const response = await axios.delete(
        `${ENROLLMENTS_API}/${userId}/unenroll/${courseId}`
    );
    return response.data;
};

export const fetchUserEnrollments = async (userId: string) => {
    const response = await axios.get(
        `${ENROLLMENTS_API}/${userId}/enrollments`
    );
    return response.data;
};