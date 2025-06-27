import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

import { ThemedText } from './ThemedText';

export function HelloWave() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 120 }),
        withTiming(0, { duration: 120 }),
        withTiming(20, { duration: 120 }),
        withTiming(0, { duration: 120 })
      ),
      4,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Pressable style={styles.container}>
      <Animated.Text style={[styles.emoji, animatedStyle]}>👋</Animated.Text>
      <ThemedText type="default">¡Hola!</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emoji: {
    fontSize: 28,
  },
});
