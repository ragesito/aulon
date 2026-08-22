// Ambient module declarations so editors (VS Code TS server) don't flag
// side-effect CSS imports like `import "./globals.css"`. Next.js handles
// these at build time; this is purely for IDE type resolution.
declare module "*.css";
