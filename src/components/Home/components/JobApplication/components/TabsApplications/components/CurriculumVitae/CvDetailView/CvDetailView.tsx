"use client"

import { Breadcrumbs } from "./components/Breadcrumbs"
import { CompanyLogosCard } from "./components/CompanyLogosCard"
import { CvDescriptionCard } from "./components/CvDescriptionCard"
import { CvFeaturesCard } from "./components/CvFeaturesCard"
import { CvPreviewCard } from "./components/CvPreviewCard"
import { CvTitleSection } from "./components/CvTitleSection"
import { CvUsageGuideCard } from "./components/CvUsageGuideCard"
import { ShareCvCard } from "./components/ShareCvCard"
import { StatsBar } from "./components/StatsBar"
import type { CvDetail } from "./types"

interface CvDetailViewProps {
    cv: CvDetail
}

export function CvDetailView({ cv }: CvDetailViewProps) {
    return (
        <main className="container mx-auto px-4 py-8">
            <Breadcrumbs title={cv.title} />

            <div className="grid lg:grid-cols-[1fr,420px] gap-8 mb-16">
                <div className="space-y-6">
                    <StatsBar views={cv.views} downloads={cv.downloads} />
                    <CvPreviewCard title={cv.title} previewImage={cv.previewImage} />
                    <CvDescriptionCard
                        description={cv.description}
                        language={cv.language}
                        category={cv.category}
                        industry={cv.industry}
                    />
                    <CvUsageGuideCard />
                </div>

                <div className="space-y-6">
                    <div className="sticky top-6 space-y-6">
                        <CvTitleSection id={cv.id} title={cv.title} category={cv.category} industry={cv.industry} />
                        <CvFeaturesCard
                            description={cv.description}
                            language={cv.language}
                            usage={cv.usage}
                            design={cv.design}
                            features={cv.features}
                        />
                        <CompanyLogosCard />
                        <ShareCvCard />
                    </div>
                </div>
            </div>
        </main>
    )
}
