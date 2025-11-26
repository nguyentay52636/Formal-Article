"use client"
import React from 'react'
import { CvDetailView } from './components/CvDetailView/CvDetailView'
import { ITemplate } from '@/apis/templateApi'

export interface GeneratorCvProps {
    cv: ITemplate
}

export default function GeneratorCv({ cv }: GeneratorCvProps) {
    return (
        <CvDetailView cv={cv} />
    )
}
