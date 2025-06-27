# Agro App - Aplicación de Tareas Agronómicas

Una aplicación móvil desarrollada con Expo y React Native para gestionar tareas agronómicas por temporada, con persistencia de datos local usando SQLite.

## 🚀 Características Principales

### 📱 Home - Lista de Tareas Agronómicas
- **Carga de datos**: Datos cargados desde archivo JSON local (`src/data/tasks.json`)
- **FlatList optimizada**: Implementada con optimizaciones para iOS y Android
- **Filtro por temporada**: Muestra tareas de la temporada actual (configurada como "Primavera")
- **Validaciones por plataforma**:
  - iOS: Uso de SafeAreaView para respetar áreas seguras
  - Compatible con orientación portrait y landscape

### 🧭 Navegación
- **React Navigation**: Implementado con Expo Router para navegación entre pantallas
- **Tab Navigation**: Navegación por pestañas entre "Tareas" y "Mi Perfil"
- **Encabezados**: Títulos de pantalla integrados en la navegación
- **Validaciones específicas**: SafeAreaView en iOS para respetar áreas seguras

### 💾 Persistencia de Datos con SQLite
- **Pantalla "Mi Perfil"**: Muestra las últimas 10 actividades completadas
- **Guardado en SQLite**: Al marcar como completada, se guarda:
  - ID de la tarea
  - Nombre de la tarea
  - Fecha de realización (new Date())
- **Ordenamiento**: Tareas ordenadas cronológicamente (más recientes primero)
- **Tabla local**: `activities` con columnas: id, taskId, taskName, completedAt

### 📋 Detalle de Tareas
- **Información completa**: Nombre, descripción, temporada, frecuencia
- **Notas específicas por plataforma**: Información relevante según el sistema operativo
- **Botón "Marcar como completada"**: Guarda en SQLite
- **Validaciones por plataforma**: Estilos específicos para iOS y Android

## 🔄 Lógica de Recurrencia de Tareas

Las tareas agronómicas en la app tienen una frecuencia configurada (`Diaria`, `Semanal`, `Quincenal`, `Mensual`).

- **Al marcar una tarea como completada:**
  - Se guarda en el historial de actividades (pantalla "Mi Perfil") con la fecha y hora exacta de completado.
  - La tarea desaparece de la lista de tareas pendientes en la pantalla principal.

- **¿Cuándo vuelve a aparecer una tarea?**
  - La app calcula, para cada tarea, la última vez que fue completada (según el historial).
  - Según la frecuencia de la tarea:
    - **Diaria:** Vuelve a aparecer al día siguiente de la última vez completada.
    - **Semanal:** Vuelve a aparecer 7 días después de la última vez completada.
    - **Quincenal:** Vuelve a aparecer 15 días después de la última vez completada.
    - **Mensual:** Vuelve a aparecer 1 mes después de la última vez completada.
  - Si la tarea nunca ha sido completada, siempre aparece en la lista de tareas pendientes.

- **Sincronización automática:**
  - Cada vez que completas, eliminas o limpias actividades, tanto la lista de tareas como el historial se actualizan automáticamente.
  - No es necesario recargar manualmente ni cambiar de pantalla: la lógica es completamente reactiva.

**Esto permite que la app funcione como un gestor de tareas recurrentes, mostrando solo las tareas que realmente deben realizarse según la fecha actual y el historial de actividades del usuario.**

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI
- iOS Simulator (para desarrollo en iOS)
- Android Studio (para desarrollo en Android)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd agro-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el proyecto**
   ```bash
   npx expo start
   ```

4. **Ejecutar en dispositivos/simuladores**
   - iOS: Presiona `i` en la terminal o escanea el código QR con la app Expo Go
   - Android: Presiona `a` en la terminal o escanea el código QR con la app Expo Go
   - Web: Presiona `w` en la terminal

## 📱 Diferencias entre iOS y Android

### 🍎 iOS
- **SafeAreaView**: Implementado para respetar el notch y áreas seguras
- **Estilos específicos**: 
  - Botones con `borderRadius: 20` para un look más redondeado
  - Sombras más sutiles con `shadowOpacity: 0.22`
  - Tarjetas con sombras específicas para iOS
- **Orientación**: Soporte completo para portrait y landscape
- **Notas específicas**: Información relevante para usuarios de iOS

### 🤖 Android
- **Edge-to-edge**: Habilitado para aprovechar toda la pantalla
- **Estilos específicos**:
  - Botones con `borderRadius: 8` para un look más cuadrado
  - Elevación con `elevation: 5` para sombras
  - Tarjetas con sombras estándar de Material Design
- **Orientación**: Soporte completo para portrait y landscape
- **Notas específicas**: Información relevante para usuarios de Android

### 🔧 Resolución de Diferencias
- **Componentes condicionales**: Uso de `Platform.OS` para aplicar estilos específicos
- **Hooks personalizados**: Lógica separada para manejar diferencias de plataforma
- **Estilos adaptativos**: CSS-in-JS que se adapta automáticamente según la plataforma

## 📚 Librerías Adicionales Utilizadas

### expo-sqlite
- **Propósito**: Persistencia de datos local
- **Justificación**: Necesario para almacenar actividades completadas de forma persistente
- **Alternativas consideradas**: AsyncStorage (menos robusto para datos estructurados)

### React Navigation (Expo Router)
- **Propósito**: Navegación entre pantallas
- **Justificación**: Navegación nativa y fluida entre diferentes secciones de la app
- **Alternativas consideradas**: React Navigation standalone (más complejo de configurar)

### @expo/vector-icons
- **Propósito**: Iconos nativos
- **Justificación**: Iconos consistentes con el diseño de cada plataforma
- **Alternativas consideradas**: react-native-vector-icons (requiere configuración adicional)

## 🧪 Pruebas Realizadas

### Dispositivos Físicos
- **iPhone 14 Pro** (iOS 17.0)
  - ✅ Navegación fluida
  - ✅ Persistencia de datos
  - ✅ Orientación portrait y landscape
  - ✅ SafeAreaView funcionando correctamente

- **Samsung Galaxy S23** (Android 13)
  - ✅ Navegación fluida
  - ✅ Persistencia de datos
  - ✅ Orientación portrait y landscape
  - ✅ Edge-to-edge funcionando correctamente

### Simuladores
- **iOS Simulator** (iPhone 14, iOS 17.0)
  - ✅ Todas las funcionalidades
  - ✅ Rendimiento optimizado
  - ✅ Animaciones fluidas

- **Android Emulator** (Pixel 7, API 33)
  - ✅ Todas las funcionalidades
  - ✅ Rendimiento optimizado
  - ✅ Animaciones fluidas

### Casos de Prueba
1. **Carga de tareas**: Verificar que se cargan correctamente desde JSON
2. **Filtrado por temporada**: Confirmar que solo se muestran tareas de la temporada actual
3. **Marcar como completada**: Verificar que se guarda en SQLite
4. **Ver actividades**: Confirmar que se muestran las últimas 10 actividades
5. **Eliminar actividad**: Verificar que se elimina correctamente de la base de datos
6. **Limpiar todo**: Confirmar que se eliminan todas las actividades
7. **Orientación**: Verificar que funciona en portrait y landscape
8. **Rendimiento**: Confirmar que FlatList está optimizada

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas
```
agro-app/
├── app/                    # Navegación con Expo Router
│   ├── (tabs)/            # Pantallas de tabs
│   │   ├── index.tsx      # Pantalla principal (Tareas)
│   │   ├── explore.tsx    # Pantalla de perfil
│   │   └── _layout.tsx    # Layout de tabs
├── src/                   # Código fuente principal
│   ├── components/        # Componentes reutilizables
│   │   ├── TaskCard.tsx       # Tarjeta de tarea
│   │   ├── ActivityItem.tsx   # Item de actividad
│   │   ├── CustomButton.tsx   # Botón personalizado
│   │   ├── ui/               # Componentes de UI base
│   │   ├── HapticTab.tsx     # Tab con haptic feedback
│   │   ├── ThemedText.tsx    # Texto con tema
│   │   └── ThemedView.tsx    # Vista con tema
│   ├── hooks/            # Hooks personalizados
│   │   ├── useTasks.ts        # Hook para manejar tareas
│   │   ├── useActivities.ts   # Hook para manejar actividades
│   │   ├── useColorScheme.ts  # Hook para tema de color
│   │   └── useThemeColor.ts   # Hook para colores de tema
│   ├── services/         # Servicios
│   │   └── database.ts        # Servicio de base de datos SQLite
│   ├── types/            # Tipos TypeScript
│   │   └── index.ts           # Interfaces y tipos
│   └── data/             # Datos estáticos
│       └── tasks.json         # Datos de tareas
├── constants/            # Constantes de la aplicación
│   └── Colors.ts             # Colores del tema
├── assets/               # Recursos estáticos
│   ├── images/               # Imágenes
│   └── fonts/                # Fuentes
└── package.json          # Dependencias del proyecto
```
