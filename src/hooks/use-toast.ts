export type ToastVariant = "default" | "destructive"

type ToastOptions = {
  title?: string
  description?: string
  variant?: ToastVariant
}

export function useToast() {
  function toast({ title, description }: ToastOptions) {
    // Minimal placeholder: use browser alert. Replace with your UI toast system.
    const parts = [title, description].filter(Boolean)
    if (parts.length > 0) alert(parts.join("\n"))
  }

  return { toast }
}


