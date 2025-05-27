import { Platform } from 'react-native';

export const API_URL = Platform.select({
  android: 'http://100.30.96.249:5000',    // <- Change this IP address
  ios: 'http://192.168.254.254:5000',        // <- Change this IP address
  default: 'http://localhost:5000'           // For web browser
});

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