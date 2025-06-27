import { useEffect, useState } from 'react';
import { databaseService } from '../services/database';
import { Task } from '../types';
import { useActivityChange } from './ActivityChangeContext';
import { useDatabaseReady } from './DatabaseReadyContext';

function getNextAvailableDate(lastCompleted: string, frequency: string): Date {
  const last = new Date(lastCompleted);
  switch (frequency.toLowerCase()) {
    case 'diaria':
      last.setDate(last.getDate() + 1);
      break;
    case 'semanal':
      last.setDate(last.getDate() + 7);
      break;
    case 'quincenal':
      last.setDate(last.getDate() + 15);
      break;
    case 'mensual':
      last.setMonth(last.getMonth() + 1);
      break;
    default:
      last.setDate(last.getDate() + 1);
      break;
  }
  return last;
}

export const useTasks = (currentSeason: string = 'Primavera') => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { activityChangeTrigger } = useActivityChange();
  const { isDbReady } = useDatabaseReady();

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (isDbReady) {
      filterTasksBySeason();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, currentSeason, activityChangeTrigger, isDbReady]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Importar datos desde el archivo JSON local
      const tasksData = require('../data/tasks.json');
      setTasks(tasksData);
    } catch (err) {
      setError('Error al cargar las tareas');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterTasksBySeason = async () => {
    const filtered: Task[] = [];
    for (const task of tasks) {
      if (task.season !== currentSeason) continue;
      const lastCompleted = await databaseService.getLastCompletedAtByTaskId(task.id);
      if (!lastCompleted) {
        filtered.push(task);
        continue;
      }
      const nextAvailable = getNextAvailableDate(lastCompleted, task.frequency);
      if (new Date() >= nextAvailable) {
        filtered.push(task);
      }
    }
    setFilteredTasks(filtered);
  };

  const getTasksBySeason = (season: string) => {
    return tasks.filter(task => task.season === season);
  };

  const getTaskById = (id: number) => {
    return tasks.find(task => task.id === id);
  };

  return {
    tasks,
    filteredTasks,
    loading,
    error,
    currentSeason,
    getTasksBySeason,
    getTaskById,
    reloadTasks: loadTasks,
  };
}; 