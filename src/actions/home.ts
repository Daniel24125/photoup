"use server"

import { LanguageType } from "@/contexts/locale";
import base, { IFeaturesTableFields } from "@/utils/airtable";

export type TGetData = (tableName: string, languageInput: LanguageType) => Promise<IFeaturesTableFields[]>;

export const  getData:TGetData = async (tableName: string, languageInput: LanguageType = "PT") => {
    try {
    // Explicitly type the base call and the records array

    const records = await base<IFeaturesTableFields>(tableName).select({
            filterByFormula: `{language} = '${languageInput}'`,
        }).all();
        console.log(`Successfully retrieved ${records.length} records from "${tableName}"`);
        return records.map(record => {
            return {
                //@ts-expect-error: the id param exists
                id: record.id,
                ...record.fields
            }
        }); 
    } catch (error) {
        if (error instanceof Error) {
        console.error("Error fetching records with .all():", error.message);
        } else {
        console.error("Unknown error fetching records with .all():", error);
        }
        return [];
    }
}