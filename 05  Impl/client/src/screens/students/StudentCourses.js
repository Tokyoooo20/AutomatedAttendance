import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '../../config';
import Header from '../../components/Header';
import TabBar from '../../components/TabBar';
import CustomAlert from '../../components/CustomAlert';
import { Ionicons } from '@expo/vector-icons';

const StudentCourses = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const studentData = route.params?.studentData || {};
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('courses');
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'error'
  });

  const fetchEnrolledCourses = async () => {
    try {
      console.log('Fetching courses for student:', studentData.idNumber);
      const response = await axios.get(`${API_URL}/api/students/enrolled-courses/${studentData.idNumber}`);
      console.log('API Response:', response.data);
      
      if (response.data.success) {
        setCourses(response.data.courses);
      } else {
        showAlert('Error', response.data.message || 'Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error.response?.data || error.message);
      showAlert('Error', error.response?.data?.message || 'Failed to fetch enrolled courses');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const fetchAvailableCourses = async () => {
    try {
      console.log('Fetching available courses');
      const response = await axios.get(`${API_URL}/api/courses/available`);
      console.log('Available courses:', response.data);
      
      if (response.data && response.data.length > 0) {
        // Try to enroll in the first course
        const firstCourse = response.data[0];
        await enrollInCourse(firstCourse._id);
      } else {
        console.log('No available courses found');
        showAlert('Info', 'No courses are available for enrollment. Please contact your administrator.');
      }
    } catch (error) {
      console.error('Error fetching available courses:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || 'Failed to fetch available courses';
      showAlert('Error', errorMessage);
    }
  };

  const enrollInCourse = async (courseId) => {
    try {
      console.log('Attempting to enroll in course:', courseId);
      console.log('Student ID:', studentData.idNumber);
      
      const response = await axios.post(`${API_URL}/api/courses/${courseId}/enroll-student`, {
        studentId: studentData.idNumber
      });
      
      console.log('Enrollment response:', response.data);
      
      if (response.data.success || response.data.message.includes('success')) {
        showAlert('Success', 'Enrolled in course successfully', 'success');
        // Wait a bit before refreshing the course list
        setTimeout(() => {
          fetchEnrolledCourses();
        }, 1000);
      } else {
        showAlert('Error', response.data.message || 'Failed to enroll in course');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || 'Failed to enroll in course';
      showAlert('Error', errorMessage);
    }
  };

  useEffect(() => {
    if (studentData.idNumber) {
      fetchEnrolledCourses();
    } else {
      console.error('No student ID available');
      setIsLoading(false);
    }
  }, [studentData.idNumber]);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchEnrolledCourses();
  };

  const studentTabs = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: 'home-outline',
      activeIcon: 'home',
    },
    {
      key: 'courses',
      label: 'Courses',
      icon: 'book-outline',
      activeIcon: 'book',
    }
  ];

  const showAlert = (title, message, type = 'error') => {
    setAlertConfig({
      visible: true,
      title,
      message,
      type
    });
  };

  const hideAlert = () => {
    setAlertConfig(prev => ({ ...prev, visible: false }));
  };

  const handleTabPress = (tabKey) => {
    if (tabKey === 'dashboard') {
      navigation.navigate('StudentDashboard', { studentData });
    } else {
      setActiveTab(tabKey);
    }
  };

  const handleQRScan = (course) => {
    // Navigate to QR Scanner screen with course info
    navigation.navigate('QRScanner', { 
      courseId: course.id,
      courseCode: course.courseCode,
      studentId: studentData.idNumber
    });
  };

  const renderCourseItem = ({ item }) => (
    <View style={styles.courseCard}>
      <View style={styles.courseHeader}>
        <View style={styles.courseInfo}>
          <Text style={styles.courseCode}>{item.courseCode}</Text>
          <Text style={styles.courseName}>{item.courseName}</Text>
        </View>
        <TouchableOpacity 
          style={styles.qrButton}
          onPress={() => handleQRScan(item)}
        >
          <Ionicons name="qr-code-outline" size={24} color="#165973" />
          <Text style={styles.qrButtonText}>Scan QR</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.courseDetails}>
        <Text style={styles.instructorName}>Instructor: {item.instructor}</Text>
        <Text style={styles.courseSchedule}>{item.schedule}</Text>
        <Text style={styles.courseRoom}>Room: {item.room}</Text>
      </View>
    </View>
  );

  console.log('Current courses state:', courses);
  console.log('Student Data:', studentData);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="My Courses"
        subtitle={`Student: ${studentData.fullName || 'Unknown'}`}
      />

      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#165973" />
        ) : courses.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>You are not enrolled in any courses</Text>
            <Text style={styles.emptyStateSubText}>Please contact your administrator</Text>
            <TouchableOpacity 
              style={styles.checkButton}
              onPress={fetchAvailableCourses}
            >
              <Text style={styles.checkButtonText}>Check Available Courses</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={courses}
            renderItem={renderCourseItem}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            contentContainerStyle={styles.coursesList}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                colors={['#165973']}
              />
            }
          />
        )}
      </View>

      <TabBar
        tabs={studentTabs}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />

      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onClose={hideAlert}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  coursesList: {
    paddingBottom: 20,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  courseInfo: {
    flex: 1,
    marginRight: 10,
  },
  courseCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#165973',
    marginBottom: 5,
  },
  courseName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  qrButton: {
    borderRadius: 8,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  qrButtonText: {
    color: '#165973',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  courseDetails: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  instructorName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  courseSchedule: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  courseRoom: {
    fontSize: 14,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  checkButton: {
    backgroundColor: '#165973',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default StudentCourses; 