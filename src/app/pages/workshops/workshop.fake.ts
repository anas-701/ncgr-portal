import { WorkshopDTO } from "./model/workshop.interface";

export const workshops: WorkshopDTO[] = [
    {
      id: "w1",
      title: "الامتثال المؤسسي وأفضل الممارسات",
      mode: "عن بُعد",
      trainer: "د. محمد خالد",
      targetAudience: "الجهات الحكومية",
      traineesCount: 18,
      startDate: "2025-01-30",
      endDate: "2025-02-02",
      time: "10:00 ص - 12:00 م",
      location: undefined,
      language: "العربية",
      status: "منشورة",
      imageUrl: "sample-dashboard-content_13.png"
    },
    {
      id: "w2",
      title: "أدوات قياس الأداء المؤسسي",
      mode: "حضورية",
      trainer: "أ. فريد عبد الله",
      targetAudience: "الجهات الحكومية",
      traineesCount: 14,
      startDate: "2025-02-03",
      endDate: "2025-02-06",
      time: "10:00 ص - 12:00 م",
      location: {
        city: "الرياض",
        mapLink: "https://maps.google.com?q=الرياض"
      },
      language: "العربية",
      status: "منشورة",
      imageUrl: "sample-dashboard-content_14.png"
    },
    {
      id: "w3",
      title: "إدارة المخاطر المؤسسية",
      mode: "عن بُعد",
      trainer: "د. محمد خالد",
      targetAudience: "القطاع الخاص",
      traineesCount: 0,
      startDate: "2025-02-02",
      endDate: "2025-02-05",
      time: "1:00 م - 3:00 م",
        location: undefined,
      language: "الانجليزية",
      status: "منشورة",
      imageUrl: "sample-dashboard-content_15.jpg"
    },
    {
      id: "w4",
      title: "مهارات إعداد التقارير الرقابية",
      mode: "حضورية",
      trainer: "أ. عامر ثابت",
      targetAudience: "الأفراد",
      traineesCount: 0,
      startDate: "2025-02-10",
      endDate: "2025-02-12",
      time: "8:00 ص - 9:00 ص",
      location: {
        city: "الرياض",
        mapLink: "https://maps.google.com?q=الرياض"
      },
      language: "العربية",
      status: "غير منشورة",
      imageUrl: "sample-dashboard-content_16.png"
    }
  ];
  