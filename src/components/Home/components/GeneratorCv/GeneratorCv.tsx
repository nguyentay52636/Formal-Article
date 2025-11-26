"use client"
import React, { useEffect } from 'react'
import { CvDetailView } from './components/CvDetailView/CvDetailView'
import { ITemplate } from '@/apis/templateApi'
import { useTemplate } from '@/hooks/useTemplate'
import { Loader2 } from 'lucide-react'

export interface GeneratorCvProps {
    cv: ITemplate
}

export default function GeneratorCv({ cv }: GeneratorCvProps) {
    const { getTemplateDetails, templateDetails, loading } = useTemplate();

    useEffect(() => {
        if (cv.id) {
            getTemplateDetails(Number(cv.id));
        }
    }, [cv.id]);

    const displayCv = templateDetails || cv;

    if (loading && !templateDetails) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <>
            <CvDetailView cv={displayCv} />
        </>
    )
}
