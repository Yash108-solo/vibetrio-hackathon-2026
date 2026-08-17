import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Capture an HTML element by ID and download it as a high-res PDF
 * @param {string} elementId 
 * @param {string} fileName 
 */
export async function exportElementToPDF(elementId, fileName = 'VibeTrio_Report.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element #${elementId} not found`);
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#020617', // slate-950
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(fileName);
  } catch (error) {
    console.error('PDF Export Error:', error);
  }
}
