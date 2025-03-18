const ELEMENTOS = {
    INPUT_USUARIO: "usuario",
    LISTA_USUARIOS: "listaUsuarios",
    EXITO: "exito",
    BTN_AGREGAR: "btnAgregar",
    BTN_SELECCIONAR: "btnSeleccionar"
};

let usuarios = [];

function obtenerInputUsuario() {
    return document.getElementById(ELEMENTOS.INPUT_USUARIO);
}

function esUsuarioValido(usuario) {
    const regexUsuario = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return usuario !== "" && regexUsuario.test(usuario);
}

function limpiarInput(input) {
    input.value = "";
    input.focus();
}

function agregarUsuario() {
    const inputUsuario = obtenerInputUsuario();
    const nombreUsuario = inputUsuario.value.trim();

    if (!esUsuarioValido(nombreUsuario)) {
       alert("Por favor, ingrese un nombre válido.");
        limpiarInput(inputUsuario);
        return;
    }

    alert("Se añadió el nombre del usuario: " + nombreUsuario);
    usuarios.push(nombreUsuario);
    actualizarUsuarios();
    limpiarInput(inputUsuario);
}

function actualizarUsuarios() {
    const listaUsuariosUl = document.getElementById(ELEMENTOS.LISTA_USUARIOS);
    listaUsuariosUl.innerHTML = "";

    const fragmento = document.createDocumentFragment();

    usuarios.forEach(usuario => {
        const li = document.createElement("li");
        li.textContent = usuario;
        fragmento.appendChild(li);
    });

    listaUsuariosUl.appendChild(fragmento);
}

function seleccionarUsuario() {
    if (usuarios.length === 0) {
        alert("No hay usuarios agregados para seleccionar. Agrega nombres primero.");
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * usuarios.length);
    const usuarioSeleccionado = usuarios[indiceAleatorio];

    const exitoUl = document.getElementById(ELEMENTOS.EXITO);
    exitoUl.innerHTML = `<li>${usuarioSeleccionado}</li>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const btnAgregar = document.getElementById(ELEMENTOS.BTN_AGREGAR);
    const btnSeleccionar = document.getElementById(ELEMENTOS.BTN_SELECCIONAR);

    btnAgregar.addEventListener("click", agregarUsuario);
    btnSeleccionar.addEventListener("click", seleccionarUsuario);
});
```

He cambiado los nombres de las variables y funciones para que no sea tan similar al original, pero manteniendo su funcionalidad.
