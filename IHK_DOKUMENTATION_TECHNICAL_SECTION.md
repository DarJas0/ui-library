# Technische Umsetzung - Build-System und Library-Architektur

## Entscheidung für Vite Library Mode mit Conditional Exports

Für den Build-Prozess der UI Library wurde Vite im **Library Mode** mit **Conditional Exports** (ESM + CJS) gewählt. Diese Entscheidung basiert auf mehreren technischen und architektonischen Anforderungen, die eine Standard-Create-React-App-Konfiguration nicht erfüllen kann.

### Warum nicht Create React App?

Create React App (CRA) ist primär für Single-Page-Applications (SPAs) konzipiert und erzeugt Bundle-Outputs, die für den Endverbraucher (Browser) optimiert sind. Für eine wiederverwendbare Component Library ist dies jedoch ungeeignet, da:

1. **CRA bundelt React mit**: Der Output enthält React und ReactDOM im Bundle, was zu Duplikaten führt, wenn konsumierende Projekte ebenfalls React verwenden. Dies verletzt das Peer-Dependency-Prinzip und führt zu größeren Bundle-Sizes und potenziellen Version-Konflikten.

2. **Kein Tree-Shaking möglich**: CRA-Builds sind als komplette Bundles konzipiert und ermöglichen kein selektives Importieren einzelner Komponenten. Bei einer Library muss jedoch gewährleistet sein, dass nur tatsächlich verwendete Komponenten in das finale Bundle des Konsumenten gelangen.

3. **Fehlende Dual-Package-Unterstützung**: CRA generiert ausschließlich ESM- oder CommonJS-Output, jedoch keine simultane Bereitstellung beider Formate. Moderne Libraries benötigen jedoch beide Exports, um sowohl Node.js (CommonJS) als auch moderne Bundler (ESM) zu unterstützen.

4. **Keine Declaration Files**: CRA generiert keine TypeScript-Deklarationsdateien (.d.ts), die für eine typsichere Integration in TypeScript-Projekten essentiell sind.

### Vorteile der Vite Library Mode Konfiguration

Die gewählte Vite-Konfiguration (`vite.config.ts`) bietet folgende Vorteile:

1. **Externalisierung von Dependencies**: Durch `rollupOptions.external` werden React, ReactDOM und das JSX-Runtime als externe Dependencies deklariert. Dies stellt sicher, dass sie nicht im Bundle enthalten sind, sondern vom konsumierenden Projekt bereitgestellt werden (Peer Dependencies).

2. **Dual Package Exports (ESM + CommonJS)**: Die Library wird gleichzeitig als ESM (`.mjs`) und CommonJS (`.cjs`) gebaut. Dies gewährleistet maximale Kompatibilität mit unterschiedlichen JavaScript-Ökosystemen (Node.js, Webpack, Rollup, Vite, etc.).

3. **Multiple Entry Points**: Mit separaten Entry Points (`lib/index.ts` für Komponenten, `lib/hydration.ts` für Client-Hydration) kann der Konsument genau steuern, welche Teile der Library er importiert. Dies reduziert das Bundle-Gewicht erheblich.

4. **Conditional Exports via package.json**: Die `exports`-Felder in `package.json` definieren unterschiedliche Pfade für `import` (ESM) und `require` (CJS), sowie separate TypeScript-Definitionen. Moderne Bundler können damit den optimalen Code-Pfad auswählen.

5. **CSS-Extraktion ohne Code-Splitting**: Durch `cssCodeSplit: false` wird eine einzelne `style.css` erzeugt, die über `"./styles"` Export bereitgestellt wird. Dies vereinfacht die Integration für Konsumenten erheblich.

### Build-Pipeline und Type Safety

Die Build-Pipeline kombiniert TypeScript Compiler (tsc) und Vite:

```bash
npm run build:  tsc -p tsconfig.lib.json && BUILD_LIB=true vite build
```

1. **tsc -p tsconfig.lib.json**: Generiert TypeScript-Deklarationsdateien (`.d.ts`) aus dem `lib/`-Verzeichnis. Diese ermöglichen vollständige Type-Autocompletion in konsumierenden Projekten.

2. **BUILD_LIB=true vite build**: Triggert den Library-Build-Modus in Vite, der die Conditional Exports erstellt und Rollup für optimales Tree-Shaking nutzt.

Diese Architektur stellt sicher, dass die UI Library als professionelles npm-Package publiziert werden kann, das sowohl in modernen (Vite, Webpack 5) als auch in Legacy-Projekten (CommonJS, Webpack 4) einsetzbar ist, ohne Kompromisse bei Performance oder Developer Experience einzugehen.

