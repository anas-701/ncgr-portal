
export interface Course {
    id?:any
    title: string;
    ratingText: string;
    government: string;
    description: string;
    reportText: string;
    language: string;
    image: string;
  }
  
  export const COURSES: Course[] = [
    {
        "id": 1,
        "title": "تطوير مهارات اعداد التقارير الرقابيه",
        "ratingText": "كن اول المقيمين",
        "government": "الجهات الحكومية",
        "description": "يهدف التدريب إلى تطوير مهارات المشاركين في إعداد التقارير الرقابية بشكل مهني عالي جداً.",
        "reportText": "اعداد التقرير",
        "language": "العربيه",
        "image": "card_img_3.png"
      },
      {
        "id": 2,
        "title": "دورة في إدارة المشاريع",
        "ratingText": "تقييم ممتاز",
        "government": "القطاع الخاص",
        "description": "تساعد الدورة المشاركين على تحسين مهاراتهم في إدارة المشاريع من خلال أدوات وتقنيات حديثة.",
        "reportText": "تخطيط المشروع",
        "language": "الإنجليزية",
        "image": "card_img_3.png"
      },
      {
        "id": 3,
        "title": "أساسيات القيادة في بيئات العمل الحديثة",
        "ratingText": "كن اول المقيمين",
        "government": "القطاع الحكومي",
        "description": "تركز الدورة على تطوير مهارات القيادة والتفاعل مع الفرق في بيئات العمل الحديثة.",
        "reportText": "إدارة الفريق",
        "language": "العربيه",
        "image": "card_img_3.png"
      },
      {
        "id": 4,
        "title": "التسويق الرقمي وتطوير الأعمال",
        "ratingText": "تقييم عالي",
        "government": "القطاع الخاص",
        "description": "تعلم أساسيات التسويق الرقمي وكيفية استخدام الإنترنت لتوسيع نطاق الأعمال.",
        "reportText": "إعداد حملة تسويقية",
        "language": "الإنجليزية",
        "image": "card_img_3.png"
      }
  ];
  