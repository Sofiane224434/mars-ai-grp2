import { describe, expect, it, jest } from '@jest/globals';
import { requireAuth } from './requireAuth.js';

const createResponse = () => {
    const response = {};
    response.status = jest.fn().mockReturnValue(response);
    response.json = jest.fn().mockReturnValue(response);
    return response;
};

describe('requireAuth', () => {
    it('renvoie 401 quand aucun token n est fourni', () => {
        const middleware = requireAuth('jury');
        const request = { headers: {}, cookies: {} };
        const response = createResponse();
        const next = jest.fn();

        middleware(request, response, next);

        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.json).toHaveBeenCalledWith({
            error: 'Accès refusé. Veuillez vous connecter.',
        });
        expect(next).not.toHaveBeenCalled();
    });
});