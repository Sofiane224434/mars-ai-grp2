// pages/dashboard/admin/EditSite.jsx

import CountdownTimer from '../../../components/sections/HeroSection/CountdownTimer/CountdownTimer';

function EditSite() {
    return (
        <div className="p-8 max-w-7xl">
            <h1 className="text-4xl font-bold text-jaune-souffre mb-8">Modification du Site</h1>

            <div className="space-y-8">
                {/* Section Compte à rebours */}
                <CountdownTimer showHeader={false} showFooter={false} showControls={true} />
            </div>
        </div>
    );
}

export default EditSite;
