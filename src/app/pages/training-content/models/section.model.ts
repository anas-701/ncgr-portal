export interface Question {
  id: number;
  trainingProgramContentDetailsId: any;
  questionTypeId: '1' | '2';
  question: string;
 questionChoics: 
    {
      id: 0,
      choice: string,
      isCorrect: boolean
    }[]
  ,
  questionDegree: number;
  choiceOne: string,
  choiceTwo: string,
  choiceCorrect: string
}
export interface Lecture {
   id: number;
  trainingProgramDepartment: number;
  typeId: number;
  titleAr: string;  
  titleEn: string;
  videoFile: string | null
  videoFileName: string | null;
  youTubeLink: string | null;
  contentDetails: string | null;
  pdfFile: string | null;
  pdfFileName: string | null;
  soundFile: string | null;
  soundFileName: string | null;
  image: string | null;
  imageName: string | null;
  exameTypeId: number;
  exameTotal: number;
  exameSuccusDegrie: number;
  exameSite: string | null;
  exameIsTime: boolean;
  exameDate: string | null;
  exameTime: string | null;
  examePeriod: number;
  exameQuestions?: Question[];
}

  

export interface Section {
  id: number;
  trainingProgramId: number;
  titleAr: string;
  titleEn: string;
  lectures: Lecture[];
  order?: number;
}