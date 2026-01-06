# Component Architecture

This project follows a structured component architecture based on Atomic Design principles with additional organizational layers.

## Folder Structure

```
src/components/
├── atoms/          # Basic building blocks (buttons, inputs, labels)
├── molecules/      # Groups of atoms (forms, cards, navigation)
├── sections/       # Page sections (hero, features, testimonials)
└── layout/         # Layout components (headers, footers, page layouts)
```

## Component Categories

### 🔬 **Atoms** (`/atoms`)
The basic building blocks of the interface. These are the smallest components that can't be broken down further without losing their meaning.

**Examples:**
- Button
- Input
- Label
- Icon
- Typography components

**Characteristics:**
- Single responsibility
- Highly reusable
- No business logic
- Use semantic design tokens

### 🧬 **Molecules** (`/molecules`)
Groups of atoms bonded together to form more complex, functional components.

**Examples:**
- SearchForm (Input + Button)
- Card (Image + Title + Description)
- Navigation (Links + Logo)
- FormField (Label + Input + Error)

**Characteristics:**
- Combine multiple atoms
- Have specific functionality
- Reusable across different contexts
- May contain simple state logic

### 📄 **Sections** (`/sections`)
Large, page-level components that combine molecules and atoms to create distinct areas of a webpage.

**Examples:**
- HeroSection
- FeaturesSection
- TestimonialsSection
- ContactSection

**Characteristics:**
- Page-specific components
- Combine multiple molecules
- Handle complex state and data
- Responsive design considerations

### 🏗️ **Layout** (`/layout`)
Structural components that define the overall page structure and common UI patterns.

**Examples:**
- Layout (main page wrapper)
- Header
- Footer
- Sidebar

**Characteristics:**
- Define page structure
- Handle global state
- Consistent across pages
- Navigation and routing logic

## Design Token Usage

All components should use the semantic design tokens from `/src/styles/tokens.css`:

```tsx
// ✅ Good - Using semantic tokens
<button className="bg-[var(--button-primary-bgColor-rest)] text-[var(--button-primary-fgColor-rest)]">
  Click me
</button>

// ❌ Avoid - Hardcoded values
<button className="bg-blue-500 text-white">
  Click me
</button>
```

## Component Guidelines

1. **Use TypeScript** for all components with proper prop interfaces
2. **Export components** through index files for clean imports
3. **Follow naming conventions** - PascalCase for components
4. **Use semantic tokens** for consistent theming and dark mode support
5. **Write JSDoc comments** for complex components
6. **Keep components focused** - single responsibility principle

## Import Examples

```tsx
// Import atoms
import { Button, Input } from '@/components/atoms';

// Import molecules
import { SearchForm, Card } from '@/components/molecules';

// Import sections
import { HeroSection } from '@/components/sections';

// Import layout
import Layout from '@/components/layout/Layout';
```
