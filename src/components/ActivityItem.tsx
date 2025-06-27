import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Activity } from '../types';

interface ActivityItemProps {
  activity: Activity;
  onDelete?: (id: number) => void;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  activity,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={[styles.container, Platform.OS === 'ios' && styles.containerIOS]}>
      <View style={styles.content}>
        <Text style={styles.taskName}>{activity.taskName}</Text>
        <Text style={styles.date}>{formatDate(activity.completedAt)}</Text>
      </View>
      
      {onDelete && (
        <TouchableOpacity
          style={[
            styles.deleteButton,
            Platform.OS === 'ios' && styles.deleteButtonIOS
          ]}
          onPress={() => onDelete(activity.id!)}
        >
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerIOS: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  content: {
    flex: 1,
  },
  taskName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonIOS: {
    borderRadius: 15,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
}); 