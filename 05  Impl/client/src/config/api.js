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
    courseCreate: '/api/courses',
    courseUpdate: '/api/courses/update',
    courseDelete: '/api/courses/delete',
    courseVerifyCode: '/api/courses/verify-code',
    instructorCourses: '/api/courses/instructor',
    courseStudents: '/api/courses/students',
    
    // Legacy Attendance endpoints
    attendanceRecord: '/api/attendance/record',
    courseAttendance: '/api/attendance/course',
    studentAttendance: '/api/attendance/student',
    updateAttendance: '/api/attendance',
    
    // New Session-based Attendance endpoints
    sessions: '/api/sessions',
    sessionCreate: '/api/sessions/create',
    sessionAttendance: '/api/session-attendance',
    sessionRecord: '/api/session-attendance/record',
    sessionStudentAttendance: '/api/sessions/student',
    sessionStats: '/api/sessions/stats/course'
}; 