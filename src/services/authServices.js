const API_URL = "http://localhost:3001/users";

// Registrar un nuevo usuario
export const registerUser = async (formData) => {
  try {
    // Verificar si el correo ya existe
    const response = await fetch(API_URL);
    const users = await response.json();
    const userExists = users.some((user) => user.email === formData.email);

    if (userExists) {
      return { success: false, message: "El correo ya está registrado." };
    }

    // Registrar el nuevo usuario
    const registerResponse = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      }),
    });

    if (registerResponse.ok) {
      return { success: true, message: "Usuario registrado con éxito." };
    } else {
      return { success: false, message: "Error al registrar el usuario." };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Error al conectar con la API." };
  }
};

// Validar inicio de sesión
export const loginUser = async (loginData) => {
  try {
    const response = await fetch(API_URL);
    const users = await response.json();

    const user = users.find(
      (u) => u.email === loginData.email && u.password === loginData.password
    );

    if (user) {
      return { success: true, message: `Bienvenido, ${user.fullName}!`, user }; // <-- Devuelve el usuario completo
    } else {
      return { success: false, message: "Correo o contraseña incorrectos." };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Error al conectar con la API." };
  }
};