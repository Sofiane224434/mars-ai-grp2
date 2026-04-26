export default function InputLengthUI({ currentlength, maxlength,
    minlength = null
}) {

    let threshold = Math.floor(maxlength / 10);

    const regular_class = "text-sm text-jaune-souffre";
    const closetoerror_class = "text-sm text-orange-500";
    const error_class = "text-sm text-red-500";

    return (
        <div className={currentlength >= maxlength ? error_class :
            currentlength >= (maxlength - threshold) ? closetoerror_class : regular_class
        }
        >{currentlength} / {maxlength}</div>
    )
}