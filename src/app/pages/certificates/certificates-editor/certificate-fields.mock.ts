export interface Position {
  x: number;
  y: number;
}

export interface CertificateElement {
  id: string;
  type: 'text' | 'image' | 'date';
  label: string;
  value: string | null;
  position: Position;
  fontSize?: number;
  fontColor?: string;
  width?: number;
  height?: number;
  isDraggable?: boolean;
}

export interface CertificateTemplateSettings {
  backgroundImage: string | null;
  signatureImage: string | null;
  elements: CertificateElement[];
}

export const initialCertificateData: CertificateTemplateSettings = {
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
      fontColor: '#000000',
      isDraggable: true
    },
    {
      id: 'traineeNameEn',
      type: 'text',
      label: 'Trainee Name (En)',
      value: '',
      position: { x: 100, y: 240 },
      fontSize: 18,
      fontColor: '#000000',
      isDraggable: true
    },
    {
      id: 'trainingTitleAr',
      type: 'text',
      label: 'عنوان التدريب (بالعربية)',
      value: '',
      position: { x: 100, y: 300 },
      fontSize: 20,
      fontColor: '#000000',
      isDraggable: true
    },
    {
      id: 'trainingTitleEn',
      type: 'text',
      label: 'Training Title (En)',
      value: '',
      position: { x: 100, y: 340 },
      fontSize: 16,
      fontColor: '#000000',
      isDraggable: true
    },
    {
      id: 'issueDate',
      type: 'date',
      label: 'تاريخ الإصدار (YYYY/MM/DD)',
      value: '',
      position: { x: 400, y: 400 },
      fontSize: 14,
      fontColor: '#000000',
      isDraggable: true
    },
    {
      id: 'certificateCode',
      type: 'text',
      label: 'رمز الشهادة',
      value: '',
      position: { x: 400, y: 450 },
      fontSize: 14,
      fontColor: '#000000',
      isDraggable: true
    },
    {
      id: 'signature',
      type: 'image',
      label: 'صورة التوقيع',
      value: null,
      position: { x: 500, y: 500 },
      width: 150,
      height: 80,
      isDraggable: true
    }
  ]
};