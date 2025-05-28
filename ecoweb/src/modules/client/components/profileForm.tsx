"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "@/shared/components/inputField";
import { useProfile } from "../hook/useProfile";
import { useGetProfile } from "../hook/useGetProfile";
import { RegisterData } from "@/modules/auth/typesAuth";
import Cookies from "js-cookie";
import { getCookie, getUserCookie } from "@/shared/utils/cookies";

export const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterData>();
  const { onSubmit } = useProfile(reset);
  const { userData, loading, error, refetch } = useGetProfile();
  const token = getCookie();
  console.log("deberia ser token", Cookies.get("token"));
  console.log(token);
  const user= getUserCookie()
  console.log("deberia ser user ",user)
  const [editing, setEditing] = useState<Record<keyof RegisterData, boolean>>({
    name: false,
    surnames: false,
    email: false,
    phoneNumber: false,
    password: false,
  });

  // Cargar datos del perfil cuando estén disponibles
  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || "",
        surnames: userData.surnames || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        password: "", // Nunca cargamos la contraseña
      });
    }
  }, [userData, reset]);

  const toggleEdit = (field: keyof RegisterData) => {
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-red-500">
        <p>Error: {error}</p>
        <button
          onClick={refetch}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <p>No se encontraron datos del perfil</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Mi cuenta</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Avatar */}
        <div className="p-6 flex flex-col items-center border-b border-gray-200">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-4">
            <span className="text-3xl">👤</span>
          </div>
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Cambiar foto
          </button>
        </div>

        {/* Campos del formulario */}
        <div className="divide-y divide-gray-200">
          {/* Nombre */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <button
                type="button"
                onClick={() => toggleEdit("name")}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                {editing.name ? "Cancelar" : "Modificar"}
              </button>
            </div>
            {editing.name ? (
              <InputField<RegisterData>
                id="name"
                label=""
                register={register}
                type="text"
                error={errors.name}
                defaultValue={userData.name}
                requiredMsg="El nombre es obligatorio"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            ) : (
              <p className="text-gray-900">{userData.name}</p>
            )}
          </div>

          {/* Apellido */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <label
                htmlFor="surnames"
                className="block text-sm font-medium text-gray-700"
              >
                Apellido
              </label>
              <button
                type="button"
                onClick={() => toggleEdit("surnames")}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                {editing.surnames ? "Cancelar" : "Modificar"}
              </button>
            </div>
            {editing.surnames ? (
              <InputField<RegisterData>
                id="surnames"
                label=""
                register={register}
                type="text"
                error={errors.surnames}
                defaultValue={userData.surnames}
                requiredMsg="El apellido es obligatorio"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            ) : (
              <p className="text-gray-900">{userData.surnames}</p>
            )}
          </div>

          {/* Email */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electrónico
              </label>
              <button
                type="button"
                onClick={() => toggleEdit("email")}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                {editing.email ? "Cancelar" : "Modificar"}
              </button>
            </div>
            {editing.email ? (
              <InputField<RegisterData>
                id="email"
                label=""
                register={register}
                type="email"
                error={errors.email}
                defaultValue={userData.email}
                requiredMsg="El email es obligatorio"
                validationRules={{
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "El correo no es válido",
                  },
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            ) : (
              <p className="text-gray-900">{userData.email}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Teléfono
              </label>
              <button
                type="button"
                onClick={() => toggleEdit("phoneNumber")}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                {editing.phoneNumber ? "Cancelar" : "Modificar"}
              </button>
            </div>
            {editing.phoneNumber ? (
              <InputField<RegisterData>
                id="phoneNumber"
                label=""
                register={register}
                type="tel"
                error={errors.phoneNumber}
                defaultValue={userData.phoneNumber}
                requiredMsg="El número es obligatorio"
                validationRules={{
                  pattern: {
                    value: /^[0-9\s()+-]+$/,
                    message: "Teléfono no válido",
                  },
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            ) : (
              <p className="text-gray-900">{userData.phoneNumber}</p>
            )}
          </div>
        </div>

        {/* Botón de guardar (solo visible si hay campos en edición) */}
        {Object.values(editing).some(Boolean) && (
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Guardar cambios
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
