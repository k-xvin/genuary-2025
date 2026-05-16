# Genuary 2025 - Day 2: Watercolor Splotch Stacker

## Project Overview
- **Type**: p5.js generative art sketch
- **Prompt**: "Layers upon layers upon layers."
- **Concept**: Organic watercolor splotches stacked on a textured canvas

## Visual Design

### Color Palette
- `#656565` - Dark gray
- `#808782` - Sage gray
- `#A6D3A0` - Soft green
- `#D1FFD7` - Mint
- `#B3FFB3` - Light lime

### Canvas Texture
- Base: off-white/cream (#F5F5F0)
- Noise field (Perlin) speckle pattern
- Two-tone dotted texture using palette grays
- Generated once at setup

### Watercolor Splotch
- Approach: Radial blob with Perlin noise on radius
- Shape: Step around circle, noise offset on radius per angle
- Multiple passes per splotch with low alpha (5-15%)
- Slight position jitter between passes for bleeding effect
- Size range: 40-150px diameter

### Layering
- 40-60 splotches total
- Random positions across canvas
- Varied sizes
- Stack naturally (later draws on top)
- Some overlap creates interesting blends

## Technical Notes
- Use `noise()` for organic blob shapes
- Low alpha for watercolor transparency
- Canvas texture drawn once in setup
- Splotches drawn in draw() loop with noLoop()

## Future Enhancement
Could upgrade splotch generation to Approach B (particle system) for more fluid organic look.