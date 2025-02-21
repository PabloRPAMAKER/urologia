// Mostrar la sección correspondiente
function goToDiagram(diagramNumber) {
    document.getElementById("step1").classList.add("hidden");
    document.getElementById("diagram1").classList.add("hidden");
    document.getElementById("diagram2").classList.add("hidden");

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
        result = "Repetir PSA y reevaluar.";
    }

    document.getElementById("result-diagram1").innerText = result;
}

function goToStart() {
    document.getElementById("step1").classList.remove("hidden");
    document.getElementById("diagram1").classList.add("hidden");
    document.getElementById("diagram2").classList.add("hidden");
}

