(function() {
    'use strict';

    var regalo = document.getElementById('regalo');

    // Cuando el contenido del DOM esté cargado de ejecuta la función
    document.addEventListener('DOMContentLoaded', function() {

        console.log('La página se ha cargado correctamente');

        var mapa = document.querySelector('#mapa');

        if(mapa) {
            var map = L.map('mapa').setView([40.409665, -3.690329], 17);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([40.409665, -3.690329]).addTo(map)
                /*.bindPopup('Front-End-Camp 2019 <br> Pases ya disponibles')
                .openPopup()*/
                .bindTooltip('Front-End-Camp 2019 <br> Pases ya disponibles')
                .openTooltip();
        }

        // Campos registro usuario
        var divNombre = document.getElementById('nombre');
        var divApellido = document.getElementById('apellido');
        var divEmail = document.getElementById('email');

        // Div de error datos usuario
        var divError = document.getElementById('error');

        // Campos número de boletos
        var divPaseDia = document.getElementById('pase_dia');
        var divPaseDosDias = document.getElementById('pase_dos_dias');
        var divPaseCompleto = document.getElementById('pase_completo');

        // Extras
        var divCamisetas = document.getElementById('camiseta_evento');
        var divEtiquetas = document.getElementById('etiquetas');

        // Resumen de productos
        var divListaProductos = document.getElementById('lista-productos');

        // Botones calcular y pagar
        var calcular = document.getElementById('calcular');
        var botonRegistro = document.getElementById('btn-registro');

        // Total a pagar
        var divTotal = document.getElementById('suma-total');

        // Cuando el usuario haga click en el botón calcular se ejecuta la función calcularPago
        if(calcular) {
            calcular.addEventListener('click', calcularPago);

            divPaseDia.addEventListener('blur', mostrarDias);
            divPaseDosDias.addEventListener('blur', mostrarDias);
            divPaseCompleto.addEventListener('blur', mostrarDias);

            divNombre.addEventListener('blur', validarCampos);
            divApellido.addEventListener('blur', validarCampos);
            divEmail.addEventListener('blur', validarCampos);
            divEmail.addEventListener('blur', validarEmail);
        }

        function validarCampos() {
            if(this.value == '') {
                divError.style.display = "block";
                divError.innerHTML = 'Este campo es obligatorio';
                this.style.border = '1px solid red';
                divError.style.border = '1px solid red';
            } else {
                divError.style.display = 'none';
                this.style.border = '1px solid #cccccc';
            }
        }

        function validarEmail() {
            if(this.value.indexOf('@') != -1 && (this.value.indexOf('.com') != -1 || this.value.indexOf('.es') != -1)) {
                divError.style.display = 'none';
                this.style.border = '1px solid #cccccc';
            } else {
                divError.style.display = "block";
                divError.innerHTML = 'El email no es correcto';
                this.style.border = '1px solid red';
                divError.style.border = '1px solid red';
            }
        }

        function calcularPago(event) {
            // Nos aseguramos que calcular se comunica correctamente con la función
            event.preventDefault();
            console.log('Has hecho click en CALCULAR');
            
            if(regalo.value === '') {
                alert('Debes seleccionar un regalo');
                regalo.focus();
            } else {
                var boletosDia = parseInt(divPaseDia.value, 10) || 0;
                var boletosDosDias = parseInt(divPaseDosDias.value, 10) || 0;
                var boletosCompleto = parseInt(divPaseCompleto.value, 10) || 0;
                var camisetas = parseInt(divCamisetas.value, 10) || 0;
                var etiquetas = parseInt(divEtiquetas.value, 10) || 0;

                var totalPagar = (boletosDia * 30) + (boletosDosDias * 45) + (boletosCompleto * 50) + ((camisetas * 10) * 0.93) + (etiquetas * 2);
                
                var listadoProductos = [];

                if(boletosDia >= 1) {
                    listadoProductos.push('Pase/s por día: ' + boletosDia);
                }
                if(boletosDosDias >= 1) {
                    listadoProductos.push('Pase/s por 2 días: ' + boletosDosDias);
                }
                if(boletosCompleto >= 1) {
                    listadoProductos.push('Pase/s completo/s: ' + boletosCompleto);
                }
                if(camisetas >= 1) {
                    listadoProductos.push('Nº camisetas: ' + camisetas);
                }
                if(etiquetas >= 1) {
                    listadoProductos.push('Nº etiquetas: ' + etiquetas);
                }

                divListaProductos.style.display="block";
                divListaProductos.innerHTML = '';

                for(var i = 0; i < listadoProductos.length; i++) {
                    divListaProductos.innerHTML += listadoProductos[i] + '</br>';
                }
                
                divTotal.innerHTML = totalPagar + '&#8364';
               
                console.log(listadoProductos);

                console.log('El total a pagar es: ' + totalPagar.toFixed(2));
            }
        }

        function mostrarDias() {
            var boletosDia = parseInt(divPaseDia.value, 10) || 0;
            var boletosDosDias = parseInt(divPaseDosDias.value, 10) || 0;
            var boletosCompleto = parseInt(divPaseCompleto.value, 10) || 0;

            var diasSeleccionados = [];

            // Añadimos al array el día que se corresponde con el id de los talleres
            if(boletosDia > 0) {
                diasSeleccionados.push('viernes');
            }
            if(boletosDosDias > 0) {
                diasSeleccionados.push('viernes', 'sabado');
            }
            if(boletosCompleto > 0) {
                diasSeleccionados.push('viernes', 'sabado', 'domingo');
            }

            for(var i = 0; i < diasSeleccionados.length; i++) {
                document.getElementById(diasSeleccionados[i]).style.display="block";
            }

        }

    }); // DOM Content Loaded

})();


$(function() {

    // Programa de Conferencias
    $('.programa-evento .info-curso:first').show();
    $('.menu-programa a:first').addClass('activo');

    // Función que se ejecuta al pinchar sobre uno de los enlaces del PROGRAMA DEL EVENTO (Talleres, Conferencias, Seminarios)
    $('.menu-programa a').on('click', function() {

        $('.menu-programa a').removeClass('activo');
        $(this).addClass('activo');

        $('.info-curso').hide();

        var enlace = $(this).attr('href');
        $(enlace).fadeIn(1000);

        return false;

    });

    // Animaciones para los números
    $('.resumen-evento li:nth-child(1) p').animateNumber({number: 6}, 1200);
    $('.resumen-evento li:nth-child(2) p').animateNumber({number: 15}, 1200);
    $('.resumen-evento li:nth-child(3) p').animateNumber({number: 3}, 1500);
    $('.resumen-evento li:nth-child(4) p').animateNumber({number: 9}, 1200);

});