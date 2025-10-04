import { useLoader } from '@/contexts/loader';
import React from 'react'

type TLoadingPageProps = {
  children?: React.ReactNode,
  id: string,
  loading: boolean
}

const LoadingPage = ({children, id, loading} : TLoadingPageProps) => {
    const { registerLoading, unregisterLoading } = useLoader();
      
      React.useEffect(()=>{
        registerLoading(id);
      }, [])
      
       React.useEffect(()=>{
        if(!loading) unregisterLoading(id)
      }, [loading])
    return !loading && children
}

export default LoadingPage
