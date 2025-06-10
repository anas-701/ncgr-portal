// // mock-data.ts

// export interface CertificateElement {
//   id: string;
//   type: 'text' | 'image' | 'date';
//   label: string;
//   value: string | null;
//   position: { x: number; y: number }; // Make position required
//   fontSize?: number;
//   fontColor?: string;
//   width?: number;
//   height?: number;
// }
// export interface CertificateTemplateSettings {
//   backgroundImage: string | null;
//   signatureImage: string | null;
//   elements: CertificateElement[];
// }
// export const mockCertificateData: { templateSettings: CertificateTemplateSettings } = {
//   templateSettings: {
//     backgroundImage: null, // can be string or null
//     signatureImage: null, // can be string or null
//     elements: [
//       {
//         id: 'traineeNameAr',
//         type: 'text',
//         label: 'اسم المتدرب (بالعربية)',
//         value: '',
//         position: { x: 100, y: 200 },
//         fontSize: 24,
//         fontColor: '#000000'
//       },
//       {
//         id: 'traineeNameEn',
//         type: 'text',
//         label: 'Trainee Name (En)',
//         value: '',
//         position: { x: 100, y: 240 },
//         fontSize: 18,
//         fontColor: '#000000'
//       },
//       {
//         id: 'trainingTitleAr',
//         type: 'text',
//         label: 'عنوان التدريب (بالعربية)',
//         value: '',
//         position: { x: 100, y: 300 },
//         fontSize: 20,
//         fontColor: '#000000'
//       },
//       {
//         id: 'trainingTitleEn',
//         type: 'text',
//         label: 'Training Title (En)',
//         value: '',
//         position: { x: 100, y: 340 },
//         fontSize: 16,
//         fontColor: '#000000'
//       },
//       {
//         id: 'issueDate',
//         type: 'date',
//         label: 'تاريخ الإصدار (YYYY/MM/DD)',
//         value: '',
//         position: { x: 400, y: 400 },
//         fontSize: 14,
//         fontColor: '#000000'
//       },
//       {
//         id: 'certificateCode',
//         type: 'text',
//         label: 'رمز الشهادة',
//         value: '',
//         position: { x: 400, y: 450 },
//         fontSize: 14,
//         fontColor: '#000000'
//       },
//       {
//         id: 'signature',
//         type: 'image',
//         label: 'صورة التوقيع',
//         value: null,
//         position: { x: 500, y: 500 },
//         width: 150,
//         height: 80
//       }
//     ]
//   }
// };

// src/app/mock-data.ts

export interface CertificateElement {
  id: string;
  type: 'text' | 'image' | 'date';
  label: string;
  value: string | null;
  position: { x: number; y: number };
  fontSize?: number;
  fontColor?: string;
  width?: number;
  height?: number;
}

export interface CertificateTemplateSettings {
  backgroundImage: string | null;
  signatureImage: string | null;
  elements: CertificateElement[];
}

 export const mockCertificateData: { templateSettings: CertificateTemplateSettings } = {
  templateSettings: {
    backgroundImage: null,
    signatureImage: null,
    elements: [
      {
        id: 'traineeNameAr',
        type: 'text',
        label: 'اسم المتدرب (بالعربية)',
        value: '',
        position: { x: 100, y: 200 },
        fontSize: 24,
        fontColor: '#000000'
      },
      {
        id: 'traineeNameEn',
        type: 'text',
        label: 'Trainee Name (En)',
        value: '',
        position: { x: 100, y: 240 },
        fontSize: 18,
        fontColor: '#000000'
      },
      {
        id: 'trainingTitleAr',
        type: 'text',
        label: 'عنوان التدريب (بالعربية)',
        value: '',
        position: { x: 100, y: 300 },
        fontSize: 20,
        fontColor: '#000000'
      },
      {
        id: 'trainingTitleEn',
        type: 'text',
        label: 'Training Title (En)',
        value: '',
        position: { x: 100, y: 340 },
        fontSize: 16,
        fontColor: '#000000'
      },
      {
        id: 'issueDate',
        type: 'date',
        label: 'تاريخ الإصدار (YYYY/MM/DD)',
        value: '',
        position: { x: 400, y: 400 },
        fontSize: 14,
        fontColor: '#000000'
      },
      {
        id: 'certificateCode',
        type: 'text',
        label: 'رمز الشهادة',
        value: '',
        position: { x: 400, y: 450 },
        fontSize: 14,
        fontColor: '#000000'
      },
      {
        id: 'signature',
        type: 'image',
        label: 'صورة التوقيع',
        value: null,
        position: { x: 500, y: 500 },
        width: 150,
        height: 80
      }
    ]
  }
};