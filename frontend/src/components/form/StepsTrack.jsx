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
                <div key={mystep} className="flex items-center gap-0">
                    <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full p-2.5 text-center text-[40px] bg-jaune-souffre text-ocre-rouge">{mystep}</div>
                    {mystep < maxstep && <div className="h-1.25 w-10 bg-white"></div>}
                </div>
            );
        } else {
            return (
                <div key={mystep} className="flex items-center gap-0">
                    <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full p-2.5 text-center text-[40px] bg-fauve text-white">{mystep}</div>
                    {mystep < maxstep && <div className="h-1.25 w-10 bg-white"></div>}
                </div>
            );
        }
    });

    return (
        <div className="flex flex-row items-center justify-center">{stepMap}</div>
    )
}