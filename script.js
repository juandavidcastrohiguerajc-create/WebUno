document.getElementById("imcForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    if (isNaN(peso) || isNaN(altura) || altura <= 0) {
        alert("Por favor ingrese valores válidos.");
        return;
    }

    let imc = peso / (altura * altura);
    imc = imc.toFixed(2);

    let clasificacion = "";

    if (imc < 18.5) {
        clasificacion = "Bajo peso";
    } else if (imc >= 18.5 && imc < 24.9) {
        clasificacion = "Normal";
    } else if (imc >= 25 && imc < 29.9) {
        clasificacion = "Sobrepeso";
    } else {
        clasificacion = "Obesidad";
    }

    alert(`Su IMC es ${imc} y su clasificación es ${clasificacion}.`);
    document.getElementById("resultado").innerHTML = `Su IMC es ${imc} y su clasificación es ${clasificacion}.`;
});