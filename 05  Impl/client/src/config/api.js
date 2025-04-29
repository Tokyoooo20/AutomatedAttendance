import { Platform } from 'react-native';

// API Configuration
export const API_URL = 'http://192.168.254.179:5000';

export const endpoints = {
    studentCreate: '/api/students/create',
    instructorCreate: '/api/instructors/create',
    studentLogin: '/api/students/login',
    studentLogout: '/api/students/logout',
    instructorLogin: '/api/instructors/login',
    instructorLogout: '/api/instructors/logout',
    courses: '/api/courses',
    courseCreate: '/api/courses/create',
    courseUpdate: '/api/courses/update',
    courseDelete: '/api/courses/delete',
    instructorCourses: '/api/courses/instructor',
    courseStudents: '/api/courses/students',
}; 