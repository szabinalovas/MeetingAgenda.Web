export interface Meeting {
  id: string;
  title: string;
  room: string;
  date: Date | null;
  startTime: string;
  endTime: string;
}
