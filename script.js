document.addEventListener('DOMContentLoaded', () => {
    const comenzarBtn = document.getElementById('comenzar-btn');
    const reiniciarBtn = document.getElementById('reiniciar-btn');
    const pantallas = document.querySelectorAll('.pantalla');
    const pantallaInicial = document.getElementById('pantalla-inicial');
    const pantallaJuego = document.getElementById('pantalla-juego');
    const pantallaFinal = document.getElementById('pantalla-final');
    const historia = document.getElementById('historia');
    const nave = document.getElementById('nave');
    const planetaImg = document.getElementById('planeta');
    const mensaje = document.getElementById('mensaje');
    const respuestaInput = document.getElementById('respuesta');
    const enviarRespuestaBtn = document.getElementById('enviar-respuesta-btn');
    const resultado = document.getElementById('resultado');
    
    const planetas = [
        { nombre: 'Plutón', imagen: 'images/pluton.png', datoCurioso: 'Plutón es un planeta enano en el cinturón de Kuiper.' },
        { nombre: 'Neptuno', imagen: 'images/neptuno.png', datoCurioso: 'Neptuno es conocido por sus vientos extremadamente fuertes.' },
        { nombre: 'Urano', imagen: 'images/urano.png', datoCurioso: 'Urano rota de lado, lo que lo hace único en el sistema solar.' },
        { nombre: 'Saturno', imagen: 'images/saturno.png', datoCurioso: 'Saturno tiene los anillos más espectaculares y extensos.' },
        { nombre: 'Júpiter', imagen: 'images/jupiter.png', datoCurioso: 'Júpiter es el planeta más grande del sistema solar.' },
        { nombre: 'Marte', imagen: 'images/marte.png', datoCurioso: 'Marte es conocido como el "Planeta Rojo" debido a su color.' },
        { nombre: 'Tierra', imagen: 'images/tierra.png', datoCurioso: 'La Tierra es el único planeta conocido con vida.' },
        { nombre: 'Venus', imagen: 'images/venus.png', datoCurioso: 'Venus tiene una temperatura superficial extremadamente alta.' },
        { nombre: 'Mercurio', imagen: 'images/mercurio.png', datoCurioso: 'Mercurio es el planeta más cercano al Sol.' },
        { nombre: 'Sol', imagen: 'images/sol.png', datoCurioso: 'El Sol es una estrella que proporciona luz y calor a nuestro sistema solar.' }
    ];

    let indicePlaneta = 0;
    let numeroAleatorio = 0;
    let cuentaActual = 1;
    let multiplosAleatorios = [];

    comenzarBtn.addEventListener('click', iniciarMision);
    reiniciarBtn.addEventListener('click', () => location.reload());
    enviarRespuestaBtn.addEventListener('click', verificarRespuesta);

    function iniciarMision() {
        mostrarPantalla(pantallaJuego);
        indicePlaneta = 0;
        numeroAleatorio = Math.floor(Math.random() * 10) + 1;
        cuentaActual = 0;
        multiplosAleatorios = generarMultiplosAleatorios();
        actualizarPlaneta();
        mensaje.textContent = `Ingresa el múltiplo ${multiplosAleatorios[cuentaActual]} de ${numeroAleatorio}:`;
        resultado.textContent = '';
        resultado.className = 'resultado';
        respuestaInput.value = '';
        respuestaInput.disabled = false;
        enviarRespuestaBtn.disabled = false;
        respuestaInput.focus();
    }

    function generarMultiplosAleatorios() {
        const multiplos = [];
        while (multiplos.length < 3) {
            const multiplo = Math.floor(Math.random() * 10) + 1;
            if (!multiplos.includes(multiplo)) {
                multiplos.push(multiplo);
            }
        }
        return multiplos;
    }

    function actualizarPlaneta() {
        const planeta = planetas[indicePlaneta];
        planetaImg.src = planeta.imagen;
        planetaImg.alt = planeta.nombre;
        historia.textContent = `🪐 Estás en ${planeta.nombre}. ${planeta.datoCurioso}🪐`;
    }

    function verificarRespuesta() {
        const respuesta = parseInt(respuestaInput.value.trim());
        if (isNaN(respuesta)) {
            resultado.textContent = 'Por favor, ingresa un número válido.';
            resultado.className = 'resultado incorrecto';
            return;
        }
        const correcto = numeroAleatorio * multiplosAleatorios[cuentaActual];
        if (respuesta === correcto) {
            resultado.textContent = '¡Correcto!';
            resultado.className = 'resultado correcto';
            cuentaActual++;
            if (cuentaActual >= multiplosAleatorios.length) {
                cuentaActual = 0;
                indicePlaneta++;
                if (indicePlaneta >= planetas.length) {
                    mostrarPantalla(pantallaFinal);
                    return;
                }
                actualizarPlaneta();
                naveAnimacion();
                numeroAleatorio = Math.floor(Math.random() * 10) + 1;
                multiplosAleatorios = generarMultiplosAleatorios();
            }
            mensaje.textContent = `Ingresa el múltiplo ${multiplosAleatorios[cuentaActual]} de ${numeroAleatorio}:`;
            respuestaInput.value = '';
            respuestaInput.focus();
        } else {
            resultado.textContent = `Incorrecto. El múltiplo correcto era ${correcto}.`;
            resultado.className = 'resultado incorrecto';
            respuestaInput.disabled = true;
            enviarRespuestaBtn.disabled = true;
        }
    }

    function naveAnimacion() {
        nave.classList.add('despegar');
        setTimeout(() => nave.classList.remove('despegar'), 500);
    }

    function mostrarPantalla(pantalla) {
        pantallas.forEach(p => p.classList.remove('activa'));
        pantalla.classList.add('activa');
    }

    // Iniciar en pantalla inicial
    mostrarPantalla(pantallaInicial);
});
