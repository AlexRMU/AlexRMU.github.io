"use strict";

let obj = {};
obj.base = {};
obj.options = [];
obj.polki = {};

let xlsx = "./Таблица.xlsx";

async function get_base(sheets, base) {
    for (let i = 0; i < sheets.length; i++) {
        if (sheets[i][0] != "") {
            base[sheets[i][0]] = {};
        }
    }
    for (let i = 0; i < sheets[0].length; i++) {
        if (sheets[0][i] != "") {
            for (let [key, value] of Object.entries(base)) {
                base[key][sheets[0][i]] = "";
            }
        }
    }
    for (let [key, value] of Object.entries(base)) {
        for (let i = 0; i < sheets.length; i++) {
            if (sheets[i][0] == key) {
                for (let k = 0; k + 1 < sheets[i].length; k++) {
                    base[sheets[i][0]][sheets[0][k + 1]] =
                        sheets[i][k + 1] + "000";
                }
            }
        }
    }
    return base;
}
async function get_options(sheets, options) {
    for (let i = 1; i < sheets.length; i++) {
        if (sheets[i][0] != "") {
            options[i - 1] = {};
            options[i - 1].name = sheets[i][0];
            if (isNaN(parseFloat(sheets[i][1]))) {
                options[i - 1].k = 0;
            } else {
                options[i - 1].k = parseFloat(sheets[i][1]);
            }
            options[i - 1].formula = sheets[i][2].trim().replace(/\s/g, " ");
            options[i - 1].input_id = sheets[i][3];
            options[i - 1].value = 0;
            options[i - 1].total = 0;
        }
    }
    return options;
}
async function get_polki(sheets, polki) {
    for (let i = 0; i < sheets.length; i++) {
        if (sheets[i][0] != "" && sheets[i][1] != "") {
            polki[sheets[i][0]] = sheets[i][1];
        }
    }
    return polki;
}
async function start(obj) {
    let response = await fetch(xlsx).then(function (res) {
        if (!res.ok) throw new Error("Ошибка!");
        return res.arrayBuffer();
    });
    let workbook = await XLSX.read(new Uint8Array(response), { type: "array" });
    let sheets = await XLSX.utils.sheet_to_json(
        workbook["Sheets"][workbook["SheetNames"][0]],
        {
            raw: false,
            defval: "",
            header: 1,
        }
    );
    obj.base = await get_base(sheets, obj.base);
    sheets = await XLSX.utils.sheet_to_json(
        workbook["Sheets"][workbook["SheetNames"][1]],
        {
            raw: false,
            defval: "",
            header: 1,
        }
    );
    obj.options = await get_options(sheets, obj.options);
    sheets = XLSX.utils.sheet_to_json(
        workbook["Sheets"][workbook["SheetNames"][2]],
        {
            raw: false,
            defval: "",
            header: 1,
        }
    );
    obj.polki = await get_polki(sheets, obj.polki);
    return obj;
}
function round(num, precision, method) {
    num = parseFloat(num);
    if (!precision) return num;
    var methods = {
        auto: "round",
        up: "ceil",
        down: "floor",
    };
    var fn = methods[method];
    if (!fn) {
        fn = "round";
    }
    return Math[fn](num / precision) * precision;
}

function polka(param, obj) {
    if (isNaN(parseFloat(param.value))) {
        param.total = 0;
        return param;
    } else {
        let pol_gl = parseFloat(
            obj.options.find((x) => x.name === "Глубина").value
        );
        if (pol_gl == 0 || isNaN(pol_gl)) {
            param.total = 0;
            return param;
        } else {
            let pol_dl = parseFloat(param.value);
            try {
                if (obj.polki[`${round(pol_gl, 50, "up")}`] == undefined) {
                    throw new Error();
                }
                param.total =
                    (pol_dl / 1000) *
                    parseFloat(obj.polki[`${round(pol_gl, 50, "up")}`]);
            } catch (error) {
                try {
                    param.total =
                        (pol_dl / 1000) *
                        parseFloat(obj.polki[`${round(pol_gl, 100, "up")}`]);
                } catch (error) {
                    param.total = 0;
                }
            }
            param.total = param.total.toFixed(2);
            return param;
        }
    }
}

function base(param, obj) {
    let sh = obj.options.find((x) => x.name === "Ширина");
    let vis = obj.options.find((x) => x.name === "Высота");
    if (sh.value != 0 && vis.value != 0) {
        if (
            isNaN(parseFloat(sh.value)) == false &&
            isNaN(parseFloat(vis.value)) == false
        ) {
            param.total = parseFloat(
                obj.base[`${round(vis.value, 50, "up")}`][
                    `${round(sh.value, 100, "up")}`
                ]
            );
        }
    }
    if (param.total == 0 || isNaN(param.total)) {
        param.total = 0;
        document.querySelector("[id='3']").innerText =
            document.querySelector("[id='3']").innerText +
            `\n---\nЦена базы не найдена!\n---\n`;
        throw new Error("Цена базы не найдена!");
    }
    return param;
}

async function count(obj) {
    try {
        document.querySelector("[id='3']").style.opacity = 0;
        document.querySelector("[id='3']").innerText = "";
        document.querySelector("[name='summ']").value = "";
        document.querySelector("[id='2']").innerText = "Загрузка...";

        for (let i = 0; i < obj.options.length; i++) {
            await window.EnvyCrmWidget.getDealValue({
                input_id: obj.options[i].input_id,
                type: "custom",
            })
                .catch((e) => {
                    console.log(e);
                })
                .then((data) => {
                    if (data == null) {
                        obj.options[i].value = 0;
                    } else {
                        obj.options[i].value = parseFloat(data.value);
                        if (isNaN(obj.options[i].value)) {
                            obj.options[i].value = 0;
                        }
                    }
                    obj.options[i].total = 0;
                });
        }

        obj.total = 0;

        for (let i = 0; i < obj.options.length; i++) {
            if (obj.options[i].formula != "") {
                if (obj.options[i].formula == "x*k") {
                    obj.options[i].total =
                        obj.options[i].value * obj.options[i].k;
                } else {
                    if (obj.options[i].k != 0) {
                        let k = obj.options[i].k;
                        let x = obj.options[i].value;
                        obj.options[i].total = eval(
                            "(" + obj.options[i].formula + ")"
                        );
                    }
                }
            }
            if (obj.options[i].name.startsWith("Длина полки")) {
                obj.options[i] = polka(obj.options[i], obj);
            }
            if (obj.options[i].name.startsWith("Высота")) {
                obj.options[i] = base(obj.options[i], obj);
            }

            obj.total =
                parseFloat(obj.total) + parseFloat(obj.options[i].total);
        }

        if (isNaN(parseFloat(obj.total))) {
            document.querySelector("[id='3']").innerText =
                document.querySelector("[id='3']").innerText +
                `\n---\ntotal не число!\n---\n`;
            throw new Error("total не число!");
        } else {
            try {
                obj.total = obj.total.toFixed(0);
            } catch (error) {
                obj.total = parseFloat(`${obj.total}`.replace(/\..+/gi, ""));
                console.log(error);
            }
            document.querySelector("[name='summ']").value = obj.total;
        }

        for (let i = 0; i < obj.options.length; i++) {
            if (obj.options[i].total != 0) {
                if (obj.options[i].name == "Высота") {
                    if (obj.options[i].value != 0) {
                        if (
                            obj.options.find((x) => x.name === "Ширина")
                                .value != 0
                        ) {
                            document.querySelector("[id='3']").innerText =
                                document.querySelector("[id='3']").innerText +
                                `База * ${round(
                                    obj.options[i].value,
                                    50,
                                    "up"
                                )} * ${round(
                                    obj.options.find((x) => x.name === "Ширина")
                                        .value,
                                    100,
                                    "up"
                                )} = ${obj.options[i].total}` +
                                "\n";
                        }
                    }
                } else if (obj.options[i].name == "Ширина") {
                } else {
                    document.querySelector("[id='3']").innerText =
                        document.querySelector("[id='3']").innerText +
                        `${obj.options[i].name} * ${obj.options[i].value} = ${obj.options[i].total}` +
                        "\n";
                }
            }
        }

        document.querySelector("[id='2']").innerText = "Подробнее";

        console.log("obj", obj);

        await window.EnvyCrmWidget.changeDealValue({
            input_id: obj.options.find((x) => x.name === "Стоимость шкафа")
                .input_id,
            value: obj.total,
        })
            .catch((e) => {
                console.log(e);
            })
            .then((data) => {
                // console.log(data);
            });
    } catch (error) {
        console.log(error);
        document.querySelector("[id='3']").innerText =
            document.querySelector("[id='3']").innerText +
            `\n---\nОшибка: ${error}\n---\n`;
        throw new Error(error);
    }
}

document.querySelector("[id='2']").onclick = function () {
    if (document.querySelector("[id='3']").style.opacity == 1) {
        document.querySelector("[id='3']").style.opacity = 0;
        document.querySelector("[id='2']").innerText = "Подробнее";
    } else {
        document.querySelector("[id='3']").style.opacity = 1;
        document.querySelector("[id='2']").innerText = "Скрыть";
    }
};

document.querySelector("#btn").onclick = async function () {
    await count(obj);
};

window.addEventListener(
    "message",
    async function (event) {
        if (event.data.type == "deal::update-value") {
            if (event.data.data.params.data.input_id != 333215) {
                await count(obj);
            }
        }
    },
    false
);

async function main() {
    obj = await start(obj);

    count(obj);
}

main();