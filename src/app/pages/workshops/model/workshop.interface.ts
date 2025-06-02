export interface WorkshopDTO {
    id: string;
    title: string;
    mode: string;
    trainer: string;
    targetAudience: string;
    traineesCount: number;
    startDate: string;
    endDate: string;
    time: string;
    location?: {
        city: string;
        mapLink: string;
    };
    language: string;
    status: string;
    imageUrl: string;
}
