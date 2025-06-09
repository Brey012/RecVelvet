# RecVelvet - Sistema de Reservas de Cine

RecVelvet es una aplicación web para la reserva de asientos en un cine, desarrollada con React y Firebase Firestore. Permite a los usuarios seleccionar asientos en tiempo real, elegir combos de snacks y confirmar su reserva, todo con persistencia de datos en la nube.

## Características principales

- **Selección de asientos en tiempo real:** Los asientos seleccionados por un usuario aparecen como "en espera" para otros usuarios hasta que se confirman.
- **Bloqueo de asientos:** Una vez confirmada la reserva, los asientos quedan bloqueados y solo pueden ser modificados por un administrador.
- **Selección de combos:** Después de elegir los asientos, el usuario puede seleccionar combos de snacks y bebidas.
- **Modal de confirmación:** Al finalizar la reserva, se muestra un resumen con los detalles de la compra.
- **Persistencia global:** Los datos de reservas y asientos se almacenan en Firebase Firestore, permitiendo acceso y sincronización desde cualquier dispositivo.
- **Panel de administración:** Gestión de reservas y asientos solo para usuarios con rol de administrador.

## Tecnologías utilizadas

- **Frontend:** React, Vite
- **Backend/Persistencia:** Firebase Firestore
- **Estilos:** CSS Modules
- **Autenticación:** (opcional) Firebase Auth o sistema local

## Estructura del proyecto

```
recvelvet/
├── public/
├── src/
│   ├── components/           # Componentes generales (NavBar, Login, etc)
│   ├── context/              # Contextos de autenticación y rutas privadas
│   ├── pages/
│   │   ├── reserva/          # Páginas y componentes de reserva (Selector de asientos, combos, etc)
│   │   ├── Admin.jsx         # Panel de administración
│   │   ├── Cartelera.jsx     # Cartelera de películas
│   │   └── ...
│   ├── services/             # Servicios de API, Firestore y autenticación
│   └── styles/               # Archivos CSS
├── package.json
├── vite.config.js
└── README.md
```

## Instalación y ejecución

1. **Clona el repositorio:**
   ```pwsh
   git clone <url-del-repo>
   cd recvelvet
   ```
2. **Instala las dependencias:**
   ```pwsh
   npm install
   ```
3. **Configura Firebase:**
   - Edita `src/services/firebase.js` con tu configuración de Firebase.
   - Asegúrate de tener una base de datos Firestore creada y reglas de seguridad adecuadas.
4. **Inicia el servidor de desarrollo:**
   ```pwsh
   npm run dev
   ```
5. **(Opcional) Servidor local de API fake:**
   Si usas la API local (`fakeApi.json`), puedes levantar un servidor con [json-server](https://github.com/typicode/json-server):
   ```pwsh
   npx json-server --watch src/services/fakeApi.json --port 3001
   ```

## Uso

- Selecciona una película y función.
- Elige la sala, fecha, hora y formato.
- Selecciona tus asientos (los ocupados aparecerán en gris y no seleccionables).
- Confirma tu selección y elige un combo si lo deseas.
- Visualiza el resumen de tu reserva.

## Personalización

- Puedes modificar los combos, películas y salas editando los archivos en `src/services/fakeApi.json` y `public/img/`.
- Para cambiar reglas de Firestore, ve a la consola de Firebase > Firestore Database > Rules.

## Créditos

Desarrollado por Breyner Hernández, Douglas Rodriguez, Farley Gomez para RecVelvet.

---

¿Dudas o sugerencias? ¡Contáctanos!
