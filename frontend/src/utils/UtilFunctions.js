export function UtilgenerateInput(object) {
    /**
     * Possible object :
     * {
     * type:"typehere",
     * label:"labelhere",
     * name:"name",
     * maxnum: null || num,
     * minnum: null || num,
     * maxlen: null || num,
     * minlen: null || num,
     * regex: null || regexhere,
     * content:[{...}] || null,
     * textarea_resize: null || bool,
     * required: bool,
     * }
     * 
     * NOTES :
     * content is for additive, groups, select or conditional checkbox
     */

    return (<input type={object.type}></input>)
}

export function UtilgenerateGroupedInputs(group) {
    if (group.type == "checkbox") {

    }
    if (group.type == "group") {

    }
    if (group.type == "additive") {

    }
    if (group.type == "select") {

    }
}

export function UtilgenerateForm(form) {

}