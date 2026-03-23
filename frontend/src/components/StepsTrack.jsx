export default function StepsTrack({ step, maxstep }) {
    if (!step) {
        step = 1;
    }

    let allSteps = [];
    for (let i = 1; i <= maxstep; i++) {
        allSteps.push(i);
    }

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