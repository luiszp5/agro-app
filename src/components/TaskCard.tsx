import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onPress: (task: Task) => void;
  onComplete?: (task: Task) => void;
  showCompleteButton?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onPress,
  onComplete,
  showCompleteButton = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, Platform.OS === 'ios' && styles.cardIOS]}
      onPress={() => onPress(task)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{task.name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{task.frequency}</Text>
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {task.description}
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.season}>Temporada: {task.season}</Text>
          
          {showCompleteButton && onComplete && (
            <TouchableOpacity
              style={[
                styles.completeButton,
                Platform.OS === 'ios' && styles.completeButtonIOS
              ]}
              onPress={() => onComplete(task)}
            >
              <Text style={styles.completeButtonText}>Completar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardIOS: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  badge: {
    backgroundColor: '#3498db',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  season: {
    fontSize: 14,
    color: '#95a5a6',
    fontWeight: '500',
  },
  completeButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  completeButtonIOS: {
    borderRadius: 20,
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
}); 