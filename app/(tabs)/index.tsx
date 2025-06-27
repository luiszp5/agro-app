import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { TaskCard } from '@/src/components/TaskCard';
import { useActivityChange } from '@/src/hooks/ActivityChangeContext';
import { useActivities } from '@/src/hooks/useActivities';
import { useTasks } from '@/src/hooks/useTasks';
import { Task } from '@/src/types';

export default function HomeScreen() {
  const router = useRouter();
  const { filteredTasks, loading, error, currentSeason, reloadTasks } = useTasks();
  const { addActivity } = useActivities();
  const { notifyActivityChange } = useActivityChange();

  const handleTaskPress = (task: Task) => {
    Alert.alert(
      'Detalle de Tarea',
      `${task.name}\n\n${task.description}\n\nNota: ${task.platformNote}`,
      [
        { text: 'OK' },
        { 
          text: 'Completar', 
          onPress: () => handleTaskComplete(task)
        }
      ]
    );
  };

  const handleTaskComplete = async (task: Task) => {
    Alert.alert(
      'Tarea Completada',
      `¿Deseas marcar "${task.name}" como completada?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Completar', 
          onPress: async () => {
            const success = await addActivity(task.id, task.name);
            if (success) {
              Alert.alert('Éxito', 'Tarea marcada como completada');
              reloadTasks();
              notifyActivityChange();
            } else {
              Alert.alert('Error', 'No se pudo marcar la tarea como completada');
            }
          }
        }
      ]
    );
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TaskCard
      task={item}
      onPress={handleTaskPress}
      onComplete={handleTaskComplete}
      showCompleteButton={true}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Tareas Agronómicas</Text>
        <Text style={styles.subtitle}>Temporada: {currentSeason}</Text>
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        No hay tareas disponibles para la temporada actual
      </Text>
    </View>
  );

  const Content = () => (
    <FlatList
      data={filteredTasks}
      renderItem={renderTask}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      initialNumToRender={5}
      maxToRenderPerBatch={10}
      windowSize={10}
      removeClippedSubviews={true}
    />
  );

  if (Platform.OS === 'ios') {
    return (
      <SafeAreaView style={styles.container}>
        <Content />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Content />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 8,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 24,
  },
});
