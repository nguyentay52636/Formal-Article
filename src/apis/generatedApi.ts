import baseApi from "./baseApi";
import { ITemplate } from "./templateApi";

export interface IGenerator { 
id :number ; 
userId:number;  
templateId:number; 
template:ITemplate;
dataJson :string;
styleJson:string;
htmlOutput:string;
title:string;
pdfUrl:string;
createdAt:string;
updatedAt:string;

} 
export interface CreateGeneratorDto {
    userId?:number;
    templateId:number;
    title:string;
    prompt?:string;
    dataJson?:string;
    styleJson:string;
    htmlOutput?:string;
    aiMode:boolean;
    manualMode:boolean;
    valid?:boolean;
} 
export const  getGeneratorsDetail = async (id:number) => {
    try {

    }catch(error:any) {
        throw error;
     }
 } 
 export const createGeneratorAIOrManual = async (newGenerator:CreateGeneratorDto) => {

    try {
        const {data} = await baseApi.post("/generated-cvs", newGenerator);
        return data;
    }catch(error:any) {
        throw error;
    }
 }
 export const getMyGeneratatedByUserId = async (userId: number) => { 
    try {
        const { data } = await baseApi.get(`/generated-cvs/my-cvs?userId=${userId}`);
        // Handle response structure: { status: "success", data: [...], total: number }
        return data?.data || data || [];
    } catch(error: any) {
        console.error("Error fetching generated CVs:", error);
        throw error;
    }
} 
