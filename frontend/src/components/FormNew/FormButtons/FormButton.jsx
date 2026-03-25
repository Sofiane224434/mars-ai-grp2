export default function FormButton({ functionOnClick, textContent }) {

    return (
        <button className="p-2 m-1 bg-sky-500" type="button" onClick={functionOnClick}>{textContent}</button>
    )
}