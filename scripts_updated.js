
// Calcular la decisión en Diagrama 1 con condición adicional
function calculateDiagram1() {
    const tr = document.getElementById("tr").value;
    const psa = document.getElementById("psa").value;
    let result = "";

    // Lógica principal
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
        // Nueva condición para TR- y PSA 3-10
        const additionalQuestion = confirm("¿Tiene al menos 2 PSA separados más de 3 meses?");
        if (additionalQuestion) {
            result = "Indicación de RMN.";
        } else {
            result = "Repetir PSA.";
        }
    }

    // Mostrar resultado
    document.getElementById("result-diagram1").innerText = result;
    document.getElementById("result-container").classList.remove("hidden");
}
