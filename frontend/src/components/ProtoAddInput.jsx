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
                            if (i2 == 0) {
                                return (<input type={inp2.type} value={inp2.value}
                                    onChange={(e) => changeValue(e, i2, id)}></input>)
                            } else {
                                return (
                                    <div>
                                        <input type={inp2.type} value={inp2.value}
                                            onChange={(e) => changeValue(e, i2, id)}></input>
                                        <button type="button" onClick={removeInput(id, i2)}>REMOVE</button>
                                    </div>)
                            }

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
        if (groupindex) {
            let newdata = results.inputdata;
            newdata[groupindex].content[index].value = e.target.value;
            setResults({ ...results, inputdata: newdata });
        } else {
            let newdata = results.inputdata;
            newdata[index].value = e.target.value;
            setResults({ ...results, inputdata: newdata });
        }
    }

    function addInput(grpindex) {
        //get the input model to add

        //copy state with no reference
        const newData = JSON.parse(JSON.stringify(results));
        //Get the input to add and remove the value
        let newinp_toadd = newData.inputdata[grpindex].content[0];
        newinp_toadd.value = "";

        //make new input data from results
        const newInputData = [...results.inputdata];
        //add in array the input to add
        newInputData[grpindex].content.push(newinp_toadd);
        //save in results
        setResults({ ...results, inputdata: newInputData })
    }

    function removeInput(groupindex, index) {
        console.log(results.inputdata[groupindex].content[index]);
    }

    //console.log(results.inputdata[1].content[0]);

    return (
        <div>
            <div>Additive input test:</div>
            {generate_form()}
        </div>
    )
}

