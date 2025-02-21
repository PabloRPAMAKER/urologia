let pendingQuestion = false;

function goToDiagram(diagramNumber) {
    // Ocultar todo al entrar
    document.getElementById("step1").classList.add("hidden");
    document.getElementById("diagram1").classList.add("hidden");
    document.getElementById("diagram2").classList.add("hidden");
    document.getElementById("result-container").classList.add("hidden"); // Ocultar diagnóstico
    document.getElementById("additional-question").classList.add("hidden"); // Ocultar pregunta adicional

    // Mostrar la sección correspondiente
    if (diagramNumber === 1) {
        document.getElementById("diagram1").classList.remove("hidden");
    } else if (diagramNumber === 2) {
        document.getElementById("diagram2").classList.remove("hidden");
    }
}

// Calcular la decisión en Diagrama 1
function calculateDiagram1() {
    const tr = document.getElementById("tr").value;
    const psa = document.getElementById("psa").value;
    let result = "";

    if (tr === "TR+" && psa === ">50") {
        result = "Indicación de Biopsia Prostática.";
    } else if (tr === "TR+" && psa === "20-50") {
        result = "Indicación de RMN preferente.";
    } else if (tr === "TR+" && psa === "10-20") {
        result = "Indicación de Biopsia Prostática.";
    } else if (tr === "TR+" && psa === "3-10") {
        result = "Repetir PSA y reevaluar.";
    } else if (tr === "TR-" && psa === ">50") {
        result = "Indicación de Biopsia Prostática.";
    } else if (tr === "TR-" && psa === "20-50") {
        result = "Indicación de RMN preferente.";
    } else if (tr === "TR-" && psa === "10-20") {
        result = "Indicación de RMN.";
    } else if (tr === "TR-" && psa === "3-10") {
        // Mostrar pregunta adicional
        document.getElementById("result-container").classList.add("hidden");
        document.getElementById("additional-question").classList.remove("hidden");
        return; // Salimos para esperar la respuesta del usuario
    }

    // Mostrar resultado
    document.getElementById("result-diagram1").innerText = result;
    document.getElementById("result-container").classList.remove("hidden");
    // document.getElementById("additional-question").classList.add("hidden");
}

// Volver al inicio
function resetForm() {
    document.getElementById("form-diagram1").reset(); // Limpia el formulario
    document.getElementById("result-container").classList.add("hidden"); // Oculta el resultado
    document.getElementById("additional-question").classList.add("hidden"); // Oculta la pregunta
}

function goToStart() {
    document.getElementById("diagram1").classList.add("hidden");
    document.getElementById("diagram2").classList.add("hidden");
    document.getElementById("step1").classList.remove("hidden"); // Muestra la pantalla inicial
    document.getElementById("result-container").classList.add("hidden"); // Oculta el resultado
    document.getElementById("additional-question").classList.add("hidden"); // Oculta la pregunta
}

function handleAdditionalQuestion(response) {
    let result = "";
    if (response) {
        result = "Indicación de RMN.";
    } else {
        result = "Repetir PSA.";
    }

    // Mostrar resultado
    document.getElementById("result-diagram1").innerText = result;
    document.getElementById("result-container").classList.remove("hidden");
    document.getElementById("additional-question").classList.add("hidden");
}

function calculateDiagram2() {
    // Captura los valores y reemplaza comas por puntos
    const psaValue = document.getElementById("psac").value.trim().replace(",", ".");
    const volumenValue = document.getElementById("volumen").value.trim().replace(",", ".");
    
    const psa = parseFloat(psaValue); // Convertir PSA a número decimal
    const volumen = parseFloat(volumenValue); // Convertir Volumen a número decimal
    const pirads = document.getElementById("pirads").value;
    const tr = document.getElementById("tract").value;

    // Verificación de valores
    console.log(`PSA ingresado: ${psaValue}, después de conversión: ${psa}`);
    console.log(`Volumen ingresado: ${volumenValue}, después de conversión: ${volumen}`);

    // Validación de los valores ingresados
    if (isNaN(psa) || psa <= 0) {
        alert(`Por favor, ingrese un valor válido para PSA (actual: "${psaValue}")`);
        return;
    }

    if (!pirads) {
        alert("Por favor, seleccione un valor PIRADS.");
        return;
    }

    if (isNaN(volumen) || volumen <= 0) {
        alert(`Por favor, ingrese un valor válido para el Volumen Prostático (actual: "${volumenValue}")`);
        return;
    }

    if (!tr) {
        alert("Por favor, seleccione un tipo de Tacto Rectal.");
        return;
    }

    // Calcular DPSA
    const dpsa = psa / volumen;

    let result = "";

    // Lógica principal para Diagrama 2
    if (pirads === "1-2") {
        result = "No realizar biopsia, seguimiento.";
    } else if (pirads === "3") {
        if (tr === "Normal" && dpsa < 0.15) {
            result = "Seguimiento, no realizar biopsia.";
        } else if (tr === "Lesión Benigna") {
            result = "Seguimiento con RMN periódica.";
        } else if (tr === "Sospechosa" || dpsa >= 0.15) {
            result = "Indicación de Biopsia Prostática.";
        }
    } else if (pirads === "4-5") {
        result = "Indicación de Biopsia Prostática.";
    }

    // Mostrar resultado
    document.getElementById("result-diagram2").innerText = `DPSA: ${dpsa.toFixed(2)}\nDiagnóstico: ${result}`;
    document.getElementById("result-container2").classList.remove("hidden");
}

document.addEventListener('DOMContentLoaded', function() {
    // Manejador para los botones iniciales
    document.querySelectorAll('[data-diagram]').forEach(button => {
        button.addEventListener('click', function() {
            const diagramNum = this.dataset.diagram;
            showDiagram(diagramNum);
        });
    });

    // Manejador para el formulario 1
    document.getElementById('form-diagram1').addEventListener('submit', function(e) {
        e.preventDefault();
        calculateDiagram1();
    });

    // Manejador para el formulario 2
    document.getElementById('form-diagram2').addEventListener('submit', function(e) {
        e.preventDefault();
        calculateDiagram2();
    });

    // Manejador para botones de pregunta adicional
    document.querySelectorAll('[data-answer]').forEach(button => {
        button.addEventListener('click', function() {
            const answer = this.dataset.answer === 'true';
            handleAdditionalQuestion(answer);
        });
    });

    // Manejador para botones de reinicio
    document.querySelectorAll('.reset-form').forEach(button => {
        button.addEventListener('click', function() {
            const form = this.closest('section').querySelector('form');
            form.reset();
            hideResults();
        });
    });

    // Manejador para botones de volver al inicio
    document.querySelectorAll('.go-start').forEach(button => {
        button.addEventListener('click', goToStart);
    });
});

function showDiagram(num) {
    document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
    document.getElementById(`diagram${num}`).classList.remove('hidden');
}

function hideResults() {
    document.querySelectorAll('#result-container, #result-container2, #additional-question').forEach(el => {
        el.classList.add('hidden');
    });
}

function goToStart() {
    document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
    document.getElementById('step1').classList.remove('hidden');
    document.querySelectorAll('form').forEach(form => form.reset());
    hideResults();
}

document.querySelectorAll('.option-button').forEach(button => {
    button.addEventListener('click', () => {
        // Quitar la clase active de todos los botones
        button.parentElement.querySelectorAll('.option-button').forEach(btn => btn.classList.remove('active'));

        // Agregar la clase active al botón seleccionado
        button.classList.add('active');
    });
});
