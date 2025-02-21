let pendingQuestion = false;

function goToDiagram(diagramNumber) {
    // Ocultar todos los diagramas primero
    document.getElementById("step1").classList.add("hidden");
    document.getElementById("diagram1").classList.add("hidden");
    document.getElementById("diagram2").classList.add("hidden");

    // Mostrar el diagrama seleccionado
    if (diagramNumber === 'start') {
        // Resetear formularios antes de mostrar la página inicial
        resetForm('form-diagram1');
        resetForm('form-diagram2');
        document.getElementById("step1").classList.remove("hidden");
    } else if (diagramNumber === '1') {
        document.getElementById("diagram1").classList.remove("hidden");
    } else if (diagramNumber === '2') {
        document.getElementById("diagram2").classList.remove("hidden");
    }
}

function resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
        if (formId === 'form-diagram1') {
            document.getElementById("result-container").classList.add("hidden");
            document.getElementById("additional-question").classList.add("hidden");
        } else if (formId === 'form-diagram2') {
            document.getElementById("result-container2").classList.add("hidden");
        }
    }
}

function calculateDiagram1() {
    const tr = document.getElementById("tr").value;
    const psa = document.getElementById("psa").value;
    
    if (!tr || !psa) {
        alert("Por favor, complete todos los campos");
        return false;
    }

    let result = "";

    // Lógica del Diagrama 1
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
        document.getElementById("additional-question").classList.remove("hidden");
        return false;
    }

    document.getElementById("result-diagram1").textContent = result;
    document.getElementById("result-container").classList.remove("hidden");
    return false;
}

function calculateDiagram2() {
    const psaValue = document.getElementById("psac").value.replace(",", ".");
    const volumenValue = document.getElementById("volumen").value.replace(",", ".");
    const psa = parseFloat(psaValue);
    const volumen = parseFloat(volumenValue);
    const pirads = document.getElementById("pirads").value;
    const tr = document.getElementById("tract").value;

    if (!pirads || !tr || isNaN(psa) || isNaN(volumen)) {
        alert("Por favor, complete todos los campos correctamente");
        return false;
    }
    
    if (psa <= 0 || volumen <= 0) {
        alert("Los valores de PSA y Volumen deben ser mayores a 0");
        return false;
    }

    const dpsa = psa / volumen;
    let result = "";

    // Lógica del Diagrama 2
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

    document.getElementById("result-diagram2").textContent = `DPSA: ${dpsa.toFixed(2)}\nDiagnóstico: ${result}`;
    document.getElementById("result-container2").classList.remove("hidden");
    return false;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            return false;
        });
    });

    document.querySelectorAll('[data-diagram]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            goToDiagram(this.dataset.diagram);
        });
    });

    document.querySelectorAll('[data-answer]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const result = this.dataset.answer === 'true' ? 
                "Indicación de RMN." : 
                "Repetir PSA.";
            document.getElementById("result-diagram1").textContent = result;
            document.getElementById("result-container").classList.remove("hidden");
            document.getElementById("additional-question").classList.add("hidden");
        });
    });
});
