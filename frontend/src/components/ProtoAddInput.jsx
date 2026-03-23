import { useState } from "react";

const init_values = {
    formname: "formtest",
    inputdata: [
        {
            name: "inp1",
            label: "my label",
            type: "text",
            value: ""
        },
        {
            name: "addinput",
            label: "my add input",
            type: "addition",
            inputtoadd:
            {
                type: "text",
                value: "",
            },
            content:
                [
                    {
                        type: "text",
                        value: ""
                    }
                ]
        }
    ]
}

export default function ProtoAddInput() {

    const [results, setResults] = useState(init_values);

    function generate_form() {
        const mymap = results.inputdata.map((inp, id) => {
            if (inp.type == "addition") {
                return (
                    <div>
                        <div>{inp.label}</div>
                        {inp.content.map((inp2, i2) => {
                            return (<input type={inp2.type} value={inp2.value}
                                onChange={(e) => changeValue(e, i2, id)}></input>)
                        })}
                        <button type="button" onClick={() => addInput(id)}>ADD AN INPUT</button>
                    </div>
                )
            } else {
                return (
                    <div>
                        <div>{inp.label}</div>
                        <input type={inp.type} name={inp.name} value={inp.value}
                            onChange={(e) => changeValue(e, id)}></input>
                    </div>
                )
            }
        })

        return (
            <form>
                <div>{results.formname}</div>
                {mymap}
            </form>
        )
    }

    function changeValue(e, index, groupindex = null) {
        console.log("index: ", index, "groupindex: ", groupindex);
        if (groupindex) {
            let newdata = results.inputdata;
            newdata[groupindex].content[index].value = e.target.value;
            //console.log(newdata);
            setResults({ ...results, inputdata: newdata });
        } else {
            let newdata = results.inputdata;
            newdata[index].value = e.target.value;
            setResults({ ...results, inputdata: newdata });
        }

        // console.log(index, groupindex);
        // const newData = results.inputdata.map((elem, i) => {
        //     if (groupindex) {
        //         if (i == groupindex) {
        //             elem.content.map((el2, i2) => {
        //                 if (i2 == index) {
        //                     return { ...el2, value: e.target.value }
        //                 } else {
        //                     return el2;
        //                 }
        //             })
        //         } else {
        //             return elem;
        //         }
        //     } else {
        //         if (i == index) {
        //             return { ...elem, value: e.target.value };
        //         } else {
        //             return elem;
        //         }
        //     }
        // })
        // console.log(newData);

        // setResults({ ...results, inputdata: newData });
    }

    function getGroupCopy(groupindex) {

        let myelem = init_values.inputdata[groupindex].content[0];
        return myelem;
    }

    function addtoInputGroup(grpindex, addition, array) {
        const nextRes = array.inputdata.map((elem, index) => {
            if (index == grpindex) {
                // elem.content.push(addition);
                return [...elem.content, addition];
            } else {
                return elem;
            }
        })
        return nextRes;
    }

    function addInput(grpindex) {
        //get the input model to add
        let inputtoadd = results.inputdata[grpindex].inputtoadd;
        console.log("inputtoadd", inputtoadd);

        const newInputData = [...results.inputdata];
        newInputData[grpindex].content.push(inputtoadd);
        setResults({ ...results, inputdata: newInputData })
        console.log(results);
        //let nextRes = addtoInputGroup(index, inputtoadd, results);
        //console.log("nextres", nextRes);

        // let newdata = results.inputdata;
        // newdata[groupindex].content.push(inputtoadd);
        // console.log(newdata);
        // setResults({ ...results, inputdata: newdata });

        // let newdata = results.inputdata.map((elem, i) => {
        //     if (i == groupindex) {
        //         elem.map((elem2, i2) => {
        //             return {
        //                 ...elem2,
        //                 inputtoadd
        //             }
        //         })
        //         return elem;
        //     } else {
        //         return elem;
        //     }
        // })
        // console.log(newdata);
        //setResults(newdata);
    }

    function removeInput(groupindex, index) {
        //
    }

    //console.log(results.inputdata[1].content[0]);

    return (
        <div>
            <div>Additive input test:</div>
            {generate_form()}
        </div>
    )
}

