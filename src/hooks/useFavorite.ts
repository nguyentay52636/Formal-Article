"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { ITemplate } from "@/apis/templateApi"
import { useAppSelector } from "@/redux/hooks"
import { selectAuth } from "@/redux/Slice/authSlice"
import { getSavedTemplatesByUser, removeTemplateFromFavorite, saveTemplateToFavorite } from "@/apis/FavoriteApi"

const FAVORITE_STORAGE_KEY = "formal-article:favorites"
const FAVORITE_EVENT_KEY = "formal-article:favorites-updated"

export interface FavoriteTemplate {
    id: number
    name: string
    slug: string
    path: string
    summary?: string
    previewUrl?: string
    savedAt: string
}

interface FavoriteEventDetail {
    key: string
}

export interface ToggleFavoriteOptions {
    /**
     * Custom path used when building links for the saved template.
     * Defaults to `/mau-don/${slug}` when omitted.
     */
    path?: string
}

const readStoredFavorites = (storageKey: string): FavoriteTemplate[] => {
    if (typeof window === "undefined") return []

    try {
        const raw = window.localStorage.getItem(storageKey)
        if (!raw) return []
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
            return parsed
        }
        return []
    } catch (error) {
        console.error("Failed to parse favorite templates from storage", error)
        return []
    }
}

export const useFavorite = () => {
    const { user } = useAppSelector(selectAuth)
    const [favorites, setFavorites] = useState<FavoriteTemplate[]>([])
    const [loading, setLoading] = useState(false)

    const storageKey = useMemo(
        () => `${FAVORITE_STORAGE_KEY}:${user?.id ?? "guest"}`,
        [user?.id]
    )

    const isMockUser = useMemo(
        () => user?.id === 9999 || user?.email === "tester@formal.vn",
        [user?.email, user?.id]
    )

    const shouldSyncWithBackend = useMemo(
        () => !!user?.id && !isMockUser,
        [isMockUser, user?.id]
    )

    const buildFavoriteEntry = useCallback(
        (template: ITemplate, options?: ToggleFavoriteOptions): FavoriteTemplate => ({
            id: template.id,
            name: template.name,
            slug: template.slug,
            path: options?.path ?? `/mau-don/${template.slug}`,
            summary: template.summary,
            previewUrl: template.previewUrl,
            savedAt: new Date().toISOString(),
        }),
        []
    )

    const persistFavorites = useCallback((nextFavorites: FavoriteTemplate[]) => {
        if (typeof window === "undefined") return
        window.localStorage.setItem(storageKey, JSON.stringify(nextFavorites))
        window.dispatchEvent(
            new CustomEvent<FavoriteEventDetail>(FAVORITE_EVENT_KEY, {
                detail: { key: storageKey },
            })
        )
    }, [storageKey])

    const loadFavorites = useCallback(async () => {
        if (!shouldSyncWithBackend) {
            setFavorites(readStoredFavorites(storageKey))
            return
        }

        setLoading(true)
        try {
            const [remoteTemplates, cachedFavorites] = await Promise.all([
                getSavedTemplatesByUser(user!.id),
                Promise.resolve(readStoredFavorites(storageKey)),
            ])

            const mapped = remoteTemplates.map((template) => {
                const cached = cachedFavorites.find((item) => item.id === template.id)
                return {
                    id: template.id,
                    name: template.name,
                    slug: template.slug,
                    path: cached?.path ?? `/mau-don/${template.slug}`,
                    summary: template.summary,
                    previewUrl: template.previewUrl,
                    savedAt: cached?.savedAt ?? new Date().toISOString(),
                }
            })

            setFavorites(mapped)
            persistFavorites(mapped)
        } catch (error) {
            console.error("Failed to load favorite templates", error)
            setFavorites(readStoredFavorites(storageKey))
        } finally {
            setLoading(false)
        }
    }, [persistFavorites, shouldSyncWithBackend, storageKey, user?.id])

    useEffect(() => {
        loadFavorites()
    }, [loadFavorites])

    useEffect(() => {
        if (typeof window === "undefined") return

        const handleFavoritesChanged = (event: Event) => {
            const customEvent = event as CustomEvent<FavoriteEventDetail>
            if (!customEvent.detail || customEvent.detail.key === storageKey) {
                loadFavorites()
            }
        }
        window.addEventListener(FAVORITE_EVENT_KEY, handleFavoritesChanged)

        return () => {
            window.removeEventListener(FAVORITE_EVENT_KEY, handleFavoritesChanged)
        }
    }, [loadFavorites, storageKey])

    const toggleFavorite = useCallback(
        async (template: ITemplate, options?: ToggleFavoriteOptions) => {
            const previousFavorites = favorites
            const exists = previousFavorites.some((item) => item.id === template.id)
            const optimisticFavorites = exists
                ? previousFavorites.filter((item) => item.id !== template.id)
                : [...previousFavorites, buildFavoriteEntry(template, options)]

            setFavorites(optimisticFavorites)
            persistFavorites(optimisticFavorites)

            try {
                if (shouldSyncWithBackend) {
                    if (exists) {
                        await removeTemplateFromFavorite(user!.id, template.id)
                    } else {
                        await saveTemplateToFavorite(user!.id, template.id)
                    }
                }
                return !exists
            } catch (error) {
                console.error("Failed to toggle favorite template", error)
                setFavorites(previousFavorites)
                persistFavorites(previousFavorites)
                throw error
            }
        },
        [buildFavoriteEntry, favorites, persistFavorites, shouldSyncWithBackend, user?.id]
    )

    const removeFavorite = useCallback(
        async (templateId: number) => {
            const previousFavorites = favorites
            const nextFavorites = previousFavorites.filter((item) => item.id !== templateId)
            setFavorites(nextFavorites)
            persistFavorites(nextFavorites)

            if (shouldSyncWithBackend) {
                try {
                    await removeTemplateFromFavorite(user!.id, templateId)
                } catch (error) {
                    console.error("Failed to remove favorite template", error)
                    setFavorites(previousFavorites)
                    persistFavorites(previousFavorites)
                }
            }
        },
        [favorites, persistFavorites, shouldSyncWithBackend, user?.id]
    )

    const isFavorite = useCallback(
        (templateId: number) => favorites.some((item) => item.id === templateId),
        [favorites]
    )

    const favoritesCount = useMemo(() => favorites.length, [favorites])

    return {
        favorites,
        favoritesCount,
        toggleFavorite,
        removeFavorite,
        isFavorite,
        loading,
    }
}
