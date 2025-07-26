"use client"
import { useState, useEffect } from 'react';
import { IFeaturesTableFields} from '@/utils/airtable';
import { TGetData } from '@/actions/home';
import { useLanguage } from '@/contexts/locale';

export function useDataFetch(action: TGetData, tableName: string) {
  const [data, setData] = useState<IFeaturesTableFields[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {language} = useLanguage()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await action(tableName, language);
        setData(result);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName, language]);

  return { data, loading, error};
}