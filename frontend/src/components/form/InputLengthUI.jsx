export default function InputLengthUI({ currentlength, maxlength,
    minlength = null
}) {

    let threshold = Math.floor(maxlength / 10);

    const regular_class = "inputlengthui inputlengthui_regular";
    const closetoerror_class = "inputlengthui inputlengthui_close";
    const error_class = "inputlengthui inputlengthui_error";

    return (
        <div className={currentlength >= maxlength ? error_class :
            currentlength >= (maxlength - threshold) ? closetoerror_class : regular_class
        }
        >{currentlength} / {maxlength}</div>
    )
}