# 3D Renderer

A professional React component for rendering and interacting with 3D GLTF/GLB models using Three.js and React Three Fiber. Features 20+ interactive controls for camera, lights, model transforms, and automatic rotation speeds.

## Features

- 🎨 **Interactive 3D Model Viewer** – Render and manipulate GLTF/GLB models with real-time feedback
- 🎮 **20+ Live Controls** – Adjust camera, lights, position, rotation, scale, and rotation speeds via Leva UI
- 📱 **Mobile Responsive** – Auto-detects mobile and disables orbit controls for better UX
- 💡 **Advanced Lighting** – Ambient, directional (with position control), and hemisphere lights
- 🔄 **Per-Axis Rotation** – Independent control over X, Y, Z rotation speeds for dynamic presentations
- 🌍 **Environment Presets** – City environment lighting for realistic renders
- ✨ **Smooth Animations** – Float animation with configurable intensity
- 💾 **State Persistence** – Save/restore control states via the `model` object
- 🚀 **Zero-Config Ready** – Works out-of-the-box with sensible defaults
- 🛠️ **Easy Setup** – Simple CLI tool to add component to your project

## Installation

### Quick Setup (Recommended)

Use npx to add the component to your project:

```bash
npx 3drenderer init
```

This will copy `ModelsRenderer.jsx` to your current directory.

**Options:**

- `npx 3drenderer init -y` – Skip confirmation prompts
- `npx 3drenderer init --output ./src/components` – Install to custom path

### Manual Installation

If you prefer to install as a dependency:

```bash
npm install 3drenderer
```

You'll also need to install the peer dependencies:

```bash
npm install react react-dom three @react-three/fiber @react-three/drei leva
```

## Quick Start

After running `npx 3drenderer init`, import and use the component:

```jsx
import ModelRenderer from "./ModelsRenderer";

export default function App() {
  const model = {
    modelPath: "/models/my-model.glb",
    editable: true, // Shows the Leva control panel
  };

  return <ModelRenderer model={model} />;
}
```

## Props

### `model` (required)

An object controlling the component state. Properties:

| Property                              | Type    | Default    | Description                                           |
| ------------------------------------- | ------- | ---------- | ----------------------------------------------------- |
| `modelPath`                           | string  | —          | **Required.** Path or URL to your GLTF/GLB model file |
| `editable`                            | boolean | false      | Show/hide the Leva control panel                      |
| `camX`, `camY`, `camZ`                | number  | 0, 0, 25   | Camera position                                       |
| `fov`                                 | number  | 75         | Camera field of view (degrees)                        |
| `ambientIntensity`                    | number  | 0.2        | Ambient light strength                                |
| `dirIntensity`                        | number  | 0.9        | Directional light strength                            |
| `hemiIntensity`                       | number  | 0.2        | Hemisphere light strength                             |
| `lightX`, `lightY`, `lightZ`          | number  | 10, 15, 10 | Directional light position                            |
| `posX`, `posY`, `posZ`                | number  | 0, 0, 0    | Model position                                        |
| `rotX`, `rotY`, `rotZ`                | number  | 0, 0, 0    | Model rotation (radians)                              |
| `scale`                               | number  | 1          | Model scale factor                                    |
| `rotSpeedX`, `rotSpeedY`, `rotSpeedZ` | number  | 0, 0.01, 0 | Automatic rotation speed per axis                     |

## Leva Control Panels

When `model.editable` is `true`, the component shows interactive Leva panels:

### Camera Panel

- **camX, camY, camZ** (-50 to 50): Adjust camera position
- **fov** (20 to 100): Adjust field of view

### Lights Panel

- **ambientIntensity** (0 to 5): Background light
- **dirIntensity** (0 to 5): Main directional light
- **hemiIntensity** (0 to 5): Sky/ground light

### Light Position Panel

- **lightX, lightY, lightZ** (-50 to 50): Position of the directional light

### Model Panel

- **posX, posY, posZ** (-10 to 10): Model position
- **rotX, rotY, rotZ** (-π to π): Model rotation
- **scale** (0.1 to 5): Model size

### Rotation Speed Panel

- **rotSpeedX, rotSpeedY, rotSpeedZ** (-0.1 to 0.1): Auto-rotation per axis

## Advanced Usage

### State Persistence

Control values are synced back to the `model` object. Save them:

```jsx
const model = { modelPath: "/model.glb", editable: true };

// ... user adjusts controls ...

// Save state
const savedState = JSON.stringify(model);
localStorage.setItem("modelState", savedState);

// Restore state
const restored = JSON.parse(localStorage.getItem("modelState"));
<ModelRenderer model={restored} />;
```

### Dynamic Model Loading

```jsx
const [modelPath, setModelPath] = useState("/models/default.glb");

return (
  <>
    <select onChange={(e) => setModelPath(e.target.value)}>
      <option value="/models/car.glb">Car</option>
      <option value="/models/house.glb">House</option>
    </select>
    <ModelRenderer model={{ modelPath, editable: true }} />
  </>
);
```

## Performance Tips

- **Large Models**: Use optimized GLTF files (draco compression recommended)
- **Mobile**: The component auto-disables orbit controls on small screens; consider limiting update frequency
- **State Updates**: The `model` object is synced in a `useEffect`; avoid creating new objects every render
- **Lighting**: Simplify light count for better performance on low-end devices

## Browser Support

- Chrome/Edge: ✅ (WebGL 2.0+)
- Firefox: ✅ (WebGL 2.0+)
- Safari: ✅ (WebGL 2.0+)
- Mobile browsers: ✅ (WebGL 2.0+, with responsive optimizations)

## CLI Commands

```bash
# Initialize component in your project
npx 3drenderer init

# Skip confirmation prompts
npx 3drenderer init -y

# Install to custom directory
npx 3drenderer init --output ./src/components

# Show help
npx 3drenderer --help
```

## License

MIT – See [LICENSE](./LICENSE) for details

## Author

hema hemdan <contact@ibrahim-hemdan.com>

## Repository

https://github.com/HEMA-HEMDAN/3drenderer

## Issues & Support

Found a bug? Have a feature request?  
Please open an issue: https://github.com/HEMA-HEMDAN/3drenderer/issue
