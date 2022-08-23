// Get Elements
const calculadora = document.querySelector(".calculadora");

const botonesNum = [];
for(let i = 0; i<=9; i++) {
    botonesNum.push(document.querySelector(`.btn-${i}`));
}
const dot = document.querySelector(".btn-dot");

const neg = document.querySelector(".btn-neg");
const exp = document.querySelector(".btn-exp");
const fac = document.querySelector(".btn-fac");

const suma = document.querySelector(".btn-suma");
const resta = document.querySelector(".btn-resta");
const mult = document.querySelector(".btn-mult");
const div = document.querySelector(".btn-div");
const igual = document.querySelector(".btn-igual");

const dlt = document.querySelector(".btn-dlt");
const clr = document.querySelector(".btn-clr");

const entrada = document.querySelector(".entrada");
let valorEntrada = "";

const igualLabel = document.getElementById("igual");
const resulLabel = document.getElementById("resultado");
const operLabel = document.getElementById("operacion");
const aviso = document.getElementById("aviso");

const modal = document.querySelector(".big-num-modal");
const bigNum = document.querySelector(".modal-content");
const clsModal = document.querySelector(".cerrar");

const switchBtn = [document.querySelector(".toggle"), 
document.querySelector(".toggle-f")];
const temas = document.querySelectorAll(".tema-item");
const temasFooter = document.querySelectorAll(".tema-item-f");
const info = [document.querySelector(".info-btn-rounded"), 
document.querySelector(".info-btn")];

// Funciones
const addNum = numBtn => {
    if (valorEntrada.length < entrada.getAttribute("maxlength")) {
        if (valorEntrada == "") {
            valorEntrada += numBtn.getAttribute("value");
            entrada.setAttribute("value", valorEntrada);
        } else {
            valorEntrada += numBtn.getAttribute("value");
            entrada.setAttribute("value", valorEntrada);
        }
    }
}

const validarComa = ()=> {
    let puntos = 0;
    for (let i = 0; i < valorEntrada.length; i++) {
        if (valorEntrada[i] == dot.getAttribute("value")) {puntos++;}
    }
    if (puntos == 0) {
        if (valorEntrada.length == 0) {addNum(botonesNum[0]);}
        addNum(dot);
    }
}

const operacion = signo => {
    igualLabel.innerHTML = "";
    if (valorEntrada.toString().endsWith(".")) {
        valorEntrada = valorEntrada.slice(0, -1);
    }
    if (valorEntrada != "") {
        resulLabel.innerHTML = valorEntrada;
        toggleEllipsisLink();
        limpiarDisplay();
    } else {
        if (resulLabel.innerHTML == "") {resulLabel.innerHTML = "0";}
    }
    operLabel.innerHTML = signo;
    fac.setAttribute("disabled", "");
    igual.removeAttribute("disabled");

}

const compararDecimales = (a, b) => {
    let decA = 0, decB = 0;
    if (a.toString().includes(".")) {decA = a.split(".")[1].length;}
    if (b.toString().includes(".")) {decB = b.split(".")[1].length;}
    console.log(decA + " y " + decB);
    switch (decA, decB) {
        case decA>decB: return a.length;
        case decA<decB: return b.length;
        default: return a.length;
    }
}

const resolver = () => {
    let a = resulLabel.innerHTML;
    let b = valorEntrada;
    const op = operLabel.innerHTML;

    if (a.endsWith(".")) {a = a.slice(0, -1);}
    if (b.endsWith(".")) {b = b.slice(0, -1);}

    console.log(`${a}${op}${b}`);

    let res;
    let decimalMayor = compararDecimales(a, b);
    if (decimalMayor == undefined) {decimalMayor = 0;}
    console.log(decimalMayor);

    switch (op) {
        case suma.getAttribute("value"):
            res = (parseFloat(a*(10**decimalMayor)) + 
            parseFloat(b*(10**decimalMayor))) / (10**decimalMayor);
            showResult(res);
            break;
        case resta.getAttribute("value"):
            res = (a*(10**decimalMayor) - b*(10**decimalMayor)) / 
            (10**decimalMayor);
            showResult(res);
            break;
        case mult.getAttribute("value"):
            res = (a*(10**decimalMayor) * b*(10**decimalMayor)) / 
            (10**decimalMayor)**2;
            showResult(res);
            break;
        case div.getAttribute("value"):
            if (b == 0) {
                avisoError("¡¡Error: divisor 0!!");
            }
            else {
                res = (a*(10**decimalMayor) / b*(10**decimalMayor)) / 
                (10**decimalMayor)**2;
                showResult(res);
            }
            break;
        case exp.getAttribute("value"):
            res = a**b;
            if (res != Infinity) {showResult(res);} 
            else {
                avisoError("!!Error: número demasiado grande¡¡");
            }
            break;
    }
}

const showResult = result=> {
    if (result != "") {igualLabel.innerHTML = "=";}
    resulLabel.innerHTML = result;
    toggleEllipsisLink();
    operLabel.innerHTML = "";
    limpiarDisplay();
    fac.removeAttribute("disabled");
    console.log(`=${result}`);
}

const factorial = numero => {
    if (numero.endsWith(".")) {numero = numero.slice(0, -1);}
    if (numero >= 0 && !numero.toString().includes(".")) {
        let fac = 1;
        for (let i = 1; i <= numero; i++) {
            fac *= i;
        }
        if (fac != Infinity) {showResult(fac);}
            else {
                avisoError("!!Error: número demasiado grande¡¡");
            }
    } else {avisoError("!!Error: número no natural¡¡");}
}

const borrar = ()=> {
    let newValor;
    if (valorEntrada.includes("-") && valorEntrada.length == 2) {
        newValor = valorEntrada.slice(0, -2);
    } else {newValor = valorEntrada.slice(0, -1);}
    valorEntrada = newValor;
    entrada.setAttribute("value", valorEntrada);
    if (valorEntrada == "") {toggleDisabledBtn(false);}
}

const limpiarDisplay = ()=> {
    valorEntrada = "";
    entrada.setAttribute("value", valorEntrada);
    dlt.setAttribute("disabled", "");
    neg.setAttribute("disabled", "");
    igual.setAttribute("disabled", "");
}

const reset = ()=> {
    limpiarDisplay();
    operLabel.innerHTML = "";
    resulLabel.innerHTML = "";
    toggleDisabledBtn(false);
    igual.setAttribute("disabled", "");
    fac.removeAttribute("disabled");
    igualLabel.innerHTML = "";
    aviso.style.opacity = '0';
    console.clear();
}

const toggleEllipsisLink = ()=> {
    if (resulLabel.offsetWidth+17 < resulLabel.scrollWidth) {
        resulLabel.classList.add(`link-${temaActual}`);
    } else if (resulLabel.classList.contains(`link-${temaActual}`)) {
        resulLabel.classList.remove(`link-${temaActual}`);
    }
}

const toggleDisabledBtn = enabledBtn => {
    if (enabledBtn) {
        clr.removeAttribute("disabled");
    } else {
        dlt.setAttribute("disabled", "");
        clr.setAttribute("disabled", "");
        neg.setAttribute("disabled", "");
    }
}

const toggleSigno = ()=> {
    let isNegative = valorEntrada.startsWith("-") ? true : false;
    if (isNegative) {
        valorEntrada = valorEntrada.substring(1);
        entrada.setAttribute("value", valorEntrada);
    } else {
        valorEntrada = `-${valorEntrada}`;
        entrada.setAttribute("value", valorEntrada);
    }
}

const avisoError = mensaje => {
    aviso.innerHTML = mensaje;
    aviso.style.opacity = '1';
    aviso.style.animation = "fade 1s 1s 1 forwards";
    setTimeout(function(){
        aviso.style.removeProperty("animation");
        aviso.style.opacity = '0';
    }, 2000);
}

let temaActual = "r";
const cambiarTema = btn => {
    let temaNuevo = btn.getAttribute("value");
    for (let item of temas) {
        if (item.getAttribute("id") == "tema-activo") {
            item.removeAttribute("id");
        }
    }

    for (let item of temasFooter) {
        if (item.getAttribute("id") == "tema-activo") {
            item.removeAttribute("id");
        }
    }
    btn.setAttribute("id", "tema-activo");

    // Body
    switch (temaNuevo) {
        case "r":
            for (item of document.body.classList) {
                if (item.includes(`bg-`)) {
                    let newItem = item.slice(0, -1) + "r"
                    document.body.classList.replace(item, newItem);
                }
            }
            break;
        case "g":
            for (item of document.body.classList) {
                if (item.includes(`bg-`)) {
                    let newItem = item.slice(0, -1) + "g"
                    document.body.classList.replace(item, newItem);
                }
            } break;
        case "b":
            for (item of document.body.classList) {
                if (item.includes(`bg-`)) {
                    let newItem = item.slice(0, -1) + "b"
                    document.body.classList.replace(item, newItem);
                }
            } break;
        case "c":
            for (item of document.body.classList) {
                if (item.includes(`bg-`)) {
                    let newItem = item.slice(0, -1) + "c"
                    document.body.classList.replace(item, newItem);
                }
            } break;
        case "m":
            for (item of document.body.classList) {
                if (item.includes(`bg-`)) {
                    let newItem = item.slice(0, -1) + "m"
                    document.body.classList.replace(item, newItem);
                }
            } break;
        case "y":
            for (item of document.body.classList) {
                if (item.includes(`bg-`)) {
                    let newItem = item.slice(0, -1) + "y"
                    document.body.classList.replace(item, newItem);
                }
            } break;
        default:
            for (item of document.body.classList) {
                if (item.includes(`bg-`)) {
                    let newItem = item.slice(0, -1) + "r"
                    document.body.classList.replace(item, newItem);
                }
            } break;
    }
    // Extra Ops
    neg.classList.replace(`btn-esp-${temaActual}`, `btn-esp-${temaNuevo}`);
    exp.classList.replace(`btn-esp-${temaActual}`, `btn-esp-${temaNuevo}`);
    fac.classList.replace(`btn-esp-${temaActual}`, `btn-esp-${temaNuevo}`);

    // Ops
    suma.classList.replace(`btn-op-${temaActual}`, `btn-op-${temaNuevo}`);
    resta.classList.replace(`btn-op-${temaActual}`, `btn-op-${temaNuevo}`);
    mult.classList.replace(`btn-op-${temaActual}`, `btn-op-${temaNuevo}`);
    div.classList.replace(`btn-op-${temaActual}`, `btn-op-${temaNuevo}`);

    // // C y Dlt
    clr.classList.replace(`btn-borr-${temaActual}`, `btn-borr-${temaNuevo}`);
    dlt.classList.replace(`btn-borr-${temaActual}`, `btn-borr-${temaNuevo}`);

    // // Igual
    igual.classList.replace(`btn-igual-${temaActual}`, `btn-igual-${temaNuevo}`);

    // // Display
    if (resulLabel.classList.contains(`link-${temaActual}`)) {
        resulLabel.classList.replace(`link-${temaActual}`, `link-${temaNuevo}`);    
    }
    resulLabel.classList.replace(`selectable-${temaActual}`, `selectable-${temaNuevo}`);
    bigNum.classList.replace(`selectable-${temaActual}`, `selectable-${temaNuevo}`);

    temaActual = temaNuevo;
}

const temaFondo = btn => {
    if (btn.checked) {
        for (item of document.body.classList) {
            if (item.includes(`bg-l-`)) {
                info[0].style.color = "#fff";
                info[0].style.borderColor = "#fff";
                document.body.classList.replace(item, `bg-d-${temaActual}`);
            }
        }
    } else {
        for (item of document.body.classList) {
            if (item.includes(`bg-d-`)) {
                info[0].style.color = "#000";
                info[0].style.borderColor = "#000";
                document.body.classList.replace(item, `bg-l-${temaActual}`);
            }
        }
    }
}

// Click Events
calculadora.addEventListener("click", ()=>{
    if (valorEntrada != "") {
        dlt.removeAttribute("disabled");
        neg.removeAttribute("disabled");
        if (valorEntrada.includes("-")) {
            document.body.classList.add("invert");
            neg.classList.add("invert");
        }
        else {
            document.body.classList.remove("invert");
            neg.classList.remove("invert");
    }
    } else {
        document.body.classList.remove("invert");
        neg.classList.remove("invert");
}
    if (valorEntrada != "" || resulLabel.innerHTML != "") {
        toggleDisabledBtn(true);
    }
});
botonesNum[0].addEventListener("click", ()=>{addNum(botonesNum[0])});
botonesNum[1].addEventListener("click", ()=>{addNum(botonesNum[1])});
botonesNum[2].addEventListener("click", ()=>{addNum(botonesNum[2])});
botonesNum[3].addEventListener("click", ()=>{addNum(botonesNum[3])});
botonesNum[4].addEventListener("click", ()=>{addNum(botonesNum[4])});
botonesNum[5].addEventListener("click", ()=>{addNum(botonesNum[5])});
botonesNum[6].addEventListener("click", ()=>{addNum(botonesNum[6])});
botonesNum[7].addEventListener("click", ()=>{addNum(botonesNum[7])});
botonesNum[8].addEventListener("click", ()=>{addNum(botonesNum[8])});
botonesNum[9].addEventListener("click", ()=>{addNum(botonesNum[9])});
dot.addEventListener("click", ()=>{validarComa()});

suma.addEventListener("click", ()=>{operacion(suma.getAttribute("value"))});
resta.addEventListener("click", ()=>{operacion(resta.getAttribute("value"))});
mult.addEventListener("click", ()=>{operacion(mult.getAttribute("value"))});
div.addEventListener("click", ()=>{operacion(div.getAttribute("value"))});
igual.addEventListener("click", ()=>{resolver()});

neg.addEventListener("click", ()=>{toggleSigno()});
exp.addEventListener("click", ()=>{operacion(exp.getAttribute("value"))});
fac.addEventListener("click", ()=>{factorial(valorEntrada)});

dlt.addEventListener("mousedown", ()=>{borrar()});
clr.addEventListener("click", ()=>{reset()});

resulLabel.addEventListener("click", ()=>{
    let numero;
    if (resulLabel.classList.contains(`link-${temaActual}`)) {
        console.log(resulLabel);
        numero = resulLabel.innerHTML.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        console.log(numero);
        if (numero.includes("e")) {
            let eIndex = numero.indexOf("e");
            numero = numero.substring(0, eIndex+1) + `<sup>${numero.substring(eIndex+1)}</sup>`;
        }
        modal.style.display = "flex";
        bigNum.innerHTML = '<span class="no-pe">Número completo: </span>' 
        + numero;
    }
});

const buildInfo = ()=> {
    const i = `<div class="info no-pe"><h3>Información sobre 'Calculadora'</h3><br>
    <ul>
    <li>Uso de la calculadora:<ul>
        <li>En caso de elegir una de las operaciones disponibles sin haber 
        escrito nada, se toma "0" como primera cifra.</li>
        <li>Si se pulsa el botón (.) sin haber nada escrito, se contará como 
        "0.".</li>
        <li>Para escribir números negativos se escribe el número como positivo 
        y luego se cambia de signo con el botón (-/+).</li>
        <li>El panel derecho es el selector de Tema, un componente méramente 
        estético. Con el interruptor se alterna entre los modos claro y 
        oscuro, y con los botones de colores se cambia el tema de la calculadora.</li>
        <li>Los errores y las operaciones restringidas se notificarán debajo 
        de la pantalla.</li>
    </ul></li>

    <li>Limitaciones:<ul>
        <li>El display de la calculadora admite un máximo de 10 
        caracteres, incluyendo la coma decimal (.) y el signo 
        "menos" (-).</li>
        <li>Números demasiado grandes o con demasiados decimales se muestran 
        cortados por un (...). En esos casos, el propio número se hace 
        clicable y se muestra completo en una ventana modal.</li>
        <li>El botón "factorial" (n!) solo opera números naturales 
        (enteros positivos).</li>
    </ul></li>
    </ul></div>
    `;
    modal.style.display = "flex";
    bigNum.innerHTML = i;
}
info[0].addEventListener("click", ()=>{buildInfo()});
info[1].addEventListener("click", ()=>{buildInfo()});

clsModal.addEventListener("click", ()=> {modal.style.display = "none";})

temas[0].addEventListener("click", ()=> {cambiarTema(temas[0])});
temas[1].addEventListener("click", ()=> {cambiarTema(temas[1])});
temas[2].addEventListener("click", ()=> {cambiarTema(temas[2])});
temas[3].addEventListener("click", ()=> {cambiarTema(temas[3])});
temas[4].addEventListener("click", ()=> {cambiarTema(temas[4])});
temas[5].addEventListener("click", ()=> {cambiarTema(temas[5])});
switchBtn[0].addEventListener("click", ()=> {temaFondo(switchBtn[0])});

temasFooter[0].addEventListener("click", ()=> {cambiarTema(temasFooter[0])});
temasFooter[1].addEventListener("click", ()=> {cambiarTema(temasFooter[1])});
temasFooter[2].addEventListener("click", ()=> {cambiarTema(temasFooter[2])});
temasFooter[3].addEventListener("click", ()=> {cambiarTema(temasFooter[3])});
temasFooter[4].addEventListener("click", ()=> {cambiarTema(temasFooter[4])});
temasFooter[5].addEventListener("click", ()=> {cambiarTema(temasFooter[5])});
switchBtn[1].addEventListener("click", ()=> {temaFondo(switchBtn[1])});
