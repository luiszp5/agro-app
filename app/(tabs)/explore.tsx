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

import { ActivityItem } from '@/src/components/ActivityItem';
import { CustomButton } from '@/src/components/CustomButton';
import { useActivityChange } from '@/src/hooks/ActivityChangeContext';
import { useActivities } from '@/src/hooks/useActivities';
import { useTasks } from '@/src/hooks/useTasks';

export default function ProfileScreen() {
  const { activities, loading, error, deleteActivity, clearAllActivities } = useActivities();
  const { reloadTasks } = useTasks();
  const { notifyActivityChange } = useActivityChange();

  const handleDeleteActivity = (id: number) => {
    Alert.alert(
      'Eliminar Actividad',
      '¿Estás seguro de que deseas eliminar esta actividad?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: async () => {
            const success = await deleteActivity(id);
            if (success) {
              Alert.alert('Éxito', 'Actividad eliminada correctamente');
              reloadTasks();
              notifyActivityChange();
            }
          }
        }
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Limpiar Todo',
      '¿Estás seguro de que deseas eliminar todas las actividades? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Limpiar Todo', 
          style: 'destructive',
          onPress: async () => {
            const success = await clearAllActivities();
            if (success) {
              Alert.alert('Éxito', 'Todas las actividades han sido eliminadas');
              reloadTasks();
              notifyActivityChange();
            }
          }
        }
      ]
    );
  };

  const renderActivity = ({ item }: { item: any }) => (
    <ActivityItem
      activity={item}
      onDelete={handleDeleteActivity}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Mi Perfil</Text>
        <Text style={styles.subtitle}>Actividades Completadas</Text>
      </View>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {activities.length > 0 && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            Total de actividades: {activities.length}
          </Text>
          <CustomButton
            title="Limpiar Todo"
            onPress={handleClearAll}
            variant="danger"
            style={styles.clearButton}
          />
        </View>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No hay actividades</Text>
      <Text style={styles.emptyText}>
        Completa algunas tareas para ver tu historial aquí
      </Text>
    </View>
  );

  const Content = () => (
    <FlatList
      data={activities}
      renderItem={renderActivity}
      keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
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
    marginBottom: 16,
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
    marginBottom: 12,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  statsText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
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
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#95a5a6',
    textAlign: 'center',
    lineHeight: 24,
  },
});
