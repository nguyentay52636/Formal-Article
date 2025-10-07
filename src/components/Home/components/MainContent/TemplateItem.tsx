import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TemplateItemProps {
    id: number
    title: string
    slug: string
    thumbnail: string
    views: number
    downloads: number
    category: string
}

export default function TemplateItem({ id, title, slug, thumbnail, views, downloads, category }: TemplateItemProps) {
    return (
        <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
            <Link href={`/mau-don/${slug}`}>
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <img
                        src={thumbnail || "/placeholder.svg"}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </Link>
            <CardContent className="p-4">
                <Badge variant="secondary" className="mb-2 text-xs">
                    {category}
                </Badge>
                <Link href={`/mau-don/${slug}`}>
                    <h3 className="font-semibold text-sm line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                </Link>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {downloads.toLocaleString()}
                    </span>
                </div>
                <Button size="sm" variant="ghost" className="h-7 text-xs">
                    Xem
                </Button>
            </CardFooter>
        </Card>
    )
}
