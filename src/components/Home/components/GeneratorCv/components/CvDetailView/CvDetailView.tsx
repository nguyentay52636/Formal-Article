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
import { ITemplate } from "@/apis/templateApi"
import { CVRating } from "@/components/ui/RatingCv"

interface CvDetailViewProps {
    cv: ITemplate
}

export function CvDetailView({ cv }: CvDetailViewProps) {
    // Use the passed cv prop directly as it now contains the full details
    const displayCv = cv;

    console.log('CvDetailView cv data:', {
        id: displayCv.id,
        name: displayCv.name,
        hasHtml: !!displayCv.html,
        hasCss: !!displayCv.css,
        htmlLength: displayCv.html?.length,
        cssLength: displayCv.css?.length
    });

    return (
        <main className="container mx-auto px-4 py-8">
            <Breadcrumbs name={displayCv.name} />

            <div className="grid lg:grid-cols-[1fr,420px] gap-8 mb-16">
                <div className="space-y-6">
                    <StatsBar views={displayCv.views} downloads={displayCv.downloads} />

                    <CvPreviewCard
                        title={displayCv.name}
                        previewImage={displayCv.previewUrl}
                        html={displayCv.html}
                        css={displayCv.css}
                    />
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
                    <CVRating cvId={displayCv.id} />

                    {/* <CvComment cvId={displayCv.id} />  */}
                    {/* <ReviewAI cvId={displayCv.id} cvTitle={displayCv.name} cvCategory={displayCv.tag?.name} /> */}
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
