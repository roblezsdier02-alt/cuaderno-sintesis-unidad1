/*
 * Síntesis de las cuatro primeras semanas del curso de Diseño de Circuitos.
 * Contiene teoría y esquemas SVG locales; no carga ni enlaza documentos.
 * Semana 5 reservada sin contenido no proporcionado.
 */
'use strict';
(function () {
  const BASE_CIRCUITOS = './assets/circuitos/';
  // Referencias de procedencia académica; no se publican las diapositivas ni prácticas.
  const referencias = {
    d1:'Semana 1 · Sistemas numéricos, códigos y compuertas lógicas',
    p1:'Semana 1 · Actividad práctica de compuertas y Logisim',
    d2:'Semana 2 · Álgebra de Boole y formas canónicas',
    p2:'Semana 2 · Actividad práctica de especificación y simplificación',
    d3:'Semana 3 · Mapas de Karnaugh',
    d3b:'Semana 3 · Condiciones indiferentes, NAND y NOR',
    p3:'Semana 3 · Actividad práctica de Karnaugh y detector BCD',
    d4:'Semana 4 · Circuitos aritméticos, suma y comparación',
    p4:'Semana 4 · Actividad práctica de sumadores'
  };

  // El circuito SVG usa símbolos ANSI o subcircuitos con etiquetas como en Logisim.
  // Los túneles con apóstrofo (A', B') denotan la salida de un inversor; se explicita en los pies.
  const circuitos = [
    {semana:1,tema:'Compuerta NOT',archivo:'01-not.svg',funcion:"Y = A'",prueba:'0→1; 1→0.'},
    {semana:1,tema:'Compuerta AND',archivo:'01-and.svg',funcion:'Y = A·B',prueba:'Solo 11 produce 1.'},
    {semana:1,tema:'Compuerta OR',archivo:'01-or.svg',funcion:'Y = A+B',prueba:'00 produce 0; las otras filas producen 1.'},
    {semana:1,tema:'Compuerta NAND',archivo:'01-nand.svg',funcion:"Y = (A·B)'",prueba:'Solo 11 produce 0.'},
    {semana:1,tema:'Compuerta NOR',archivo:'01-nor.svg',funcion:"Y = (A+B)'",prueba:'Solo 00 produce 1.'},
    {semana:1,tema:'Compuerta XOR',archivo:'01-xor.svg',funcion:'Y = A ⊕ B',prueba:'01 y 10 producen 1.'},
    {semana:1,tema:'Compuerta XNOR',archivo:'01-xnor.svg',funcion:"Y = (A ⊕ B)'",prueba:'00 y 11 producen 1.'},
    {semana:1,tema:'Encapsulado 74LS08 (DIP14)',archivo:'01-74ls08-dip14.svg',funcion:'4 compuertas AND; VCC en pin 14 y GND en pin 7',prueba:'Pines 1,2→3 y 4,5→6 comprobados en APE 001.'},
    {semana:1,tema:'Encapsulado 74LS02 (DIP14)',archivo:'01-74ls02-dip14.svg',funcion:'4 compuertas NOR; VCC en pin 14 y GND en pin 7',prueba:'Pines 2,3→1 y 5,6→4 comprobados en APE 001.'},
    {semana:1,tema:'Combinación AND–NOT–OR',archivo:'01-y-ab-mas-cnegada.svg',funcion:"Y = AB + C'",prueba:'A=1,B=0,C=0 ⇒ Y=1; A=B=C=1 ⇒ Y=1.'},
    {semana:2,tema:'SOP canónica · alarma',archivo:'02-alarma-canonica.svg',funcion:"F = A'BC+AB'C+ABC'+ABC",prueba:'F=1 exactamente en 3, 5, 6 y 7.'},
    {semana:2,tema:'POS canónica · alarma',archivo:'02-alarma-pos-canonica.svg',funcion:'F = ΠM(0,1,2,4)',prueba:'F=0 en 0,1,2,4; coincide con la SOP canónica.'},
    {semana:2,tema:'SOP simplificada · alarma',archivo:'02-alarma-simplificada.svg',funcion:'F = AB+AC+BC',prueba:'Misma tabla de verdad en las ocho filas.'},
    {semana:2,tema:'Simplificación algebraica',archivo:'02-simplificacion-algebraica.svg',funcion:'F = A+B',prueba:"Equivale a F=A+A'B+AB'C en las ocho filas."},
    {semana:2,tema:'Práctica · AB mayor que C',archivo:'02-comparador-practica.svg',funcion:"F=A+BC'",prueba:'F=1 en 010,100,101,110,111.'},
    {semana:3,tema:'Karnaugh · tres variables',archivo:'03-kmap-3-variables.svg',funcion:"F=C'+AB'",prueba:'Minitérminos 0,2,4,5,6.'},
    {semana:3,tema:'Karnaugh · SOP cuatro variables',archivo:'03-kmap-4-variables-sop.svg',funcion:"F=B'C'+B'D'+A'C'D",prueba:'Minitérminos 0,1,2,5,8,9,10.'},
    {semana:3,tema:'Karnaugh · POS cuatro variables',archivo:'03-kmap-4-variables-pos.svg',funcion:"F=(A'+B')(B'+D)(C'+D')",prueba:'Equivalente a la SOP anterior en las 16 combinaciones.'},
    {semana:3,tema:'BCD ≥ 5 con indiferentes',archivo:'03-bcd-mayor-igual-5.svg',funcion:'F=A+BD+BC',prueba:'F=1 para 5,6,7,8,9 entre los diez códigos válidos.'},
    {semana:3,tema:'BCD ≥ 5 · familia NAND',archivo:'03-bcd-solo-nand.svg',funcion:"F=NAND(A', (BD)', (BC)')",prueba:'Equivalente en BCD 0–9 a A+BD+BC.'},
    {semana:3,tema:'Red universal solo NOR',archivo:'03-or-solo-nor.svg',funcion:'OR(A,B) = NOR(NOR(A,B), NOR(A,B))',prueba:'La tabla final coincide con A+B en las cuatro filas.'},
    {semana:3,tema:'Primos BCD · versión canónica',archivo:'03-primos-bcd-canonico.svg',funcion:'F_can = Σm(2,3,5,7)',prueba:'F_can=1 en 2,3,5,7, 0 en las demás combinaciones.'},
    {semana:3,tema:'Primos BCD · función mínima',archivo:'03-primos-bcd-minimo.svg',funcion:"F=B'C+BD",prueba:'F=1 para los códigos 2,3,5,7; 10–15 son X.'},
    {semana:3,tema:'Primos BCD · cuatro NAND',archivo:'03-primos-bcd-nand.svg',funcion:"B'=NAND(B,B); F=NAND(NAND(B',C),NAND(B,D))",prueba:'Cuatro compuertas NAND de dos entradas y coincidencia en BCD válido.'},
    {semana:4,tema:'Semisumador HA',archivo:'04-semisumador.svg',funcion:'S=A⊕B; C=AB',prueba:'Las cuatro entradas: 00→00, 01→01, 10→01, 11→10 (C,S).'},
    {semana:4,tema:'Sumador completo FA',archivo:'04-sumador-completo.svg',funcion:'S=A⊕B⊕Cin; Cout=AB+A·Cin+B·Cin',prueba:'Ocho filas; Cout=1 con dos o tres unos.'},
    {semana:4,tema:'Sumador de cuatro bits',archivo:'04-sumador-4-bits.svg',funcion:'Cout(i)→Cin(i+1)',prueba:'0110+0111=1101; 0101+0011=1000.'},
    {semana:4,tema:'Verificación con el 7483',archivo:'04-comparacion-7483.svg',funcion:'Comparación de S[3:0] y Cout entre dos montajes',prueba:'Se aplican iguales A, B, Cin y se contrastan las salidas.'},
    {semana:4,tema:'Sumador/restador de cuatro bits',archivo:'04-sumador-restador-4-bits.svg',funcion:"Bᵢ' = Bᵢ ⊕ M; Cin₀ = M",prueba:'M=1: 0110−0011=0011; M=0: suma.'},
    {semana:4,tema:'Detección de overflow',archivo:'04-overflow.svg',funcion:'V=C3⊕C4',prueba:'0101+0100=1001 con V=1 en cuatro bits con signo.'},
    {semana:4,tema:'Comparador de igualdad',archivo:'04-comparador-igualdad.svg',funcion:'XNOR por bit y AND global',prueba:'F=1 exactamente cuando los cuatro pares de bits coinciden.'},
    {semana:4,tema:'Comparador de magnitud',archivo:'04-comparador-magnitud.svg',funcion:"A1B1'+(A1 XNOR B1)A0B0'",prueba:'10 > 01; el primer bit distinto de mayor peso decide.'}
  ];

  const esc = s => String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const tabla = (cab,filas,clase='') => `<div class="tabla-scroll"><table class="${esc(clase)}"><thead><tr>${cab.map(x=>`<th scope="col">${esc(x)}</th>`).join('')}</tr></thead><tbody>${filas.map(f=>`<tr>${f.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const formula = f=>`<div class="formula">${esc(f)}</div>`;
  const fuente = (id)=>`<span class="cita-fuente">Referencia de clase: ${esc(referencias[id] || 'Unidad 1 · Diseño de Circuitos')}</span>`;
  const fig = (archivo, texto)=>`<figure class="circuit-figure"><img loading="lazy" src="${BASE_CIRCUITOS+esc(archivo)}" alt="${esc(texto)}"><figcaption><span>${esc(texto)} · Esquema SVG de estudio; las etiquetas complementadas representan señales invertidas.</span><a href="${BASE_CIRCUITOS+esc(archivo)}" target="_blank" rel="noopener">Ampliar SVG ↗</a></figcaption></figure>`;
  const pasos = items=>`<ol class="pasos">${items.map(x=>`<li>${x}</li>`).join('')}</ol>`;
  const tablaPuertas = ()=> {
    const funciones = [
      ['AND',(a,b)=>a&b],['OR',(a,b)=>a|b],['NAND',(a,b)=>+( !(a&b))],['NOR',(a,b)=>+(!(a|b))],['XOR',(a,b)=>a^b],['XNOR',(a,b)=>+(a===b)]
    ];
    const filas=[[0,0],[0,1],[1,0],[1,1]].map(([a,b])=>[a,b,...funciones.map(([,f])=>f(a,b))]);
    return tabla(['A','B',...funciones.map(x=>x[0])],filas);
  };
  const tablaHA = ()=>tabla(['A','B','C','S'],[[0,0,0,0],[0,1,0,1],[1,0,0,1],[1,1,1,0]]);
  const tablaFA = ()=>tabla(['A','B','Cin','Cout','S'],Array.from({length:8},(_,i)=>{const a=(i>>2)&1,b=(i>>1)&1,c=i&1,t=a+b+c;return[a,b,c,t>=2?1:0,t%2];}));
  const tablaAlarma = ()=>tabla(['i','A','B','C','F'],Array.from({length:8},(_,i)=>{const a=(i>>2)&1,b=(i>>1)&1,c=i&1;return[i,a,b,c,+(a+b+c>=2)];}));
  const tablaPrimos = ()=>tabla(['BCD','A','B','C','D','F especificada'],Array.from({length:16},(_,i)=>[i,(i>>3)&1,(i>>2)&1,(i>>1)&1,i&1,i>9?'X':+([2,3,5,7].includes(i))]));
  const kmap4 = (indices,indifs=[])=>{
    const gray=[0,1,3,2],celdas=[];
    for(let i=0;i<4;i++){
      const fila=[gray[i].toString(2).padStart(2,'0')];
      for(let j=0;j<4;j++){
        const k=(gray[i]<<2)|gray[j];fila.push(indifs.includes(k)?'X':indices.includes(k)?'1':'0');
      }
      celdas.push(fila);
    }
    return tabla(['AB \\ CD','00','01','11','10'],celdas,'kmap');
  };
  const kmap3 = (indices)=>tabla(['A \\ BC','00','01','11','10'],[0,1].map(a=>[a,...[0,1,3,2].map(b=>indices.includes((a<<2)+b)?1:0)]),'kmap');

  const secciones = [
    {id:'portada',titulo:'Portada',grupo:'Inicio',numero:'00',resumen:'Presentación e identificación del cuaderno.',contenido:()=>`
      <div class="hero hero-academico">
        <div class="hero-encabezado"><div class="logo-placa"><img src="./assets/institucional/logo-unl.png" alt="Escudo y logotipo de la Universidad Nacional de Loja" width="340" height="115"></div><div class="hero-label">UNIVERSIDAD NACIONAL DE LOJA<br>CARRERA DE COMPUTACIÓN</div></div>
        <div class="hero-composicion"><div class="hero-textos"><div class="hero-etiqueta">ASIGNATURA · DISEÑO DE CIRCUITOS</div>
          <h1>Cuaderno digital <em>de síntesis</em></h1>
          <p class="hero-subtitulo">Unidad 1 · Análisis de lógica combinacional con diseño clásico</p>
          <p>Teoría, procedimientos, tablas de verdad y circuitos digitales desarrollados durante las semanas 1 a 4.</p>
          <div class="hero-metrics"><span>4 semanas de teoría</span><span>${circuitos.length} diagramas SVG</span><span>Semana 5 pendiente</span></div>
          <a class="btn btn-primary hero-cta" href="#indice">Consultar índice general →</a>
          </div><img class="hero-ilustracion" src="./assets/ilustraciones/portada-circuitos.svg" alt="Ilustración vectorial de compuertas, circuitos y señales binarias"></div>
      </div>
      <div class="sheet-content ficha-portada"><h2>Datos académicos</h2>
        <div class="ficha-academica"><div><small>ESTUDIANTE</small><strong>Sdier Emanuel Roblez Roblez</strong></div>
        <div><small>UNIVERSIDAD</small><strong>Universidad Nacional de Loja</strong></div>
        <div><small>ASIGNATURA</small><strong>Diseño de Circuitos</strong></div>
        <div><small>DOCENTE</small><strong>Ing. Luis Darío Sinche Cueva, Mg.</strong></div>
        <div><small>UNIDAD</small><strong>Unidad 1 · Lógica combinacional</strong></div>
        <div><small>PERIODO ACADÉMICO</small><strong>Septiembre 2026 – Marzo 2027</strong></div></div>
        <p class="presentacion-corta">Este cuaderno presenta de forma ordenada lo estudiado en la unidad, con explicaciones y ejemplos que relacionan las expresiones booleanas con su implementación mediante compuertas lógicas.</p>
        <a class="subir-indice" href="#indice">Ir al índice general →</a>
      </div>`},
    {id:'indice',titulo:'Índice general',grupo:'Inicio',numero:'01',resumen:'Accede directamente a cualquier sección, semana o tema.',contenido:()=>`<p>Elige cualquier tema. También puedes abrir el menú lateral, utilizar la búsqueda (Ctrl + K), o recorrer los temas con Anterior / Siguiente.</p><div id="indiceTarjetas" class="indice-grid"></div>`},
    {id:'introduccion',titulo:'Introducción',grupo:'Inicio',numero:'02',resumen:'Propósito, relevancia y organización.',contenido:()=>`
      <h3>Presentación</h3><p>Este cuaderno de síntesis organiza los contenidos de la Unidad 1 de Diseño de Circuitos, a partir de los contenidos estudiados en clase y las actividades práctico-experimentales. Integra teoría, procedimientos de resolución, tablas de verdad y circuitos vectoriales que permiten repasar las relaciones entre expresiones lógicas y conexiones.</p>
      <h3>Objetivo general</h3><p>Comprender y aplicar el análisis de lógica combinacional mediante sistemas numéricos, álgebra de Boole, formas canónicas, simplificación con Karnaugh y diseño de circuitos aritméticos, verificando las salidas con tablas de verdad y ejercicios del material.</p>
      <figure class="figura-ilustrativa"><img src="./assets/ilustraciones/proceso-diseno.svg" alt="Secuencia: enunciado, tabla de verdad, expresión booleana y circuito" loading="lazy"><figcaption>Proceso de diseño clásico de lógica combinacional.</figcaption></figure>
      <h3>Importancia de la unidad</h3><p>Las operaciones básicas de una computadora se construyen sobre señales binarias y funciones lógicas. Las técnicas del curso permiten transformar un problema verbal en señales, tablas, expresiones y circuitos físicos o simulados, además de analizar su costo y su retardo.</p>
      <div class="grid-2"><div class="mini"><h4>Semanas 1 y 2</h4><p>Fundamentos de representación y paso del enunciado a una función canónica o simplificada.</p></div><div class="mini"><h4>Semanas 3 y 4</h4><p>Minimización sistemática y ensamblaje de circuitos que realizan operaciones aritméticas y comparaciones.</p></div></div>
      <div class="tarjeta tarjeta-alerta"><strong>Alcance del cuaderno.</strong> Este cuaderno se limita a los contenidos de las semanas 1–4. El tema de la semana 5 está pendiente de información, por lo que no se inventan contenidos.</div>`},
    {id:'s1-fundamentos',titulo:'Sistemas binarios y niveles lógicos',grupo:'Semana 1',numero:'1.1',resumen:'Estados 0/1, márgenes de ruido y sistema posicional.',contenido:()=>`
      <h3>¿Por qué se usan dos estados?</h3><p>La electrónica digital representa los datos mediante dos niveles lógicos. Una señal 0 y una señal 1 son <strong>rangos de voltaje</strong>, no valores exactos. En la familia TTL 74LS, la explicación de clase distingue las garantías de entrada y salida y advierte que las entradas desconectadas pueden quedar indefinidas.</p>
      ${tabla(['Concepto','Valor mostrado en clase'],[['Entrada LOW (VIL)','≤ 0,8 V'],['Entrada HIGH (VIH)','≥ 2,0 V'],['Salida LOW (VOL)','≤ 0,5 V'],['Salida HIGH (VOH)','≥ 2,7 V'],['Zona no garantizada en la entrada','Entre 0,8 y 2,0 V']])}
      ${formula('Margen alto = 2,7 − 2,0 = 0,7 V     |     Margen bajo = 0,8 − 0,5 = 0,3 V')}
      <p><strong>Ejemplo del material:</strong> si una salida LOW de 0,5 V recibe una perturbación de 0,4 V, llegan 0,9 V. El valor entra en la zona indefinida y ya no puede interpretarse con seguridad como LOW.</p>
      <figure class="figura-ilustrativa"><img src="./assets/ilustraciones/pesos-binarios.svg" alt="Pesos posicionales 8, 4, 2, 1 para el binario 1011" loading="lazy"><figcaption>Pesos de un número binario de cuatro bits.</figcaption></figure>
      <h3>Sistema de numeración posicional</h3><p>El valor de cada dígito se obtiene multiplicándolo por una potencia de la base según la posición que ocupa. En binario los pesos son 1, 2, 4, 8, 16…</p>
      ${formula('1011₂ = 1·2³ + 0·2² + 1·2¹ + 1·2⁰ = 11₁₀')}
      <div class="tarjeta"><strong>Errores frecuentes:</strong> confundir nivel lógico con un voltaje único; dejar entradas flotantes; leer los pesos binarios de izquierda a derecha sin considerar la posición desde el extremo derecho.</div>${fuente('d1','4–8')}`},
    {id:'s1-conversiones',titulo:'Conversiones y suma binaria',grupo:'Semana 1',numero:'1.2',resumen:'Decimal, binario, octal, hexadecimal y acarreos.',contenido:()=>`
      <h3>Decimal a binario: divisiones sucesivas</h3>${pasos(['Divide el número decimal entre 2.','Anota el resto (0 o 1) de cada división.','Repite con el cociente entero hasta que sea 0.','Lee los restos desde el último hasta el primero.'])}
      ${tabla(['División','Cociente','Resto'],[['25÷2','12','1'],['12÷2','6','0'],['6÷2','3','0'],['3÷2','1','1'],['1÷2','0','1']])}
      ${formula('25₁₀ = 11001₂     ;     16 + 8 + 1 = 25')}
      <h3>Binario a octal y hexadecimal</h3><p>Agrupa desde la derecha de tres en tres bits para octal y de cuatro en cuatro para hexadecimal. Si falta una posición, añade ceros a la izquierda. El ejemplo de clase usa el valor decimal 157.</p>
      ${formula('157₁₀ = 10011101₂ = 9D₁₆ = 235₈')}
      <h3>Actividad 1: resultados comprobables</h3>
      ${tabla(['Ejercicio presentado','Resultado'],[['45₁₀ a binario y hexadecimal','101101₂ ; 2D₁₆'],['A7₁₆ a decimal','10·16 + 7 = 167₁₀'],['11100101₂ a hexadecimal y octal','E5₁₆ ; 345₈']])}
      <h3>Suma binaria y acarreo</h3><p>Cuando se suman dos unos, el resultado es 10₂: se escribe 0 en la columna y se lleva 1 a la siguiente. Con tres unos el resultado es 11₂.</p>
      ${tabla(['Operación','Resultado'],[['0+0','0'],['0+1','1'],['1+0','1'],['1+1','10'],['1+1+1','11']])}
      ${formula('1011₂ (11) + 0110₂ (6) = 10001₂ (17)')}
      <p><strong>Error frecuente:</strong> descartar un acarreo de salida sin que el problema especifique un número fijo de bits. La truncación solo tiene sentido cuando la anchura del dato está fijada.</p>${fuente('d1','9–12')}`},
    {id:'s1-signos-codigos',titulo:'Complemento a dos y códigos',grupo:'Semana 1',numero:'1.3',resumen:'Negativos, overflow, BCD, Gray y ASCII.',contenido:()=>`
      <h3>Números con signo mediante complemento a dos</h3><p>En cuatro bits, el rango representable es de −8 a +7. Para hallar el negativo de un número positivo se invierten los bits y se suma uno.</p>
      ${pasos(['Representa +3 con cuatro bits: 0011.','Invierte los cuatro bits: 1100.','Suma 1: 1101, que representa −3.','La resta 5−3 se calcula como 0101+1101 = 1 0010; se conserva 0010.'])}
      ${formula('−3 en 4 bits = 1101     ;     5 − 3 = 0101 + 1101 → 0010')}
      <p>El ejemplo 0111+0001=1000 muestra <strong>desbordamiento con signo</strong>: dos positivos generan un patrón que, interpretado en complemento a dos de 4 bits, es negativo. La detección mediante circuitos se estudia en la semana 4.</p>
      <h3>Código BCD (decimal codificado en binario)</h3><p>Cada dígito decimal se representa por separado con cuatro bits. Por ejemplo, el número 157 en BCD se escribe como 0001 0101 0111. Los patrones 1010 a 1111 son inválidos para un solo dígito decimal.</p>
      <h3>Código Gray</h3><p>Se ordenan códigos adyacentes de modo que cambie un solo bit: 00, 01, 11, 10. Este orden es esencial al elaborar mapas de Karnaugh porque hace visibles las vecindades lógicas. Se explica su empleo en encoders y sensores rotativos.</p>
      <h3>ASCII</h3><p>El ASCII original usa 7 bits para 128 códigos. En clase se ilustran las letras HOLA mediante 72, 79, 76 y 65 en decimal; la letra A se representa por 65 (01000001 en un byte).</p>
      ${tabla(['Código','Propósito','Ejemplo de clase'],[['BCD','Dígitos para displays','157 → 0001 0101 0111'],['Gray','Transiciones de un bit','00→01→11→10'],['ASCII','Representación de texto','A → 65 (decimal)']])}
      <div class="tarjeta"><strong>Atención:</strong> 157 en binario natural (10011101) y 157 en BCD (0001 0101 0111) codifican el mismo número con reglas distintas.</div>${fuente('d1','13–19')}`},
    {id:'s1-compuertas',titulo:'Las siete compuertas lógicas',grupo:'Semana 1',numero:'1.4',resumen:'Símbolos ANSI, expresiones y tablas de verdad.',contenido:()=>`
      <h3>Operadores de lógica combinacional</h3><p>NOT invierte un bit; AND da 1 cuando todas sus entradas son 1; OR da 1 cuando alguna es 1. NAND y NOR son sus negaciones; XOR detecta entradas diferentes y XNOR detecta entradas iguales. Sus símbolos de estudio usan el contorno ANSI y la burbuja de negación.</p>
      ${tabla(['Compuerta','Función','Condición de salida 1'],[['NOT',"A'",'Cuando A=0'],['AND','AB','A=1 y B=1'],['OR','A+B','Al menos una entrada=1'],['NAND',"(AB)'",'Todas salvo 11'],['NOR',"(A+B)'",'Solo 00'],['XOR','A⊕B','A y B distintos'],['XNOR',"(A⊕B)'",'A y B iguales']])}
      <h3>Tabla de verdad conjunta de dos entradas</h3>${tablaPuertas()}
      <h3>Un circuito compuesto</h3><p>La actividad de la semana 1 y la introducción de la semana 2 utilizan la expresión Y = AB + C'. Primero se computa AB con AND y C' con NOT; luego ambas señales ingresan a OR. La prioridad lógica es NOT → AND → OR.</p>
      ${fig('01-y-ab-mas-cnegada.svg',"Dos etapas: AND(A,B), NOT(C) y OR final")}
      ${tabla(['A','B','C','AB',"C'",'Y'],Array.from({length:8},(_,i)=>{let a=(i>>2)&1,b=(i>>1)&1,c=i&1;return[a,b,c,a&b,1-c,(a&b)|(1-c)];}))}
      <h3>Laboratorio interactivo (verificación didáctica)</h3><div class="lab no-imprimir"><p>Cambia las entradas: el resultado se calcula con la misma función booleana de la tabla.</p><div class="lab-control"><label for="simPuerta">Compuerta</label><select id="simPuerta"><option>AND</option><option>OR</option><option>NOT</option><option>NAND</option><option>NOR</option><option>XOR</option><option>XNOR</option></select><label>Entrada A <button id="bitA" class="bit-btn" type="button" data-bit="0">0</button></label><label id="grupoBitB">Entrada B <button id="bitB" class="bit-btn" type="button" data-bit="0">0</button></label><span class="resultado-lab" id="simSalida">Y = 0</span></div></div>
      <div class="circuit-grid">${['NOT','AND','OR','NAND','NOR','XOR','XNOR'].map(x=>fig('01-'+x.toLowerCase()+'.svg','Compuerta '+x)).join('')}</div>
      <div class="tarjeta"><strong>Observación de la práctica:</strong> una entrada sin conectar no representa automáticamente un cero lógico garantizado. Comprueba cómo la herramienta Pulsar y los pines cambian los niveles en el simulador.</div>${fuente('d1','20–25')}${fuente('p1','2–10')}`},
    {id:'s1-practica',titulo:'Práctica 001 · Logisim Evolution',grupo:'Semana 1',numero:'1.5',resumen:'Configuración, herramientas, pines, LED y 74LS.',contenido:()=>`
      <h3>Propósito de la práctica</h3><p>Reconocer el entorno del simulador y comprobar en papel y simulación las compuertas AND, OR, NOT, NAND, NOR, XOR y XNOR. El procedimiento indica preparar primero la predicción de la tabla de verdad y contrastarla con la simulación.</p>
      ${pasos(['Ubica el panel de bibliotecas, el lienzo, las propiedades y las herramientas Seleccionar y Pulsar.','Coloca Power (1), Ground (0), pines, sonda y LED; inspecciona los niveles.','Construye cada compuerta con entradas etiquetadas y una salida visible.','Recorre las cuatro combinaciones de las compuertas binarias y las dos de NOT.','Comprueba las familias 74LS08 (AND) y 74LS02 (NOR) a partir de sus hojas de datos.'])}
      <div class="grid-2"><div class="mini"><h4>74LS08</h4><p>Cuatro compuertas AND de dos entradas. La práctica pide identificar su ubicación y comprobar sus salidas.</p></div><div class="mini"><h4>74LS02</h4><p>Cuatro compuertas NOR de dos entradas. Su tabla debe ser la negación de OR.</p></div></div>
      <h3>Encapsulados de la práctica</h3><p>Ambos integrados usan un encapsulado DIP de 14 pines. La lección de 74LS08 muestra alimentación en pin 14 y tierra en el 7; el reporte APE 001 confirma las posiciones de entrada y salida de las dos primeras compuertas de ambos integrados.</p>
      <div class="circuit-grid">${fig('01-74ls08-dip14.svg','Mapa de pines DIP14 del 74LS08')}${fig('01-74ls02-dip14.svg','Mapa de pines DIP14 del 74LS02')}</div>
      <h3>Resultado lógico esperado</h3>${tablaPuertas()}
      <p>Las tablas anteriores son verificaciones matemáticas de las funciones, no capturas ni una afirmación de haber ejecutado el software. Los esquemas permiten revisar las conexiones; no sustituyen una simulación de Logisim.</p>${fuente('p1','1–10')}`},
    {id:'s2-boole',titulo:'Álgebra de Boole y sus leyes',grupo:'Semana 2',numero:'2.1',resumen:'Identidad, absorción, adyacencia, consenso y De Morgan.',contenido:()=>`
      <h3>Operaciones y dualidad</h3><p>En el conjunto {0,1}, la suma booleana (+) representa OR, el producto (·) representa AND y el apóstrofo (') representa complemento o NOT. El principio de dualidad intercambia + con · y 0 con 1, conservando la validez de las identidades.</p>
      ${tabla(['Propiedad','Forma OR','Forma AND'],[['Identidad','X + 0 = X','X·1 = X'],['Elemento nulo','X + 1 = 1','X·0 = 0'],['Idempotencia','X + X = X','X·X = X'],['Complemento',"X + X' = 1","X·X' = 0"],['Absorción','X + XY = X','X(X+Y) = X'],['Distributiva','X+YZ=(X+Y)(X+Z)','X(Y+Z)=XY+XZ'],['Adyacencia',"XY + XY' = X","(X+Y)(X+Y') = X"]])}
      <h3>Leyes de De Morgan</h3>${formula("(A+B)' = A'B'     |     (AB)' = A'+B'")}
      <p>Al negar una suma, cada variable se complementa y la operación se convierte en producto; al negar un producto se transforma en suma de complementos. Esto permite diseñar con NAND y NOR.</p>
      <h3>Ejemplo de simplificación trabajado en clase</h3>${pasos(["Partimos de F=A+A'B+AB'C.","Aplicamos la absorción del complemento: A+A'B=A+B.","Reagrupamos: F=A+B+AB'C.","Aplicamos absorción A+AX=A, obteniendo F=A+B."])}
      ${formula("F = A + A'B + AB'C = A + B")}${fig('02-simplificacion-algebraica.svg','Circuito final equivalente con una compuerta OR')}
      <p><strong>Comprobación solicitada en clase:</strong> para A=0, B=0, C=1, ambas expresiones dan F=0.</p>
      <div class="tarjeta"><strong>Errores frecuentes:</strong> confundir álgebra común con booleana (1+1=1 en OR), omitir complementos y aplicar De Morgan sin cambiar el operador.</div>${fuente('d2','6–9, 22–23')}`},
    {id:'s2-canonicas',titulo:'Minitérminos, maxitérminos y SOP/POS',grupo:'Semana 2',numero:'2.2',resumen:'De un enunciado a la tabla, Σm y ΠM.',contenido:()=>`
      <h3>Especificar antes de diseñar</h3><p>La expresión «cuando se activan dos sensores» puede significar exactamente dos o al menos dos. La clase usa el segundo significado para la alarma de tres sensores A, B y C, y por tanto incluye 111 como una fila activa. Resolver la ambigüedad del enunciado es indispensable.</p>
      ${tablaAlarma()}
      <h3>Forma canónica SOP</h3><p>Para cada fila F=1 se obtiene un minitérmino (producto de todas las variables), y se suman con OR. Una variable que vale 0 se complementa dentro del minitérmino.</p>
      ${formula("F = Σm(3,5,6,7) = A'BC + AB'C + ABC' + ABC")}
      ${fig('02-alarma-canonica.svg','SOP canónica: cuatro minitérminos hacia OR')}
      <h3>Forma canónica POS</h3><p>Para cada fila F=0 se escribe un maxitérmino (suma que vale cero en esa fila), y todos los maxitérminos se unen con AND.</p>
      ${formula("F = ΠM(0,1,2,4) = (A+B+C)(A+B+C')(A+B'+C)(A'+B+C)")}
      ${fig('02-alarma-pos-canonica.svg','POS canónica: cuatro maxitérminos hacia AND')}
      <div class="tarjeta"><strong>Regla de comprobación:</strong> entre Σm y ΠM deben aparecer todos los índices de 0 a 7 una sola vez. SOP y POS describen la misma función. Ambas versiones canónicas se derivan de la misma tabla.</div>${fuente('d2','5, 10–17')}`},
    {id:'s2-simplificacion',titulo:'Alarma: circuito simplificado',grupo:'Semana 2',numero:'2.3',resumen:'Equivalencia, costo y simplificación de la función.',contenido:()=>`
      <h3>Resolución por adyacencia</h3><p>La resolución utiliza idempotencia para repetir ABC en parejas y eliminar una variable de cada par adyacente:</p>
      ${pasos(["A'BC + ABC = BC(A'+A) = BC.","AB'C + ABC = AC(B'+B) = AC.","ABC' + ABC = AB(C'+C) = AB.","La unión de los tres grupos da F=AB+AC+BC."])}
      ${formula('F = AB + AC + BC')}
      ${fig('02-alarma-simplificada.svg','Tres compuertas AND alimentan una OR de tres entradas')}
      ${tablaAlarma()}
      <h3>Comparación de costo de la clase</h3>${tabla(['Versión','Circuitos integrados 74LS mostrados'],[['SOP canónica','7404 + 2×7411 + 7432 = 4 encapsulados'],['SOP simplificada','7408 + 7432 = 2 encapsulados']])}
      <p>La forma simplificada elimina inversores y reduce hardware para la implementación considerada. La verificación no se basa solo en contar compuertas: las dos versiones deben coincidir fila por fila.</p>
      <div class="tarjeta"><strong>Observación:</strong> una expresión algebraicamente más corta no garantiza por sí sola menor costo en cualquier tecnología; depende de las compuertas, el número de entradas, los integrados y los niveles de lógica.</div>${fuente('d2','18–19, 25')}`},
    {id:'s2-practica',titulo:'Práctica 002 · Comparación AB > C',grupo:'Semana 2',numero:'2.4',resumen:'El caso documentado del grupo 2 con tabla y simplificación.',contenido:()=>`
      <h3>Enunciado documentado</h3><p>La práctica del grupo compara el número binario de dos bits AB (A es el bit de peso 2 y B de peso 1) con el número de un bit C. La salida F debe valer 1 si el valor representado por AB es estrictamente mayor que C.</p>
      ${tabla(['i','A','B','C','Valor AB','F=AB>C'],Array.from({length:8},(_,i)=>{let a=(i>>2)&1,b=(i>>1)&1,c=i&1;return[i,a,b,c,2*a+b,+(2*a+b>c)];}))}
      <h3>Derivación y formas canónicas</h3>
      ${formula("F = Σm(2,4,5,6,7) = ΠM(0,1,3)")}
      <p>Si A=1, AB vale 2 o 3 y siempre supera a C. Si A=0, AB solo supera a C en el caso B=1 y C=0.</p>
      ${formula("F = A + B·C'")}
      ${fig('02-comparador-practica.svg',"Inversor sobre C, AND(B,C') y OR final con A")}
      <p><strong>Comprobación:</strong> 010 representa AB=1 y C=0, por eso F=1; 011 compara 1 con 1, por eso F=0; 101 compara 2 con 1, por eso F=1. Coincide con la tabla registrada en la práctica.</p>
      <h3>Trabajo en Logisim</h3>${pasos(['Elabora la tabla en papel, define el significado del 0 y del 1 de cada señal.','Monta la forma canónica y la simplificada como subcircuitos diferentes.','Comprueba las ocho combinaciones en ambos circuitos.','Usa Analizar circuito solo para verificar las tablas, no para construir automáticamente el diseño.'])}
      ${fuente('p2','4–11')}`},
    {id:'s3-karnaugh',titulo:'Mapas de Karnaugh: reglas',grupo:'Semana 3',numero:'3.1',resumen:'Código Gray, agrupaciones y lectura de términos.',contenido:()=>`
      <h3>¿Para qué sirve el mapa?</h3><p>Los mapas de Karnaugh organizan la tabla de verdad para localizar términos que difieren en una sola variable. Su orden Gray (00, 01, 11, 10) hace que las celdas contiguas representen combinaciones adyacentes.</p>
      ${formula("XY + XY' = X")}
      ${pasos(['Coloca los valores 0, 1 y, si procede, X en las celdas del mapa.','Agrupa 1 en bloques rectangulares de 1, 2, 4, 8 o 16 celdas; evita diagonales y grupos en L.','Considera vecinos los bordes opuestos y las cuatro esquinas.','Selecciona primero implicantes primos esenciales y luego los necesarios para cubrir los demás unos.','Lee las variables constantes de cada grupo: valor 1 se conserva directo; valor 0 se complementa; si cambia, desaparece.'])}
      <h3>Mapa de tres variables del reto inicial</h3><p>El ejemplo plantea F(A,B,C)=Σm(0,2,4,5,6). Un grupo de cuatro unos elimina A y B dejando C'. Un grupo de dos conserva A=1 y B=0, dando AB'.</p>
      ${kmap3([0,2,4,5,6])}
      ${formula("F = C' + AB'")}${fig('03-kmap-3-variables.svg',"Circuito SOP equivalente al mapa de tres variables")}
      <div class="tarjeta"><strong>Errores frecuentes:</strong> ordenar las columnas como 00,01,10,11; agrupar diagonalmente; crear grupos de tres celdas; no considerar el contacto de los bordes.</div>${fuente('d3','4–12')}`},
    {id:'s3-sop-pos',titulo:'Karnaugh de 4 variables: SOP y POS',grupo:'Semana 3',numero:'3.2',resumen:'Ejemplo de siete minitérminos, implicantes y dualidad.',contenido:()=>`
      <h3>Ejemplo guiado de la presentación</h3>${formula('F(A,B,C,D) = Σm(0,1,2,5,8,9,10)')}
      ${kmap4([0,1,2,5,8,9,10])}
      <h3>Agrupación en suma de productos</h3><p>En el ejemplo se identifican: m0,m1,m8,m9 → B'C'; las cuatro esquinas m0,m2,m8,m10 → B'D'; y el par m1,m5 → A'C'D.</p>
      ${formula("SOP mínima: F = B'C' + B'D' + A'C'D")}
      ${fig('03-kmap-4-variables-sop.svg','Circuito de tres términos producto')}
      <h3>Agrupación de ceros en producto de sumas</h3><p>Se agrupan ceros con la lectura complementaria que corresponde a POS. El material obtiene una alternativa con seis literales.</p>
      ${formula("POS mínima: F = (A'+B')(B'+D)(C'+D')")}
      ${fig('03-kmap-4-variables-pos.svg','Circuito de tres sumas alimentando una AND')}
      <p>En este ejemplo las expresiones de clase tienen 7 literales (SOP) y 6 literales (POS). La elección de implementación requiere además revisar compuertas e integrados.</p>
      <p><strong>Implicante primo:</strong> no puede ampliarse. <strong>Primo esencial:</strong> es el único que cubre al menos un 1 de la función. Debe aparecer en la solución.</p>${fuente('d3','9–15')}`},
    {id:'s3-indiferentes',titulo:'Condiciones indiferentes (X)',grupo:'Semana 3',numero:'3.3',resumen:'BCD ≥ 5, valores imposibles y minimización.',contenido:()=>`
      <h3>¿Qué significa una X?</h3><p>Cuando una combinación nunca puede presentarse según la especificación, puede tratarse como indiferente. En BCD de un dígito solo se usan 0–9; las seis combinaciones de 10–15 no son códigos válidos. Las X pueden incluirse en un grupo para ampliarlo o ignorarse si no ayudan, pero no se construye un grupo formado únicamente por X.</p>
      <h3>Ejemplo de clase: dígito BCD mayor o igual que 5</h3>
      ${formula('F = Σm(5,6,7,8,9) + d(10,11,12,13,14,15)')}
      ${kmap4([5,6,7,8,9],[10,11,12,13,14,15])}
      ${tabla(['Tratamiento','Función obtenida en clase','Literales'],[['Sin aprovechar X',"AB'C' + A'BD + A'BC",9],['Aprovechando X','A + BD + BC',5]])}
      ${fig('03-bcd-mayor-igual-5.svg','Detector de dígitos BCD 5, 6, 7, 8 y 9')}
      <p><strong>Comprobación del dominio válido:</strong> los dígitos 0–4 producen 0; los dígitos 5–9 producen 1. Fuera de 0–9 la especificación no establece un resultado.</p>
      <div class="tarjeta tarjeta-alerta"><strong>Restricción importante:</strong> en una aplicación que pueda recibir estados erróneos o peligrosos no debe suponerse que esos estados son imposibles; debe definirse el comportamiento seguro.</div>${fuente('d3b','4–6')}`},
    {id:'s3-nand-nor',titulo:'Implementaciones solo NAND y solo NOR',grupo:'Semana 3',numero:'3.4',resumen:'Universalidad, redes NAND–NAND y economía de hardware.',contenido:()=>`
      <h3>NAND y NOR como compuertas universales</h3><p>Se pueden construir NOT, AND y OR empleando exclusivamente NAND. NOR proporciona una implementación dual; por ello las expresiones SOP tienden a convertirse en redes NAND–NAND y las POS en NOR–NOR.</p>
      ${tabla(['Función','Solo NAND','Solo NOR'],[['NOT',"(AA)'","(A+A)'"],['AND',"((AB)')'","(A'+B')'"],['OR',"(A'B')'","((A+B)')'"]])}
      <h3>Ejemplo a partir de F=A+BD+BC</h3>${pasos(['Escribe la SOP mínima del ejemplo BCD≥5: F=A+BD+BC.','Aplica doble negación: F=((A+BD+BC)\')\'.','Usa De Morgan: F=(A\'·(BD)\'·(BC)\')\'.','Implementa los productos negados con NAND; la primera señal A\' se obtiene con NAND(A,A).','La NAND final debe aceptar tres entradas; en clase se menciona 7400 (2 entradas) y 7410 (3 entradas).'])}
      ${formula("F = NAND(A', NAND(B,D), NAND(B,C))")}
      ${fig('03-bcd-solo-nand.svg','Red equivalente con dos NAND de productos, una de inversión y NAND final de tres entradas')}
      <h3>Ejemplo con una sola familia NOR</h3><p>La tabla de la sesión expone el caso dual de NAND. Para construir OR(A,B), una primera NOR produce N=(A+B)' y una segunda NOR con ambas entradas unidas invierte N.</p>
      ${fig('03-or-solo-nor.svg','Dos compuertas NOR implementan A+B')}
      <h3>Recuento del material</h3>${tabla(['Versión','Encapsulados según la clase'],[['Sin aprovechar X','7404 + 7411 + 7432 = 3'],['Con X, AND–OR','7408 + 7432 = 2'],['Con X, solo NAND','7400 + 7410 = 2']])}
      <p>Menos literales ayudan, pero el ahorro real depende de la organización de los circuitos integrados y sus entradas disponibles.</p>${fuente('d3b','7–11')}`},
    {id:'s3-practica',titulo:'Práctica 003 · Detector de primos BCD',grupo:'Semana 3',numero:'3.5',resumen:'Tabla, Karnaugh, cuatro NAND y equivalencia válida.',contenido:()=>`
      <h3>Enunciado de la práctica</h3><p>Un teclado numérico transmite un dígito BCD de cuatro bits A B C D. El LED F debe encenderse si el dígito es primo (2, 3, 5 o 7) y mantenerse apagado para los demás dígitos 0–9.</p>
      ${tablaPrimos()}
      ${formula('F = Σm(2,3,5,7) + d(10,11,12,13,14,15)')}
      <h3>Montaje canónico antes de minimizar</h3><p>La salida del circuito canónico se forma con cuatro minitérminos AND de cuatro entradas unidos mediante OR, siguiendo la especificación de los dígitos primos.</p>
      ${fig('03-primos-bcd-canonico.svg','Versión SOP canónica con m2, m3, m5 y m7')}
      <h3>Sin X y con X</h3>${tabla(['Variante','Expresión documentada'],[['Sin condiciones indiferentes',"F = A'B'C + A'BD"],['Con condiciones indiferentes',"F = B'C + BD"]])}
      ${pasos(['Coloca 1 en m2, m3, m5 y m7, 0 en los otros dígitos 0–9 y X en m10–m15.','Agrupa m2,m3 con m10,m11 (indiferentes): aparece B\'C.','Agrupa m5,m7 con m13,m15 (indiferentes): aparece BD.','La expresión F=B\'C+BD usa dos productos y una suma.','Comprueba los 10 códigos válidos y reconoce que las X no exigen coincidencia.'])}
      ${fig('03-primos-bcd-minimo.svg','Detector mínimo: inversor B, dos AND y una OR')}
      <h3>Una sola familia 74LS00</h3>${pasos(['Invierte B mediante N0=NAND(B,B).','Calcula N1=NAND(B\',C) y N2=NAND(B,D).','Calcula F=NAND(N1,N2).','El circuito contiene cuatro NAND de dos entradas: corresponde a un encapsulado 74LS00.'])}
      ${fig('03-primos-bcd-nand.svg','Cuatro compuertas NAND del circuito integrado 74LS00')}
      <p><strong>Comprobación descrita en el reporte:</strong> las versiones canónica y mínima coinciden en 0–9, aunque pueden diferir en 10–15; por ejemplo 1101 da F_can=0 y F_min=1. Esto no contradice la especificación del teclado BCD.</p>
      <div class="tarjeta"><strong>Resultado de costo del reporte:</strong> la versión canónica requiere cuatro encapsulados y la NAND uno (ahorro documentado del 75 % en ese recuento).</div>${fuente('p3','2–4, 10–15')}`},
    {id:'s4-suma-binaria',titulo:'Aritmética binaria y acarreo',grupo:'Semana 4',numero:'4.1',resumen:'Columnas, suma de cuatro bits y retardo.',contenido:()=>`
      <h3>¿Cómo suma un circuito?</h3><p>La salida S guarda el bit que se escribe y C guarda el acarreo que se transfiere a la columna siguiente. En la columna menos significativa se suman A y B; a partir de la siguiente se suma además el acarreo Cin.</p>
      ${tabla(['Suma de la columna','Bit S','Acarreo C'],[['0+0','0','0'],['0+1','1','0'],['1+0','1','0'],['1+1','0','1'],['1+1+1','1','1']])}
      <h3>Ejemplo de clase: 0110 + 0111</h3>
      ${tabla(['Bit','A','B','Cin','S','Cout'],[[0,0,1,0,1,0],[1,1,1,0,0,1],[2,1,1,1,1,1],[3,0,0,1,1,0]])}
      ${formula('0110₂ + 0111₂ = 1101₂     ;     6 + 7 = 13')}
      <p>La columna 1 genera un acarreo hacia la 2, que vuelve a propagarlo hacia la 3. Esta dependencia motiva los sumadores en cascada.</p>${fuente('d4','3–6')}`},
    {id:'s4-semisumador',titulo:'Semisumador (HA)',grupo:'Semana 4',numero:'4.2',resumen:'XOR para la suma y AND para el acarreo.',contenido:()=>`
      <h3>Tabla de verdad del semisumador</h3>${tablaHA()}
      ${formula('S = A ⊕ B       ;       C = A·B')}
      ${fig('04-semisumador.svg','Dos compuertas alimentadas por los mismos bits A y B')}
      <p>Cuando A=B=1 la suma aritmética es 2 (10₂): S=0 y C=1. El semisumador no tiene entrada de acarreo, por lo que por sí solo no sirve para las columnas donde llega Cin.</p>
      <div class="tarjeta"><strong>Procedimiento de verificación:</strong> recorre 00, 01, 10 y 11; registra por separado S y C; confirma la equivalencia entre la tabla y las salidas XOR/AND.</div>${fuente('d4','6–8')}${fuente('p4','2')}`},
    {id:'s4-sumador-completo',titulo:'Sumador completo (FA)',grupo:'Semana 4',numero:'4.3',resumen:'Tres entradas, dos semisumadores y una OR.',contenido:()=>`
      <h3>Tres entradas: A, B y Cin</h3><p>La suma S vale 1 si hay un número impar de unos entre las tres entradas. Cout vale 1 si al menos dos entradas son 1.</p>
      ${tablaFA()}
      ${formula('S = A ⊕ B ⊕ Cin')}
      ${formula('Cout = AB + A·Cin + B·Cin')}
      <h3>Construcción de la práctica</h3>${pasos(['El primer HA suma A y B: genera S1=A⊕B y C1=AB.','El segundo HA suma S1 con Cin: genera S=S1⊕Cin y C2=S1·Cin.','Una OR une los acarreos: Cout=C1+C2.','La última expresión es equivalente a la función mayoría de la tabla.'])}
      ${fig('04-sumador-completo.svg','Dos subcircuitos HA y una OR de acarreos')}
      <p>La práctica requiere comprobar las ocho combinaciones y contrastar el montaje con las ecuaciones obtenidas en los mapas de Karnaugh de S y Cout.</p>${fuente('d4','9–13')}${fuente('p4','1–3')}`},
    {id:'s4-sumador4',titulo:'Sumador de cuatro bits y retardo ripple',grupo:'Semana 4',numero:'4.4',resumen:'Cascada de cuatro FA, 7483 y estimación temporal.',contenido:()=>`
      <h3>Sumador en cascada</h3><p>Cuatro bloques FA conectan su acarreo en orden: Cout de la etapa 0 alimenta Cin de la etapa 1, y así sucesivamente hasta la salida de la etapa 3. Para una suma A+B se fija Cin0=0.</p>
      ${fig('04-sumador-4-bits.svg','FA0 a FA3 con arrastre del acarreo hacia el bit más significativo')}
      <h3>Demostraciones de la clase</h3>${tabla(['A','B','Resultado sin signo','Observación'],[['0110 (6)','0111 (7)','1101 (13)','Suma de clase'],['0101 (5)','0011 (3)','1000 (8)','Correcto sin signo; overflow con signo']])}
      <p>La práctica también propone comparar el sumador de cuatro FA con el integrado 7483, usando las mismas entradas.</p>
      ${fig('04-comparacion-7483.svg','Ensayo de equivalencia: cuatro FA frente a 7483 con las mismas entradas')}
      <h3>Estimación del retardo</h3><p>La clase modela un acarreo que atraviesa aproximadamente dos compuertas por etapa, cada una con demora aproximada de 10 ns.</p>
      ${formula('t ≈ 2 · n · 10 ns')}
      ${tabla(['Número de bits','Retardo aproximado'],[['4','80 ns'],['16','320 ns'],['32','640 ns']])}
      <div class="tarjeta"><strong>Importante:</strong> es una <em>estimación didáctica</em> de propagación, no una medición real de un circuito integrado ni una especificación universal.</div>${fuente('d4','14–16, 22')}${fuente('p4','2, 5')}`},
    {id:'s4-resta-overflow',titulo:'Sumador/restador y overflow',grupo:'Semana 4',numero:'4.5',resumen:'XOR controlada por M, complemento a dos y V.',contenido:()=>`
      <h3>Un circuito para sumar y restar</h3><p>La señal de control M se conecta a una XOR junto con cada bit Bᵢ y, simultáneamente, a Cin0. Si M=0, B pasa sin cambio y Cin0=0; si M=1, B se invierte y Cin0 agrega el 1 del complemento a dos.</p>
      ${formula('Bᵢ modificado = Bᵢ ⊕ M       ;       Cin0 = M')}
      ${fig('04-sumador-restador-4-bits.svg','Cuatro XOR sobre B y cuatro FA en cascada, con control M compartido')}
      <h3>Ejemplo de resta de la semana</h3>${pasos(['A=0110 (6); B=0011 (3); selecciona M=1.','Invierte B: 1100; añade Cin0=1 para obtener −3 en complemento a dos.','Suma 0110+1101 = 1 0011.','Descarta el acarreo extra de la palabra de 4 bits: S=0011 (3).'])}
      ${formula('0110 − 0011 = 0011 (en cuatro bits)')}
      <h3>Detección de desbordamiento con signo</h3><p>Hay overflow si el acarreo que entra al bit de signo (C3) es distinto del acarreo que sale de él (C4).</p>
      ${formula('V = C3 ⊕ C4')}
      ${fig('04-overflow.svg','XOR entre los acarreos C3 y C4; salida V')}
      <p><strong>Ejemplo de clase:</strong> 0101 (+5) + 0100 (+4) da 1001, que en cuatro bits con signo se interpreta como −7; la suma matemática (+9) no cabe en el rango de −8 a +7, por lo que V=1. Cout=1, por sí solo, no prueba un desbordamiento con signo.</p>${fuente('d4','17–19')}${fuente('p4','1–4')}`},
    {id:'s4-comparador',titulo:'Comparadores de igualdad y magnitud',grupo:'Semana 4',numero:'4.6',resumen:'XNOR por bit, prioridad del más significativo.',contenido:()=>`
      <h3>Igualdad A = B</h3><p>Se conecta una XNOR por cada par de bits para obtener 1 cuando son iguales. Una AND final produce 1 solo si todos los pares coinciden.</p>
      ${fig('04-comparador-igualdad.svg','Cuatro XNOR alimentan una AND de cuatro entradas')}
      <h3>Magnitud A > B</h3><p>El primer bit diferente desde la posición más significativa decide cuál número es mayor. Para dos bits, A gana si supera a B en el bit alto, o si empatan en el bit alto y A supera a B en el bit bajo.</p>
      ${formula("F = A1·B1' + (A1 XNOR B1)·A0·B0'")}
      ${fig('04-comparador-magnitud.svg','Circuito de dos bits: victoria del bit alto o empate seguido de victoria del bit bajo')}
      <p><strong>Ejercicio de clase:</strong> A=10₂ y B=01₂. A&gt;B es verdadero, A=B es falso. En clase se menciona el integrado comparador 7485.</p>
      <div class="tarjeta"><strong>Nota de elaboración:</strong> la expresión de dos bits se escribe como desarrollo algebraico de la regla verbal desarrollada en clase; es una deducción algebraica del procedimiento.</div>${fuente('d4','20, 23')}`},
    {id:'s4-practica',titulo:'Práctica 004 · Sumadores en Logisim',grupo:'Semana 4',numero:'4.7',resumen:'HA, FA, 7483, sumador/restador y control de retardo.',contenido:()=>`
      <h3>Secuencia experimental documentada</h3>${pasos(['Monta un HA mediante XOR (S) y AND (C), verifica sus cuatro combinaciones.','Crea un FA usando dos HA y una OR, verifica sus ocho combinaciones.','Encadena cuatro FA y fija Cin0=0; compara los resultados con el TTL 7483.','Agrega las cuatro XOR controladas por M y fija Cin0=M para operar en suma/resta.','Añade la salida V=C3⊕C4 e interpreta overflow.','Estima el retardo del acarreo mediante un tiempo aproximado por compuerta.'])}
      <h3>Casos representativos de la unidad</h3>${tabla(['Prueba','Resultado'],[['0110+0111','1101'],['0110−0011','0011'],['0101+0100 (signo)','1001, overflow'],['Retardo 4 bits (modelo de clase)','≈ 80 ns']])}
      <p>Los ejercicios muestran los resultados esperados de cada montaje; los archivos SVG sirven para estudiar las conexiones y no son simulaciones de Logisim Evolution.</p>
      ${fuente('p4','1–6')}`},
    {id:'s5-pendiente',titulo:'Semana 5 · Pendiente de contenidos',grupo:'Semana 5',numero:'5.0',resumen:'Espacio reservado para los contenidos que se estudien después.',contenido:()=>`
      <div class="contenido-pendiente"><strong>Semana pendiente</strong><p>Los temas correspondientes a la quinta semana no se han recibido. Este apartado permanece vacío hasta conocer los conceptos, procedimientos y ejercicios que efectivamente se estudien.</p></div>
      <p>Cuando se disponga del temario, podrá añadirse aquí una explicación con sus propias tablas y figuras. No se anticipan fórmulas ni circuitos.</p>`},
    {id:'tecnicas-circuitos',titulo:'Técnicas y circuitos resueltos',grupo:'Recursos y cierre',numero:'T',resumen:'Catálogo de circuitos originales en SVG y comprobación lógica.',contenido:()=>`
      <div class="cabecera-circuitos"><p>Este catálogo reúne los esquemas específicos de las técnicas con representación de circuito estudiadas en las semanas 1–4. El pie incluye la función y el criterio de comprobación. Cada SVG puede abrirse ampliado y conserva calidad vectorial.</p><div class="conteo">${circuitos.length} diagramas</div></div>
      <div class="tarjeta tarjeta-alerta"><strong>Alcance de compatibilidad:</strong> estos son archivos SVG, no ficheros Logisim <code>.circ</code>. Los bloques FA y HA representan subcircuitos cuya implementación interna aparece en otros diagramas. El uso de etiquetas repetidas representa túneles de señal, no conexiones eléctricas entre rótulos diferentes.</div>
      ${[1,2,3,4].map(n=>`<h3>Semana ${n}</h3>${circuitos.filter(c=>c.semana===n).map(c=>`<div class="mini"><h4>${esc(c.tema)}</h4><p><strong>Expresión / principio:</strong> <code>${esc(c.funcion)}</code></p>${fig(c.archivo,c.tema)}<p><strong>Verificación:</strong> ${esc(c.prueba)}</p></div>`).join('')}`).join('')}`},
    {id:'dudas',titulo:'Registro de dudas pendientes',grupo:'Recursos y cierre',numero:'D',resumen:'Anota, edita, marca resueltas y exporta preguntas.',contenido:()=>`
      <p>Registra exclusivamente tus propias preguntas. Los datos se guardan en este navegador mediante almacenamiento local; no se envían a servidores ni se sincronizan con otras computadoras. Puedes exportarlos como archivo JSON.</p>
      <form id="formDuda" class="registro-form no-imprimir"><div><label for="dudaTema">Tema que no comprendí</label><input id="dudaTema" maxlength="130" required placeholder="Ej.: Mapa de Karnaugh"></div><div><label for="dudaProcedimiento">Procedimiento que necesito reforzar</label><input id="dudaProcedimiento" maxlength="180" placeholder="Paso que deseo practicar"></div><div class="ancho-completo"><label for="dudaPregunta">Pregunta o duda</label><textarea id="dudaPregunta" maxlength="1200" required placeholder="Escribe tu pregunta"></textarea></div><div class="ancho-completo"><label for="dudaRespuesta">Posible solución o respuesta (opcional)</label><textarea id="dudaRespuesta" maxlength="1200" placeholder="Completa este campo cuando tengas una respuesta"></textarea></div><input id="dudaEditando" type="hidden" value=""><button type="submit" class="btn btn-primary" id="guardarDuda">Guardar duda</button><button type="button" class="btn btn-secondary" id="cancelarDuda" hidden>Cancelar edición</button></form>
      <div class="duda-acciones no-imprimir"><button class="btn btn-secondary" type="button" id="exportarDudas">↓ Exportar dudas (JSON)</button><label class="btn btn-secondary" for="importarDudas">↑ Importar dudas (JSON)</label><input class="sr-only" type="file" id="importarDudas" accept="application/json,.json"></div>
      <div id="dudasEstado" role="status" aria-live="polite"></div><div id="dudasLista" aria-live="polite"></div>`},
    {id:'conclusiones',titulo:'Conclusiones de la Unidad 1',grupo:'Recursos y cierre',numero:'C',resumen:'Aprendizajes y relaciones entre las semanas.',contenido:()=>`
      <h3>Aprendizajes principales</h3><p>La Unidad 1 establece un procedimiento de diseño de lógica combinacional: representar correctamente datos binarios, expresar el comportamiento esperado mediante tablas de verdad, obtener expresiones lógicas y construir circuitos cuyas conexiones permitan verificar los resultados.</p>
      <p>El álgebra de Boole y las formas canónicas permiten traducir una especificación a una red de compuertas sin ambigüedad. Los mapas de Karnaugh facilitan hallar expresiones de menor complejidad; las condiciones indiferentes pueden reducir más el circuito si el dominio de entrada las justifica.</p>
      <h3>Relación entre las semanas</h3>${pasos(['Semana 1: los bits y las siete compuertas proporcionan los elementos del circuito.','Semana 2: la tabla de verdad se convierte en SOP/POS y se simplifica algebraicamente.','Semana 3: Karnaugh organiza la simplificación y la adapta a una familia de compuertas.','Semana 4: los mismos operadores se combinan en HA, FA, sumadores, restadores y comparadores.'])}
      <h3>Importancia práctica</h3><p>Las prácticas muestran que el diseño debe comprobarse primero mediante una predicción en papel y después contrastarse con la simulación. También introducen criterios de implementación: cantidad de compuertas, encapsulados, niveles lógicos, retardo y manejo de códigos fuera de especificación.</p>
      <p>Estos resultados corresponden únicamente a los contenidos documentados de las semanas 1–4; la síntesis final se podrá ampliar cuando se aporte la quinta semana.</p>`},
    {id:'bibliografia',titulo:'Referencias académicas',grupo:'Recursos y cierre',numero:'B',resumen:'Materiales de clase utilizados para elaborar la síntesis.',contenido:()=>`
      <h3>Fuentes de estudio</h3><p>La teoría se fundamenta en las clases de <strong>Diseño de Circuitos, Unidad 1</strong>, impartidas en la Carrera de Computación de la Universidad Nacional de Loja por el Ing. Luis Darío Sinche Cueva, Mg.</p>
      <ol><li>Semana 1: sistemas numéricos, códigos, compuertas lógicas y práctica de simulación.</li><li>Semana 2: álgebra de Boole, formas SOP/POS, simplificación y actividad de diseño.</li><li>Semana 3: mapas de Karnaugh, indiferentes, NAND/NOR y práctica de optimización.</li><li>Semana 4: circuitos aritméticos, sumadores, restadores, comparadores y práctica correspondiente.</li></ol>
      <p>Los esquemas SVG del cuaderno son diagramas de estudio elaborados a partir de esos contenidos. No se incluyen ni se ofrecen copias de los documentos originales.</p>`}

  ];

  window.CUADERNO = Object.freeze({secciones,circuitos,esc,fig,fuente});
})();
