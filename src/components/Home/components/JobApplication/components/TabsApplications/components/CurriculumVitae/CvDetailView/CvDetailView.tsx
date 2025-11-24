"use client"

import { useEffect } from "react"
import { Breadcrumbs } from "./components/Breadcrumbs"
import { CompanyLogosCard } from "./components/CompanyLogosCard"
import { CvDescriptionCard } from "./components/CvDescriptionCard"
import { CvFeaturesCard } from "./components/CvFeaturesCard"
import { CvPreviewCard } from "./components/CvPreviewCard"
import { CvTitleSection } from "./components/CvTitleSection"
import { CvUsageGuideCard } from "./components/CvUsageGuideCard"
import { ShareCvCard } from "./components/ShareCvCard"
import { StatsBar } from "./components/StatsBar"
import { ITemplate } from "@/apis/templateApi"
import { useTemplate } from "@/hooks/useTemplate"
import { Loader2 } from "lucide-react"

interface CvDetailViewProps {
    cv: ITemplate
}

export function CvDetailView({ cv }: CvDetailViewProps) {
    const { getTemplateDetails, templateDetails, loading } = useTemplate();

    useEffect(() => {
        if (cv.id) {
            getTemplateDetails(Number(cv.id));
        }
    }, [cv.id]);

    // Use templateDetails if available, otherwise fall back to initial cv prop
    const displayCv = templateDetails || cv;

    if (loading && !templateDetails) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <Breadcrumbs name={displayCv.name} />

            <div className="grid lg:grid-cols-[1fr,420px] gap-8 mb-16">
                <div className="space-y-6">
                    <StatsBar views={displayCv.views} downloads={displayCv.downloads} />

                    <CvPreviewCard title={displayCv.name} previewImage={displayCv.previewUrl} />
                    <CvTitleSection id={displayCv.id} title={displayCv.name} tag={displayCv.tag?.name} industry={displayCv.summary} />
                    {/* GIới thiêu về cv */}
                    <CvDescriptionCard
                        description={displayCv.description}
                        language={displayCv.language}
                        usage={displayCv.usage}
                        design={displayCv.design}
                        features={displayCv.features || []}
                    />
                    <CvUsageGuideCard />
                    {/* <CVRating cvId={displayCv.id} />
                    <ReviewAI cvId={displayCv.id} cvTitle={displayCv.name} cvCategory={displayCv.tag?.name} />
                    <CvComment cvId={displayCv.id} /> */}
                </div>

                <div className="space-y-6">
                    <div className="sticky top-6 space-y-6">

                        <CvFeaturesCard
                            description={displayCv.description}
                            language={displayCv.language}
                            usage={displayCv.usage}
                            design={displayCv.design}
                            features={displayCv.features || []}
                        />
                        <CompanyLogosCard />
                        <ShareCvCard />
                    </div>
                </div>
            </div>
        </main>
    )
}
