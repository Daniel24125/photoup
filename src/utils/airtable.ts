import { LanguageType } from '@/contexts/locale';
import Airtable, { FieldSet } from 'airtable';

export type AirtablePictureType = {
    id: string,
    width: number,
    height: number,
    url: string,
    filename: string,
    size: number,
    type: string,
    thumbnails: {
        small: {
            url: string,
            width: number,
            height: number
        },
        large: {
            url: string,
            width: number,
            height: number
        },
        full: {
            url: string,
            width: number,
            height: number
        }
    }
}

export interface IFeaturesTableFields extends FieldSet {
    id: string,
    title: string
    language: LanguageType
    desc: string
    icon?: AirtablePictureType[]
    date?: string
    link?: string
    place?:string
    address?: string
    addressCode?: string
    city?: string
    email?: string
    phone?: string
    picture?: string |  AirtablePictureType[]
    'Created Time'?: string
}


Airtable.configure({
    apiKey: process.env.AIRTABLE_TOKEN
});

var base = Airtable.base(process.env.BASE_ID as string);

export default base