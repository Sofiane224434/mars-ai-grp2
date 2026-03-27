import React from 'react';
import { Link } from 'react-router-dom';

function PanelJury() {
    return (
        <header>
            <div>
                <h1>Panel Jury</h1>
                <Link to="/dashboard/jury/:id">Panel d’un jury</Link>
                <br />
                <Link to="/dashboard/jury/:id/movies">Voter pour les films</Link>
                <br />
                <Link to="/dashboard/validation">Valider les sélections</Link>
                <br />
                <Link to="/dashboard/top50">Gérer le Top 50</Link>
                <br />
                <Link to="/dashboard/top5">Gérer le Top 5</Link>
                <br />
                <Link to="/dashboard/options">Options</Link>
                <br />
            </div>
        </header>
    );
}

export default PanelJury;