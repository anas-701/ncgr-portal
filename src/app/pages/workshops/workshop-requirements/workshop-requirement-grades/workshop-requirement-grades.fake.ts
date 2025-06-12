import { ExamStatus } from "../../enum/exam-status";

export const data = [
    {
      id: 1,
      studentName: 'محمد خالد فهد عبد الله',
      nationalId: '1293029183',
      email: 'mo25@email.com',
      score: 45,
      result: ExamStatus.Passed
    },
    {
      id: 2,
      studentName: 'سارة أحمد عادل محمد',
      nationalId: '1920192813',
      email: 'sara@email.com',
      score: 15,
      result: ExamStatus.Failed
    },
    {
      id: 3,
      studentName: 'منى عبد الله خالد جمال',
      nationalId: '2109281723',
      email: 'muna@email.com',
      score: null,
      result: ExamStatus.Pending
    }
  ];
  