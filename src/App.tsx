import { SparklesIcon } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/sonner"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ModeToggle } from "@/components/mode-toggle"

const brandScales = [
  { name: "coral", className: "bg-coral-500" },
  { name: "teal", className: "bg-teal-500" },
  { name: "purple", className: "bg-purple-500" },
  { name: "olive", className: "bg-olive-500" },
  { name: "gold", className: "bg-gold-500" },
  { name: "warm", className: "bg-warm-500" },
  { name: "ivory", className: "bg-ivory-300" },
] as const

function App() {
  return (
    <TooltipProvider>
      <div className="min-h-svh bg-background text-foreground">
        <div className="mx-auto max-w-3xl px-6 py-12">
          {/* Header */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                <SparklesIcon className="size-5" />
              </span>
              <div>
                <h1 className="text-xl font-semibold tracking-tight">
                  Claude Design System
                </h1>
                <p className="text-sm text-muted-foreground">
                  Vite · React 19 · Tailwind v4 · shadcn/ui
                </p>
              </div>
            </div>
            <ModeToggle />
          </header>

          <Separator className="my-8" />

          {/* Typography */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground">字型 Typography</h2>
            <p className="text-2xl font-semibold">
              The quick brown fox jumps over the lazy dog
            </p>
            <p className="text-lg">
              敏捷的棕色狐狸跳過了那隻懶惰的狗。設計即溝通。
            </p>
            <p className="font-mono text-sm text-muted-foreground">
              const greeting = "Hello, 世界"; // IBM Plex Mono
            </p>
          </section>

          <Separator className="my-8" />

          {/* Buttons + badges */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground">元件 Components</h2>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => toast.success("已送出!", { description: "Sonner toast 運作正常。" })}>
                顯示 Toast
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="destructive">Destructive</Button>
                </TooltipTrigger>
                <TooltipContent>危險操作 Tooltip</TooltipContent>
              </Tooltip>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Card with form */}
          <section className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>訂閱電子報</CardTitle>
                <CardDescription>輸入你的 email,我們會寄送設計系統更新。</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => toast("感謝訂閱!", { description: "稍後請至信箱確認。" })}
                >
                  訂閱
                </Button>
              </CardFooter>
            </Card>
          </section>

          <Separator className="my-8" />

          {/* Brand color scales */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground">品牌色階 Brand scales</h2>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
              {brandScales.map((c) => (
                <div key={c.name} className="space-y-1.5">
                  <div className={`${c.className} h-14 rounded-lg border`} />
                  <p className="text-center text-xs text-muted-foreground">{c.name}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Toaster richColors />
    </TooltipProvider>
  )
}

export default App
