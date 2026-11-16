/* Contenido editable de la página de Carvajal & Rivera.
   Lee lo que se cambia en el panel (/admin) y lo pone en la página.
   Si no hay conexión, la página se ve con su contenido original. */
(function () {
  var URL = "https://sivyucfhpqxhvaavfgpf.supabase.co"; // base propia de la página (cuenta de la firma, aparte de la app)
  var KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpdnl1Y2ZocHF4aHZhYXZmZ3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ3NDg5MTAsImV4cCI6MjExMDMyNDkxMH0.9XbxWiCaECnqhJOVeGb4r-uVPrlezDwx5xaw7YhR0KY";
  var H = { apikey: KEY, Authorization: "Bearer " + KEY };
  var CACHE = "cr_contenido_v1";

  function leerCache() { try { return JSON.parse(localStorage.getItem(CACHE) || "null"); } catch (_) { return null; } }
  function guardarCache(c) { try { localStorage.setItem(CACHE, JSON.stringify(c)); } catch (_) {} }

  function conTiempo(p, ms) {
    return new Promise(function (ok, mal) {
      var t = setTimeout(function () { mal(new Error("tiempo")); }, ms);
      p.then(function (v) { clearTimeout(t); ok(v); }, function (e) { clearTimeout(t); mal(e); });
    });
  }
  function get(ruta) {
    return fetch(URL + "/rest/v1/" + ruta, { headers: H }).then(function (r) {
      if (!r.ok) throw new Error("http " + r.status);
      return r.json();
    });
  }

  function aplicar(c) {
    if (!c) return;
    var tx = c.textos || {}, im = c.imagenes || {};
    var d = (c.listas || {}).datos || {};
    // Los datos de contacto también cambian el número y el correo que se ven escritos en la página
    var dig = String(d.whatsapp || "").replace(/\D/g, "").slice(-10);
    var cambios = [];
    if (dig.length === 10) cambios.push(["314 613 1086", dig.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")]);
    if (d.correo) cambios.push(["abg.carvajalrivera@gmail.com", d.correo]);
    document.querySelectorAll("[data-e]").forEach(function (el) {
      var k = el.getAttribute("data-e");
      if (el.tagName === "IMG") { if (im[k]) el.src = im[k]; return; }
      if (!el.hasAttribute("data-orig")) el.setAttribute("data-orig", el.innerHTML);
      if (tx[k] == null) {
        var o = el.getAttribute("data-orig"), h = o;
        cambios.forEach(function (r) { h = h.split(r[0]).join(r[1]); });
        if (h !== el.innerHTML && !el.hasAttribute("data-count")) el.innerHTML = h;
        return;
      }
      if (el.hasAttribute("data-count")) {
        var t = String(tx[k]).replace(/<[^>]*>/g, ""), n = t.match(/\d+/);
        if (n) { el.setAttribute("data-count", n[0]); el.setAttribute("data-suffix", t.replace(/[\d\s]/g, "")); }
        return;
      }
      el.innerHTML = tx[k];
    });
    var cps = document.querySelectorAll(".cp");
    if (d.direccion_completa && cps[0]) cps[0].setAttribute("data-copy", d.direccion_completa);
    if (d.whatsapp && cps[1]) cps[1].setAttribute("data-copy", String(d.whatsapp).replace(/\D/g, ""));
    if (d.correo && cps[2]) cps[2].setAttribute("data-copy", d.correo);
    if (d.direccion_completa) {
      var q = encodeURIComponent(d.direccion_completa + ", Colombia");
      var fr = document.querySelector(".mapcard iframe"); if (fr) fr.src = "https://maps.google.com/maps?q=" + q + "&z=16&output=embed";
      var cl = document.querySelector(".mapcard a"); if (cl) cl.href = "https://www.google.com/maps/search/?api=1&query=" + q;
    }
    [["Facebook", d.facebook], ["Instagram", d.instagram], ["TikTok", d.tiktok], ["YouTube", d.youtube]].forEach(function (r) {
      var a = document.querySelector('.social a[aria-label="' + r[0] + '"]');
      if (a && r[1]) a.href = r[1];
      if (a && r[1] === "-") a.hidden = true;
    });
  }

  function fecha(iso) {
    try { return new Date(iso).toLocaleDateString("es-CO", { timeZone: "America/Bogota", day: "2-digit", month: "2-digit", year: "numeric" }); } catch (_) { return ""; }
  }

  window.CR_CARGAR = function () {
    if (!URL) return Promise.resolve({});
    var cache = leerCache();
    if (cache) aplicar(cache);
    var p1 = get("web_contenido?select=clave,valor").then(function (filas) {
      var c = {};
      filas.forEach(function (f) { c[f.clave] = f.valor; });
      return c;
    });
    var p2 = get("web_resenas?select=nombre,estrellas,texto,tema,creado&estado=eq.publicada&order=creado.desc&limit=30")
      .then(function (rs) { return rs.map(function (r) { return { n: r.nombre, e: r.estrellas, x: r.texto, t: r.tema || "", f: fecha(r.creado) }; }); })
      .catch(function () { return (cache && cache.resenas_db) || []; });
    return conTiempo(Promise.all([p1, p2]), 2500).then(function (res) {
      var c = res[0]; c.resenas_db = res[1];
      guardarCache(c); aplicar(c);
      var L = c.listas || {}; L.resenas_db = c.resenas_db; return L;
    }, function () {
      var L = (cache && cache.listas) || {}; L.resenas_db = (cache && cache.resenas_db) || []; return L;
    });
  };

  window.CR_RESENA = function (r) {
    if (!URL) return Promise.resolve();
    return fetch(URL + "/rest/v1/web_resenas", {
      method: "POST",
      headers: { apikey: KEY, Authorization: "Bearer " + KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ nombre: String(r.nombre).slice(0, 80), estrellas: r.estrellas, tema: String(r.tema || "").slice(0, 60), texto: String(r.texto).slice(0, 1200) })
    });
  };
})();
