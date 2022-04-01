export interface Student {
  _id: string,
  classroom: any,
  _teacher_id?: string,
  name: string,
  gender: string,
  contact_details?: any[],
  absences: any[],
  feedback: any[],
}