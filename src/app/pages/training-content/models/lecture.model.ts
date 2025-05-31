export interface Section {
    id: number;
    title: string;
    lectures: Lecture[];
  }
  export interface Lecture {
    id: number;
    title: string;
    type: 'video' | 'text' | 'pdf' | 'audio' | 'image' | 'quiz';
    icon: string;
    content?: string;
    url?:any;
    questions?:any
  }
  export interface Test {
    id: number;
    question: string;
    type: 'mcq' | 'truefalse';
    options?: string[];
    answer?: string;
  }
      
  