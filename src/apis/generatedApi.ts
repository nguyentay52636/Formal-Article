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

// Tạo CV thủ công (không có prompt)
export const createManualCV = async (params: {
    userId?: number;
    templateId: number;
    title: string;
    dataJson?: string;
    styleJson: string;
    htmlOutput?: string;
}): Promise<IGenerator> => {
    try {
        console.log("📝 [createManualCV] Params received:", {
            userId: params.userId,
            templateId: params.templateId,
            title: params.title,
            dataJsonLength: params.dataJson?.length || 0,
            styleJsonLength: params.styleJson?.length || 0,
            htmlOutputLength: params.htmlOutput?.length || 0,
            note: params.htmlOutput ? "⚠️ htmlOutput provided (backend should override)" : "✅ htmlOutput not provided (backend will render from template + dataJson + styleJson)"
        });

        const payload: CreateGeneratorDto = {
            userId: params.userId,
            templateId: params.templateId,
            title: params.title,
            dataJson: params.dataJson,
            styleJson: params.styleJson,
            // htmlOutput: Không gửi từ frontend, backend sẽ tự render từ:
            // - template.html (khung HTML của template)
            // - template.css (CSS của template)  
            // - dataJson (dữ liệu user nhập)
            // - styleJson (style user chọn: color, font, layout)
            htmlOutput: params.htmlOutput, // Optional: backend sẽ override nếu có
            aiMode: false,
            manualMode: true,
            valid: true
        };
        
        console.log("📤 [createManualCV] Sending payload to backend:", {
            userId: payload.userId,
            templateId: payload.templateId,
            title: payload.title,
            dataJson: payload.dataJson ? `[${payload.dataJson.length} chars]` : "undefined",
            styleJson: payload.styleJson ? `[${payload.styleJson.length} chars]` : "undefined",
            htmlOutput: payload.htmlOutput ? `[${payload.htmlOutput.length} chars] - ⚠️ Backend should override this` : "undefined - ✅ Backend will render",
            aiMode: payload.aiMode,
            manualMode: payload.manualMode,
        });

        const { data } = await baseApi.post("/generated-cvs", payload);
        
        console.log("✅ [createManualCV] Response received:", {
            hasData: !!data,
            hasDataData: !!data?.data,
            responseId: data?.data?.id || data?.id,
            responseTitle: data?.data?.title || data?.title,
        });

        return data?.data || data;
    } catch(error: any) {
        console.error("❌ [createManualCV] Error creating manual CV:", error);
        console.error("❌ [createManualCV] Error details:", {
            message: error?.message,
            response: error?.response?.data,
            status: error?.response?.status,
        });
        throw error;
    }
}

// Tạo CV bằng AI (có prompt)
export const createAICV = async (params: {
    userId?: number;
    templateId: number;
    title: string;
    prompt: string;
    styleJson: string;
    htmlOutput?: string;
}): Promise<IGenerator> => {
    try {
        const payload: CreateGeneratorDto = {
            userId: params.userId,
            templateId: params.templateId,
            title: params.title,
            prompt: params.prompt,
            styleJson: params.styleJson,
            htmlOutput: params.htmlOutput,
            aiMode: true,
            manualMode: false,
            valid: true
        };
        const { data } = await baseApi.post("/generated-cvs", payload);
        return data?.data || data;
    } catch(error: any) {
        console.error("Error creating AI CV:", error);
        throw error;
    }
}

export const updateGenerator = async (id: number, updates: Partial<CreateGeneratorDto>): Promise<IGenerator> => {
    try {
        const { data } = await baseApi.put(`/generated-cvs/${id}`, updates);
        return data?.data || data;
    } catch(error: any) {
        console.error("Error updating generator:", error);
        throw error;
    }
}

export const deleteGenerator = async (id: number): Promise<void> => {
    try {
        await baseApi.delete(`/generated-cvs/${id}`);
    } catch(error: any) {
        console.error("Error deleting generator:", error);
        throw error;
    }
}
 export const getMyGeneratatedByUserId = async (userId: number) => { 
    try {
        const { data } = await baseApi.get(`/generated-cvs/my-cvs?userId=${userId}`);
        return data?.data || data || [];
    } catch(error: any) {
        console.error("Error fetching generated CVs:", error);
        throw error;
    }
} 

export const getGeneratorById = async (id: number): Promise<IGenerator | null> => { 
    try {
        const { data } = await baseApi.get(`/generated-cvs/${id}`);
        return data?.data || data || null;
    } catch(error: any) {
        console.error("Error fetching generator by id:", error);
        throw error;
    } 
} 