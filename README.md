<div align="center">

<img src="assets/institucional/logo-unl.png" alt="Universidad Nacional de Loja" width="400">

# Cuaderno digital de síntesis · Unidad 1

**Diseño de Circuitos · Carrera de Computación**

**Estudiante:** Sdier Emanuel Roblez Roblez  
**Docente:** Ing. Luis Darío Sinche Cueva, Mg.  
**Universidad:** Universidad Nacional de Loja  
**Período:** Septiembre 2026 – Marzo 2027

[**Abrir el cuaderno digital**](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/)

</div>

<a id="indice-general"></a>

## Índice general

### Inicio

- [Portada](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#portada)
- [Índice general](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#indice)
- [Introducción](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#introduccion)

[↑ Volver al índice](#indice-general)

### Semana 1

- [Sistemas binarios y niveles lógicos](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s1-fundamentos)
- [Conversiones y suma binaria](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s1-conversiones)
- [Complemento a dos y códigos](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s1-signos-codigos)
- [Las siete compuertas lógicas](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s1-compuertas)
- [Práctica 001 · Logisim Evolution](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s1-practica)

[↑ Volver al índice](#indice-general)

### Semana 2

- [Álgebra de Boole y sus leyes](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s2-boole)
- [Minitérminos, maxitérminos y SOP/POS](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s2-canonicas)
- [Alarma: circuito simplificado](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s2-simplificacion)
- [Práctica 002 · Comparación AB > C](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s2-practica)

[↑ Volver al índice](#indice-general)

### Semana 3

- [Mapas de Karnaugh: reglas](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s3-karnaugh)
- [Karnaugh de 4 variables: SOP y POS](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s3-sop-pos)
- [Condiciones indiferentes (X)](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s3-indiferentes)
- [Implementaciones solo NAND y solo NOR](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s3-nand-nor)
- [Práctica 003 · Detector de primos BCD](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s3-practica)

[↑ Volver al índice](#indice-general)

### Semana 4

- [Aritmética binaria y acarreo](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s4-suma-binaria)
- [Semisumador (HA)](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s4-semisumador)
- [Sumador completo (FA)](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s4-sumador-completo)
- [Sumador de cuatro bits y retardo ripple](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s4-sumador4)
- [Sumador/restador y overflow](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s4-resta-overflow)
- [Comparadores de igualdad y magnitud](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s4-comparador)
- [Práctica 004 · Sumadores en Logisim](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s4-practica)

[↑ Volver al índice](#indice-general)

### Semana 5

- [Semana 5 · Pendiente de contenidos](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#s5-pendiente)

[↑ Volver al índice](#indice-general)

### Recursos y cierre

- [Técnicas y circuitos resueltos](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#tecnicas-circuitos)
- [Registro de dudas pendientes](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#dudas)
- [Conclusiones de la Unidad 1](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#conclusiones)
- [Referencias académicas](https://roblezsdier02-alt.github.io/cuaderno-sintesis-unidad-1/#bibliografia)

[↑ Volver al índice](#indice-general)

## Presentación

Este cuaderno reúne los conceptos, procedimientos, ejemplos resueltos y circuitos de estudio de la Unidad 1: *Análisis de lógica combinacional con diseño clásico*. El contenido está organizado por semanas y utiliza ilustraciones vectoriales para apoyar el aprendizaje.

La semana 5 queda pendiente de contenido; no se han añadido temas no proporcionados.

## Estructura del proyecto

```text
cuaderno-sintesis-unidad-1/
├── index.html
├── README.md
├── css/
│   └── estilos.css
├── js/
│   ├── contenido.js
│   └── app.js
└── assets/
    ├── institucional/
    │   └── logo-unl.png
    ├── ilustraciones/
    │   ├── portada-circuitos.svg
    │   ├── proceso-diseno.svg
    │   └── pesos-binarios.svg
    └── circuitos/
        └── 32 diagramas SVG
```

## Navegación

Desde el índice puedes seleccionar cualquier apartado. Cada sección del cuaderno incluye «Volver al índice» y el sitio también ofrece menú lateral, «Inicio», «Anterior», «Siguiente», búsqueda, progreso de lectura, impresión y registro de dudas local.

## Publicación

Coloca el contenido de esta carpeta en la raíz del repositorio. En **Settings → Pages** selecciona **Deploy from a branch**, rama `main`, carpeta `/(root)` y guarda. No requiere instalar bibliotecas ni cargar PDF.

> Uso académico: los circuitos SVG son materiales gráficos de estudio; no deben confundirse con archivos `.circ` ejecutados en Logisim Evolution.

[↑ Volver al índice](#indice-general)
