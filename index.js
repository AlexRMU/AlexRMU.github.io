let round = function (num, precision) {
    num = parseFloat(num);
    if (!precision) return num;
    return Math.round(num / precision) * precision;
};

document.addEventListener("DOMContentLoaded", function (event) {
    let params = {
        "after-deal-task": function (params) {
            let urlParams =
                "?deal_id=" + params.dealID + "&client_id=" + params.clientID;
            return [
                {
                    title: "Калькулятор",
                    events: ["deal::update-value", "client::update-value"],
                    content: {
                        type: "iframe",
                        url: "https://alexrmu.github.io/index.html" + urlParams,
                        height: 160,
                    },
                },
            ];
        },
    };
    window.EnvyCrmWidget.init(params);
});

function count() {
    let obj = {
        total: 0,
        width: round(parseFloat(document.form1.width), 50),
        height: round(parseFloat(document.form1.height), 50),
        glub: parseFloat(document.form1.glub.value),
        krisha: document.form1.krisha.checked,
        l_stenka: document.form1.l_stenka.checked,
        p_stenka: document.form1.p_stenka.checked,
        rol: document.form1.rol.checked,
        dop_rol: parseFloat(document.form1.dop_rol.value),
        z_width: parseFloat(document.form1.z_width.value),
        z_height: parseFloat(document.form1.z_height.value),
        pol: document.form1.pol.value,
        stoiki: parseFloat(document.form1.stoiki.value),
        dno: document.form1.dno.checked,
        pereg: parseFloat(document.form1.pereg.value),
        sh_k: parseFloat(document.form1.sh_k.value),
        sh_d: parseFloat(document.form1.sh_d.value),
        pult: parseFloat(document.form1.pult.value),
        el: document.form1.el.checked,
        germ: parseFloat(document.form1.germ.value),
        hydr: parseFloat(document.form1.hydr.value),
        mod: parseFloat(document.form1.mod.value),
        kol: parseFloat(document.form1.kol.value),
        dem: parseFloat(document.form1.dem.value),
        dem2: parseFloat(document.form1.dem2.value),
        summ: parseFloat(document.form1.summ.value),
    };

    obj.total = 30000;

    if (obj.krisha == true) {
        obj.total = obj.total - 700;
    }
    if (obj.l_stenka == true) {
        obj.total = obj.total - 2000;
    }
    if (obj.p_stenka == true) {
        obj.total = obj.total - 2000;
    }
    if (obj.rol == true) {
        obj.total = obj.total - 7000;
    }

    if (obj.dop_rol != (undefined || "")) {
        obj.total = obj.total + 7000 * obj.dop_rol;
    }

    if (obj.z_width != (undefined || "") && obj.z_height != (undefined || "")) {
        obj.total = obj.total + ((obj.z_width * obj.z_height) / 1000000) * 2000;
    }

    if (obj.pol != (undefined || "")) {
        let pol_dl = obj.pol.replaceAll(" ", "").split(",");
        let pol_sh = obj.glub - 50;

        pol_dl.forEach((glubina) => {
            glubina = glubina;
            if (round(glubina, 50) == 350) {
                obj.total = obj.total + (pol_sh / 1000) * 700;
            }
            switch (round(glubina, 100)) {
                case 300:
                    obj.total = obj.total + (pol_sh / 1000) * 550;
                case 400:
                    obj.total = obj.total + (pol_sh / 1000) * 800;
                case 500:
                    obj.total = obj.total + (pol_sh / 1000) * 1000;
                case 600:
                    obj.total = obj.total + (pol_sh / 1000) * 1200;
                case 700:
                    obj.total = obj.total + (pol_sh / 1000) * 1400;
                case 800:
                    obj.total = obj.total + (pol_sh / 1000) * 1500;
                case 900:
                    obj.total = obj.total + (pol_sh / 1000) * 1700;
                case 100:
                    obj.total = obj.total + (pol_sh / 1000) * 1900;
                case 110:
                    obj.total = obj.total + (pol_sh / 1000) * 2200;
                case 120:
                    obj.total = obj.total + (pol_sh / 1000) * 2400;
                case 130:
                    obj.total = obj.total + (pol_sh / 1000) * 2600;
                case 140:
                    obj.total = obj.total + (pol_sh / 1000) * 2800;
            }
        });
    }

    if (obj.stoiki != (undefined || "")) {
        obj.total = obj.total + 350 * obj.stoiki;
    }

    if (obj.dno == true) {
        obj.total = obj.total + obj.width * 2;
    }

    if (obj.pereg != (undefined || "")) {
        obj.total = obj.total + 1.5 * obj.pereg;
    }

    if (obj.sh_k != (undefined || "") && obj.sh_d != (undefined || "")) {
        obj.total = obj.total + obj.sh_d * 1.5 * obj.sh_k;
    }

    if (obj.el == true) {
        obj.total = obj.total + 7000;
    }

    if (obj.pult != (undefined || "")) {
        obj.total = obj.total + 1500 * obj.pult;
    }

    if (obj.germ != (undefined || "")) {
        obj.total = obj.total + obj.germ * 2500;
    }
    if (obj.hydr != (undefined || "")) {
        obj.total = obj.total + obj.hydr * 2500;
    }
    if (obj.mod != (undefined || "")) {
        obj.total = obj.total + obj.mod * 3500;
    }
    if (obj.kol != (undefined || "")) {
        obj.total = obj.total + obj.kol * 5000;
    }
    if (obj.dem != (undefined || "")) {
        obj.total = obj.total + obj.dem * 3500;
    }
    if (obj.dem2 != (undefined || "")) {
        obj.total = obj.total + obj.dem2 * 2000;
    }

    console.log("obj.total", obj.total);

    if (!isNaN(obj.total)) {
        document.querySelector("textarea[name='summ']").value = obj.total;
    } else {
    }
}

document.form1.addEventListener("input", count);

const w = window.EnvyCrmWidget;

let searchParams = new URLSearchParams(window.location.search);
let client_id = searchParams.get("client_id");
let deal_id = searchParams.get("deal_id");
console.log(window.location);
console.log(client_id);
console.log(deal_id);

w.getParams()
    .then((params) => {
        console.log("params", params);
    })
    .catch((e) => {
        console.log(e);
    });

w.getDealValue({
    input_id: 200,
    type: "custom",
})
    .then((data) => {
        console.log("data", data);
    })
    .catch((e) => {
        console.log(e);
    });

w.getDealValue({
    input_id: 2001,
    type: "service",
})
    .then((data) => {
        console.log("data", data);
    })
    .catch((e) => {
        console.log(e);
    });

w.getClientValue({
    input_id: 2244,
    type: "custom",
})
    .then((data) => {
        console.log("data", data);
    })
    .catch((e) => {
        console.log(e);
    });

w.getClientValue({
    input_id: 1001,
    type: "service",
})
    .then((data) => {
        console.log("data", data);
    })
    .catch((e) => {
        console.log(e);
    });

w.getDeal()
    .then((deal) => {
        console.log("deal", deal);
    })
    .catch((e) => {
        console.log(e);
    });
