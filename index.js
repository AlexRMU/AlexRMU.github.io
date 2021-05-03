let round = function (num, precision) {
    num = parseFloat(num);
    if (!precision) return num;
    return Math.round(num / precision) * precision;
};

document.form1.addEventListener("input", (event) => {
    let obj = {
        total: 0,
        width: round(parseFloat(document.form1.width), 50),
        height: round(parseFloat(document.form1.height), 50),
        glub: parseFloat(document.form1.glub),
        krisha: document.form1.krisha.checked,
        l_stenka: document.form1.l_stenka.checked,
        p_stenka: document.form1.p_stenka.checked,
        rol: document.form1.rol.checked,
        dop_rol: parseFloat(document.form1.dop_rol),
        z_width: parseFloat(document.form1.z_width),
        z_height: parseFloat(document.form1.z_height),
        pol: document.form1.pol,
        stoiki: parseFloat(document.form1.stoiki),
        dno: document.form1.dno.checked,
        pereg: parseFloat(document.form1.pereg),
        sh_k: parseFloat(document.form1.sh_k),
        sh_d: parseFloat(document.form1.sh_d),
        pult: parseFloat(document.form1.pult),
        el: document.form1.el.checked,
        germ: parseFloat(document.form1.germ),
        hydr: parseFloat(document.form1.hydr),
        mod: parseFloat(document.form1.mod),
        kol: parseFloat(document.form1.kol),
        dem: parseFloat(document.form1.dem),
        dem2: parseFloat(document.form1.dem2),
        summ: parseFloat(document.form1.summ),
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
        document.querySelector("textarea[name='summ']") = obj.total;
    } else {
    }
});

window.addEventListener(
    "message",
    (event) => {
        console.log(event);
    },
    false
);

const w = window.EnvyCrmWidget;

w.getParams()
    .then((params) => {
        console.log(params);
    })
    .catch((e) => {
        console.log(e);
    });

w.getDealValue({
    input_id: 200,
    type: "custom",
})
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log(e);
    });

w.getDealValue({
    input_id: 2001,
    type: "service",
})
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log(e);
    });

w.getClientValue({
    input_id: 2244,
    type: "custom",
})
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log(e);
    });

w.getClientValue({
    input_id: 1001,
    type: "service",
})
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log(e);
    });

    w.getDeal()
    .then((deal) => {
        console.log(deal);
    })
    .catch((e) => {
        console.log(e);
    });

