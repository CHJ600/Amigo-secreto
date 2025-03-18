        let  amigos = []; // Array para almacenar los nombres de amigos

        function agregarAmigo() {
            let input = document.getElementById("nombreAmigo");
            let nombre = input.value.trim(); // Elimina espacios en blanco al inicio y al final

            if (nombre === "") {
                alert("Por favor, inserte un nombre.");
                return; // Sale de la función si el nombre está vacío
            }

            amigos.push(nombre); // Agregar el nombre al array
            actualizarLista(); // Actualizar la lista en el HTML
            input.value = ""; // Limpiar el campo de entrada
        }

        function actualizarLista() {
            let lista = document.getElementById("listaAmigos");
            lista.innerHTML = ""; // Limpiar la lista antes de actualizarla

            for (let i = 0; i < amigos.length; i++) {
                lista.innerHTML += `<li>${amigos[i]}</li>`; // Agregar cada amigo a la lista
            }
        }

        function sortearAmigo() {
            if (amigos.length === 0) {
                alert("No hay amigos en la lista para sortear.");
                return;
            }

            let indiceAleatorio = Math.floor(Math.random() * amigos.length); // Generar índice aleatorio
            let amigoSorteado = amigos[indiceAleatorio]; // Obtener el amigo sorteado

            document.getElementById("resultadoSorteo").innerHTML = `🎉 El amigo sorteado es: <strong>${amigoSorteado}</strong>!`;
        }
   



