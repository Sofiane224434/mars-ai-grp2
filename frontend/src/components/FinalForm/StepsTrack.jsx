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
                <>
                    <div className="step_base step_active">{mystep}</div>
                    {mystep < maxstep && <div className="step_line"></div>}
                </>
            );
        } else {
            return (
                <>
                    <div className="step_base step_inactive">{mystep}</div>
                    {mystep < maxstep && <div className="step_line"></div>}
                </>
            );
        }
    });

    return (
        <div className="float_left_row items-center">{stepMap}</div>
    )
}