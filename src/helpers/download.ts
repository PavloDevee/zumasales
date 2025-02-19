import { jsPDF } from 'jspdf';

import autoTable from "jspdf-autotable";

export const generatePDF = async (item: any) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("Zuma Sales", 15, 15);
  doc.setFontSize(10);
  doc.text("www.zumasales.com", 15, 22);

  doc.setFontSize(8);
  const text1 = "The inspection is registered at:";
  const x1 = doc.internal.pageSize.width - doc.getTextWidth(text1) - 15;
  doc.text(text1, x1, 18);
  doc.setFontSize(9);
  const text2 = item.email;
  const x2 = doc.internal.pageSize.width - doc.getTextWidth(text2) - 15;
  doc.text(text2, x2, 22);

  const data = [
    ["Batteries", item.batteries],
    ["Condition", item.condition],
    ["Created At", new Date(item.createdAt).toLocaleString()],
    ["Custom", item.custom],
    ["Machine Type", item.machinetype],
    ["Make", item.make],
    ["Model", item.model],
    ["Note", item.note],
    ["Serial Number", item.serialnumber],
    ["Tires", item.tires],
    ["Vendor Email", item.vendorEmail],
    ["Year Make", item.yearmake],
  ];

  autoTable(doc, {
    startY: 25,
    head: [["Field", "Value"]],
    body: data,
    styles: { fontSize: 8, cellPadding: 1 },
    headStyles: { fillColor: [100, 100, 100], textColor: [255, 255, 255] },
  });

  const maxHeight = 297 - 20;

  if (item.pictures && item.pictures.length > 0) {
    let yPosition = 110;

    for (const [index, picture] of item.pictures.entries()) {
      const xPosition = index % 2 === 0 ? 15 : 110;
      if (index % 2 === 0 && index !== 0) {
        yPosition += 70;
      }
      if (yPosition + 50 > maxHeight) { //new page for pdf
        doc.addPage();
        yPosition = 20;
      }
      doc.text(picture.desc, xPosition, yPosition - 5);
      const base64Image = await convertImageToBase64(picture.urlImg);
      doc.addImage(base64Image, "JPEG", xPosition, yPosition, 80, 50);
    }
  }

  doc.save("inspection_report.pdf");
};


const convertImageToBase64 = (url: string) => {
  return fetch(url)
    .then(response => response.blob())
    .then(blob => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    });
};
