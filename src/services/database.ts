import * as SQLite from 'expo-sqlite';
import { Activity } from '../types';

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;

  async initDatabase(): Promise<void> {
    try {
      this.db = await SQLite.openDatabaseAsync('agro_app.db');
      
      // Crear tabla de actividades si no existe
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS activities (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          taskId INTEGER NOT NULL,
          taskName TEXT NOT NULL,
          completedAt TEXT NOT NULL
        );
      `);
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  async addActivity(activity: Omit<Activity, 'id'>): Promise<number> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      const result = await this.db.runAsync(
        'INSERT INTO activities (taskId, taskName, completedAt) VALUES (?, ?, ?)',
        [activity.taskId, activity.taskName, activity.completedAt]
      );
      
      return result.lastInsertRowId || 0;
    } catch (error) {
      console.error('Error adding activity:', error);
      throw error;
    }
  }

  async getRecentActivities(limit: number = 10): Promise<Activity[]> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM activities ORDER BY completedAt DESC LIMIT ?',
        [limit]
      );
      
      return result as Activity[];
    } catch (error) {
      console.error('Error getting recent activities:', error);
      throw error;
    }
  }

  async getLastCompletedAtByTaskId(taskId: number): Promise<string | null> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    try {
      const result = await this.db.getFirstAsync(
        'SELECT completedAt FROM activities WHERE taskId = ? ORDER BY completedAt DESC LIMIT 1',
        [taskId]
      ) as { completedAt?: string } | undefined;
      return result && typeof result.completedAt === 'string' ? result.completedAt : null;
    } catch (error) {
      console.error('Error getting last completedAt:', error);
      throw error;
    }
  }

  async deleteActivity(id: number): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      await this.db.runAsync('DELETE FROM activities WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error deleting activity:', error);
      throw error;
    }
  }

  async clearAllActivities(): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      await this.db.runAsync('DELETE FROM activities');
    } catch (error) {
      console.error('Error clearing activities:', error);
      throw error;
    }
  }
}

export const databaseService = new DatabaseService(); 