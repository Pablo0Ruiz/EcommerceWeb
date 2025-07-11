"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "@/shared/components/inputField";
import { useProfile } from "../hook/useProfile";
import { User } from "@/modules/auth/typesAuth";
import Image from "next/image";
import ChangePasswordModal from "./modalPerfil";
import Logout from "../hook/useLogout";
import { useRouter } from "next/navigation";
import { deleteUserCookie } from "@/shared/utils/cookies";
import toast from "react-hot-toast";

type EditableUserFields = Pick<
  User,
  "name" | "surnames" | "email" | "phoneNumber" | "urlToAvatar"
>;

export const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    watch,
  } = useForm<EditableUserFields>();

  const { fetchProfile, updateProfile } = useProfile();
  const [loading, setLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const router = useRouter();
  const [editingField, setEditingField] = useState<
    keyof EditableUserFields | null
  >(null);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchProfile();
        const editableData: EditableUserFields = {
          name: data.name,
          surnames: data.surnames,
          email: data.email,
          phoneNumber: data.phoneNumber,
          urlToAvatar: data.urlToAvatar || "",
        };
        reset(editableData);
      } catch (error) {
        toast.error(
          `Error cargando perfil: ${
            error instanceof Error ? error.message : "Intente más tarde"
          }`
        );
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [reset, fetchProfile]);

  const toggleEdit = (field: keyof EditableUserFields) => {
    setEditingField((prev) => (prev === field ? null : field));
  };

  const onSubmit = async (data: EditableUserFields) => {
    try {
      await updateProfile(data as User);
      setEditingField(null);
      const updatedUser = await fetchProfile();
      reset({
        name: updatedUser.name,
        surnames: updatedUser.surnames,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        urlToAvatar: updatedUser.urlToAvatar || "",
      });
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      toast.error(
        `Error actualizando perfil: ${
          error instanceof Error ? error.message : "Intente más tarde"
        }`
      );
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/auth/user/image", {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error al subir imagen");
      }

      const updatedUser = await fetchProfile();
      reset({
        name: updatedUser.name,
        surnames: updatedUser.surnames,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        urlToAvatar: updatedUser.urlToAvatar,
      });
      toast.success("Imagen de perfil actualizada");
    } catch (error) {
      toast.error(
        `Error cambiando imagen: ${
          error instanceof Error ? error.message : "Intente más tarde"
        }`
      );
    }
  };

  const handleLogout = async () => {
    await Logout();
    deleteUserCookie();
    router.push("/");
  };

  const formValues = watch();

  if (loading) {
    return <p className="p-6 text-gray-500">Cargando perfil...</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Mi cuenta</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 flex flex-col items-center border-b border-gray-200">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-4 overflow-hidden">
            <Image
              src={formValues.urlToAvatar || "/logo.png"}
              alt="Avatar"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            id="profile-image-input"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            onClick={() =>
              document.getElementById("profile-image-input")?.click()
            }
          >
            Cambiar foto
          </button>
        </div>

        {(
          [
            "name",
            "surnames",
            "email",
            "phoneNumber",
          ] as (keyof EditableUserFields)[]
        ).map((field) => (
          <div className="p-6 border-b border-gray-200" key={field}>
            <div className="flex justify-between items-start mb-2">
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 capitalize"
              >
                {field === "surnames"
                  ? "Apellido"
                  : field === "phoneNumber"
                  ? "Teléfono"
                  : field === "email"
                  ? "Correo electrónico"
                  : "Nombre"}
              </label>
              <button
                type="button"
                onClick={() => toggleEdit(field)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                {editingField === field ? "Cancelar" : "Modificar"}
              </button>
            </div>

            {editingField === field ? (
              <InputField<EditableUserFields>
                id={field}
                label=""
                register={register}
                type={
                  field === "email"
                    ? "email"
                    : field === "phoneNumber"
                    ? "tel"
                    : "text"
                }
                error={errors[field]}
                defaultValue={formValues[field]}
                requiredMsg={`El ${
                  field === "surnames" ? "apellido" : field
                } es obligatorio`}
                validationRules={
                  field === "email"
                    ? {
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "El correo no es válido",
                        },
                      }
                    : field === "phoneNumber"
                    ? {
                        pattern: {
                          value: /^[0-9\s()+-]+$/,
                          message: "Teléfono no válido",
                        },
                      }
                    : undefined
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            ) : (
              <p className="text-gray-900">{formValues[field]}</p>
            )}
          </div>
        ))}

        {isDirty && (
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
      <div className="p-6 border-b border-gray-200">
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          onClick={() => setIsPasswordModalOpen(true)}
        >
          Cambiar contraseña
        </button>
      </div>
      <div className="p-6 border-b border-gray-200">
        <button
          type="button"
          className="text-sm text-red-600 hover:text-red-800 font-medium"
          onClick={handleLogout}
        >
          Cerrar Sesion
        </button>
      </div>
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};
