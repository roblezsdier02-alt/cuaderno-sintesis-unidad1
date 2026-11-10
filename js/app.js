/*
 * Lógica de interfaz · JavaScript puro, compatible con GitHub Pages.
 * Dependencia local: contenido.js se carga primero desde index.html.
 * No hay librerías remotas, backend, cookies ni cuentas.
 */
'use strict';
(() => {
  const datos = window.CUADERNO;
  if (!datos) {
    document.getElementById('contenidoDinamico').textContent = 'Error: no se pudo cargar js/contenido.js.';
    return;
  }
  const {secciones, esc} = datos;
  const $ = (id) => document.getElementById(id);
  const STORAGE_DUDAS = 'cuaderno-u1-dudas-v1';
  let idActual = 'portada';
  let dudas = [];
  let elScrollPendiente = false;
  let bloqueoHasta = 0; // La navegación explícita tiene prioridad frente al scroll suave.

  function obtenerLocal(clave, predeterminado) {
    try {const v = localStorage.getItem(clave); return v===null?predeterminado:JSON.parse(v);}
    catch (_) {return predeterminado;}
  }
  function guardarLocal(clave, valor) {
    try {localStorage.setItem(clave, JSON.stringify(valor)); return true;}
    catch (_) {return false;}
  }

  function renderizar() {
    $('contenidoDinamico').innerHTML = secciones.map(s => {
      const central = s.contenido();
      const interior = s.id === 'portada' ? central : `<div class="sheet-content"><div class="sheet-header"><span class="eyebrow">${esc(s.grupo)}</span><span class="section-index">${esc(s.numero)}</span></div><h2 class="section-title">${esc(s.titulo)}</h2><p class="section-lead">${esc(s.resumen)}</p>${central}${s.id !== 'indice'?'<a class="subir-indice no-imprimir" href="#indice">↑ Volver al índice</a>':''}</div>`;
      return `<section class="sheet" id="${s.id}" data-titulo="${esc(s.titulo)}" tabindex="-1">${interior}</section>`;
    }).join('');
    const grupos = [...new Set(secciones.map(s => s.grupo))];
    $('navegacionLateral').innerHTML = grupos.map(grupo => `<div class="nav-grupo">${esc(grupo)}</div>`+secciones.filter(s=>s.grupo===grupo).map(s=>`<a href="#${s.id}" data-indice="${s.id}" class="${s.grupo.startsWith('Semana')?'nav-secundario':''}"><span class="nav-num">${esc(s.numero)}</span><span>${esc(s.titulo)}</span></a>`).join('')).join('');
    $('indiceTarjetas').innerHTML = secciones.filter(s => s.id !== 'indice' && s.id !== 'portada').map(s=>`<a class="indice-item ${s.id==='s5-pendiente'?'indice-pendiente':''}" href="#${s.id}"><small>${esc(s.grupo)} · ${esc(s.numero)}</small><strong>${esc(s.titulo)}</strong><br><em>${esc(s.resumen)}</em></a>`).join('');
  }
  function navegar(id) {
    const seccion = $(id);
    if (!seccion) return;
    if (location.hash !== '#'+id) location.hash = id;
    else seccion.scrollIntoView({behavior:'smooth',block:'start'});
    bloqueoHasta = Date.now()+1200;
    activar(id);
    cerrarMenu();
  }
  function activar(id) {
    if (!$(id)) return;
    idActual=id;
    const i = secciones.findIndex(s => s.id === id), s = secciones[i];
    $('seccionActual').textContent = s.grupo+' · '+s.titulo;
    $('tituloInferior').textContent = s.titulo;
    $('anterior').disabled = (i<=0);
    $('siguiente').disabled = (i>=secciones.length-1);
    document.querySelectorAll('[data-indice]').forEach(a=>{
      const activo=a.dataset.indice===id;
      a.classList.toggle('activo',activo);
      if(activo)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
    });
  }
  function actualizarProgreso() {
    const max = document.documentElement.scrollHeight-window.innerHeight;
    const valor = max>0?Math.min(100,Math.max(0,window.scrollY/max*100)):0;
    $('barraProgreso').style.width=valor.toFixed(1)+'%';
    const sections=document.querySelectorAll('.sheet');
    let candidate='portada';
    for (const e of sections) {
      if (e.getBoundingClientRect().top<=180) candidate=e.id;
      else break;
    }
    if (Date.now() >= bloqueoHasta && candidate!==idActual) activar(candidate);
  }
  function abrirMenu() {
    $('sidebar').classList.add('abierto');$('oscurecedor').hidden=false;
    $('abrirMenu').setAttribute('aria-expanded','true');
  }
  function cerrarMenu() {
    $('sidebar').classList.remove('abierto');$('oscurecedor').hidden=true;
    $('abrirMenu').setAttribute('aria-expanded','false');
  }
  function normalizar(s) {return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
  let busquedaTexto = [];
  function abrirBusqueda() {
    const dialog=$('dialogBuscar');
    if(!dialog.open) {
      if (typeof dialog.showModal==='function') dialog.showModal();
      else dialog.setAttribute('open','');
    }
    $('buscarInput').value='';actualizarBusqueda();$('buscarInput').focus();
  }
  function cerrarBusqueda() {
    const d=$('dialogBuscar');
    if(d.open&&typeof d.close==='function')d.close();else d.removeAttribute('open');
  }
  function actualizarBusqueda() {
    const texto=normalizar($('buscarInput').value.trim());
    const hallados = texto?busquedaTexto.filter(s=>normalizar(s.texto).includes(texto)):busquedaTexto;
    $('buscarResultados').innerHTML=hallados.length?hallados.slice(0,45).map(s=>`<a href="#${s.id}" data-ir-busqueda="${s.id}"><strong>${esc(s.titulo)}</strong><small>${esc(s.grupo)} · ${esc(s.resumen)}</small></a>`).join(''):'<p>No hay coincidencias. Prueba otra palabra del temario.</p>';
  }

  // Estado local de preguntas. Los datos importados se sanéan al dibujar (no innerHTML crudo).
  function limpiarDuda(d) {
    if(!d||typeof d!=='object') return null;
    const texto = (v,limit)=>String(typeof v==='string'?v:'').slice(0,limit);
    const tema=texto(d.tema,130),pregunta=texto(d.pregunta,1200);
    if(!tema.trim()||!pregunta.trim())return null;
    return {id: /^[a-zA-Z0-9._-]{1,90}$/.test(d.id||'')?d.id:'d-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,9),tema,pregunta,procedimiento:texto(d.procedimiento,180),respuesta:texto(d.respuesta,1200),resuelta:d.resuelta===true};
  }
  function initDudas() {
    const anterior=obtenerLocal(STORAGE_DUDAS,[]);
    dudas=Array.isArray(anterior)?anterior.map(limpiarDuda).filter(Boolean).slice(0,500):[];
    dibujarDudas();
    $('formDuda').addEventListener('submit',guardarDuda);
    $('cancelarDuda').addEventListener('click',limpiarFormulario);
    $('exportarDudas').addEventListener('click',exportarDudas);
    $('importarDudas').addEventListener('change',importarDudas);
    $('dudasLista').addEventListener('click',accionDuda);
  }
  function dibujarDudas() {
    const c=$('dudasLista');
    if(!dudas.length){c.innerHTML='<div class="sin-dudas">Todavía no has registrado dudas. El formulario está vacío para que escribas las tuyas.</div>';return;}
    c.innerHTML=dudas.map(d=>`<article class="duda-card" data-id="${esc(d.id)}"><div class="duda-head"><h4>${esc(d.tema)}</h4><span class="estado-duda ${d.resuelta?'resuelta':''}">${d.resuelta?'Resuelta':'Pendiente'}</span></div><p><strong>Duda:</strong> ${esc(d.pregunta)}</p>${d.procedimiento?`<p><strong>Reforzar:</strong> ${esc(d.procedimiento)}</p>`:''}${d.respuesta?`<p><strong>Posible respuesta:</strong> ${esc(d.respuesta)}</p>`:''}<div class="duda-acciones no-imprimir"><button class="boton-texto" type="button" data-duda-accion="estado" data-duda-id="${esc(d.id)}">${d.resuelta?'Marcar pendiente':'Marcar resuelta'}</button><button class="boton-texto" type="button" data-duda-accion="editar" data-duda-id="${esc(d.id)}">Editar</button><button class="boton-texto borrar" type="button" data-duda-accion="borrar" data-duda-id="${esc(d.id)}">Eliminar</button></div></article>`).join('');
  }
  function avisoDudas(msg){$('dudasEstado').textContent=msg;}
  function persistirDudas() {
    if(!guardarLocal(STORAGE_DUDAS,dudas)) avisoDudas('El navegador ha impedido el guardado local. Exporta las dudas a un archivo JSON para conservarlas.');
  }
  function guardarDuda(e) {
    e.preventDefault();
    const previa=$('dudaEditando').value;
    const d=limpiarDuda({id:previa||undefined,tema:$('dudaTema').value,pregunta:$('dudaPregunta').value,procedimiento:$('dudaProcedimiento').value,respuesta:$('dudaRespuesta').value,resuelta:previa?(dudas.find(x=>x.id===previa)?.resuelta||false):false});
    if(!d){avisoDudas('Completa el tema y la pregunta.');return;}
    if(previa){let idx=dudas.findIndex(x=>x.id===previa);if(idx>=0)dudas[idx]=d;else dudas.unshift(d);}
    else dudas.unshift(d);
    persistirDudas();dibujarDudas();limpiarFormulario();avisoDudas('Duda guardada en este navegador.');
  }
  function limpiarFormulario() {
    $('formDuda').reset();$('dudaEditando').value='';
    $('guardarDuda').textContent='Guardar duda';$('cancelarDuda').hidden=true;
  }
  function accionDuda(ev) {
    const btn=ev.target.closest('[data-duda-accion]');if(!btn)return;
    const id=btn.dataset.dudaId;const d=dudas.find(x=>x.id===id);if(!d)return;
    if(btn.dataset.dudaAccion==='estado'){d.resuelta=!d.resuelta;persistirDudas();dibujarDudas();avisoDudas(d.resuelta?'Duda marcada como resuelta.':'Duda marcada como pendiente.');}
    else if(btn.dataset.dudaAccion==='editar'){
      $('dudaTema').value=d.tema;$('dudaPregunta').value=d.pregunta;
      $('dudaProcedimiento').value=d.procedimiento;$('dudaRespuesta').value=d.respuesta;
      $('dudaEditando').value=d.id;$('guardarDuda').textContent='Guardar cambios';$('cancelarDuda').hidden=false;
      $('formDuda').scrollIntoView({behavior:'smooth',block:'center'});$('dudaTema').focus();
    } else if(btn.dataset.dudaAccion==='borrar'){
      if(!confirm('¿Eliminar esta duda? No podrás recuperarla salvo que la hayas exportado.'))return;
      dudas=dudas.filter(x=>x.id!==id);persistirDudas();dibujarDudas();avisoDudas('Duda eliminada.');
    }
  }
  function exportarDudas(){
    const blob=new Blob([JSON.stringify(dudas,null,2)],{type:'application/json;charset=utf-8'});
    const url=URL.createObjectURL(blob), a=document.createElement('a');
    a.href=url;a.download='dudas-unidad-1.json';document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  async function importarDudas(ev){
    const file=ev.target.files?.[0];if(!file)return;
    try {
      if(file.size>1024*1024)throw Error('El archivo es demasiado grande (máximo 1 MB).');
      const x=JSON.parse(await file.text());if(!Array.isArray(x))throw Error('El JSON debe contener una lista de dudas.');
      const nuevos=x.map(limpiarDuda).filter(Boolean).slice(0,500);if(!nuevos.length)throw Error('No se encontraron dudas con tema y pregunta.');
      if(!confirm(`¿Importar ${nuevos.length} dudas? Se agregarán a las que ya tienes.`))return;
      const ids=new Set(dudas.map(d=>d.id));for(const d of nuevos){if(ids.has(d.id))d.id='d-'+Date.now().toString(36)+Math.random().toString(36).slice(2,8);ids.add(d.id);dudas.push(d);}
      dudas=dudas.slice(-500);persistirDudas();dibujarDudas();avisoDudas('Importación terminada.');
    } catch(error){avisoDudas('No se pudo importar: '+error.message);}
    finally {ev.target.value='';}
  }

  function initLab() {
    const select=$('simPuerta'), A=$('bitA'),B=$('bitB'), salida=$('simSalida'),grpB=$('grupoBitB');
    if(!select||!A||!B)return;
    const resolver=(tipo,a,b)=>({AND:a&b,OR:a|b,NOT:1-a,NAND:1-(a&b),NOR:1-(a|b),XOR:a^b,XNOR:1-(a^b)})[tipo];
    const calcular=()=>{
      let a=Number(A.dataset.bit), b=Number(B.dataset.bit);
      grpB.hidden=select.value==='NOT';
      salida.textContent='Y = '+resolver(select.value,a,b);
    };
    [A,B].forEach(btn=>btn.addEventListener('click',()=>{btn.dataset.bit=btn.dataset.bit==='1'?'0':'1';btn.textContent=btn.dataset.bit;calcular();}));
    select.addEventListener('change',calcular);calcular();
  }
  function initEventos() {
    $('abrirMenu').addEventListener('click',()=>$('sidebar').classList.contains('abierto')?cerrarMenu():abrirMenu());
    $('cerrarMenu').addEventListener('click',cerrarMenu);
    $('oscurecedor').addEventListener('click',cerrarMenu);
    $('botonBuscar').addEventListener('click',abrirBusqueda);
    $('buscarInput').addEventListener('input',actualizarBusqueda);
    $('botonImprimir').addEventListener('click',()=>window.print());
    $('anterior').addEventListener('click',()=>{const i=secciones.findIndex(x=>x.id===idActual);if(i>0)navegar(secciones[i-1].id);});
    $('siguiente').addEventListener('click',()=>{const i=secciones.findIndex(x=>x.id===idActual);if(i<secciones.length-1)navegar(secciones[i+1].id);});
    document.addEventListener('keydown',ev=>{
      if((ev.ctrlKey||ev.metaKey)&&ev.key.toLowerCase()==='k'){ev.preventDefault();abrirBusqueda();}
      if(ev.key==='Escape')cerrarMenu();
    });
    document.addEventListener('click',ev=>{
      const desdeBusqueda=ev.target.closest('[data-ir-busqueda]');if(desdeBusqueda){cerrarBusqueda();activar(desdeBusqueda.dataset.irBusqueda);}
      const nav=ev.target.closest('a[href^="#"]');if(nav){const id=nav.getAttribute('href').slice(1);if($(id)){bloqueoHasta=Date.now()+1200;activar(id);cerrarMenu();}}
    });
    window.addEventListener('hashchange',()=>{const id=decodeURIComponent(location.hash.slice(1));if($(id))activar(id);});
    window.addEventListener('scroll',()=>{
      if(elScrollPendiente)return;elScrollPendiente=true;
      requestAnimationFrame(()=>{actualizarProgreso();elScrollPendiente=false;});
    },{passive:true});
    window.addEventListener('resize',actualizarProgreso,{passive:true});
  }
  function init() {
    renderizar();
    busquedaTexto=secciones.map(s=>({id:s.id,titulo:s.titulo,grupo:s.grupo,resumen:s.resumen,texto:s.titulo+' '+s.grupo+' '+s.resumen+' '+$(s.id).textContent}));
    initDudas();initLab();initEventos();
    const objetivo=decodeURIComponent(location.hash.slice(1));
    if(objetivo&&$(objetivo)){
      activar(objetivo);requestAnimationFrame(()=>$(objetivo).scrollIntoView({block:'start'}));
    } else activar('portada');
    actualizarProgreso();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
