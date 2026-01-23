import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import StudentInfo from './components/StudentInfo';
import SemesterGPA, { GRADE_POINTS } from './components/SemesterGPA';
import CumulativeGPA from './components/CumulativeGPA';
import ResultsDisplay from './components/ResultsDisplay';
import Footer from './components/Footer';
import { supabase } from './supabase';

function App() {
  const [name, setName] = useState(() => localStorage.getItem('name') || '');
  const [major, setMajor] = useState(() => localStorage.getItem('major') || '');
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('courses');
    return saved ? JSON.parse(saved) : [{ id: 1, name: '', hours: 3, grade: 'A' }];
  });
  const [prevGPA, setPrevGPA] = useState(() => localStorage.getItem('prevGPA') || '');
  const [prevHours, setPrevHours] = useState(() => localStorage.getItem('prevHours') || '');

  useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('major', major);
    localStorage.setItem('courses', JSON.stringify(courses));
    localStorage.setItem('prevGPA', prevGPA);
    localStorage.setItem('prevHours', prevHours);
  }, [name, major, courses, prevGPA, prevHours]);

  useEffect(() => {
    console.log('Supabase client initialized:', supabase);
  }, []);

  const { sgpa, cgpa } = useMemo(() => {
    let semesterPoints = 0;
    let semesterHours = 0;

    courses.forEach(c => {
      const points = GRADE_POINTS[c.grade] || 0;
      const hours = parseFloat(c.hours) || 0;
      semesterPoints += points * hours;
      semesterHours += hours;
    });

    const s_gpa = semesterHours > 0 ? (semesterPoints / semesterHours).toFixed(2) : "0.00";

    // CGPA Calculation
    const p_gpa = parseFloat(prevGPA) || 0;
    const p_hours = parseFloat(prevHours) || 0;

    let totalPoints = (p_gpa * p_hours) + semesterPoints;
    let totalHours = p_hours + semesterHours;

    const c_gpa = totalHours > 0 ? (totalPoints / totalHours).toFixed(2) : "0.00";

    return { sgpa: s_gpa, cgpa: c_gpa };
  }, [courses, prevGPA, prevHours]);

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f1020] to-black overflow-x-hidden text-gray-100 selection:bg-purple-500/30">
      <div className="container mx-auto px-4 py-8 pb-32">
        <Header />

        <StudentInfo name={name} setName={setName} major={major} setMajor={setMajor} />

        <ResultsDisplay sgpa={sgpa} cgpa={cgpa} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <SemesterGPA courses={courses} setCourses={setCourses} />
          </div>
          <div className="lg:col-span-2">
            <CumulativeGPA
              prevGPA={prevGPA} setPrevGPA={setPrevGPA}
              prevHours={prevHours} setPrevHours={setPrevHours}
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
