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
            name: "checker",
            label: "check this box to tell me about your favorite color",
            type: "checkbox",
            value: false,
            content: [
                {
                    name: "inp_color",
                    label: "Tell me your favorite color",
                    type: "text",
                    value: ""
                }
            ]
        }
    ]
}

export default function ProtoCondInput() {

}