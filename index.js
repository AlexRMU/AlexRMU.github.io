let total;
let round = function (num, precision) {
    num = parseFloat(num);
    if (!precision) return num;
    return Math.round(num / precision) * precision;
};

document.form1.addEventListener("change", (event) => {
    if (
        parseFloat(document.form1.width.value) < 700 ||
        document.form1.width.value == (undefined || "")
    ) {
        document.form1.width.value = 700;
    }
    if (
        parseFloat(document.form1.width.value) > 6000 ||
        document.form1.width.value == (undefined || "")
    ) {
        document.form1.width.value = 6000;
    }
    if (
        parseFloat(document.form1.height.value) < 2000 ||
        document.form1.height.value == (undefined || "")
    ) {
        document.form1.height.value = 2000;
    }
    if (
        parseFloat(document.form1.height.value) > 3100 ||
        document.form1.height.value == (undefined || "")
    ) {
        document.form1.height.value = 3100;
    }
});

document.form1.addEventListener("input", (event) => {
    round(parseFloat(document.form1.width.value), 50);
    round(parseFloat(document.form1.height.value), 50);

    total = 30000;

    if (document.form1.krisha.checked) {
        total = total - 700;
    }
    if (document.form1.l_stenka.checked) {
        total = total - 2000;
    }
    if (document.form1.p_stenka.checked) {
        total = total - 2000;
    }
    if (document.form1.rol.checked) {
        total = total - 7000;
    }

    if (document.form1.dop_rol.value != (undefined || "")) {
        total = total + 7000 * parseFloat(document.form1.dop_rol.value);
    }

    if (
        document.form1.z_width.value != (undefined || "") &&
        document.form1.z_height.value != (undefined || "")
    ) {
        let mkv =
            parseFloat(document.form1.z_width.value) *
            parseFloat(document.form1.z_height.value);
        total = total + (mkv / 1000000) * 2000;
    }

    if (document.form1.pol.value != (undefined || "")) {
        let polki = {};
        polki.dl = document.form1.pol.value.replaceAll(" ", "").split(",");
        polki.sh = parseFloat(document.form1.glub.value) - 50;

        polki.dl.forEach((glubina) => {
            glubina = parseFloat(glubina);
            if (round(glubina, 50) == 350) {
                total = total + (polki.sh / 1000) * 700;
            }
            switch (round(glubina, 100)) {
                case 300:
                    total = total + (polki.sh / 1000) * 550;
                case 400:
                    total = total + (polki.sh / 1000) * 800;
                case 500:
                    total = total + (polki.sh / 1000) * 1000;
                case 600:
                    total = total + (polki.sh / 1000) * 1200;
                case 700:
                    total = total + (polki.sh / 1000) * 1400;
                case 800:
                    total = total + (polki.sh / 1000) * 1500;
                case 900:
                    total = total + (polki.sh / 1000) * 1700;
                case 100:
                    total = total + (polki.sh / 1000) * 1900;
                case 110:
                    total = total + (polki.sh / 1000) * 2200;
                case 120:
                    total = total + (polki.sh / 1000) * 2400;
                case 130:
                    total = total + (polki.sh / 1000) * 2600;
                case 140:
                    total = total + (polki.sh / 1000) * 2800;
            }
        });
    }

    if (document.form1.stoiki.value != (undefined || "")) {
        total = total + 350 * parseFloat(document.form1.stoiki.value);
    }

    if (document.form1.dno.checked) {
        total = total + parseFloat(document.form1.width.value) * 2;
    }

    if (document.form1.pereg.value != (undefined || "")) {
        total = total + 1.5 * parseFloat(document.form1.pereg.value);
    }

    if (
        document.form1.sh_k.value != (undefined || "") &&
        document.form1.sh_d.value != (undefined || "")
    ) {
        total =
            total +
            parseFloat(document.form1.sh_d.value) *
                1.5 *
                parseFloat(document.form1.sh_k.value);
    }

    if (document.form1.el.checked) {
        total = total + 7000;
    }

    if (document.form1.pult.value != (undefined || "")) {
        total = total + 1500 * parseFloat(document.form1.pult.value);
    }

    if (document.form1.germ.value != (undefined || "")) {
        total = total + parseFloat(document.form1.germ.value) * 2500;
    }
    if (document.form1.hydr.value != (undefined || "")) {
        total = total + parseFloat(document.form1.hydr.value) * 2500;
    }
    if (document.form1.mod.value != (undefined || "")) {
        total = total + parseFloat(document.form1.mod.value) * 3500;
    }
    if (document.form1.kol.value != (undefined || "")) {
        total = total + parseFloat(document.form1.kol.value) * 5000;
    }
    if (document.form1.dem.value != (undefined || "")) {
        total = total + parseFloat(document.form1.dem.value) * 3500;
    }
    if (document.form1.dem2.value != (undefined || "")) {
        total = total + parseFloat(document.form1.dem2.value) * 2000;
    }

    console.log("total", total);

    if (!isNaN(total)) {
        document.querySelector("textarea[name='summ']").value = total;
    } else {
    }
});
