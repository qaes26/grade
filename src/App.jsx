import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StudentForm from './components/StudentForm';
import Tabs from './components/Tabs';
import SemesterView from './components/SemesterView';
import CumulativeView from './components/CumulativeView';
import PDFExport from './components/PDFExport';
import { calculateAverage, calculateCumulativeAverage } from './utils/gradeLogic';

function App() {
  const [activeTab, setActiveTab] = useState('semester');

  const [studentInfo, setStudentInfo] = useState({
    name: '',
    major: '',
  });

  const [courses, setCourses] = useState([
    { id: 1, name: '', hours: '', mark: '' },
    { id: 2, name: '', hours: '', mark: '' },
    { id: 3, name: '', hours: '', mark: '' }
  ]);

  const [cumulativeData, setCumulativeData] = useState({
    prevAvg: '',
    prevHours: '',
    currentSemesterAvg: '',
    currentSemesterHours: '',
  });

  const [semesterAvg, setSemesterAvg] = useState(0);

  // Calculate Semester Average
  useEffect(() => {
    const avg = calculateAverage(courses);
    setSemesterAvg(avg);

    // Auto-fill current semester data in cumulative view if on semester tab
    const totalHours = courses.reduce((acc, curr) => acc + (parseFloat(curr.hours) || 0), 0);
    setCumulativeData(prev => ({
      ...prev,
      currentSemesterAvg: avg,
      currentSemesterHours: totalHours > 0 ? totalHours : prev.currentSemesterHours
    }));
  }, [courses]);

  const calculateCumulativeResult = () => {
    return calculateCumulativeAverage(
      cumulativeData.prevAvg,
      cumulativeData.prevHours,
      cumulativeData.currentSemesterAvg,
      cumulativeData.currentSemesterHours
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white text-right" dir="rtl">
      <div className="container mx-auto px-4 pb-12 max-w-4xl">
        <Header />

        <main className="space-y-6">
          <StudentForm
            studentInfo={studentInfo}
            setStudentInfo={setStudentInfo}
          />

          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === 'semester' ? (
            <SemesterView
              courses={courses}
              setCourses={setCourses}
              semesterAvg={semesterAvg}
            />
          ) : (
            <CumulativeView
              cumulativeData={cumulativeData}
              setCumulativeData={setCumulativeData}
              calculateResult={calculateCumulativeResult}
            />
          )}

          <PDFExport
            studentInfo={studentInfo}
            courses={courses}
            semesterGPA={semesterAvg}
            cumulativeGPA={activeTab === 'cumulative' ? calculateCumulativeResult() : ''}
            activeTab={activeTab}
          />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
