# Claude Design System Starter

Anthropic 風格的前端設計系統起手式。珊瑚色 primary、暖米色底、品牌色階(coral / teal / purple / olive / gold / warm / ivory)、light/dark 雙主題。

## 技術棧

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4**(`@tailwindcss/vite`,CSS-first 設定)
- **shadcn/ui** + **Radix UI**(new-york style)
- **lucide-react** 圖示
- **sonner** toast、**next-themes** 深色模式切換
- 自架字型(fontsource):Hanken Grotesk(Latin)、Noto Sans/Serif TC(繁中)、IBM Plex Mono(等寬)

## 開始

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # tsc -b && vite build
pnpm preview    # 預覽 build 結果
```

## 結構

| 路徑 | 說明 |
| --- | --- |
| `src/globals.css` | 設計系統核心:shadcn semantic tokens、品牌色階、字型堆疊、radius |
| `src/main.tsx` | fontsource 字型載入 + `ThemeProvider` |
| `src/App.tsx` | 元件 / 字型 / 色階 / 深色模式展示頁 |
| `src/components/ui/*` | shadcn 元件 |
| `src/components/mode-toggle.tsx` | 深色模式切換鈕 |
| `src/lib/utils.ts` | `cn()` className 合併工具 |
| `components.json` | shadcn 設定(`@/` 別名、globals.css、Radix) |

## 加入更多 shadcn 元件

```bash
pnpm dlx shadcn@latest add <component>
```

## 設計 token

語意化 token 定義於 `src/globals.css`,shadcn 元件直接讀取(`--background`、`--primary` …)。
品牌原色階以 utilities 形式提供,例如 `bg-coral-500`、`text-teal-700`、`border-purple-200`。
深色模式以 `.dark` class 切換(由 next-themes 控制)。
