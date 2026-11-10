/* Visor accesible de diagramas incorporados al código. */
'use strict';
(() => {
  const css = document.createElement('style');
  css.textContent = `
    .visor-integrado{border:0;padding:0;border-radius:16px;width:min(1160px,96vw);
      max-width:none;max-height:96vh;background:#fff;color:#18364c;box-shadow:0 30px 90px #0007}
    .visor-integrado::backdrop{background:#091625df}
    .visor-interno{display:flex;flex-direction:column;max-height:96vh}
    .visor-superior{background:#102d41;color:white;padding:14px 18px;display:flex;
      justify-content:space-between;gap:20px;align-items:center}
    .visor-superior strong{font-size:clamp(16px,2vw,21px)}
    .visor-acciones{display:flex;gap:8px;align-items:center;flex-wrap:wrap;
      padding:10px 15px;background:#edf4f6}
    .visor-integrado button{border:1px solid #abc5ce;border-radius:8px;
      padding:8px 12px;color:#173849;background:white;font:inherit;cursor:pointer}
    .visor-integrado button:disabled{opacity:.36;cursor:not-allowed}
    .visor-integrado button:focus-visible{outline:3px solid #2ba38d}
    .visor-expandir{flex:1}
    .visor-panel{overflow:auto;background-image:
      linear-gradient(#d4e3e660 1px,transparent 1px),
      linear-gradient(90deg,#d4e3e660 1px,transparent 1px);
      background-size:24px 24px;height:min(57vh,670px);padding:20px}
    .visor-panel img{display:block;width:100%;height:auto;max-width:none;margin:auto;
      background:white;box-shadow:0 1px 9px #0001}
    .visor-explicacion{border-top:1px solid #d6e0e7;padding:15px 20px;
      max-height:25vh;overflow:auto;line-height:1.65}
    .visor-explicacion h3{font-size:1rem;margin:0 0 4px}
    .visor-explicacion p{margin:5px 0}
    .visor-sub{font-size:.85rem;opacity:.8}
    @media(max-width:650px){.visor-panel{height:45vh;padding:9px}
      .visor-explicacion{max-height:30vh}.visor-integrado button{padding:7px 9px}}
    @media print{.visor-integrado{display:none!important}}`;
  const graficosExtra = {
    'portada-circuitos.svg': ['Ilustración de portada',
      'Resume el uso de señales binarias y compuertas para el diseño combinacional.'],
    'proceso-diseno.svg': ['Procedimiento clásico de diseño',
      'Partimos del enunciado; construimos la tabla de verdad, escribimos la expresión lógica y finalmente conectamos las compuertas.'],
    'pesos-binarios.svg': ['Representación de números binarios',
      'Cada bit corresponde a una potencia de dos. Ejemplo: 1011₂ = 8 + 2 + 1 = 11₁₀.']
  };
  let cuadro, lista=[], actual=0, zoom=1;
  const $ = id => document.getElementById(id);
  function consultar() {
    const ya = new Set(); lista=[];
    document.querySelectorAll('[data-grafico]').forEach(imagen => {
      const archivo=imagen.dataset.grafico;
      if (!archivo || ya.has(archivo)) return;
      ya.add(archivo);
      const circuito=window.CUADERNO.circuitos.find(c=>c.archivo===archivo);
      const extra=graficosExtra[archivo];
      lista.push({archivo, src:window.GRAFICOS.url(archivo),
        titulo:circuito?.tema || extra?.[0] || imagen.alt || archivo,
        funcion:circuito?.funcion || '',
        detalle:circuito?.prueba || extra?.[1] || imagen.alt || ''});
      imagen.tabIndex=0;
      imagen.setAttribute('role','button');
      imagen.setAttribute('aria-label','Ampliar: '+(imagen.alt||archivo));
    });
  }
  function aplicarZoom() {
    $('visorImagen').style.width=(100*zoom)+'%';
    $('visorValorZoom').textContent=Math.round(100*zoom)+'%';
  }
  function mostrar(i) {
    if (i<0 || i>=lista.length) return;
    actual=i; zoom=1;
    const v=lista[i];
    $('visorTitulo').textContent=v.titulo;
    $('visorContador').textContent=`Imagen ${i+1} de ${lista.length}`;
    $('visorImagen').src=v.src; $('visorImagen').alt=v.titulo;
    $('visorFuncion').textContent=v.funcion ? 'Función o principio: '+v.funcion : 'Explicación de la ilustración';
    $('visorDetalle').textContent=v.detalle;
    $('visorAnterior').disabled=(i===0);
    $('visorSiguiente').disabled=(i===lista.length-1);
    aplicarZoom();$('visorPanel').scrollTo(0,0);
  }
  function abrir(archivo) {
    consultar();const i=lista.findIndex(x=>x.archivo===archivo);
    if(i===-1)return;
    mostrar(i);
    if(!cuadro.open)cuadro.showModal();
  }
  function iniciar(){
    document.head.appendChild(css);
    cuadro=document.createElement('dialog');cuadro.className='visor-integrado';
    cuadro.setAttribute('aria-label','Circuito ampliado y explicación');
    cuadro.innerHTML=`<div class="visor-interno">
      <div class="visor-superior"><div><strong id="visorTitulo"></strong>
      <div class="visor-sub" id="visorContador"></div></div>
      <button type="button" id="visorCerrar" aria-label="Cerrar visor">✕</button></div>
      <div class="visor-acciones">
        <button type="button" id="visorAnterior">← Anterior</button>
        <button type="button" id="visorSiguiente">Siguiente →</button>
        <span class="visor-expandir"></span>
        <button type="button" id="visorMenos" aria-label="Alejar">−</button>
        <strong id="visorValorZoom">100%</strong>
        <button type="button" id="visorMas" aria-label="Acercar">+</button>
        <button type="button" id="visorReiniciar">Restablecer</button>
      </div>
      <div class="visor-panel" id="visorPanel"><img id="visorImagen" alt=""></div>
      <div class="visor-explicacion"><h3 id="visorFuncion"></h3>
        <p id="visorDetalle"></p></div></div>`;
    document.body.appendChild(cuadro);
    $('visorCerrar').onclick=()=>cuadro.close();
    $('visorAnterior').onclick=()=>mostrar(actual-1);
    $('visorSiguiente').onclick=()=>mostrar(actual+1);
    $('visorMenos').onclick=()=>{zoom=Math.max(.75,zoom-.25);aplicarZoom()};
    $('visorMas').onclick=()=>{zoom=Math.min(3,zoom+.25);aplicarZoom()};
    $('visorReiniciar').onclick=()=>{zoom=1;aplicarZoom()};
    cuadro.addEventListener('click',e=>{if(e.target===cuadro)cuadro.close()});
    cuadro.addEventListener('keydown',e=>{
      if(e.key==='ArrowRight')mostrar(actual+1);
      if(e.key==='ArrowLeft')mostrar(actual-1);
    });
    // Funciona tanto pulsando la imagen como el botón de ampliación.
    document.addEventListener('click',e=>{
      const boton=e.target.closest('[data-ampliar]');
      if(boton){abrir(boton.dataset.ampliar);return;}
      const img=e.target.closest('[data-grafico]');
      if(img)abrir(img.dataset.grafico);
    });
    document.addEventListener('keydown',e=>{
      if((e.key==='Enter'||e.key===' ') && e.target.matches('img[data-grafico]')){
        e.preventDefault();abrir(e.target.dataset.grafico);
      }
    });
    consultar();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',iniciar);
  else iniciar();
})();
