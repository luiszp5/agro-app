import { useEffect, useState } from 'react';
import { databaseService } from '../services/database';
import { Activity } from '../types';
import { useActivityChange } from './ActivityChangeContext';
import { useDatabaseReady } from './DatabaseReadyContext';

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { activityChangeTrigger } = useActivityChange();
  const { isDbReady } = useDatabaseReady();

  useEffect(() => {
    if (isDbReady) {
      loadActivities();
    }
     
  }, [activityChangeTrigger, isDbReady]);

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const recentActivities = await databaseService.getRecentActivities(10);
      setActivities(recentActivities);
    } catch (err) {
      setError('Error al cargar las actividades');
      console.error('Error loading activities:', err);
    } finally {
      setLoading(false);
    }
  };

  const addActivity = async (taskId: number, taskName: string) => {
    try {
      setError(null);
      
      const newActivity: Omit<Activity, 'id'> = {
        taskId,
        taskName,
        completedAt: new Date().toISOString(),
      };

      await databaseService.addActivity(newActivity);
      return true;
    } catch (err) {
      setError('Error al marcar la tarea como completada');
      console.error('Error adding activity:', err);
      return false;
    }
  };

  const deleteActivity = async (id: number) => {
    try {
      setError(null);
      
      await databaseService.deleteActivity(id);
      return true;
    } catch (err) {
      setError('Error al eliminar la actividad');
      console.error('Error deleting activity:', err);
      return false;
    }
  };

  const clearAllActivities = async () => {
    try {
      setError(null);
      
      await databaseService.clearAllActivities();
      setActivities([]);
      return true;
    } catch (err) {
      setError('Error al limpiar todas las actividades');
      console.error('Error clearing activities:', err);
      return false;
    }
  };

  return {
    activities,
    loading,
    error,
    addActivity,
    deleteActivity,
    clearAllActivities,
    reloadActivities: loadActivities,
  };
}; 