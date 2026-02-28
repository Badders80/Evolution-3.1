# Video Files Directory

This directory contains placeholder files for MP4 videos used throughout the Evolution Stables website.

## 📁 Directory Structure

```
public/videos/
├── hero-bg.mp4              # Hero section background video
├── investors-demo.mp4       # Investors card demo video
├── live-racing.mp4          # Live racing action video
├── dynamic-racing.mp4       # Dynamic racing content
├── stable-scene.mp4         # Behind the scenes stable footage
├── content.mp4              # General content video
├── cards/                   # Card-specific videos
│   ├── investors-demo.mp4   # Investors audience card
│   └── breeders-action.mp4  # Breeders audience card
└── backgrounds/             # Background video files
    └── parallax-scene.mp4   # Parallax background video
```

## 🎬 Usage Instructions

### Replace Placeholders:
1. **Delete** the placeholder file (e.g., `hero-bg.mp4`)
2. **Upload** your actual MP4 video with the same filename
3. **Ensure** video dimensions match intended use:
   - **Cards**: 3:4 aspect ratio, under 2MB recommended
   - **Backgrounds**: 16:9 aspect ratio, optimized for web
   - **Hero**: Full HD (1920x1080) or higher

### Component Usage:
```tsx
// In Card3x4 component
<Card3x4
  video="/videos/hero-bg.mp4"
  title="Racing Action"
  description="Experience the thrill..."
/>

// In FixedBg component
<FixedBg
  src="/videos/parallax-scene.mp4"
  height="h-screen"
  overlay="from-black/50 to-black/80"
/>
```

## ⚡ Performance Tips

- **Optimize** videos for web (lower bitrate, appropriate resolution)
- **Use muted autoplay** for background videos
- **Add fallback images** for older browsers
- **Consider lazy loading** for videos below the fold

## 📱 Mobile Considerations

- Videos should be **muted** for autoplay on mobile
- Consider **disabling autoplay** on mobile for better performance
- Provide **poster images** as fallbacks

## 🔄 File Replacement

When replacing placeholder files:
1. Keep the **exact filename**
2. Maintain **appropriate dimensions** for the intended use
3. Test **autoplay behavior** on different devices
4. Ensure **video quality** is optimized for web delivery
