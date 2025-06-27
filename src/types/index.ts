export interface Task {
  id: number;
  name: string;
  description: string;
  season: string;
  frequency: string;
  platformNote: string;
}

export interface Activity {
  id?: number;
  taskId: number;
  taskName: string;
  completedAt: string;
}

export interface DatabaseResult {
  insertId?: number;
  rowsAffected: number;
  rows: any[];
} 