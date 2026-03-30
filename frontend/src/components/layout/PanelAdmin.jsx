import React from 'react';
import { Link } from 'react-router-dom';

function PanelAdmin() {
    return (
        <header>
            <div>
                <h1>Panel Admin</h1>
                <br />
                <Link to="/dashboard/adminpanel">Tableau de bord</Link>
                <br />
                <Link to="/dashboard/adminpanel/editsite">Editer le site</Link>
                <br />
                <Link to="/dashboard/adminpanel/invitejury">Inviter un jury</Link>
                <br />
                <Link to="/dashboard/movies">Gérer les films</Link>
                <br />
            </div>
        </header>
    );
}

export default PanelAdmin;