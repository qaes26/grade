export const calculateGrade = (mark) => {
    const m = parseFloat(mark);
    if (isNaN(m)) return { label: '-', color: 'text-gray-400' };

    if (m >= 84) return { label: 'ممتاز', color: 'text-emerald-400' }; // Excellent
    if (m >= 78) return { label: 'جيد جداً', color: 'text-blue-400' }; // Very Good
    if (m >= 70) return { label: 'جيد', color: 'text-cyan-400' };      // Good
    if (m >= 60) return { label: 'مقبول', color: 'text-yellow-400' };   // Acceptable (60-69)
    if (m >= 50) return { label: 'ضعيف', color: 'text-orange-400' };    // Weak (Assuming 50 passing)
    return { label: 'راسب', color: 'text-red-500' };                    // Fail
};

export const calculateAverage = (courses) => {
    let totalWeightedMarks = 0;
    let totalHours = 0;

    courses.forEach(course => {
        const hours = parseFloat(course.hours) || 0;
        const mark = parseFloat(course.mark);

        // Only calculate if valid mark and hours
        if (!isNaN(mark) && hours > 0) {
            totalWeightedMarks += mark * hours;
            totalHours += hours;
        }
    });

    return totalHours === 0 ? 0 : (totalWeightedMarks / totalHours).toFixed(2);
};

export const calculateCumulativeAverage = (prevAvg, prevHours, currentAvg, currentHours) => {
    const pAvg = parseFloat(prevAvg) || 0;
    const pHours = parseFloat(prevHours) || 0;
    const cAvg = parseFloat(currentAvg) || 0;
    const cHours = parseFloat(currentHours) || 0;

    const totalWeightedMarks = (pAvg * pHours) + (cAvg * cHours);
    const totalHours = pHours + cHours;

    return totalHours === 0 ? 0 : (totalWeightedMarks / totalHours).toFixed(2);
};
