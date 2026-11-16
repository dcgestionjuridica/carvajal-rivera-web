/* Juego «El Expediente» de Carvajal & Rivera.
   Cinco casos de la vida diaria en Colombia. En la página va una franja (<section id="juego">); el juego se abre en una ventana emergente. */
(function () {
  var raiz = document.getElementById("juego");
  if (!raiz) return;
  var QUIETO = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var espera = function (ms) { return new Promise(function (r) { setTimeout(r, QUIETO ? 0 : ms); }); };
  var ev = function (t, n) { return '<span class="jg-ev" data-k="' + (n ? 1 : 0) + '"' + (n ? ' data-n="' + n + '"' : "") + ">" + t + "</span>"; };
  var CANDADO = '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
  var HUELLA = '<svg class="jg-huella" viewBox="0 0 24 24"><path d="M12 11c0 3.5-1 6.5-2.5 9M8 6.5a6 6 0 0 1 10 4.5c0 1.5-.1 3-.4 4.4M5.5 9.5A7 7 0 0 0 5 12c0 2-.4 3.8-1 5.2M15 13c0 2.6-.5 5-1.4 7M9 12a3 3 0 0 1 6 0"/></svg>';
  var tabla = function (filas) { return '<div class="jg-doc"><table>' + filas.map(function (f) { return "<tr>" + f.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table></div>"; };
  var wa = function (t, h) { return '<div class="jg-wa jg-doc">' + t + "<small>" + h + "</small></div>"; };
  var doc = function (t, sello) { return '<div class="jg-doc"><p>' + t + "</p>" + (sello ? '<span class="jg-sello">' + sello + "</span>" : "") + "</div>"; };

  /* ---------- los cinco casos ---------- */
  var CASOS = [
    { n: "01", t: "El sueldo de Rosa", lugar: "SANTA MARTA", area: "EMBARGOS", dif: "★★☆",
      hist: ["Rosa trabaja como auxiliar contable y gana <b>$2.300.000</b> al mes. Hace un año dejó de pagar una tarjeta de crédito porque su mamá se enfermó.",
             "Este mes, al revisar su desprendible, casi se desmaya: el banco le está embargando <b>la mitad del sueldo</b>. Con lo que le queda no le alcanza ni para el arriendo."],
      preg: "¿Cuánto le pueden embargar realmente a Rosa cada mes?",
      ops: ["La mitad, $1.150.000. Si la deuda es con un banco, la ley lo permite.",
            "Solo la quinta parte de lo que gana por encima del salario mínimo: unos $109.819.",
            "Nada. El salario nunca se puede embargar."], ok: 1,
      pistas: [
        ["Desprendible de pago", "Lo que la empresa le pagó a Rosa este mes.", tabla([["Salario básico", ev("$ 2.300.000", "Gana $2.300.000")], ["Salud y pensión", "− $ 184.000"], ['<span class="rojo">Embargo Banco XYZ</span>', '<span class="rojo">− $ 1.150.000</span>'], ["<b>Neto a pagar</b>", "<b>$ 966.000</b>"]])],
        ["Oficio del juzgado", "La orden que recibió la empresa.", doc("«…sírvase descontar del salario de la demandada " + ev("en los límites que establece la ley", "Límites de la ley") + " y consignar a órdenes de este despacho…»", "JUZGADO CIVIL MUNICIPAL · " + ev("SANTA MARTA"))],
        ["Tipo de deuda", "Con quién tiene la deuda Rosa.", doc("Proceso ejecutivo de " + ev("Banco XYZ S.A.") + " por una " + ev("tarjeta de crédito", "Deuda de tarjeta") + ". No es cuota de alimentos ni deuda con cooperativa.")],
        ["Mensaje de Rosa", "Lo que Rosa le escribió al despacho.", wa("Doctor, ¿eso es legal? Me quitaron la mitad y yo gano un poquito más del mínimo. 😥", ev("8:14 a. m."))]
      ],
      bien: "¡Bien resuelto! Rosa tenía razón en preocuparse.",
      expl: "Cuando la deuda es con un banco, solo se puede embargar <b>la quinta parte de lo que se gana por encima del salario mínimo</b>.",
      calc: [["Salario de Rosa", 2300000], ["− Salario mínimo 2026", 1750905], ["= Excedente", 549095], ["÷ 5 = Lo máximo", 109819]],
      extra: "El descuento de la mitad está mal hecho: Rosa puede pedir que lo corrijan y le devuelvan lo que le quitaron de más.",
      ley: "Artículos 154 y 155 del Código Sustantivo del Trabajo. La mitad del sueldo solo se puede embargar por cuotas de alimentos o deudas con cooperativas (art. 156).",
      wa: "Hola, jugué El Expediente en su página. Me están embargando el sueldo y quiero saber si está bien hecho." },

    { n: "02", t: "El comparendo de 2021", lugar: "SANTA MARTA", area: "TRÁNSITO", dif: "★★☆",
      hist: ["Carlos fue a renovar su licencia de conducción y no lo dejaron: en el sistema le aparece un comparendo por exceso de velocidad del <b>15 de marzo de 2021</b> que, con intereses, ya pasa de <b>$1.900.000</b>.",
             "Él dice que nunca le llegó nada y que se enteró apenas hoy. En el tránsito le dicen que pague o no hay licencia."],
      preg: "¿Qué puede hacer Carlos?",
      ops: ["Pagar ya: las multas de tránsito nunca se vencen y los intereses siguen corriendo.",
            "Pedir que declaren la prescripción: pasaron más de tres años y nunca le notificaron el cobro.",
            "Pagar solo la mitad, que es el descuento que dan siempre por pronto pago."], ok: 1,
      pistas: [
        ["Consulta en el SIMIT", "Lo que dice el sistema de multas.", tabla([["Fecha", ev("15/03/2021", "Comparendo de 2021")], ["Infracción", "Exceso de velocidad"], ["Estado", "Pendiente de pago"], ["Con intereses", "$ 1.912.400"]])],
        ["Expediente de cobro", "Lo que hizo el tránsito para cobrarle.", doc("Resolución de sanción expedida en 2021. " + ev("No registra mandamiento de pago notificado", "Sin mandamiento de pago") + " al infractor.", "SECRETARÍA DE TRÁNSITO · " + ev("SANTA MARTA"))],
        ["La cámara", "Dónde y cómo se tomó la foto.", doc("Fotomulta tomada en la " + ev("Troncal del Caribe") + ", a " + ev("78 km/h") + " en una zona de 60 km/h.")],
        ["Mensaje de Carlos", "Lo que Carlos le escribió al despacho.", wa("Doctor, yo me cambié de casa en 2020 y " + ev("nunca me llegó ninguna carta", "Nunca le notificaron") + ". ¿Me toca pagar eso?", "6:40 p. m.")]
      ],
      bien: "¡Bien resuelto! La multa de Carlos ya prescribió.",
      expl: "El tránsito tiene <b>tres años</b> desde el día de la infracción para cobrar la multa. Ese plazo solo se interrumpe si le notifica al conductor el mandamiento de pago. Si no lo hizo, la multa prescribe y la autoridad debe declararlo.",
      calc: [["Fecha del comparendo", "15/03/2021"], ["+ Plazo para cobrar", "3 años"], ["= Venció el", "15/03/2024"], ["Mandamiento notificado", "Ninguno"], ["Resultado", "Prescrita"]],
      extra: "Carlos puede radicar un derecho de petición pidiendo que declaren la prescripción y lo saquen del SIMIT. Con eso puede renovar su licencia.",
      ley: "Artículo 159 de la Ley 769 de 2002 (Código Nacional de Tránsito), modificado por el artículo 26 de la Ley 1383 de 2010.",
      wa: "Hola, jugué El Expediente en su página. Tengo un comparendo viejo y quiero saber si ya prescribió." },

    { n: "03", t: "Despedido en incapacidad", lugar: "SANTA MARTA", area: "LABORAL", dif: "★★★",
      hist: ["Jorge es operario de bodega y gana <b>$1.900.000</b>. Se lesionó la espalda cargando cajas y, después de una cirugía, el médico le dio <b>30 días de incapacidad</b>.",
             "A los diez días le llegó una carta: la empresa terminó su contrato «sin justa causa» y le consignó una indemnización. Jorge está en la casa, sin trabajo y sin poder moverse bien."],
      preg: "¿Ese despido es válido?",
      ops: ["Sí. Si le pagan la indemnización, la empresa puede despedirlo cuando quiera.",
            "No. Estando incapacitado, la empresa necesitaba permiso del inspector del trabajo; Jorge puede pedir que lo reintegren.",
            "Sí, pero Jorge puede reclamar cuando termine la incapacidad."], ok: 1,
      pistas: [
        ["Carta de despido", "Lo que le escribió la empresa.", doc("«…damos por terminado su contrato de trabajo " + ev("sin justa causa") + " y le reconocemos la indemnización de ley…»", "RECURSOS HUMANOS · " + ev("BODEGAS DEL NORTE S.A.S."))],
        ["Incapacidad médica", "El certificado de su EPS.", tabla([["Diagnóstico", "Hernia discal lumbar"], ["Incapacidad", ev("30 días", "Incapacitado al despedirlo")], ["Desde", "02/10/2026"], ["Carta de despido", "12/10/2026"]])],
        ["Consulta al Ministerio", "Si la empresa pidió permiso.", doc("Revisados los registros, " + ev("no existe solicitud de autorización", "Sin permiso del Ministerio") + " para despedir a este trabajador.", "INSPECCIÓN DEL TRABAJO · " + ev("SANTA MARTA"))],
        ["Mensaje de Jorge", "Lo que Jorge le escribió al despacho.", wa("Doctora, la empresa " + ev("sabía de mi cirugía", "La empresa sabía") + ", yo mismo llevé la incapacidad. ¿Puedo hacer algo?", ev("9:02 p. m."))]
      ],
      bien: "¡Bien resuelto! Ese despido no tiene efecto.",
      expl: "Quien está incapacitado por su salud tiene <b>estabilidad laboral reforzada</b>: no lo pueden despedir por esa razón sin permiso del inspector del trabajo. Si lo hacen, el despido no produce efectos y la empresa debe reintegrarlo, pagarle los salarios que dejó de recibir y una indemnización de 180 días de salario.",
      calc: [["Salario mensual", 1900000], ["× 180 días", "6 meses"], ["= Indemnización", 11400000]],
      extra: "Además de esa suma, Jorge puede pedir por tutela que lo vuelvan a vincular y le paguen los salarios desde el despido.",
      ley: "Artículo 26 de la Ley 361 de 1997 y sentencia SU-087 de 2022 de la Corte Constitucional.",
      wa: "Hola, jugué El Expediente en su página. Me despidieron estando incapacitado y quiero saber qué puedo hacer." },

    { n: "04", t: "El arriendo sin contrato", lugar: "SANTA MARTA", area: "ARRENDAMIENTO", dif: "★☆☆",
      hist: ["Marta vive en un apartamento arrendado desde hace tres años. Nunca firmaron nada: el dueño le dijo que «la palabra vale» y ella le paga <b>$1.200.000</b> cada mes.",
             "Anoche el dueño le escribió que necesita el apartamento y que tiene <b>8 días</b> para irse. Si no, le cambia la chapa."],
      preg: "¿La pueden sacar en 8 días?",
      ops: ["Sí. Sin contrato escrito, Marta no tiene ningún derecho.",
            "No. El contrato de palabra vale: el dueño debe avisarle con tiempo y, si ella no se va, acudir a un juez. No puede cambiar la chapa.",
            "No, y además Marta puede dejar de pagar porque no hay contrato."], ok: 1,
      pistas: [
        ["Mensaje del dueño", "Lo que le escribió anoche.", wa("Doña Marta, necesito el apto. Tiene 8 días para desocupar o " + ev("le cambio la chapa", "Amenaza con la chapa") + ".", ev("10:47 p. m."))],
        ["Pagos de Marta", "Los últimos meses de arriendo.", tabla([["Agosto 2026", "$ 1.200.000 ✓"], ["Septiembre 2026", "$ 1.200.000 ✓"], ["Octubre 2026", "$ 1.200.000 ✓"], ["Medio de pago", ev("Nequi, todo al día", "Pagos al día")]])],
        ["El apartamento", "Cómo es y quién vive ahí.", doc("Apartamento de " + ev("dos habitaciones") + " en el barrio " + ev("Bavaria") + ". Marta vive allí con sus dos hijos.")],
        ["Lo que dice la ley", "Un artículo que le mandó una amiga.", doc("«El contrato de arrendamiento de vivienda urbana puede ser " + ev("verbal o escrito", "El contrato verbal vale") + "…»", "LEY 820 DE 2003 · ART. 3")]
      ],
      bien: "¡Bien resuelto! Marta no tiene que irse en 8 días.",
      expl: "El arriendo de palabra es un contrato tan válido como uno firmado. El dueño puede pedir el apartamento, pero tiene que seguir las reglas: avisarle con anticipación y, si Marta no lo entrega, iniciar un proceso de restitución ante un juez. Cambiar la chapa o cortar los servicios para sacarla no está permitido.",
      calc: [["Contrato", "De palabra, válido"], ["Pagos", "Al día"], ["Plazo que dio el dueño", "8 días"], ["¿Puede cambiar la chapa?", "No"]],
      extra: "Lo mejor es que Marta guarde los comprobantes de Nequi y los mensajes: con eso prueba el contrato y la amenaza.",
      ley: "Ley 820 de 2003, artículos 3 y 22, y artículo 384 del Código General del Proceso (restitución del inmueble).",
      wa: "Hola, jugué El Expediente en su página. Tengo un problema con el arriendo y quiero saber mis derechos." },

    { n: "05", t: "Deudas que no dejan dormir", lugar: "SANTA MARTA", area: "INSOLVENCIA", dif: "★★★",
      hist: ["Luis es profesor y gana <b>$3.400.000</b>. Entre préstamos y tarjetas debe <b>$60.000.000</b>, y las cuotas ya suman más de lo que gana.",
             "No contesta el teléfono por miedo a los cobradores y le dijeron que pronto lo van a demandar. Un amigo le habló de la «ley de insolvencia», pero Luis cree que eso es solo para empresas."],
      preg: "¿Puede Luis acogerse a la insolvencia?",
      ops: ["No. La insolvencia es solo para empresas y comerciantes.",
            "Sí. Es persona natural no comerciante y cumple los requisitos: puede negociar con todos sus acreedores a la vez.",
            "Solo cuando ya lo hayan demandado y embargado."], ok: 1,
      pistas: [
        ["Relación de deudas", "Lo que debe y cómo va cada deuda.", tabla([["Tarjeta Banco A", "$ 14.000.000", ev("mora 120 días", "Deudas con +90 días")], ["Crédito Banco B", "$ 9.000.000", "mora 95 días"], ["Crédito del carro", "$ 37.000.000", ev("al día")]])],
        ["Certificado laboral", "En qué trabaja Luis.", doc("Luis trabaja como " + ev("docente asalariado", "No es comerciante") + " desde 2015. No tiene empresa ni registro mercantil.", "COLEGIO " + ev("SAN JOSÉ") + " · SANTA MARTA")],
        ["Quiénes le cobran", "Los acreedores de Luis.", doc("Le cobran " + ev("dos bancos distintos", "Dos acreedores") + " y la financiera del carro. Ninguno lo ha demandado todavía.")],
        ["Mensaje de Luis", "Lo que Luis le escribió al despacho.", wa("Doctor, no duermo pensando en esto. ¿Hay alguna salida " + ev("sin perder el carro") + "?", "11:58 p. m.")]
      ],
      bien: "¡Bien resuelto! Luis sí puede acogerse a la insolvencia.",
      expl: "La insolvencia de persona natural no comerciante existe para gente como Luis. Se puede pedir cuando hay <b>dos o más deudas con más de 90 días de mora</b> con dos o más acreedores, y esas deudas suman al menos el <b>30 %</b> de todo lo que se debe. Mientras se negocia, los cobros y los procesos se suspenden.",
      calc: [["Deuda total", 60000000], ["En mora de más de 90 días", 23000000], ["Porcentaje en mora", "38 %"], ["Mínimo exigido: 30 %", "Cumple"]],
      extra: "Con un acuerdo, Luis paga lo que realmente puede, en cuotas que le permitan vivir tranquilo.",
      ley: "Código General del Proceso, artículos 531 y siguientes, con los cambios de la Ley 2445 de 2025.",
      wa: "Hola, jugué El Expediente en su página. Tengo muchas deudas y quiero saber si aplico a insolvencia." }
  ];

  /* ---------- rangos: suben con cada caso resuelto seguido ---------- */
  var GRADOS = ["Pasante", "Practicante", "Abogado junior", "Abogado", "Abogado investigador", "Abogado investigador con maestría"];
  var CLAVE = "cr_juego_v2", marca = 0;
  try { marca = +(localStorage.getItem(CLAVE) || 0) || 0; } catch (_) {}
  function guardarMarca(n) { if (n > marca) { marca = n; try { localStorage.setItem(CLAVE, String(n)); } catch (_) {} } pintarMarca(); }
  function pintarMarca() { var m = raiz.querySelector(".jg-marca"); if (m) { m.hidden = !marca; m.textContent = "Su mejor marca en este equipo: " + marca + " puntos"; } }

  var TOTAL = 120, LARGO = 169.6, S = {}, G = {}, tic = null, actual = 0, ventana = null, app = null, ultimoFoco = null;
  var $ = function (s) { return ventana.querySelector(s); }, $$ = function (s) { return Array.prototype.slice.call(ventana.querySelectorAll(s)); };
  function rangoDe(n) { return n >= 100 ? "Detective" : n >= 70 ? "Abogado" : n > 0 ? "Pasante" : "—"; }
  function estado(t) { var e = $(".jg-estado"); if (e) e.textContent = t; }
  function enlaceWa(t) { return typeof window.CR_WALINK === "function" ? window.CR_WALINK(t) : "https://wa.me/573146131086?text=" + encodeURIComponent(t); }
  function subir() { var c = $(".jg-cuerpo"); if (c) c.scrollTo({ top: 0, behavior: QUIETO ? "auto" : "smooth" }); }

  /* ---------- ventana emergente ---------- */
  function abrirVentana() {
    if (ventana) return;
    ultimoFoco = document.activeElement;
    ventana = document.createElement("div");
    ventana.className = "jg-m"; ventana.setAttribute("role", "dialog"); ventana.setAttribute("aria-modal", "true"); ventana.setAttribute("aria-label", "Juego El Expediente");
    ventana.innerHTML = '<div class="jg-caja"><canvas class="jg-red" aria-hidden="true"></canvas>' +
      '<div class="jg-cabm"><span class="jg-logo"><i></i>EL EXPEDIENTE</span><div class="jg-progreso" aria-label="Avance"></div>' +
      '<div class="jg-total">Puntos<b>0</b></div>' +
      '<button class="jg-cerrar" type="button" aria-label="Cerrar el juego"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      '<div class="jg-cuerpo"></div></div>';
    document.body.appendChild(ventana);
    document.documentElement.classList.add("jg-bloq");
    ventana.querySelector(".jg-cerrar").onclick = cerrarVentana;
    document.addEventListener("keydown", tecla);
    red(ventana.querySelector(".jg-red"), ventana.querySelector(".jg-caja"));
    nuevaPartida();
    setTimeout(function () { var b = $("[data-abrir]"); if (b) b.focus(); }, 60);
  }
  function cerrarVentana() {
    if (!ventana) return;
    clearInterval(tic); S = {}; var v = ventana; ventana = null;
    document.removeEventListener("keydown", tecla);
    v.classList.add("cierra");
    setTimeout(function () { v.remove(); document.documentElement.classList.remove("jg-bloq"); }, QUIETO ? 0 : 240);
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  }
  function tecla(e) {
    if (e.key === "Escape") { cerrarVentana(); return; }
    if (e.key === "Tab" && ventana) { // el foco se queda dentro de la ventana
      var f = $$("button:not([disabled]),a[href]").filter(function (x) { return x.offsetParent; });
      if (!f.length) return; var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  }

  function pintarProgreso() {
    $(".jg-progreso").innerHTML = CASOS.map(function (c, i) {
      var cls = i < G.resueltos ? "ya" : i === actual && !G.cayo ? "ahora" : i === actual && G.cayo ? "cayo" : "";
      var ico = i < G.resueltos ? "✓" : i > actual ? '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>' : "";
      return '<div class="jg-paso ' + cls + '" title="' + c.t + '">' + ico + c.n + "<span>· " + c.t + "</span></div>";
    }).join("");
    $(".jg-total b").textContent = G.total;
  }

  function nuevaPartida() { G = { total: 0, resueltos: 0, cayo: false }; cargar(0, false); }

  /* ---------- un caso ---------- */
  function cargar(i, directo) {
    clearInterval(tic); actual = i; var c = CASOS[i];
    S = { pts: 100, usadas: 0, evid: 0, fin: false, activo: false, seg: TOTAL };
    S.claves = c.pistas.map(function (p) { return p[2]; }).join("").split('data-k="1"').length - 1;
    var cuerpo = $(".jg-cuerpo");
    cuerpo.innerHTML = '<div class="jg-app">' +
      '<div class="jg-consola"><div class="jg-col"><div class="jg-panel">' +
        '<div class="jg-sup"><span class="jg-luces"><i></i><i></i><i></i></span><span class="jg-estado" aria-live="polite">Caso ' + (i + 1) + " de " + CASOS.length + '</span><span>CR · Análisis</span></div>' +
        '<div class="jg-inicio"' + (directo ? " hidden" : "") + '><span class="jg-num">EXPEDIENTE N.º ' + c.n + "-2026 · CLASIFICADO</span><h3>" + c.t + "</h3>" +
          '<div class="jg-chips"><span class="jg-chip">' + c.lugar + '</span><span class="jg-chip">' + c.area + '</span><span class="jg-chip">DIFICULTAD ' + c.dif + "</span></div>" +
          '<div class="jg-reglas"><div class="jg-regla"><b>5 casos</b><span>seguidos. Si falla uno, vuelve a empezar desde el primero.</span></div><div class="jg-regla"><b>120 s</b><span>por caso. Entre más rápido, más bonificación.</span></div><div class="jg-regla"><b>−15 / +5</b><span>cada pista cuesta 15 puntos; cada evidencia clave suma 5.</span></div></div>' +
          '<button class="jg-grande" type="button" data-abrir><svg viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>Abrir el primer expediente</button></div>' +
        '<div class="jg-term" hidden></div>' +
        '<div class="jg-exp" hidden><div class="jg-cab"><div><h3>' + c.t + '</h3><div class="jg-meta"><span>EXP. ' + c.n + "-2026</span><span>" + c.lugar + "</span><span>" + c.area + "</span><span>DIF. " + c.dif + "</span></div></div>" +
          '<div class="jg-reloj" aria-label="Tiempo restante"><svg viewBox="0 0 64 64"><circle class="f" cx="32" cy="32" r="27"/><circle class="a" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="0"/></svg><span>' + TOTAL + "</span></div></div>" +
          '<div class="jg-hist"></div><div class="jg-preg" hidden>' + c.preg + "</div>" +
          '<div class="jg-marc"><div><small>Este caso</small><span class="jg-pts">100</span></div><div><small class="jg-uso">0 de 4 pistas · 0 evidencias</small><div class="jg-barra" aria-hidden="true"><i style="width:100%"></i></div></div><div style="text-align:right"><small>Nivel</small><span class="jg-rv">Detective</span></div></div></div>' +
      "</div>" +
      '<div class="jg-ops" hidden>' + c.ops.map(function (o, k) { return '<button class="jg-op" type="button" data-o="' + k + '"><i>' + "ABC"[k] + "</i><span>" + o + "</span></button>"; }).join("") + "</div></div>" +
      '<div class="jg-col"><p class="jg-ayuda">› ' + (directo ? "Descifrando el expediente…" : "Abra el expediente para activar las pistas.") + "</p>" +
        '<div class="jg-pistas">' + c.pistas.map(function (p, k) { return '<button class="jg-pista" type="button" data-p="' + k + '" disabled><span class="jg-tipo">Pista ' + (k + 1) + " <span>−15</span></span><h4>" + p[0] + '</h4><span class="jg-tapa">' + p[1] + "</span>" + HUELLA + "</button>"; }).join("") + "</div>" +
        '<div class="jg-panel jg-tab"><div class="jg-tt">Tablero de evidencias <span class="jg-evc">0 / ' + S.claves + '</span></div><div class="jg-huecos">' + Array(S.claves + 1).join('<span class="jg-hueco">vacío</span>') + "</div></div>" +
        '<div class="jg-ver" hidden></div></div></div></div>';
    pintarProgreso();
    $$(".jg-pista").forEach(function (b) { b.onclick = function () { escanear(b); }; });
    $$(".jg-op").forEach(function (b) { b.onclick = function () { if (!S.fin && S.activo) veredicto(b); }; });
    if (directo) abrir(); else $("[data-abrir]").onclick = abrir;
  }

  function pintar(delta) {
    var p = $(".jg-pts"); p.textContent = S.pts; p.classList.remove("golpe"); void p.offsetWidth; p.classList.add("golpe");
    $(".jg-barra i").style.width = Math.min(100, S.pts) + "%";
    $(".jg-uso").textContent = S.usadas + " de 4 pistas · " + S.evid + " evidencia" + (S.evid === 1 ? "" : "s");
    $(".jg-rv").textContent = rangoDe(S.pts);
    if (delta) { var f = document.createElement("span"); f.className = "jg-flota"; f.textContent = (delta > 0 ? "+" : "") + delta; f.style.color = delta > 0 ? "var(--jg-olive2)" : "var(--jg-bad)"; $(".jg-marc").appendChild(f); setTimeout(function () { f.remove(); }, 1000); }
  }

  function descifrar(el, ms) {
    if (QUIETO || !el) return;
    var nodos = [], w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) if (w.currentNode.nodeValue.trim()) nodos.push([w.currentNode, w.currentNode.nodeValue]);
    var CH = "▓▒░#$%&@01X/<>", t0 = performance.now();
    (function paso(t) {
      var k = Math.min(1, (t - t0) / ms);
      nodos.forEach(function (n) { var o = n[1], c = Math.floor(o.length * k); n[0].nodeValue = o.slice(0, c) + o.slice(c).replace(/\S/g, function () { return CH[Math.random() * CH.length | 0]; }); });
      if (k < 1) requestAnimationFrame(paso); else nodos.forEach(function (n) { n[0].nodeValue = n[1]; });
    })(t0);
  }

  async function escribir(el, html, yo) {
    if (QUIETO) { el.innerHTML = html; return; }
    var tmp = document.createElement("div"); tmp.innerHTML = html; var txt = tmp.textContent;
    for (var i = 1; i <= txt.length; i += 2) { if (yo !== S) return; el.textContent = txt.slice(0, i); el.insertAdjacentHTML("beforeend", '<span class="jg-cursor"></span>'); await new Promise(function (r) { setTimeout(r, 9); }); }
    el.innerHTML = html;
  }

  async function abrir() {
    var c = CASOS[actual], yo = S;
    $(".jg-inicio").hidden = true; var T = $(".jg-term"); T.hidden = false; estado("Descifrando…");
    var L = actual === 0
      ? ["> conectando con el archivo CR…", "> verificando credenciales… <b>OK</b>", "> desclasificando expediente " + c.n + "-2026…", "> cargando 4 pistas · " + S.claves + " evidencias clave", "> <b>Acceso concedido.</b>"]
      : ["> siguiente expediente: " + c.n + "-2026 · " + c.area, "> desclasificando… <b>OK</b>", "> <b>Caso " + (actual + 1) + " de " + CASOS.length + ".</b>"];
    for (var i = 0; i < L.length; i++) { if (yo !== S) return; var d = document.createElement("div"); d.innerHTML = L[i]; T.appendChild(d); await espera(300); }
    await espera(300); if (yo !== S) return;
    T.hidden = true; $(".jg-exp").hidden = false; estado("Caso " + (actual + 1) + " de " + CASOS.length + " en curso");
    var h = $(".jg-hist");
    for (var j = 0; j < c.hist.length; j++) { if (yo !== S) return; var p = document.createElement("p"); h.appendChild(p); await escribir(p, c.hist[j], yo); }
    if (yo !== S) return;
    $(".jg-preg").hidden = false; $(".jg-ops").hidden = false;
    $$(".jg-pista").forEach(function (b) { b.disabled = false; });
    $(".jg-ayuda").innerHTML = "› Toque una pista para escanearla. Adentro, toque las frases subrayadas que crea que son clave.";
    S.activo = true;
    tic = setInterval(function () {
      if (yo !== S || !ventana) return clearInterval(tic);
      S.seg--; var r = $(".jg-reloj");
      r.querySelector("span").textContent = S.seg; r.querySelector(".a").style.strokeDashoffset = LARGO * (1 - S.seg / TOTAL);
      if (S.seg <= 20) r.classList.add("urge");
      if (S.seg <= 0) { clearInterval(tic); veredicto(null); }
    }, 1000);
  }

  async function escanear(b) {
    if (b.classList.contains("abierta") || b.dataset.esc || S.fin || !S.activo) return;
    var yo = S; b.dataset.esc = 1;
    var s = document.createElement("div"); s.className = "jg-scan"; s.innerHTML = '<span>ESCANEANDO</span><span class="jg-pb"><i></i></span>'; b.appendChild(s);
    await espera(900); if (yo !== S) return;
    s.remove(); b.classList.add("abierta"); var i = +b.dataset.p;
    b.querySelector(".jg-tapa").outerHTML = CASOS[actual].pistas[i][2]; b.querySelector(".jg-tipo span").textContent = "Analizada";
    var hu = b.querySelector(".jg-huella"); if (hu) hu.remove();
    descifrar(b.querySelector(".jg-doc"), 650);
    S.usadas++; S.pts = Math.max(25, S.pts - 15); pintar(-15); estado("Pista " + (i + 1) + " analizada");
    b.querySelectorAll(".jg-ev").forEach(function (e) { e.onclick = function (x) { x.stopPropagation(); marcar(e); }; });
  }

  function marcar(e) {
    if (S.fin || e.classList.contains("marcada") || e.classList.contains("falsa")) return;
    if (e.dataset.k === "1") {
      e.classList.add("marcada");
      var h = ventana.querySelector(".jg-hueco:not(.llena)"); if (h) { h.classList.add("llena"); h.textContent = "✓ " + e.dataset.n; }
      S.evid++; S.pts += 5; pintar(5); $(".jg-evc").textContent = S.evid + " / " + S.claves; estado("Evidencia clave registrada");
    } else { e.classList.add("falsa"); estado("Ese dato no cambia el caso"); }
  }

  function calcHTML(c) {
    return '<div class="jg-calc">' + c.calc.map(function (r, k) { return "<div" + (k === c.calc.length - 1 ? ' class="tot"' : "") + "><span>" + r[0] + "</span><span" + (typeof r[1] === "number" ? ' data-n="' + r[1] + '">$ 0' : ">" + r[1]) + "</span></div>"; }).join("") + "</div>";
  }
  async function animarCalc(caja, yo) {
    var filas = caja.querySelectorAll(".jg-calc div");
    for (var k = 0; k < filas.length; k++) { if (yo !== S) return; filas[k].classList.add("ver"); var sp = filas[k].lastElementChild; if (sp.dataset.n) contar(sp, +sp.dataset.n, 600, "$ "); await espera(380); }
  }

  /* ---------- veredicto: si acierta sigue, si falla vuelve a empezar ---------- */
  async function veredicto(b) {
    var c = CASOS[actual], yo = S;
    S.fin = true; clearInterval(tic);
    var ok = !!b && +b.dataset.o === c.ok, bono = ok ? Math.round(S.seg / 12) : 0, ganados = ok ? S.pts + bono : 0;
    $$(".jg-op").forEach(function (x) { x.disabled = true; if (ok && +x.dataset.o === c.ok) x.classList.add("bien"); else if (x === b) x.classList.add("mal"); else x.classList.add("apagada"); });
    $$(".jg-pista").forEach(function (x) { x.disabled = true; });
    if (!ok) { estado(b ? "Veredicto errado" : "Tiempo agotado"); await espera(900); if (yo === S) fallo(c, !b); return; }
    G.total += ganados; G.resueltos++; guardarMarca(G.total);
    estado("Caso resuelto"); pintarProgreso();
    var ultimo = actual === CASOS.length - 1;
    var v = $(".jg-ver"); v.hidden = false;
    v.innerHTML = '<span class="jg-estampa">RESUELTO</span><h3>' + c.bien + "</h3><p>" + c.expl + "</p>" + calcHTML(c) +
      '<p class="jg-ley">' + c.ley + "</p>" +
      '<div class="jg-rango"><b class="jg-fin">0</b><strong>+' + ganados + " puntos · " + GRADOS[G.resueltos] + '</strong><span>Base ' + (S.pts - S.evid * 5) + " · evidencias +" + S.evid * 5 + " · tiempo +" + bono + "</span></div>" +
      '<div class="jg-cta"><button class="jg-btn oro" type="button" data-sig>' + (ultimo ? "Ver mi resultado final →" : "Siguiente expediente: " + CASOS[actual + 1].t + " →") + "</button></div>";
    v.querySelector("[data-sig]").onclick = function () { if (ultimo) final(); else { cargar(actual + 1, true); subir(); } };
    if (innerWidth < 900) v.scrollIntoView({ behavior: QUIETO ? "auto" : "smooth", block: "start" });
    await espera(400); await animarCalc(v, yo); if (yo !== S) return;
    contar(v.querySelector(".jg-fin"), ganados, 700, "");
    v.querySelector("[data-sig]").focus({ preventScroll: true });
  }

  function fallo(c, tiempo) {
    G.cayo = true; pintarProgreso(); var yo = S;
    var letra = "ABC"[c.ok];
    $(".jg-cuerpo").innerHTML = '<div class="jg-app"><div class="jg-final mal">' +
      '<div class="jg-trofeo"><svg viewBox="0 0 24 24"><path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17h.01"/></svg></div>' +
      '<span class="jg-grado">' + (tiempo ? "Se acabó el tiempo" : "Caso fallido") + " · " + c.n + " " + c.t + "</span>" +
      "<h3>Falló en el caso " + (actual + 1) + " de " + CASOS.length + ".</h3>" +
      "<p>Llegó hasta el nivel <b style=\"color:#fff\">" + GRADOS[G.resueltos] + "</b>. Para llegar al final tiene que volver a empezar desde el primer expediente.</p>" +
      '<div class="jg-cifras"><div><b>' + G.total + "</b><span>Puntos</span></div><div><b>" + G.resueltos + " / " + CASOS.length + "</b><span>Casos resueltos</span></div><div><b>" + (marca || G.total) + "</b><span>Mejor marca</span></div></div>" +
      '<div class="jg-falla"><p><b>La respuesta correcta era la ' + letra + ".</b> " + c.expl + "</p>" + calcHTML(c) + '<p class="jg-ley">' + c.ley + "</p></div>" +
      '<div class="jg-cta"><button class="jg-btn oro" type="button" data-otra>Volver a empezar</button><a class="jg-btn claro" target="_blank" rel="noopener" href="' + enlaceWa(c.wa) + '">¿Le pasó algo parecido? Escríbanos</a></div>' +
      "</div></div>";
    $("[data-otra]").onclick = function () { nuevaPartida(); subir(); };
    subir(); $("[data-otra]").focus({ preventScroll: true });
    animarCalc($(".jg-falla"), yo);
  }

  function final() {
    clearInterval(tic); S = {};
    actual = CASOS.length; pintarProgreso();
    $(".jg-cuerpo").innerHTML = '<div class="jg-app"><div class="jg-final">' +
      '<div class="jg-trofeo"><svg viewBox="0 0 24 24"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4"/></svg></div>' +
      '<span class="jg-grado">5 de 5 casos resueltos</span>' +
      "<h3>¡Felicitaciones! Usted es <em>Abogado investigador con maestría</em>.</h3>" +
      "<p>Resolvió todos los expedientes sin fallar uno solo. Así trabajamos en Carvajal &amp; Rivera: revisamos cada detalle hasta encontrar lo que la ley dice a su favor.</p>" +
      '<div class="jg-cifras"><div><b class="jg-fin">0</b><span>Puntos</span></div><div><b>5 / 5</b><span>Casos</span></div><div><b>' + marca + "</b><span>Mejor marca</span></div></div>" +
      '<div class="jg-cta"><a class="jg-btn oro" target="_blank" rel="noopener" href="' + enlaceWa("Hola, terminé El Expediente en su página con " + G.total + " puntos. Quisiera hacerles una consulta.") + '">Escríbanos por WhatsApp</a><button class="jg-btn claro" type="button" data-otra>Jugar otra vez</button></div>' +
      "</div></div>";
    $("[data-otra]").onclick = function () { nuevaPartida(); subir(); };
    subir();
    contar($(".jg-fin"), G.total, 1200, "");
    confeti(); setTimeout(confeti, 700);
  }

  function contar(el, n, ms, pre) {
    if (!el) return;
    if (QUIETO) { el.textContent = pre + n.toLocaleString("es-CO"); return; }
    var t0 = performance.now();
    (function p(t) { var k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3); el.textContent = pre + Math.round(n * e).toLocaleString("es-CO"); if (k < 1) requestAnimationFrame(p); })(t0);
  }

  function confeti() {
    if (QUIETO) return;
    var c = document.createElement("canvas"); c.className = "jg-confeti"; document.body.appendChild(c);
    var x = c.getContext("2d"); c.width = innerWidth; c.height = innerHeight;
    var col = ["#e6c67f", "#c9a24d", "#a9bc63", "#f6f3ea", "#7fd3e6"];
    var P = Array.from({ length: 160 }, function () { return { x: innerWidth * (.3 + Math.random() * .4), y: innerHeight * .4, vx: (Math.random() - .5) * 16, vy: -Math.random() * 14 - 5, s: 5 + Math.random() * 7, r: Math.random() * 6, vr: (Math.random() - .5) * .3, c: col[Math.random() * col.length | 0] }; });
    var n = 0;
    (function f() {
      x.clearRect(0, 0, c.width, c.height);
      P.forEach(function (p) { p.vy += .35; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.r += p.vr; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.beginPath(); if (x.roundRect) x.roundRect(-p.s / 2, -p.s / 2, p.s, p.s * .7, 1.5); else x.rect(-p.s / 2, -p.s / 2, p.s, p.s * .7); x.fill(); x.restore(); });
      if (++n < 190) requestAnimationFrame(f); else c.remove();
    })();
  }

  /* fondo: red de datos que solo se mueve mientras se ve */
  function red(c, obs) {
    if (!c) return;
    var x = c.getContext("2d"), W, H, N = [], vis = false, corriendo = false;
    function tam() { var r = c.getBoundingClientRect(); W = c.width = r.width; H = c.height = r.height; N = Array.from({ length: Math.min(70, Math.round(W * H / 18000)) }, function () { return { x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3 }; }); }
    function f() {
      if (!c.isConnected) { corriendo = false; return; }
      x.clearRect(0, 0, W, H);
      N.forEach(function (a, i) {
        if (!QUIETO) { a.x += a.vx; a.y += a.vy; if (a.x < 0 || a.x > W) a.vx *= -1; if (a.y < 0 || a.y > H) a.vy *= -1; }
        x.fillStyle = "rgba(230,198,127,.55)"; x.fillRect(a.x - 1.2, a.y - 1.2, 2.4, 2.4);
        for (var j = i + 1; j < N.length; j++) { var b = N[j], d = Math.hypot(a.x - b.x, a.y - b.y); if (d < 130) { x.strokeStyle = "rgba(201,162,77," + ((1 - d / 130) * .22) + ")"; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke(); } }
      });
      if (vis && !QUIETO) requestAnimationFrame(f); else corriendo = false;
    }
    tam(); addEventListener("resize", tam);
    if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { vis = e[0].isIntersecting; if (vis && !corriendo) { corriendo = true; f(); } }).observe(obs);
    else { vis = true; f(); }
  }

  /* ---------- arranque en la página ---------- */
  red(raiz.querySelector(".jg-red"), raiz);
  pintarMarca();
  raiz.querySelectorAll("[data-jugar]").forEach(function (b) { b.addEventListener("click", abrirVentana); });
  window.CR_JUEGO = abrirVentana;
})();
