document.addEventListener("DOMContentLoaded", () => {
    const users = [
        { cedula: "1143335191", nombre: "Diego Figueroa", telefono: "3012311477", edad: 35 },
        { cedula: "1143335192", nombre: "Jhoel Figueroa", telefono: "3002187915", edad: 17 }
    ];

    const cedulaForm = document.getElementById("cedulaForm");
    const userForm = document.getElementById("userForm");
    const registrosTable = document.getElementById("registros");
    const admitidosP = document.getElementById("admitidos");
    const rechazadosP = document.getElementById("rechazados");

    let admitidosCount = 0;
    let rechazadosCount = 0;
    let currentUser = null;

    cedulaForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const cedula = document.getElementById("cedula").value.trim();
        currentUser = users.find(u => u.cedula === cedula);
        
        if (currentUser) {
            document.getElementById("nombre").value = currentUser.nombre;
            document.getElementById("telefono").value = currentUser.telefono;
            document.getElementById("edad").value = currentUser.edad;
            
            // Desactivar campos
            document.getElementById("nombre").disabled = true;
            document.getElementById("telefono").disabled = true;
            document.getElementById("edad").disabled = true;
        } else {
            document.getElementById("nombre").value = "";
            document.getElementById("telefono").value = "";
            document.getElementById("edad").value = "";

            // Habilitar campos para nuevos registros
            document.getElementById("nombre").disabled = false;
            document.getElementById("telefono").disabled = false;
            document.getElementById("edad").disabled = false;
        }

        userForm.style.display = "block";
    });

    userForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const cedula = document.getElementById("cedula").value.trim();
        const nombre = document.getElementById("nombre").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const edad = parseInt(document.getElementById("edad").value);

        if (!cedula || !nombre || !telefono || isNaN(edad)) {
            alert("Por favor, complete todos los campos correctamente.");
            return;
        }

        if (!currentUser) {
            currentUser = { cedula, nombre, telefono, edad };
            users.push(currentUser);
        } else {
            // Optional: actualizar datos del usuario registrado interno
        }

        const estado = edad >= 18 ? "Admitido" : "Rechazado";

        if (estado === "Admitido") {
            admitidosCount++;
        } else {
            rechazadosCount++;
        }

        registrosTable.innerHTML += `
            <tr>
                <td>${currentUser.cedula}</td>
                <td>${currentUser.nombre}</td>
                <td>${currentUser.telefono}</td>
                <td>${currentUser.edad}</td>
                <td>${estado}</td>
            </tr>
        `;
        
        admitidosP.textContent = `Admitidos: ${admitidosCount}`;
        rechazadosP.textContent = `Rechazados: ${rechazadosCount}`;
        
        cedulaForm.reset();
        userForm.style.display = "none";
        currentUser = null; // Reset currentUser after processing
    });
});
