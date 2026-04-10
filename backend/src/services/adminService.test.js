// 1. Import explicite de l'objet jest pour l'environnement ESM
import { jest } from '@jest/globals';

import { adminService } from '../../src/services/adminService.js'; 
import { adminModel } from '../../src/models/adminModel.js';       

describe('Admin Service - getDashboardStats', () => {
  
  // Avant chaque test : on remet les compteurs d'appels à zéro
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 2. Après chaque test : on détruit les espions pour éviter les fuites (Best Practice)
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // ==========================================
  // TEST N°1 
  // ==========================================
  it('doit retourner les statistiques formatées correctement selon le contrat Front', async () => {
    
    // A. On espionne et on simule les réponses
    jest.spyOn(adminModel, 'countTotalMovies').mockResolvedValue(12);
    jest.spyOn(adminModel, 'countMoviesByStatus').mockResolvedValue([
      { status: 1, count: 3 }, // 3 pending
      { status: 2, count: 4 }, // 4 rejected
      { status: 3, count: 1 }, // 1 review
      { status: 4, count: 4 }  // 4 approved
    ]);
    jest.spyOn(adminModel, 'getJuryProgress').mockResolvedValue({ totalAssigned: 12, totalEvaluated: 9 });
    jest.spyOn(adminModel, 'countPendingEmails').mockResolvedValue(2);

    // B. Exécution
    const result = await adminService.getDashboardStats();

    // C. Assertions de résultat
    expect(result).toEqual({
      totalMovies: 12,
      moviesByStatus: {
        pending: 3,
        rejected: 4,
        review: 1,
        approved: 4
      },
      juryProgress: {
        totalAssigned: 12,
        totalEvaluated: 9
      },
      emailsPending: 2
    });

    // Assertions d'appels (Vérifie que la logique métier appelle bien la BDD)
    expect(adminModel.countTotalMovies).toHaveBeenCalledTimes(1);
    expect(adminModel.countMoviesByStatus).toHaveBeenCalledTimes(1);
    expect(adminModel.getJuryProgress).toHaveBeenCalledTimes(1);
    expect(adminModel.countPendingEmails).toHaveBeenCalledTimes(1);
  });

  // ==========================================
  // TEST N°2 : Le cas limite (BDD vide)
  // ==========================================
  it('doit retourner des valeurs par défaut à zéro si la base est vide', async () => {
    
    // A. Simulation d'une base vide
    jest.spyOn(adminModel, 'countTotalMovies').mockResolvedValue(0);
    jest.spyOn(adminModel, 'countMoviesByStatus').mockResolvedValue([]); 
    jest.spyOn(adminModel, 'getJuryProgress').mockResolvedValue({ totalAssigned: null, totalEvaluated: null });
    jest.spyOn(adminModel, 'countPendingEmails').mockResolvedValue(null);

    // B. Exécution
    const result = await adminService.getDashboardStats();

    // C. Vérification de la résilience du code (les valeurs par défaut fonctionnent)
    expect(result).toEqual({
      totalMovies: 0,
      moviesByStatus: {
        pending: 0,
        approved: 0,
        review: 0,
        rejected: 0
      },
      juryProgress: {
        totalAssigned: 0,
        totalEvaluated: 0
      },
      emailsPending: 0
    });
  });

});