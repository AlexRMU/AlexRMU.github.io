"use strict";

let base = {};
let options = [];
let base_file = "./База.xlsx";
let options_file = "./Опции.xlsx";

async function start(base, options) {
    async function base_xlsx_parse(obj) {
        return await fetch(base_file)
            .then(function (res) {
                if (!res.ok) throw new Error("Ошибка!");
                return res.arrayBuffer();
            })
            .then(function (response) {
                let data = new Uint8Array(response);
                let workbook = XLSX.read(data, { type: "array" });
                let obj2 = XLSX.utils.sheet_to_json(
                    workbook["Sheets"][workbook["SheetNames"][0]],
                    {
                        raw: false,
                        defval: "",
                        header: 1,
                    }
                );
                for (let i = 0; i < obj2.length; i++) {
                    if (obj2[i][0] != "") {
                        obj[obj2[i][0]] = {};
                    }
                }
                for (let i = 0; i < obj2[0].length; i++) {
                    if (obj2[0][i] != "") {
                        for (let [key, value] of Object.entries(obj)) {
                            obj[key][obj2[0][i]] = "";
                        }
                    }
                }
                for (let [key, value] of Object.entries(obj)) {
                    for (let i = 0; i < obj2.length; i++) {
                        if (obj2[i][0] == key) {
                            for (let k = 0; k + 1 < obj2[i].length; k++) {
                                obj[obj2[i][0]][obj2[0][k + 1]] =
                                    obj2[i][k + 1] + "000";
                            }
                        }
                    }
                }
                return obj;
            });
    }
    base = await base_xlsx_parse(base);
    console.log("base", base);

    async function options_xlsx_parse(obj) {
        return await fetch(options_file)
            .then(function (res) {
                if (!res.ok) throw new Error("Ошибка!");
                return res.arrayBuffer();
            })
            .then(function (response) {
                let data = new Uint8Array(response);
                let workbook = XLSX.read(data, { type: "array" });
                console.log(workbook);
                let obj2 = XLSX.utils.sheet_to_json(
                    workbook["Sheets"][workbook["SheetNames"][0]],
                    {
                        raw: false,
                        defval: "",
                        header: 1,
                    }
                );
                for (let i = 1; i < obj2.length; i++) {
                    if (obj2[i][0] != "" && obj2[i][1] != "") {
                        obj[i - 1] = {};
                        obj[i - 1].name = obj2[i][0];
                        obj[i - 1].k = parseFloat(obj2[i][1]);
                        obj[i - 1].input_id = "";
                        obj[i - 1].value = 0;
                        obj[i - 1].total = 0;
                    }
                }
                return obj;
            });
    }
    options = await options_xlsx_parse(options);
    console.log("options", options);

    async function get_deal() {
        window.EnvyCrmWidget.getDeal()
            .catch((e) => {
                console.log(e);
            })
            .then((deal) => {
                console.log("deal", deal);
            });
    }
    get_deal();
}

async function count() {}

async function main() {
    await start(base, options);
}

main();

fetch(
    "https://shopishop.envycrm.com/crm/api/v1/main/data/?api_key=075054c3460de97202fc035000182c0e9326a94c",
    {
        method: "POST",
        body: JSON.stringify(``),
    }
).catch((e) => {
    console.log(e);
})
.then((response) => {
    response.json();
})
.then((response) => {
    console.log("response", response);
});

// let response = await fetch(
//     "https://shopishop.envycrm.com/crm/api/v1/main/data/?api_key=075054c3460de97202fc035000182c0e9326a94c ",
//     {
//         method: "POST",
//         body: JSON.stringify(``),
//     }
// );
// response = await response.json();
// console.log("response", response);
