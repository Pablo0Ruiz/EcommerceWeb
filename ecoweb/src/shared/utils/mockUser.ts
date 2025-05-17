// src/shared/utils/mockUser.ts
export const mockUser = {
  _id: "507f1f77bcf86cd799439011",
  name: "Juan",
  surnames: "Pérez García",
  email: "juan.perez@example.com",
  phoneNumber: "+34611223344",
  status: 1,
  role: "user",
  address: [
    {
      nombre: "Casa Principal",
      street: "Calle Gran Vía",
      number: "28",
      postal: "28013",
      city: "Madrid",
      province: "Madrid",
      isDefault: true
    },
    {
      nombre: "Trabajo",
      street: "Avenida Diagonal",
      number: "420",
      postal: "08008",
      city: "Barcelona",
      province: "Barcelona"
    },
    {
      nombre: "Casa de Playa",
      street: "Calle del Mar",
      number: "15",
      postal: "46011",
      city: "Valencia",
      province: "Valencia"
    }
  ],
  urlToAvatar: "https://example.com/avatars/juan.jpg"
};