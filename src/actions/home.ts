"use server"

import { LanguageType } from "@/contexts/locale";
import { IFeaturesTableFields } from "@/utils/airtable";
import fs from 'fs/promises';
import path from 'path';

export type TGetData = (tableName: string, languageInput: LanguageType) => Promise<IFeaturesTableFields[]>;

export const getData: TGetData = async (tableName: string, languageInput: LanguageType = "PT") => {
    console.log(`[getData] Fetching from local DB for table: "${tableName}" with language: "${languageInput}"`);

    try {
        const filePath = path.join(process.cwd(), 'src', 'data', 'db.json');
        const fileContents = await fs.readFile(filePath, 'utf8');
        const db = JSON.parse(fileContents);

        if (!db[tableName]) {
            console.warn(`[getData] Table "${tableName}" not found in local DB.`);
            return [];
        }

        const records = db[tableName].filter((record: any) => record.language === languageInput);

        console.log(`[getData] Successfully retrieved ${records.length} records from "${tableName}"`);
        return records;

    } catch (error) {
        console.error("Error reading local DB:", error);
        return [];
    }
}