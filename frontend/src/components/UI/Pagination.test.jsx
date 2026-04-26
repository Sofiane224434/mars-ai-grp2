import React from 'react';
import { render, screen } from '@testing-library/react';
import Pagination from './Pagination.jsx';

describe('Pagination', () => {
    it('affiche les boutons de navigation', () => {
        render(<Pagination currentPage={2} totalPages={3} onPageChange={jest.fn()} />);

        expect(screen.getByRole('button', { name: 'Précédent' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Suivant' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    });
});