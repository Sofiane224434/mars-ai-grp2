export default function StepsTrack({ step }) {
    if (!step) {
        step = 1;
    }

    const allSteps = [1, 2, 3, 4];

    const stepMap = allSteps.map(mystep => {
        if (mystep == step) {
            return (
                <div className="step_active">{mystep}</div>
            );
        } else {
            return (
                <div className="step_inactive">{mystep}</div>
            );
        }
    });

    return (
        <div>{stepMap}</div>
    )
}