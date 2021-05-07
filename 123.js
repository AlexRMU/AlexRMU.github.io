"use strict";

fetch(
    "https://shopishop.envycrm.com/crm/api/v1/main/data/?api_key=075054c3460de97202fc035000182c0e9326a94c",
    {
        method: "POST",
        body: JSON.stringify(""),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }
)
    .catch((e) => {
        console.log(e);
    })
    .then((response) => {
        response.json();
    })
    .then((response) => {
        console.log("response", response);
    });



