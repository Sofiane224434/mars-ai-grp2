import { renderHook, act } from '@testing-library/react';
import useApi from './useApi';

describe('Custom Hook: useApi', () => {
  
  it('doit initialiser les états par défaut correctement', () => {
    // renderHook permet de tester un hook en dehors d'un composant
    const { result } = renderHook(() => useApi());

    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.execute).toBe('function');
  });

  it('doit gérer un appel API réussi et stocker les données', async () => {
    const { result } = renderHook(() => useApi());
    
    // 1. On crée une fausse réponse API (Mock) style Axios
    const mockData = { id: 1, title: 'Inception' };
    const mockApiCall = jest.fn().mockResolvedValue({ data: mockData });

    // 2. On utilise 'act' car la fonction 'execute' va modifier les states (isLoading, data)
    await act(async () => {
      await result.current.execute(mockApiCall);
    });

    // 3. On vérifie que les états finaux sont corrects
    expect(mockApiCall).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockData); // Les données sont bien extraites
    expect(result.current.isLoading).toBe(false);  // Le chargement est terminé
    expect(result.current.error).toBeNull();       // Aucune erreur
  });

  it('doit gérer une erreur API (format Axios) et la stocker', async () => {
    const { result } = renderHook(() => useApi());
    
    // 1. On simule une erreur Axios (ex: 403 Forbidden)
    const mockError = {
      response: { data: { message: "Accès interdit au jury." } }
    };
    const mockApiCall = jest.fn().mockRejectedValue(mockError);

    // 2. Exécution avec 'act' et un bloc try/catch (car notre hook relance l'erreur)
    await act(async () => {
      try {
        await result.current.execute(mockApiCall);
      } catch (err) {
        // On s'attend à ce que l'erreur soit rejetée par le hook, on l'attrape ici pour que le test ne plante pas
      }
    });

    // 3. Vérifications
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("Accès interdit au jury."); // Le bon message est extrait !
  });

  it('doit gérer une erreur javascript native (sans response.data.message)', async () => {
    const { result } = renderHook(() => useApi());
    
    // 1. On simule une erreur réseau classique (ex: API injoignable)
    const mockApiCall = jest.fn().mockRejectedValue(new Error("Network Error"));

    await act(async () => {
      try {
        await result.current.execute(mockApiCall);
      } catch (err) {}
    });

    // 3. Vérifications
    expect(result.current.error).toBe("Network Error"); 
  });

});