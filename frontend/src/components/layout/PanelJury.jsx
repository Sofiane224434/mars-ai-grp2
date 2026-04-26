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
                <Link to="/dashboard/jury/:id/movies">Juger les vidéos</Link>
                <br />
            </div>
        </header>
    );
}

export default PanelJury;