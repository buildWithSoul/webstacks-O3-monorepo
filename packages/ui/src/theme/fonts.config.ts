// Centralized Font Configuration (Single Source of Truth)
// - Define base font families (must match Next/font variables)
// - Define semantic mappings used across the app
// - Build a :root CSS block to expose semantic variables

export type FontFamilyKey = 'primary' | 'secondary' | 'accent' | 'mono';

export interface FontFamily {
  name: string;
  variable: `--font-${string}`;
  fallback: string;
}

export interface FontsConfig {
  families: Record<FontFamilyKey, FontFamily>;
  semantic: Record<string, FontFamilyKey>;
}

export const FONTS: FontsConfig = {
  families: {
    primary: {
      name: 'Season Sans',
      variable: '--font-primary',
      fallback: 'ui-sans-serif, system-ui, sans-serif',
    },
    secondary: {
      name: 'Season Sans',
      variable: '--font-secondary',
      fallback: 'ui-sans-serif, system-ui, sans-serif',
    },
    accent: {
      name: 'Season Serif',
      variable: '--font-accent',
      fallback: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    },
    mono: {
      name: 'Roboto Mono',
      variable: '--font-mono',
      fallback:
        'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
  },
  semantic: {
    // Core text
    body: 'primary',
    heading: 'secondary',

    // Headings
    'heading-display': 'secondary',
    'heading-accent': 'accent',

    // UI + metadata
    eyebrow: 'primary',
    ui: 'primary',
    caption: 'primary',

    // Code
    code: 'mono',
  },
};

// Build a complete :root CSS string that defines semantic variables.
// Example output:
// :root { --font-body: var(--font-primary), ui-sans-serif, system-ui, sans-serif; ... }
export function buildSemanticFontCSS(vars: FontsConfig = FONTS): string {
  const lines: string[] = [];
  lines.push(':root {');

  // For each semantic key, create a --font-<semantic> variable that points to the right base family var
  for (const [semantic, familyKey] of Object.entries(vars.semantic)) {
    const fam = vars.families[familyKey as FontFamilyKey];
    if (!fam) continue;
    const cssVarName = `--font-${semantic}`;
    lines.push(`  ${cssVarName}: var(${fam.variable}), ${fam.fallback};`);
  }

  lines.push('}');
  return lines.join('\n');
}
