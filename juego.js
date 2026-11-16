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
      hist: ["Luis es ingeniero y gana <b>$7.200.000</b>. Entre préstamos y tarjetas debe <b>$140.000.000</b>, y las cuotas ya suman más de lo que gana.",
             "No contesta el teléfono por miedo a los cobradores y le dijeron que pronto lo van a demandar. Un amigo le habló de la «ley de insolvencia», pero Luis cree que eso es solo para empresas."],
      preg: "¿Puede Luis acogerse a la insolvencia?",
      ops: ["No. La insolvencia es solo para empresas y comerciantes.",
            "Sí. Es persona natural no comerciante y cumple los requisitos: puede negociar con todos sus acreedores a la vez.",
            "Solo cuando ya lo hayan demandado y embargado."], ok: 1,
      pistas: [
        ["Relación de deudas", "Lo que debe y cómo va cada deuda.", tabla([["Tarjeta Banco A", "$ 32.000.000", ev("mora 120 días", "Deudas con +90 días")], ["Crédito Banco B", "$ 22.000.000", "mora 95 días"], ["Crédito del carro", "$ 86.000.000", ev("al día")]])],
        ["Certificado laboral", "En qué trabaja Luis.", doc("Luis trabaja como " + ev("ingeniero asalariado", "No es comerciante") + " desde 2015. No tiene empresa ni registro mercantil.", "CONSTRUCTORA " + ev("DEL MAR") + " · SANTA MARTA")],
        ["Quiénes le cobran", "Los acreedores de Luis.", doc("Le cobran " + ev("dos bancos distintos", "Dos acreedores") + " y la financiera del carro. Ninguno lo ha demandado todavía.")],
        ["Mensaje de Luis", "Lo que Luis le escribió al despacho.", wa("Doctor, no duermo pensando en esto. ¿Hay alguna salida " + ev("sin perder el carro") + "?", "11:58 p. m.")]
      ],
      bien: "¡Bien resuelto! Luis sí puede acogerse a la insolvencia.",
      expl: "La insolvencia de persona natural no comerciante existe para gente como Luis. Se puede pedir cuando hay <b>dos o más deudas con más de 90 días de mora</b> con dos o más acreedores, y esas deudas suman al menos el <b>30 %</b> de todo lo que se debe. Mientras se negocia, los cobros y los procesos se suspenden.",
      calc: [["Deuda total", 140000000], ["En mora de más de 90 días", 54000000], ["Porcentaje en mora", "39 %"], ["Mínimo exigido: 30 %", "Cumple"]],
      extra: "Con un acuerdo, Luis paga lo que realmente puede, en cuotas que le permitan vivir tranquilo.",
      ley: "Código General del Proceso, artículos 531 y siguientes, con los cambios de la Ley 2445 de 2025.",
      wa: "Hola, jugué El Expediente en su página. Tengo muchas deudas y quiero saber si aplico a insolvencia." },

    /* ======== nivel intermedio (se suman a los cinco básicos) ======== */
    { n: "06", t: "La cuota que no llega", lugar: "SANTA MARTA", area: "FAMILIA", dif: "★☆☆",
      hist: ["Paola tiene un hijo de 7 años. El papá del niño trabaja en una empresa de vigilancia, gana <b>$3.000.000</b> y se comprometió en la comisaría a dar <b>$600.000</b> de cuota al mes.",
             "Hace cinco meses no da un peso. Le dice a Paola que «lo embarguen si pueden», porque cree que solo le pueden quitar una parte pequeña del sueldo."],
      preg: "¿Hasta cuánto le pueden embargar del sueldo al papá por alimentos?",
      ops: ["Solo la quinta parte de lo que gane por encima del mínimo, como cualquier deuda.",
            "Hasta la mitad del salario, porque es una deuda de alimentos de un hijo.",
            "Nada, porque el salario es inembargable."], ok: 1,
      pistas: [
        ["Acta de la comisaría", "El acuerdo de cuota que firmó el papá.", doc("El señor se obliga a dar una cuota de " + ev("alimentos para su hijo menor", "Deuda de alimentos") + " por $600.000 mensuales.", "COMISARÍA DE FAMILIA · " + ev("SANTA MARTA"))],
        ["Certificado laboral", "Lo que gana el papá.", tabla([["Cargo", "Guarda de seguridad"], ["Salario", ev("$ 3.000.000", "Gana $3.000.000")], ["Contrato", ev("Término indefinido")]])],
        ["Cuotas atrasadas", "Lo que debe hasta hoy.", tabla([["Meses sin pagar", ev("5 meses", "Cinco cuotas debidas")], ["Valor por mes", "$ 600.000"], ["<b>Total</b>", "<b>$ 3.000.000</b>"]])],
        ["Mensaje del papá", "Lo que le escribió a Paola.", wa("Que me embarguen si pueden, eso es poquito lo que le quitan a uno.", ev("7:20 p. m."))]
      ],
      bien: "¡Bien resuelto! Por alimentos se puede embargar mucho más.",
      expl: "Las deudas de alimentos de los hijos tienen una regla especial: se puede embargar <b>hasta el 50 % del salario</b> y de las prestaciones del deudor. Además, dejar de pagar la cuota sin justa causa puede ser delito de inasistencia alimentaria.",
      calc: [["Salario del papá", 3000000], ["× 50 %", "Máximo legal"], ["= Embargo posible", 1500000]],
      extra: "Con el acta de la comisaría, Paola puede iniciar un proceso ejecutivo de alimentos y pedir el embargo desde el comienzo.",
      ley: "Artículo 130 de la Ley 1098 de 2006 (Código de la Infancia y la Adolescencia), artículo 156 del Código Sustantivo del Trabajo y artículo 233 del Código Penal.",
      wa: "Hola, jugué El Expediente en su página. El papá de mi hijo no paga la cuota y quiero saber qué hacer." },

    { n: "07", t: "Cuarenta y seis horas", lugar: "SANTA MARTA", area: "LABORAL", dif: "★★☆",
      hist: ["Andrés trabaja en un almacén de cadena de lunes a sábado. En noviembre de 2026 su horario suma <b>46 horas a la semana</b>, todas de día.",
             "Cuando preguntó por las horas extra, el jefe le dijo que «la jornada legal es de 48 horas» y que no le debe nada."],
      preg: "¿Tiene razón el jefe?",
      ops: ["Sí. La jornada máxima en Colombia sigue siendo de 48 horas semanales.",
            "No. Desde julio de 2026 la jornada máxima es de 42 horas: le deben 4 horas extra cada semana.",
            "No, pero solo le deben lo que trabaje los domingos."], ok: 1,
      pistas: [
        ["Horario del almacén", "Los turnos de Andrés.", tabla([["Lunes a viernes", "8 h diarias"], ["Sábado", "6 h"], ["<b>Total semanal</b>", ev("<b>46 horas</b>", "Trabaja 46 horas")]])],
        ["Fecha", "Cuándo pasa esto.", doc("Los turnos son de " + ev("noviembre de 2026", "Es noviembre de 2026") + ". La empresa no ha pactado ninguna jornada especial.")],
        ["La ley que cambió", "Lo que decidió el Congreso.", doc("«…la jornada se reducirá de manera gradual… hasta llegar a " + ev("cuarenta y dos (42) horas a la semana", "Jornada legal de 42 h") + "…»", "LEY 2101 DE 2021")],
        ["Mensaje de Andrés", "Lo que le escribió al despacho.", wa("Doctor, yo salgo " + ev("a las 6 de la tarde") + " y el sábado a las 2. ¿Me están quitando horas?", "8:30 p. m.")]
      ],
      bien: "¡Bien resuelto! A Andrés le deben horas extra.",
      expl: "La Ley 2101 de 2021 bajó la jornada poco a poco. Desde el <b>15 de julio de 2026</b> la jornada máxima es de <b>42 horas semanales</b>. Lo que pase de ahí es trabajo suplementario y se paga con un recargo del 25 % si es de día.",
      calc: [["Horas trabajadas", "46 h"], ["− Jornada máxima 2026", "42 h"], ["= Extra por semana", "4 h"], ["Recargo diurno", "+25 %"]],
      extra: "Andrés puede reclamar por escrito a la empresa o acudir al inspector del trabajo. Las horas extra se pueden cobrar hasta tres años hacia atrás.",
      ley: "Ley 2101 de 2021 y artículos 161, 168 y 488 del Código Sustantivo del Trabajo.",
      wa: "Hola, jugué El Expediente en su página. Trabajo más horas de las legales y quiero saber cuánto me deben." },

    { n: "08", t: "La respuesta que nunca llegó", lugar: "SANTA MARTA", area: "ADMINISTRATIVO", dif: "★☆☆",
      hist: ["Doña Betty necesita una copia de los planos de su casa que guarda la Alcaldía. Radicó un derecho de petición pidiendo esa copia.",
             "Ya pasaron <b>12 días hábiles</b> y nadie le contesta. En la ventanilla le dicen que «eso se demora meses»."],
      preg: "¿Está la Alcaldía dentro del plazo para responder?",
      ops: ["Sí. Las entidades tienen hasta tres meses para responder.",
            "Sí. El plazo general es de 15 días hábiles y todavía no se ha cumplido.",
            "No. Para pedir copias de documentos el plazo es de 10 días hábiles y ya se venció."], ok: 2,
      pistas: [
        ["Radicado", "El sello de recibido.", doc("Petición recibida el " + ev("28/10/2026") + ". Asunto: " + ev("solicitud de copia de planos", "Pide copia de documentos") + ".", "ALCALDÍA DISTRITAL · VENTANILLA ÚNICA")],
        ["Calendario", "Días contados desde el radicado.", tabla([["Días hábiles pasados", ev("12 días", "Van 12 días hábiles")], ["Respuesta recibida", "Ninguna"]])],
        ["La norma", "Lo que dice la ley de peticiones.", doc("«…las peticiones de documentos y de información deberán resolverse " + ev("dentro de los diez (10) días", "Plazo de 10 días") + " siguientes a su recepción…»", "LEY 1755 DE 2015 · ART. 14")],
        ["Mensaje de Betty", "Lo que le escribió al despacho.", wa("Doctora, yo fui " + ev("tres veces") + " a preguntar. ¿Me toca seguir esperando?", "11:15 a. m.")]
      ],
      bien: "¡Bien resuelto! La Alcaldía ya está fuera del plazo.",
      expl: "El plazo general para responder un derecho de petición es de <b>15 días hábiles</b>, pero cuando se piden <b>documentos o información</b> es de <b>10 días hábiles</b>. Si la entidad no responde a tiempo, vulnera el derecho fundamental de petición.",
      calc: [["Plazo para documentos", "10 días hábiles"], ["Días que van", "12 días hábiles"], ["Resultado", "Plazo vencido"]],
      extra: "Betty puede presentar una acción de tutela para que el juez le ordene a la Alcaldía responder.",
      ley: "Artículo 23 de la Constitución Política y artículo 14 de la Ley 1437 de 2011, sustituido por la Ley 1755 de 2015.",
      wa: "Hola, jugué El Expediente en su página. Una entidad no me responde un derecho de petición." },

    { n: "09", t: "Me arrepentí del celular", lugar: "SANTA MARTA", area: "CONTRACTUAL", dif: "★☆☆",
      hist: ["Valentina compró un celular de <b>$1.800.000</b> en una tienda por internet. Le llegó en perfecto estado, pero a los <b>tres días hábiles</b> se dio cuenta de que no era lo que necesitaba.",
             "Escribió para devolverlo y le contestaron: «No hacemos devoluciones, solo cambios por otro producto»."],
      preg: "¿Puede Valentina devolver el celular y recuperar su dinero?",
      ops: ["Sí. En compras por internet tiene 5 días hábiles para retractarse y le deben devolver todo el dinero.",
            "No. Si el producto no tiene defectos, la tienda decide si lo recibe.",
            "Solo si la tienda acepta, y le pueden descontar el 30 % por cambiar de opinión."], ok: 0,
      pistas: [
        ["Factura", "Cómo y cuándo compró.", tabla([["Producto", "Celular gama media"], ["Valor", "$ 1.800.000"], ["Canal", ev("Tienda virtual", "Compra por internet")], ["Entrega", "03/11/2026"]])],
        ["Días pasados", "Desde que recibió el celular.", doc("Valentina escribió " + ev("3 días hábiles", "Dentro de 5 días hábiles") + " después de recibirlo. El celular está " + ev("sellado y sin uso", "Producto sin usar") + ".")],
        ["Respuesta de la tienda", "Lo que le contestaron.", doc("«Nuestra política es " + ev("no hacer devoluciones") + ", solo cambios por otro producto.»", "SERVICIO AL CLIENTE")],
        ["La norma", "Lo que dice el Estatuto del Consumidor.", doc("«…el término máximo para ejercer el derecho de retracto será de cinco (5) días hábiles…»", "LEY 1480 DE 2011 · ART. 47")]
      ],
      bien: "¡Bien resuelto! Valentina tiene derecho de retracto.",
      expl: "En las ventas a distancia, como las de internet, el comprador puede <b>retractarse dentro de los 5 días hábiles</b> siguientes a la entrega, sin dar explicaciones. Debe devolver el producto en el mismo estado, y la tienda tiene <b>máximo 30 días calendario</b> para devolverle el dinero.",
      calc: [["Plazo de retracto", "5 días hábiles"], ["Días que pasaron", "3 días hábiles"], ["= Le deben devolver", 1800000]],
      extra: "La «política de no devoluciones» no vale frente a la ley. El transporte de la devolución lo paga Valentina, y si no le reembolsan puede quejarse ante la Superintendencia de Industria y Comercio.",
      ley: "Artículo 47 de la Ley 1480 de 2011 (Estatuto del Consumidor).",
      wa: "Hola, jugué El Expediente en su página. Compré algo por internet y no me lo quieren recibir." },

    { n: "10", t: "La pensión de Don Rafael", lugar: "SANTA MARTA", area: "PENSIONES", dif: "★★☆",
      hist: ["Don Rafael era pensionado de Colpensiones y vivió sus últimos <b>siete años</b> con Nelly. Nunca se casaron.",
             "Don Rafael murió el mes pasado. Sus hijos, todos mayores y con trabajo, le dicen a Nelly que la pensión «no es para ella» porque no tenía papeles de matrimonio."],
      preg: "¿Tiene Nelly derecho a la pensión de sobrevivientes?",
      ops: ["No. Solo una esposa con matrimonio registrado puede recibirla.",
            "Solo si tuvieron hijos juntos.",
            "Sí. Como compañera permanente que convivió con él al menos 5 años antes de su muerte, tiene derecho."], ok: 2,
      pistas: [
        ["Resolución de pensión", "La pensión que recibía Don Rafael.", doc("Pensión de vejez reconocida desde 2015. Estaba " + ev("pensionado al morir", "Era pensionado") + ".", "COLPENSIONES")],
        ["Declaraciones", "Lo que dicen los vecinos.", doc("Dos vecinos declaran que Rafael y Nelly " + ev("vivieron juntos siete años", "Convivieron 7 años") + ", bajo el mismo techo y como pareja.")],
        ["Registro civil", "Estado civil de Don Rafael.", doc("Rafael M. figura " + ev("soltero") + ". " + ev("No hay esposa ni otra compañera", "Nadie más reclama") + ".")],
        ["Mensaje de Nelly", "Lo que le escribió al despacho.", wa("Doctor, yo lo cuidé hasta el último día. Los hijos " + ev("ya están reclamando") + " y me dicen que me vaya.", "5:05 p. m.")]
      ],
      bien: "¡Bien resuelto! Nelly sí tiene derecho a la pensión.",
      expl: "La pensión de sobrevivientes también es para la <b>compañera permanente</b>, aunque no haya matrimonio. Debe probar que <b>convivió con el pensionado al menos 5 años</b> continuos antes de su muerte. Los hijos mayores de 25 años, que no estudian ni tienen invalidez, no tienen derecho.",
      calc: [["Convivencia probada", "7 años"], ["Mínimo exigido", "5 años"], ["Matrimonio", "No se exige"], ["Resultado", "Tiene derecho"]],
      extra: "Nelly debe pedirla a Colpensiones con las declaraciones de convivencia. Si se la niegan, puede acudir a un juez laboral.",
      ley: "Artículos 46 y 47 de la Ley 100 de 1993, modificados por los artículos 12 y 13 de la Ley 797 de 2003.",
      wa: "Hola, jugué El Expediente en su página. Quiero saber si tengo derecho a una pensión de sobrevivientes." },

    /* ======== nivel experto (se suman a los diez anteriores) ======== */
    { n: "11", t: "Divorcio sin pelear", lugar: "SANTA MARTA", area: "FAMILIA", dif: "★★☆",
      hist: ["Camilo y Diana llevan 10 años casados y tienen una hija de 8 años. Ya no se entienden, pero se llevan bien y están <b>de acuerdo en todo</b>: custodia, visitas, cuota y bienes.",
             "Un conocido les dijo que con una hija menor de edad «obligatoriamente tienen que ir a un juzgado», y eso puede tardar meses."],
      preg: "¿Pueden divorciarse en una notaría?",
      ops: ["No. Con hijos menores de edad el divorcio solo se hace ante un juez.",
            "Sí. De mutuo acuerdo pueden hacerlo ante notario; como hay una hija menor, el defensor de familia da su concepto.",
            "Sí, pero solo si renuncian a repartir los bienes."], ok: 1,
      pistas: [
        ["Acuerdo firmado", "Lo que pactaron.", doc("Ambos " + ev("están de acuerdo", "Mutuo acuerdo") + " en el divorcio, la custodia compartida, las visitas y una cuota de $900.000.")],
        ["Registro civil de la hija", "Datos de la niña.", tabla([["Nombre", "Sara"], ["Edad", ev("8 años", "Hija menor de edad")], ["Nació en", ev("Barranquilla")]])],
        ["Nota de la notaría", "Lo que les dijeron.", doc("«Recibimos la solicitud por medio de abogado. Como hay una menor, la enviamos al " + ev("defensor de familia", "Concepto del defensor") + " para su concepto.»", "NOTARÍA · SANTA MARTA")],
        ["Mensaje de Diana", "Lo que le escribió al despacho.", wa("Doctora, queremos algo rápido y " + ev("sin escándalos") + ". ¿Se puede?", "9:40 a. m.")]
      ],
      bien: "¡Bien resuelto! Pueden divorciarse en notaría.",
      expl: "El divorcio de <b>mutuo acuerdo</b> se puede tramitar ante <b>notario</b> por medio de abogado. Cuando hay hijos menores de edad, el notario pide el <b>concepto del defensor de familia</b> sobre lo acordado para ellos. Es mucho más rápido que un proceso judicial.",
      calc: [["Acuerdo entre los dos", "Sí"], ["Hija menor de edad", "Sí"], ["Concepto del defensor", "Obligatorio"], ["Trámite", "Notaría"]],
      extra: "En la misma escritura pueden liquidar la sociedad conyugal y dejar escrito todo lo de la niña.",
      ley: "Artículo 34 de la Ley 962 de 2005 y Decreto 4436 de 2005.",
      wa: "Hola, jugué El Expediente en su página. Queremos divorciarnos de mutuo acuerdo." },

    { n: "12", t: "Tres años sin papeles", lugar: "SANTA MARTA", area: "FAMILIA", dif: "★★★",
      hist: ["Mónica vivió <b>tres años</b> con Julián como pareja, sin casarse. En ese tiempo compraron entre los dos un apartamento que quedó a nombre de él.",
             "Julián murió hace cuatro meses. Ahora la familia de él dice que el apartamento es solo de los herederos y que Mónica «no era nada»."],
      preg: "¿Tiene Mónica derechos sobre el apartamento?",
      ops: ["No. Sin matrimonio, lo que está a nombre de él es de sus herederos.",
            "Sí, pero solo si vivieron juntos más de cinco años.",
            "Sí. Con más de dos años de unión marital se presume la sociedad patrimonial: le toca la mitad de lo adquirido juntos."], ok: 2,
      pistas: [
        ["Declaraciones", "Lo que dicen los testigos.", doc("Mónica y Julián " + ev("convivieron tres años", "Unión de 3 años") + " como pareja, sin estar casados con nadie más.")],
        ["Escritura", "Cuándo y cómo se compró.", tabla([["Compra", ev("2024", "Comprado durante la unión")], ["A nombre de", "Julián R."], ["Valor", ev("$ 280.000.000")]])],
        ["Fallecimiento", "Cuánto tiempo ha pasado.", doc("Julián murió " + ev("hace cuatro meses", "Aún dentro del año") + ". La familia ya inició la sucesión en una notaría.")],
        ["Mensaje de Mónica", "Lo que le escribió al despacho.", wa("Doctor, yo pagué la mitad de la cuota inicial con mis " + ev("cesantías") + ". ¿Me quedo sin nada?", "10:12 p. m.")]
      ],
      bien: "¡Bien resuelto! A Mónica le corresponde la mitad.",
      expl: "Cuando una pareja convive en unión marital de hecho por <b>más de dos años</b>, se presume una <b>sociedad patrimonial</b>. Lo comprado durante la unión se reparte por mitades, aunque esté a nombre de uno solo. Hay que pedir la declaración dentro del <b>año siguiente</b> a la muerte o la separación.",
      calc: [["Convivencia", "3 años"], ["Mínimo para la sociedad", "2 años"], ["Valor del apartamento", 280000000], ["= Mitad para Mónica", 140000000]],
      extra: "Mónica debe actuar pronto: puede pedir que se declare la unión y la sociedad patrimonial, y hacerse parte en la sucesión.",
      ley: "Artículos 2 y 8 de la Ley 54 de 1990, modificada por la Ley 979 de 2005.",
      wa: "Hola, jugué El Expediente en su página. Viví en unión libre y quiero saber mis derechos." },

    { n: "13", t: "La prima de Doña Carmen", lugar: "SANTA MARTA", area: "LABORAL", dif: "★☆☆",
      hist: ["Doña Carmen trabaja hace dos años como empleada doméstica interna en una casa. Gana <b>el salario mínimo</b> y le pagan salud y pensión.",
             "En diciembre preguntó por la prima y la patrona le dijo: «La prima es para los que trabajan en empresas, no para el servicio doméstico»."],
      preg: "¿Tiene Doña Carmen derecho a prima de servicios?",
      ops: ["Sí. Los trabajadores domésticos tienen prima: un mes de salario por año, en dos pagos.",
            "No. La prima solo se paga en empresas.",
            "Solo si lleva más de cinco años en la misma casa."], ok: 0,
      pistas: [
        ["Contrato", "Qué hace y cuánto gana.", tabla([["Cargo", ev("Empleada doméstica", "Trabajadora doméstica")], ["Salario", ev("Mínimo legal", "Salario mínimo")], ["Desde", "Noviembre de 2024"]])],
        ["Planilla", "Lo que le pagan.", doc("La patrona paga " + ev("salud y pensión") + " cada mes. No hay registro de " + ev("ningún pago de prima", "Nunca le han pagado prima") + ".")],
        ["Mensaje de la patrona", "Lo que le respondió.", wa("Carmen, la prima es para los de empresa. Aquí le doy " + ev("un detallito") + " en diciembre y ya.", "6:00 p. m.")],
        ["Mensaje de Carmen", "Lo que le escribió al despacho.", wa("Doctora, ¿es verdad que a nosotras no nos toca prima? Yo " + ev("vivo en la casa") + ".", "9:15 p. m.")]
      ],
      bien: "¡Bien resuelto! Doña Carmen sí tiene prima.",
      expl: "La Ley 1788 de 2016 extendió la <b>prima de servicios</b> a las trabajadoras del servicio doméstico, choferes de servicio familiar y otros. Equivale a <b>30 días de salario por año</b>: la mitad a más tardar el 30 de junio y la otra mitad en los primeros veinte días de diciembre.",
      calc: [["Salario mínimo 2026", 1750905], ["÷ 2 pagos al año", "Junio y diciembre"], ["= Cada pago de prima", 875453]],
      extra: "Si no le pagaron primas de años anteriores, Doña Carmen puede reclamarlas hasta tres años hacia atrás.",
      ley: "Artículo 306 del Código Sustantivo del Trabajo, modificado por la Ley 1788 de 2016.",
      wa: "Hola, jugué El Expediente en su página. Trabajo en servicio doméstico y quiero saber mis derechos." },

    { n: "14", t: "Renuncié, ¿y ahora qué?", lugar: "SANTA MARTA", area: "LABORAL", dif: "★☆☆",
      hist: ["Felipe trabajó dos años como vendedor con contrato a término indefinido. Consiguió un mejor trabajo y <b>renunció</b> con una carta.",
             "La empresa le dijo que, como fue él quien renunció, «pierde todo» y no le van a pagar liquidación."],
      preg: "¿Qué le deben pagar a Felipe?",
      ops: ["Nada. Quien renuncia pierde la liquidación.",
            "Todo, incluida una indemnización por terminar el contrato.",
            "Su liquidación: salarios pendientes, cesantías, intereses, prima y vacaciones, pero no indemnización."], ok: 2,
      pistas: [
        ["Carta de renuncia", "Lo que escribió Felipe.", doc("«Presento mi " + ev("renuncia voluntaria", "Renunció él mismo") + " al cargo de vendedor a partir del 30 de octubre…»")],
        ["Contrato", "Cómo estaba vinculado.", tabla([["Tipo", ev("Término indefinido")], ["Antigüedad", "2 años"], ["Salario", ev("$ 2.100.000")]])],
        ["Pagos pendientes", "Lo que no le han pagado.", doc("No le han pagado las " + ev("cesantías del último año", "Prestaciones pendientes") + ", la prima del semestre ni " + ev("15 días de vacaciones", "Vacaciones pendientes") + ".")],
        ["Mensaje de Felipe", "Lo que le escribió al despacho.", wa("Doctor, me dijeron que por renunciar " + ev("pierdo todo") + ". ¿Eso es así?", "7:48 p. m.")]
      ],
      bien: "¡Bien resuelto! Felipe tiene derecho a su liquidación.",
      expl: "Renunciar <b>no hace perder</b> las prestaciones ya ganadas. Al terminar el contrato, por la causa que sea, se pagan salarios pendientes, cesantías, intereses sobre cesantías, prima y vacaciones. Lo único que no le corresponde es la <b>indemnización por despido</b>, porque fue él quien terminó el contrato.",
      calc: [["Cesantías, intereses y prima", "Sí"], ["Vacaciones pendientes", "Sí"], ["Indemnización", "No"], ["Resultado", "Liquidación completa"]],
      extra: "Si la empresa no paga al terminar el contrato, puede tener que pagar una sanción de un día de salario por cada día de retraso.",
      ley: "Artículos 64, 65, 186, 249 y 306 del Código Sustantivo del Trabajo y Ley 52 de 1975.",
      wa: "Hola, jugué El Expediente en su página. Renuncié y no me quieren pagar la liquidación." },

    { n: "15", t: "La foto que no era de él", lugar: "SANTA MARTA", area: "TRÁNSITO", dif: "★★★",
      hist: ["A Ricardo le llegó una fotomulta por exceso de velocidad. El carro está a su nombre, pero ese día lo manejaba su hermano.",
             "En el tránsito le dicen que «el dueño del carro siempre responde» y que pague."],
      preg: "¿Debe pagar Ricardo solo por ser el dueño del carro?",
      ops: ["Sí. El propietario siempre responde por las fotomultas de su carro.",
            "No. La Corte dijo que no se puede sancionar al dueño solo por serlo: hay que identificar a quien manejaba.",
            "Sí, pero con el 50 % de descuento."], ok: 1,
      pistas: [
        ["Fotomulta", "La notificación que le llegó.", doc("Infracción por exceso de velocidad detectada por cámara. Se impone la sanción al " + ev("propietario del vehículo", "Sancionan al dueño") + ".", "SECRETARÍA DE TRÁNSITO")],
        ["La foto", "Lo que se ve en la imagen.", doc("Se ve la placa del carro. " + ev("No se distingue al conductor", "No identificaron al conductor") + ". Hora: " + ev("3:15 p. m.") + ".")],
        ["Constancia laboral", "Dónde estaba Ricardo.", doc("Según su empleador, Ricardo estaba " + ev("trabajando en su oficina", "Él no manejaba") + " a esa hora.")],
        ["Mensaje de Ricardo", "Lo que le escribió al despacho.", wa("Doctora, el carro lo tenía mi hermano. ¿Me toca pagar por él?", ev("8:05 p. m."))]
      ],
      bien: "¡Bien resuelto! El dueño no responde automáticamente.",
      expl: "En la sentencia C-038 de 2020, la Corte Constitucional declaró inconstitucional que el propietario respondiera automáticamente por las fotomultas. La responsabilidad es <b>personal</b>: el tránsito debe <b>identificar a quien cometió la infracción</b> y darle la oportunidad de defenderse.",
      calc: [["Conductor identificado", "No"], ["Ricardo manejaba", "No"], ["Sanción automática", "No permitida"], ["Resultado", "Puede defenderse"]],
      extra: "Ricardo debe presentar sus descargos dentro del plazo que indica la notificación, explicando que él no conducía.",
      ley: "Sentencia C-038 de 2020 de la Corte Constitucional, sobre el artículo 8 de la Ley 1843 de 2017.",
      wa: "Hola, jugué El Expediente en su página. Me llegó una fotomulta y yo no iba manejando." },

    { n: "16", t: "Pague rápido, pague menos", lugar: "SANTA MARTA", area: "TRÁNSITO", dif: "★☆☆",
      hist: ["A Natalia le hicieron un comparendo por estacionar en un sitio prohibido. Lo recibió hace <b>tres días hábiles</b> y la multa es de unos <b>$600.000</b>.",
             "Ella acepta que se equivocó y quiere pagar ya, pero no sabe si tiene algún beneficio o si le toca pagar el valor completo."],
      preg: "¿Qué beneficio tiene Natalia si paga ya?",
      ops: ["Ninguno. Las multas se pagan completas.",
            "Un descuento del 25 %, sin importar cuándo pague.",
            "Un descuento del 50 % si hace el curso pedagógico y paga dentro de los primeros 5 días hábiles."], ok: 2,
      pistas: [
        ["Comparendo", "El papel que le dieron.", doc("Infracción: estacionar en " + ev("sitio prohibido", "Acepta la infracción") + ". Notificado hace " + ev("3 días hábiles", "Va en el día 3") + ".")],
        ["Valor de la multa", "Cuánto cuesta.", tabla([["Valor aproximado", "$ 600.000"], ["Placa", ev("Terminada en 4")]])],
        ["Curso pedagógico", "Lo que ofrece el tránsito.", doc("Hay cupos para el " + ev("curso sobre normas de tránsito", "Puede hacer el curso") + " esta semana.")],
        ["Mensaje de Natalia", "Lo que le escribió al despacho.", wa("Doctor, sí me equivoqué, ¿pero hay " + ev("alguna rebaja") + "?", "12:30 p. m.")]
      ],
      bien: "¡Bien resuelto! Natalia paga la mitad.",
      expl: "Quien acepta la infracción, hace el <b>curso pedagógico</b> y paga dentro de los <b>5 días hábiles</b> siguientes recibe un <b>descuento del 50 %</b>. Si lo hace entre el día 6 y el 20, el descuento es del 25 %.",
      calc: [["Valor de la multa", 600000], ["Descuento con curso", "50 %"], ["= Paga", 300000]],
      extra: "Si Natalia no estuviera de acuerdo con el comparendo, en vez de pagar podría pedir audiencia para defenderse.",
      ley: "Artículo 136 de la Ley 769 de 2002 (Código Nacional de Tránsito) y sus modificaciones.",
      wa: "Hola, jugué El Expediente en su página. Tengo un comparendo y quiero saber cómo pagar menos." },

    { n: "17", t: "La EPS dijo que no", lugar: "SANTA MARTA", area: "ADMINISTRATIVO", dif: "★★☆",
      hist: ["Hernán tiene 68 años y su médico de la EPS le ordenó una <b>cirugía de cadera</b> prioritaria porque casi no puede caminar.",
             "La EPS se la negó por escrito: «no hay agenda», que vuelva a pedirla en seis meses."],
      preg: "¿Qué puede hacer Hernán y cuánto se demora?",
      ops: ["Presentar una tutela por su derecho a la salud; el juez debe decidir en máximo 10 días.",
            "Esperar los seis meses: la EPS decide cuándo hay agenda.",
            "Demandar a la EPS en un proceso ordinario, que dura unos dos años."], ok: 0,
      pistas: [
        ["Orden médica", "Lo que ordenó su médico.", doc("Se ordena " + ev("reemplazo total de cadera", "Cirugía ordenada por su médico") + " con carácter prioritario. Paciente de " + ev("68 años", "Adulto mayor") + ".", "IPS DE LA EPS")],
        ["Respuesta de la EPS", "Lo que le contestaron.", doc("«No hay agenda disponible. Solicitar nuevamente " + ev("en seis meses", "Negativa sin razón médica") + ".»", "EPS · ATENCIÓN AL USUARIO")],
        ["Historia clínica", "Cómo está Hernán.", doc("Dolor severo. Camina con " + ev("bastón") + ". Riesgo de caídas.")],
        ["Mensaje de la hija", "Lo que escribió al despacho.", wa("Doctor, mi papá ya no duerme del dolor. " + ev("Tiene Sisbén") + ", ¿eso cambia algo?", "10:50 p. m.")]
      ],
      bien: "¡Bien resuelto! La tutela es el camino.",
      expl: "La salud es un <b>derecho fundamental</b>. Cuando la EPS niega o demora un servicio ordenado por el médico tratante, se puede presentar una <b>acción de tutela</b>, sin abogado. El juez tiene <b>10 días</b> para decidir y puede ordenar la cirugía de inmediato.",
      calc: [["Orden del médico tratante", "Sí"], ["Negativa de la EPS", "Sin razón médica"], ["Plazo del juez", "10 días"], ["Camino", "Tutela"]],
      extra: "Si la EPS no cumple el fallo, se puede pedir un incidente de desacato, que puede terminar en multa o arresto para los responsables.",
      ley: "Artículo 86 de la Constitución, Decreto 2591 de 1991 (art. 29) y Ley 1751 de 2015 (Ley Estatutaria de Salud).",
      wa: "Hola, jugué El Expediente en su página. La EPS me niega un servicio que me ordenó el médico." },

    { n: "18", t: "El embargo que siguió", lugar: "SANTA MARTA", area: "INSOLVENCIA", dif: "★★★",
      hist: ["Gloria es enfermera asalariada. Debe <b>$180.000.000</b> entre bancos y una cooperativa, y pidió la insolvencia de persona natural no comerciante.",
             "El centro de conciliación ya <b>aceptó</b> su solicitud. Aun así, un banco siguió el proceso ejecutivo y le mantiene el embargo del salario."],
      preg: "¿Puede el banco seguir con el cobro?",
      ops: ["Sí. Cada acreedor sigue su proceso hasta que haya un acuerdo.",
            "No. Con la aceptación del trámite, los procesos de cobro se suspenden y no se pueden iniciar nuevos.",
            "Sí, pero solo puede embargar la mitad del salario."], ok: 1,
      pistas: [
        ["Auto de aceptación", "Lo que decidió el conciliador.", doc("Se acepta la solicitud de negociación de deudas de Gloria P. " + ev("Fecha: 02/09/2026", "Trámite aceptado") + ". Deudas por " + ev("$ 180.000.000") + ".", "CENTRO DE CONCILIACIÓN · SANTA MARTA")],
        ["Proceso del banco", "Lo que pasó en el juzgado.", doc("El " + ev("banco continuó el proceso ejecutivo", "Cobro después de la aceptación") + " en octubre de 2026 y mantuvo el embargo.", "JUZGADO CIVIL MUNICIPAL")],
        ["Comunicación", "A quién se le avisó.", doc("El conciliador " + ev("comunicó la aceptación", "Juzgado y acreedores avisados") + " a todos los acreedores y a los juzgados.")],
        ["Mensaje de Gloria", "Lo que le escribió al despacho.", wa("Doctor, pensé que con la insolvencia " + ev("me iban a perdonar todo") + ". ¿Por qué me siguen quitando?", "9:30 p. m.")]
      ],
      bien: "¡Bien resuelto! El cobro del banco debe suspenderse.",
      expl: "Desde que se <b>acepta</b> la solicitud de negociación de deudas, no se pueden iniciar nuevos procesos ejecutivos contra el deudor y los que estén en curso <b>se suspenden</b>. Así puede negociar un acuerdo con todos sus acreedores a la vez. La insolvencia no perdona las deudas: las reorganiza.",
      calc: [["Deuda total", 180000000], ["Aceptación del trámite", "02/09/2026"], ["Cobro del banco", "Octubre de 2026"], ["Resultado", "Debe suspenderse"]],
      extra: "Gloria, por medio del conciliador o de su abogado, le informa al juzgado para que suspenda el proceso y deje de aplicar el embargo.",
      ley: "Artículo 545 del Código General del Proceso, con los cambios de la Ley 2445 de 2025.",
      wa: "Hola, jugué El Expediente en su página. Estoy en insolvencia y me siguen cobrando." },

    { n: "19", t: "La nevera que se dañó", lugar: "SANTA MARTA", area: "CONTRACTUAL", dif: "★★☆",
      hist: ["Jairo compró una nevera de <b>$2.600.000</b> en un almacén. A los <b>cuatro meses</b> dejó de enfriar.",
             "En el almacén le dicen que no tiene garantía porque «no compró la garantía extendida», y que la reparación le cuesta $450.000."],
      preg: "¿Tiene Jairo garantía?",
      ops: ["No. Sin garantía extendida, la tienda solo responde el primer mes.",
            "Sí, pero debe pagar la mitad de la reparación.",
            "Sí. Todo producto tiene garantía legal; si el fabricante no fija otro plazo, es de un año y la reparación es gratis."], ok: 2,
      pistas: [
        ["Factura", "Cuándo compró.", tabla([["Producto", "Nevera no frost"], ["Valor", "$ 2.600.000"], ["Fecha", ev("Julio de 2026", "Comprada hace 4 meses")], ["Garantía extendida", ev("No compró")]])],
        ["Informe técnico", "Qué tiene la nevera.", doc("Falla en el " + ev("compresor por defecto de fábrica", "Defecto del producto") + ". Sin golpes ni mal uso.")],
        ["Manual", "Lo que dice el fabricante.", doc("El manual " + ev("no fija un plazo de garantía", "Sin plazo del fabricante") + " distinto al legal.")],
        ["Mensaje de Jairo", "Lo que le escribió al despacho.", wa("Doctora, la usé cuatro meses nada más. ¿Me toca pagar?", ev("4:20 p. m."))]
      ],
      bien: "¡Bien resuelto! Jairo tiene garantía legal.",
      expl: "La <b>garantía legal</b> es obligatoria y gratuita: no hay que comprarla. Cubre la reparación sin costo de transporte ni repuestos. Si el fabricante no dice otra cosa, dura <b>un año</b> desde la entrega. Si la falla se repite, se puede pedir el cambio del producto o la devolución del dinero.",
      calc: [["Garantía legal", "1 año"], ["Tiempo de uso", "4 meses"], ["Costo de la reparación", "$ 0"], ["Resultado", "Cubierto"]],
      extra: "Si el almacén se niega, Jairo puede presentar una demanda de protección al consumidor ante la Superintendencia de Industria y Comercio, sin abogado.",
      ley: "Artículos 7, 8 y 11 de la Ley 1480 de 2011 (Estatuto del Consumidor).",
      wa: "Hola, jugué El Expediente en su página. Un producto se dañó y no me quieren dar garantía." },

    { n: "20", t: "La pensión de invalidez", lugar: "SANTA MARTA", area: "PENSIONES", dif: "★★★",
      hist: ["Orlando, de 48 años, sufrió un accidente fuera del trabajo. La junta médica calificó su <b>pérdida de capacidad laboral en 55 %</b>.",
             "En los <b>tres años</b> antes del accidente cotizó <b>62 semanas</b>. Su fondo le dice que «está muy joven para pensionarse»."],
      preg: "¿Tiene Orlando derecho a pensión de invalidez?",
      ops: ["Sí. Tiene más del 50 % de pérdida de capacidad y más de 50 semanas cotizadas en los tres años anteriores.",
            "No. Para pensionarse hay que tener la edad de la pensión de vejez.",
            "Solo si el accidente hubiera sido en el trabajo."], ok: 0,
      pistas: [
        ["Dictamen de la junta", "La calificación de Orlando.", doc("Pérdida de capacidad laboral: " + ev("55 %", "Más del 50 %") + ". Origen: común.", "JUNTA REGIONAL DE CALIFICACIÓN DE INVALIDEZ")],
        ["Historia laboral", "Semanas cotizadas.", tabla([["Semanas en los últimos 3 años", ev("62", "Más de 50 semanas recientes")], ["Total de semanas", "610"], ["Fondo", ev("Colpensiones")]])],
        ["Fecha de estructuración", "Desde cuándo está la invalidez.", doc("La invalidez se estructuró el " + ev("día del accidente", "Semanas antes de la invalidez") + ", en marzo de 2026.")],
        ["Mensaje de Orlando", "Lo que le escribió al despacho.", wa("Doctor, tengo " + ev("48 años") + " y dos hijos. ¿De qué voy a vivir?", "6:45 p. m.")]
      ],
      bien: "¡Bien resuelto! Orlando tiene derecho a la pensión de invalidez.",
      expl: "La pensión de invalidez no depende de la edad. Se exige una <b>pérdida de capacidad laboral del 50 % o más</b> y haber cotizado <b>50 semanas en los tres años</b> anteriores a la fecha en que se estructuró la invalidez.",
      calc: [["Pérdida de capacidad", "55 % (mín. 50 %)"], ["Semanas en 3 años", "62 (mín. 50)"], ["Edad", "No se exige"], ["Resultado", "Tiene derecho"]],
      extra: "Orlando debe pedirla al fondo con el dictamen en firme. Si se la niegan, puede reclamar ante un juez laboral.",
      ley: "Artículos 38 y 39 de la Ley 100 de 1993; el artículo 39 fue modificado por la Ley 860 de 2003.",
      wa: "Hola, jugué El Expediente en su página. Tengo una pérdida de capacidad laboral y quiero saber si me pensiono." }
  ];

  /* ---------- rangos: suben con cada caso resuelto seguido ---------- */
  var NIVELES = {
    basico: { nombre: "Básico", n: 5, seg: 120, titulo: "Abogado investigador", txt: "Cinco casos para empezar. 120 segundos por caso." },
    intermedio: { nombre: "Intermedio", n: 10, seg: 100, titulo: "Abogado investigador con especialización", txt: "Diez casos de más áreas del derecho. 100 segundos por caso." },
    experto: { nombre: "Experto", n: 20, seg: 90, titulo: "Abogado investigador con maestría", txt: "Veinte casos de todas las áreas. Solo 90 segundos por caso." }
  };
  var ORDEN = ["basico", "intermedio", "experto"];
  var GRADOS = ["Pasante", "Practicante", "Abogado junior", "Abogado", "Abogado investigador"];
  function grado() { var r = G.resueltos / CASOS.length; return r >= 1 ? NIVELES[G.nivel].titulo : GRADOS[Math.min(4, Math.floor(r * 5))]; }
  var CLAVE = "cr_juego_v3", marcas = {};
  try { marcas = JSON.parse(localStorage.getItem(CLAVE) || "{}") || {}; } catch (_) { marcas = {}; }
  function guardarMarca(n) { if (n > (marcas[G.nivel] || 0)) { marcas[G.nivel] = n; try { localStorage.setItem(CLAVE, JSON.stringify(marcas)); } catch (_) {} } pintarMarca(); }
  function pintarMarca() {
    var m = raiz.querySelector(".jg-marca"); if (!m) return;
    var t = ORDEN.filter(function (k) { return marcas[k]; }).map(function (k) { return NIVELES[k].nombre + " " + marcas[k]; });
    m.hidden = !t.length; m.textContent = "Sus mejores marcas: " + t.join(" · ");
  }

  var LARGO = 169.6, S = {}, G = {}, tic = null, actual = 0, ventana = null, app = null, ultimoFoco = null;
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
    elegirNivel();
    setTimeout(function () { var b = $("[data-nivel]"); if (b) b.focus(); }, 60);
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
    $(".jg-progreso").classList.toggle("muchos", CASOS.length > 5);
    $(".jg-progreso").innerHTML = CASOS.map(function (c, i) {
      var cls = i < G.resueltos ? "ya" : i === actual && !G.cayo ? "ahora" : i === actual && G.cayo ? "cayo" : "";
      var ico = i < G.resueltos ? "✓" : i > actual ? '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>' : "";
      return '<div class="jg-paso ' + cls + '" title="' + c.t + '">' + ico + String(i + 1).padStart(2, "0") + "<span>· " + c.t + "</span></div>";
    }).join("");
    $(".jg-total b").textContent = G.total;
  }

  /* cada partida baraja el orden de los casos, de las pistas y de las respuestas;
     la respuesta correcta nunca queda en la misma letra dos casos seguidos */
  var BASE = CASOS;
  function baraja(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.random() * (i + 1) | 0, t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function mezclar() {
    var antes = -1;
    CASOS = baraja(BASE.slice(0, NIVELES[G.nivel].n)).map(function (c) {
      var buena = c.ops[c.ok], malas = baraja(c.ops.filter(function (_, k) { return k !== c.ok; }));
      var pos; do { pos = Math.random() * c.ops.length | 0; } while (pos === antes);
      antes = pos; malas.splice(pos, 0, buena);
      var n = {}; for (var k in c) n[k] = c[k];
      n.ops = malas; n.ok = pos; n.pistas = baraja(c.pistas);
      return n;
    });
  }
  function nuevaPartida(nivel) { nivel = nivel || G.nivel; G = { total: 0, resueltos: 0, cayo: false, nivel: nivel, seg: NIVELES[nivel].seg }; mezclar(); cargar(0, false); }

  function elegirNivel() {
    clearInterval(tic); S = {}; G = { total: 0, resueltos: 0, cayo: false, nivel: G.nivel || "basico" };
    $(".jg-progreso").innerHTML = ""; $(".jg-total b").textContent = "0";
    $(".jg-cuerpo").innerHTML = '<div class="jg-app"><div class="jg-niveles">' +
      '<span class="jg-num">ELIJA SU NIVEL</span><h3>¿Qué tan buen investigador es usted?</h3>' +
      '<p>Los casos y las respuestas cambian de orden en cada partida. Si falla uno, vuelve a empezar desde el primero.</p>' +
      '<div class="jg-nivs">' + ORDEN.map(function (k, i) {
        var N = NIVELES[k];
        return '<button class="jg-niv" type="button" data-nivel="' + k + '"><span class="jg-barras">' + [0, 1, 2].map(function (j) { return "<i" + (j <= i ? ' class="on"' : "") + "></i>"; }).join("") + "</span>" +
          "<b>" + N.nombre + '</b><span class="jg-cant">' + N.n + ' casos</span><span class="jg-desc">' + N.txt + "</span>" +
          '<span class="jg-tit">Título: ' + N.titulo + "</span>" + (marcas[k] ? '<span class="jg-mm">Su mejor marca: ' + marcas[k] + "</span>" : "") + "</button>";
      }).join("") + "</div></div></div>";
    $$("[data-nivel]").forEach(function (b) { b.onclick = function () { nuevaPartida(b.dataset.nivel); subir(); }; });
  }

  /* ---------- un caso ---------- */
  function cargar(i, directo) {
    clearInterval(tic); actual = i; var c = CASOS[i];
    S = { pts: 100, usadas: 0, evid: 0, fin: false, activo: false, seg: G.seg };
    S.claves = c.pistas.map(function (p) { return p[2]; }).join("").split('data-k="1"').length - 1;
    var cuerpo = $(".jg-cuerpo");
    cuerpo.innerHTML = '<div class="jg-app">' +
      '<div class="jg-consola"><div class="jg-col"><div class="jg-panel">' +
        '<div class="jg-sup"><span class="jg-luces"><i></i><i></i><i></i></span><span class="jg-estado" aria-live="polite">Caso ' + (i + 1) + " de " + CASOS.length + '</span><span>CR · Análisis</span></div>' +
        '<div class="jg-inicio"' + (directo ? " hidden" : "") + '><span class="jg-num">EXPEDIENTE N.º ' + c.n + "-2026 · CLASIFICADO</span><h3>" + c.t + "</h3>" +
          '<div class="jg-chips"><span class="jg-chip">' + c.lugar + '</span><span class="jg-chip">' + c.area + '</span><span class="jg-chip">DIFICULTAD ' + c.dif + "</span></div>" +
          '<div class="jg-reglas"><div class="jg-regla"><b>' + CASOS.length + ' casos</b><span>seguidos. Si falla uno, vuelve a empezar desde el primero.</span></div><div class="jg-regla"><b>' + G.seg + ' s</b><span>por caso. Entre más rápido, más bonificación.</span></div><div class="jg-regla"><b>−15 / +5</b><span>cada pista cuesta 15 puntos; cada evidencia clave suma 5.</span></div></div>' +
          '<button class="jg-grande" type="button" data-abrir><svg viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>Abrir el primer expediente</button></div>' +
        '<div class="jg-term" hidden></div>' +
        '<div class="jg-exp" hidden><div class="jg-cab"><div><h3>' + c.t + '</h3><div class="jg-meta"><span>EXP. ' + c.n + "-2026</span><span>" + c.lugar + "</span><span>" + c.area + "</span><span>DIF. " + c.dif + "</span></div></div>" +
          '<div class="jg-reloj" aria-label="Tiempo restante"><svg viewBox="0 0 64 64"><circle class="f" cx="32" cy="32" r="27"/><circle class="a" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="0"/></svg><span>' + G.seg + "</span></div></div>" +
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
      r.querySelector("span").textContent = S.seg; r.querySelector(".a").style.strokeDashoffset = LARGO * (1 - S.seg / G.seg);
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
      '<div class="jg-rango"><b class="jg-fin">0</b><strong>+' + ganados + " puntos · " + grado() + '</strong><span>Base ' + (S.pts - S.evid * 5) + " · evidencias +" + S.evid * 5 + " · tiempo +" + bono + "</span></div>" +
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
      "<p>Nivel " + NIVELES[G.nivel].nombre + ". Llegó hasta <b style=\"color:#fff\">" + grado() + "</b>. Para llegar al final tiene que volver a empezar desde el primer expediente.</p>" +
      '<div class="jg-cifras"><div><b>' + G.total + "</b><span>Puntos</span></div><div><b>" + G.resueltos + " / " + CASOS.length + "</b><span>Casos resueltos</span></div><div><b>" + (marcas[G.nivel] || G.total) + "</b><span>Mejor marca</span></div></div>" +
      '<div class="jg-falla"><p><b>La respuesta correcta era la ' + letra + ".</b> " + c.expl + "</p>" + calcHTML(c) + '<p class="jg-ley">' + c.ley + "</p></div>" +
      '<div class="jg-cta"><button class="jg-btn oro" type="button" data-otra>Volver a empezar</button><button class="jg-btn claro" type="button" data-niveles>Cambiar de nivel</button><a class="jg-btn claro" target="_blank" rel="noopener" href="' + enlaceWa(c.wa) + '">¿Le pasó algo parecido? Escríbanos</a></div>' +
      "</div></div>";
    $("[data-otra]").onclick = function () { nuevaPartida(); subir(); };
    $("[data-niveles]").onclick = function () { elegirNivel(); subir(); };
    subir(); $("[data-otra]").focus({ preventScroll: true });
    animarCalc($(".jg-falla"), yo);
  }

  function final() {
    clearInterval(tic); S = {};
    var sigNivel = ORDEN[ORDEN.indexOf(G.nivel) + 1];
    actual = CASOS.length; pintarProgreso();
    $(".jg-cuerpo").innerHTML = '<div class="jg-app"><div class="jg-final">' +
      '<div class="jg-trofeo"><svg viewBox="0 0 24 24"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4"/></svg></div>' +
      '<span class="jg-grado">Nivel ' + NIVELES[G.nivel].nombre + " · " + CASOS.length + " de " + CASOS.length + " casos resueltos</span>" +
      "<h3>¡Felicitaciones! Usted es <em>" + NIVELES[G.nivel].titulo + "</em>.</h3>" +
      "<p>Resolvió todos los expedientes sin fallar uno solo. Así trabajamos en Carvajal &amp; Rivera: revisamos cada detalle hasta encontrar lo que la ley dice a su favor.</p>" +
      '<div class="jg-cifras"><div><b class="jg-fin">0</b><span>Puntos</span></div><div><b>' + CASOS.length + " / " + CASOS.length + "</b><span>Casos</span></div><div><b>" + marcas[G.nivel] + "</b><span>Mejor marca</span></div></div>" +
      '<div class="jg-cta"><a class="jg-btn oro" target="_blank" rel="noopener" href="' + enlaceWa("Hola, terminé El Expediente (nivel " + NIVELES[G.nivel].nombre + ") en su página con " + G.total + " puntos. Quisiera hacerles una consulta.") + '">Escríbanos por WhatsApp</a>' +
        (sigNivel ? '<button class="jg-btn claro" type="button" data-subir>Subir al nivel ' + NIVELES[sigNivel].nombre + " →</button>" : "") +
        '<button class="jg-btn claro" type="button" data-niveles>Elegir nivel</button></div>' +
      "</div></div>";
    $("[data-niveles]").onclick = function () { elegirNivel(); subir(); };
    if (sigNivel) $("[data-subir]").onclick = function () { nuevaPartida(sigNivel); subir(); };
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
