import { useState, useCallback } from 'react';

const useApi = () => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    //Fonction d'exécution asynchrone mémorisée avec useCallback
    const execute = useCallback(async (apiCall) => {
       
        setIsLoading(true);
        setError(null);

        try {
            //Execution de la promesse
            const response = await apiCall();

            // Adaptation intelligente : si c'est Axios, la donnée utile est dans response.data
            const result = response?.data !== undefined ? response.data : response;
            // Succès : on stocke la donnée
            setData(result);

            return result;

        } catch (err) {
            // Échec : Capture de l'erreur (gestion propre des erreurs Axios vs Natives)
            const errorMessage = 
                err.response?.data?.message ||
                err.message ||
                "Une erreur inattendue est survenue.";

                setError(errorMessage);

                // On rejette l'erreur pour permettre au composant d'afficher un Toast si besoin
                throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);
    // 3. Valeurs retournées (API du Hook)
  return { data, isLoading, error, execute, setData };
    
};

export default useApi;