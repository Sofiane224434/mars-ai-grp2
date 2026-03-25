/**
 * EXPLICATIONS :
 * Le composant IconButtonModel prend 3 propriétés :
 * @param {*} iconimg -> Le lien source de l'image qui sera utilisé dans "src" pour
 * l'image utilisée par le bouton
 * @param {*} textcontent -> Le contenu texte que va afficher le bouton
 * @param {*} onClickFunc -> Il est possible de faire passer une fonction d'un composant parent
 * vers un composant enfant. Cette propriété sera cette fonction qui s'activera avec un clique
 * sur le bouton.
 * @returns 
 */
export default function IconButtonModel({ iconimg, textcontent, onClickFunc }) {

    return (
        <button onClick={onClickFunc}>
            <img src={iconimg}></img>
            <div>{textcontent}</div>
        </button>
    )
}