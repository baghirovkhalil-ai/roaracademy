const WA = "994998135300", $ = s => document.querySelector(s) || document.createElement("div");
const G = [
  ["Məktəb fənləri", 20, ["Azərbaycan dili","Ədəbiyyat","Riyaziyyat","Fizika","Kimya","Biologiya","Tarix","Coğrafiya","İnformatika","Təkmilləşdirmə (1–8-ci sinif)"]],
  ["Xarici dillər", 20, ["İngilis dili","Rus dili","Fransız dili","Alman dili"]],
  ["Bacarıqlar", 20, ["Məntiq","Sürətli oxu","Mental arifmetika","Rəsm"]],
  ["Hazırlıq paketləri", 30, ["Abituriyent hazırlığı","MİQ sertifikasiya"]]
];
const PRICE = {}; G.forEach(([, p, l]) => l.forEach(n => PRICE[n] = p));
const chosen = new Set(); let bolme = "Azərbaycan";
const wa = msg => window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
document.addEventListener("click", e => { const a = e.target.closest("[data-wa]"); if (a) { e.preventDefault(); wa(a.dataset.wa) } });
$("#board").innerHTML = G.slice(0, 3).flatMap(([, p, l]) => l).filter(n => !n.startsWith("Təkmil")).slice(0, 16).map(n => `<div class="row">${n}<em>${PRICE[n]} ₼</em></div>`).join("");
$("#chips").innerHTML = G.map(([g, p, l]) => `<div class="grp">${g}</div><div class="chips">${l.map(n => `<button type="button" data-n="${n}">${n} <small>${p} ₼</small></button>`).join("")}</div>`).join("");
function upd(){ const l=[...chosen], t=l.reduce((a,n)=>a+PRICE[n],0); $("#tot").textContent=t; $("#sel").textContent = l.length ? l.join(", ") : "Hələ heç nə seçməmisən" }
$("#chips").onclick = e => { const b=e.target.closest("button"); if(!b) return; const n=b.dataset.n; chosen.has(n)?chosen.delete(n):chosen.add(n); b.classList.toggle("on"); upd() };
$("#bolme").onclick = e => { const b=e.target.closest("button"); if(!b) return; bolme=b.dataset.b; document.querySelectorAll("#bolme button").forEach(x=>x.classList.toggle("on",x===b)) };
$("#send").onclick = e => { e.preventDefault(); const l=[...chosen], nm=$("#nm").value.trim(), t=l.reduce((a,n)=>a+PRICE[n],0);
  wa(`Salam!${nm?" Mən "+nm+".":""} ${l.length?"Bu kurslara yazılmaq istəyirəm: "+l.join(", ")+". Bölmə: "+bolme+". Aylıq ümumi: "+t+" AZN.":"Dərslər haqqında məlumat almaq istəyirəm. Bölmə: "+bolme+"."}`) };
$("#burger").onclick = () => $("#nav").classList.toggle("open");
document.querySelectorAll("#links a").forEach(a => a.onclick = () => $("#nav").classList.remove("open"));
const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target) } }), { threshold: .12 }) : null;
document.querySelectorAll(".rv").forEach(el => io ? io.observe(el) : el.classList.add("in"));

// fənn kartlarını ayrıca səhifələrə bağla
const SLUG = s => s.toLowerCase().replace(/ə/g,"e").replace(/ı/g,"i").replace(/i̇/g,"i").replace(/ö/g,"o").replace(/ü/g,"u").replace(/ç/g,"c").replace(/ş/g,"s").replace(/ğ/g,"g").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
document.querySelectorAll("#subs .su").forEach(d => { const n = d.querySelector("b"); if (!n) return; const a = document.createElement("a"); a.className = d.className; a.dataset.g = d.dataset.g || ""; a.href = "fenn-" + SLUG(n.textContent) + ".html"; a.innerHTML = d.innerHTML; d.replaceWith(a) });
// Fənlər səhifəsində süzgəc
const F2 = document.getElementById("flt2"); if (F2) F2.onclick = e => { const b = e.target.closest("button"); if (!b) return; F2.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b)); document.querySelectorAll("#subs2 .su").forEach(s => s.style.display = b.dataset.f === "all" || s.dataset.g === b.dataset.f ? "" : "none") };
// ?f=fenn-slug → kalkulyatorda həmin fənni seç
(() => { const f = new URLSearchParams(location.search).get("f"); if (!f) return; document.querySelectorAll("#chips button").forEach(b => { if (SLUG(b.dataset.n) === f) b.click() }) })();
