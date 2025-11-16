# 3D Renderer

A professional React component for rendering and interacting with 3D GLTF/GLB models using Three.js.

## Features

- 🎨 **Interactive 3D Model Viewer** — Render GLTF/GLB models in React
- 🎮 **Real-time Controls** — Adjust camera, lights, and model transforms via Leva
- 📱 **Responsive Design** — Disables orbit controls on small screens
- 💡 **Lighting System** — Ambient, directional, and hemisphere lighting with controls
- 🔄 **Auto-rotation** — Models rotate for better presentation
- 🌍 **Environment Presets** — Uses Drei `Environment` presets for realistic lighting

## Installation

```bash
npm install 3drenderer
```

## Usage

```jsx
import GymRenderer from "3drenderer";

export default function App() {
  return (
    <GymRenderer
      model={{
        modelPath: "/path/to/your/model.glb",
      }}
    />
  );
}
```

## Props

### `model` (required)

- **`modelPath`** (string): Path or URL to your GLTF/GLB model file

## Controls

### Camera

- **Position X, Y, Z**: Adjust camera position in 3D space
- **FOV**: Field of view angle (20–100)

### Lights

- **Ambient Intensity**: Background light intensity
- **Directional Intensity**: Main light source intensity
- **Hemisphere Intensity**: Sky/ground light intensity

### Model

- **Position X, Y, Z**: Move the model
- **Rotation X, Y, Z**: Rotate the model
- **Scale**: Model size

## Dependencies

- React 18+
- Three.js
- `@react-three/fiber`
- `@react-three/drei`
- `leva`

## License

MIT

## Author

hema hemdan

## Support

For issues and feature requests, please visit: https://github.com/HEMA-HEMDAN/3drenderer/issues
