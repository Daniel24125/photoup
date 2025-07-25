import { LanguageType } from '@/contexts/locale';
import Airtable, { FieldSet } from 'airtable';

export interface IFeaturesTableFields extends FieldSet {
    title: string;
    language: LanguageType;
    desc: string; 
    icon: string;
    'Created Time'?: string; // Airtable's default 'Created Time' field
}


Airtable.configure({
    apiKey: process.env.AIRTABLE_TOKEN
});

var base = Airtable.base(process.env.BASE_ID as string);
console.log(base)
export default base