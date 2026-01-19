import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Download, GraduationCap } from 'lucide-react';
import { calculateGrade } from '../utils/gradeLogic';

const PDFExport = ({ studentInfo, courses, semesterGPA, cumulativeGPA, activeTab }) => {
    const reportRef = useRef();

    const generatePDF = async () => {
        try {
            const element = reportRef.current;

            // 1. Create a clean iframe to isolate from Tailwind v4 styles
            const iframe = document.createElement('iframe');
            Object.assign(iframe.style, {
                position: 'fixed',
                top: '-10000px',
                left: '-10000px',
                width: '210mm',
                height: '297mm',
                border: 'none',
                zIndex: '-1000'
            });
            document.body.appendChild(iframe);

            // 2. Clone the content and strip classes
            const clone = element.cloneNode(true);

            // Remove all class names from the clone and children to prevent Tailwind interference
            const allElements = clone.getElementsByTagName('*');
            for (let i = 0; i < allElements.length; i++) {
                allElements[i].removeAttribute('class');
            }
            clone.removeAttribute('class');

            // Ensure the clone is visible in the new document
            Object.assign(clone.style, {
                display: 'block',
                width: '100%',
                height: '100%',
                backgroundColor: 'white'
            });

            // 3. Write content to iframe document
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write('<html><head><style>body { margin: 0; font-family: sans-serif; }</style></head><body></body></html>');
            doc.close();

            doc.body.appendChild(clone);

            // 4. Capture with html2canvas inside the iframe context
            // Note: We capture the body of the iframe
            const canvas = await html2canvas(doc.body, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                width: 794, // A4 width in px at 96dpi approx (210mm)
                height: 1123, // A4 height (297mm)
                windowWidth: 794,
                windowHeight: 1123
            });

            // 5. Cleanup
            document.body.removeChild(iframe);

            // 6. Generate PDF
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('Grade_Report.pdf');

        } catch (error) {
            console.error("PDF Export Error:", error);
            alert("حدث خطأ أثناء تصدير الملف (Iframe Mode). يرجى المحاولة مرة أخرى.\n" + error.message);
        }
    };

    const isSemester = activeTab === 'semester';
    const currentDate = new Date().toLocaleDateString('en-GB');

    return (
        <div className="flex justify-center mt-8 mb-12">
            <button
                onClick={generatePDF}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-all border border-slate-700"
            >
                <Download className="w-5 h-5" />
                {isSemester ? 'تصدير تقرير الفصل (PDF)' : 'تصدير التقرير التراكمي (PDF)'}
            </button>

            {/* Hidden Printable Report Template */}
            <div
                ref={reportRef}
                style={{ display: 'none' }}
                dir="rtl"
            >
                <div style={{ padding: '40px', backgroundColor: '#ffffff', color: '#000000', fontFamily: 'sans-serif' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', borderBottom: '2px solid #1f2937', paddingBottom: '24px', marginBottom: '32px' }}>
                        <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                            <GraduationCap style={{ width: '32px', height: '32px', color: '#000000' }} />
                            {isSemester ? 'كشف علامات فصلي' : 'كشف علامات تراكمي'}
                        </h1>
                        <p style={{ color: '#4b5563' }}>نسخة رسمية</p>
                    </div>

                    {/* Student Info */}
                    <div style={{ backgroundColor: '#f9fafb', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '32px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div>
                                <span style={{ color: '#6b7280', display: 'block', fontSize: '14px', marginBottom: '4px' }}>اسم الطالب</span>
                                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{studentInfo.name || 'غير محدد'}</span>
                            </div>
                            <div>
                                <span style={{ color: '#6b7280', display: 'block', fontSize: '14px', marginBottom: '4px' }}>التخصص</span>
                                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{studentInfo.major || 'غير محدد'}</span>
                            </div>
                            <div>
                                <span style={{ color: '#6b7280', display: 'block', fontSize: '14px', marginBottom: '4px' }}>التاريخ</span>
                                <span style={{ fontWeight: '500', fontFamily: 'monospace', direction: 'ltr', textAlign: 'right', display: 'block' }}>{currentDate}</span>
                            </div>
                            <div>
                                <span style={{ color: '#6b7280', display: 'block', fontSize: '14px', marginBottom: '4px' }}>نوع الكشف</span>
                                <span style={{ fontWeight: 'bold' }}>{isSemester ? 'فصلي' : 'تراكمي شامل'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Course Table */}
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', borderRight: '4px solid #000000', paddingRight: '12px' }}>تفاصيل مواد الفصل الحالي</h3>
                    <table style={{ width: '100%', marginBottom: '32px', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f3f4f6', textAlign: 'right' }}>
                                <th style={{ padding: '12px', borderBottom: '2px solid #d1d5db' }}>#</th>
                                <th style={{ padding: '12px', borderBottom: '2px solid #d1d5db' }}>المادة الدراسية</th>
                                <th style={{ padding: '12px', borderBottom: '2px solid #d1d5db', textAlign: 'center' }}>الساعات</th>
                                <th style={{ padding: '12px', borderBottom: '2px solid #d1d5db', textAlign: 'center' }}>العلامة</th>
                                <th style={{ padding: '12px', borderBottom: '2px solid #d1d5db', textAlign: 'center' }}>التقدير</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, index) => {
                                const grade = calculateGrade(course.mark);
                                return (
                                    <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                        <td style={{ padding: '12px', color: '#6b7280' }}>{index + 1}</td>
                                        <td style={{ padding: '12px', fontWeight: '500' }}>{course.name || '-'}</td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}>{course.hours || '-'}</td>
                                        <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>{course.mark || '-'}</td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                backgroundColor: '#f3f4f6',
                                                color: '#1f2937',
                                                border: '1px solid #d1d5db',
                                                display: 'inline-block'
                                            }}>
                                                {grade.label}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Results Summary */}
                    <div style={{ display: 'flex', gap: '24px', marginTop: '32px' }}>
                        <div style={{ flex: 1, backgroundColor: '#111827', color: '#ffffff', padding: '24px', borderRadius: '12px' }}>
                            <span style={{ display: 'block', color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>المعدل الفصلي</span>
                            <div style={{ fontSize: '36px', fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: '8px', direction: 'ltr' }}>
                                <span>{semesterGPA}%</span>
                            </div>
                            <div style={{ marginTop: '8px', fontSize: '14px', color: '#67e8f9' }}>
                                التقدير: {calculateGrade(semesterGPA).label}
                            </div>
                        </div>

                        {cumulativeGPA && (
                            <div style={{ flex: 1, backgroundColor: '#1f2937', color: '#ffffff', padding: '24px', borderRadius: '12px' }}>
                                <span style={{ display: 'block', color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>المعدل التراكمي الجديد</span>
                                <div style={{ fontSize: '36px', fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: '8px', direction: 'ltr' }}>
                                    <span>{cumulativeGPA}%</span>
                                </div>
                                <div style={{ marginTop: '8px', fontSize: '14px', color: '#d8b4fe' }}>
                                    التقدير: {calculateGrade(cumulativeGPA).label}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div style={{
                        position: 'absolute',
                        bottom: '40px',
                        left: '40px',
                        right: '40px',
                        textAlign: 'center',
                        color: '#9ca3af',
                        fontSize: '14px',
                        borderTop: '1px solid #e5e7eb',
                        paddingTop: '16px'
                    }}>
                        تم استخراج هذا الكشف إلكترونياً - من اعداد قيس جازي
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PDFExport;
