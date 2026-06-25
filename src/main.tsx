import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

// Fonts — self-hosted via fontsource (replaces the CDN @import in globals.css)
import "@fontsource-variable/hanken-grotesk/index.css" // Latin variable face
import "@fontsource/ibm-plex-mono/400.css"
import "@fontsource/ibm-plex-mono/500.css"
import "@fontsource/noto-sans-tc/400.css"
import "@fontsource/noto-sans-tc/500.css"
import "@fontsource/noto-sans-tc/700.css"
import "@fontsource/noto-serif-tc/400.css"
import "@fontsource/noto-serif-tc/500.css"
import "@fontsource/noto-serif-tc/600.css"
import "@fontsource/noto-serif-tc/700.css"

import "@/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import App from "@/App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
