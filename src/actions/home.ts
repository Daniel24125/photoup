"use server"

import { LanguageType } from "@/contexts/locale";
import { IFeaturesTableFields } from "@/utils/airtable";
import dbData from "@/data/db.json";

export type TGetData = (tableName: string, languageInput: LanguageType) => Promise<IFeaturesTableFields[]>;

export const getData: TGetData = async (tableName: string, languageInput: LanguageType = "PT") => {
    console.log(`[getData] Fetching from local DB for table: "${tableName}" with language: "${languageInput}"`);

    try {
        // cast to any or Record<string, any> to allow dynamic access by table Name
        const db = dbData as Record<string, any>;

        if (!db[tableName]) {
            console.warn(`[getData] Table "${tableName}" not found in local DB.`);
            return [];
        }

        const records = db[tableName].filter((record: IFeaturesTableFields) => record.language === languageInput);

        console.log(`[getData] Successfully retrieved ${records.length} records from "${tableName}"`);
        return records;

    } catch (error) {
        console.error("Error reading local DB:", error);
        return [];
    }
}