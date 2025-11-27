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
export const  getGeneratorsDetail = async (id:number) => {
    try {

    }catch(error:any) {
        throw error;
     }
 } 
 
