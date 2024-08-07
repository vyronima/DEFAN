// Simular una base de datos de usuarios
const usuarios = [
  { id: 1, usuario: 'usuario1', clave: '1234', falla: 0 },
  { id: 2, usuario: 'usuario2', clave: '5678', falla: 0 },
  { id: 3, usuario: 'usuario3', clave: '9101', falla: 0 },
  { id: 4, usuario: 'usuario4', clave: '1121', falla: 0 },
  { id: 5, usuario: 'usuario5', clave: '3141', falla: 0 }
];

function pruebaBoton() {
  let user = document.getElementById('user').value;
  let pw = document.getElementById('pw').value;

  // Recorrer la lista de usuarios y verificar las credenciales
  let usuario = usuarios.find(u => u.usuario === user);

  if (usuario) {
    if (usuario.falla >= 3) {
      alert('Usuario bloqueado debido a múltiples intentos fallidos');
      return;
    } else if (usuario.clave === pw) {
      // Restablecer los intentos fallidos en caso de éxito
      usuario.falla = 0;
      // Redirigir a la página Dashboard.html y pasar el nombre de usuario como variable
      window.open('../Project-1/Pages/Dashboard.html?user=' + usuario.usuario, '_self');
    } else {
      usuario.falla++;
      alert('Error al escribir Usuario o Contraseña');
    }
  } else {
    alert('Este Usuario no Existe');
  }
}