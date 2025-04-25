document.addEventListener('DOMContentLoaded', function() {
    // Configuración del año actual en el footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Menú móvil
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;

    mobileMenuBtn.addEventListener('click', function() {
        if (!menuOpen) {
            mobileMenu.style.display = 'block';
            menuOpen = true;
        } else {
            mobileMenu.style.display = 'none';
            menuOpen = false;
        }
    });

    // Cerrar menú cuando se hace clic en un enlace
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.style.display = 'none';
            menuOpen = false;
        });
    });

    // Gestión de la carga y análisis de imágenes
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    const uploadedImageContainer = document.getElementById('uploadedImageContainer');
    const uploadedImage = document.getElementById('uploadedImage');
    const fileName = document.getElementById('fileName');
    const uploadActions = document.getElementById('uploadActions');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultContainer = document.getElementById('resultContainer');
    const resultIcon = document.getElementById('resultIcon');
    const resultText = document.getElementById('resultText');
    const confidenceText = document.getElementById('confidenceText');

    // Evento de clic en el área de carga
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });

    // Cuando se selecciona un archivo
    fileInput.addEventListener('change', function() {
        handleFileSelected(this.files);
    });

    // Eventos de arrastrar y soltar
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = '#2563eb';
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = '#ccc';
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = '#ccc';
        
        if (e.dataTransfer.files.length) {
            handleFileSelected(e.dataTransfer.files);
        }
    });

    // Función para manejar cuando se selecciona un archivo
    function handleFileSelected(files) {
        if (files.length > 0) {
            const file = files[0];
            fileName.textContent = file.name;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImage.src = e.target.result;
                uploadPlaceholder.style.display = 'none';
                uploadedImageContainer.style.display = 'block';
                uploadActions.style.display = 'block';
                resultContainer.style.display = 'none';
            }
            reader.readAsDataURL(file);
        }
    }

    // Análisis de la imagen
    analyzeBtn.addEventListener('click', function() {
        // Simulación de análisis con IA
        analyzeBtn.textContent = 'Analizando...';
        analyzeBtn.disabled = true;
        
        setTimeout(function() {
            // Simulación del resultado - en una app real esto vendría del backend
            const randomValue = Math.random();
            const isPositive = randomValue > 0.7;
            const confidence = isPositive ? 
                Math.floor(70 + Math.random() * 25) : 
                Math.floor(75 + Math.random() * 20);
            
            // Actualizar la UI con el resultado
            if (isPositive) {
                resultIcon.className = 'result-icon positive';
                resultIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
                resultText.textContent = 'Se han detectado signos de periodontitis';
            } else {
                resultIcon.className = 'result-icon negative';
                resultIcon.innerHTML = '<i class="fas fa-check"></i>';
                resultText.textContent = 'No se han detectado signos de periodontitis';
            }
            
            confidenceText.textContent = `Confianza del diagnóstico: ${confidence}%`;
            resultContainer.style.display = 'block';
            
            // Restaurar botón
            analyzeBtn.textContent = 'Analizar Imagen';
            analyzeBtn.disabled = false;
            
            // Scroll al resultado
            resultContainer.scrollIntoView({behavior: 'smooth'});
        }, 2000);
    });

    // Validación y envío del formulario de registro
    const registrationForm = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulación de envío
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(function() {
                registrationForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Scroll al mensaje de éxito
                successMessage.scrollIntoView({behavior: 'smooth'});
                
                // Resetear formulario
                registrationForm.reset();
            }, 1500);
        }
    });

    function validateForm() {
        let isValid = true;
        
        // Validar nombre
        const nombre = document.getElementById('nombre');
        const nombreError = document.getElementById('nombreError');
        if (!nombre.value.trim()) {
            nombreError.textContent = 'El nombre es requerido';
            nombre.classList.add('error');
            isValid = false;
        } else {
            nombreError.textContent = '';
            nombre.classList.remove('error');
        }
        
        // Validar apellidos
        const apellidos = document.getElementById('apellidos');
        const apellidosError = document.getElementById('apellidosError');
        if (!apellidos.value.trim()) {
            apellidosError.textContent = 'Los apellidos son requeridos';
            apellidos.classList.add('error');
            isValid = false;
        } else {
            apellidosError.textContent = '';
            apellidos.classList.remove('error');
        }
        
        // Validar email
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /\S+@\S+\.\S+/;
        if (!email.value.trim()) {
            emailError.textContent = 'El email es requerido';
            email.classList.add('error');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            emailError.textContent = 'El email no es válido';
            email.classList.add('error');
            isValid = false;
        } else {
            emailError.textContent = '';
            email.classList.remove('error');
        }
        
        // Validar teléfono
        const telefono = document.getElementById('telefono');
        const telefonoError = document.getElementById('telefonoError');
        const telefonoRegex = /^\d{9,}$/;
        if (!telefono.value.trim()) {
            telefonoError.textContent = 'El teléfono es requerido';
            telefono.classList.add('error');
            isValid = false;
        } else if (!telefonoRegex.test(telefono.value.replace(/\s/g, ''))) {
            telefonoError.textContent = 'El teléfono no es válido';
            telefono.classList.add('error');
            isValid = false;
        } else {
            telefonoError.textContent = '';
            telefono.classList.remove('error');
        }
        
        // Validar institución
        const institucion = document.getElementById('institucion');
        const institucionError = document.getElementById('institucionError');
        if (!institucion.value.trim()) {
            institucionError.textContent = 'La institución es requerida';
            institucion.classList.add('error');
            isValid = false;
        } else {
            institucionError.textContent = '';
            institucion.classList.remove('error');
        }
        
        // Validar especialidad
        const especialidad = document.getElementById('especialidad');
        const especialidadError = document.getElementById('especialidadError');
        if (!especialidad.value) {
            especialidadError.textContent = 'La especialidad es requerida';
            especialidad.classList.add('error');
            isValid = false;
        } else {
            especialidadError.textContent = '';
            especialidad.classList.remove('error');
        }
        
        // Validar términos
        const aceptaTerminos = document.getElementById('aceptaTerminos');
        const aceptaTerminosError = document.getElementById('aceptaTerminosError');
        if (!aceptaTerminos.checked) {
            aceptaTerminosError.textContent = 'Debes aceptar los términos y condiciones';
            isValid = false;
        } else {
            aceptaTerminosError.textContent = '';
        }
        
        return isValid;
    }

    // Suavizar el desplazamiento para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});