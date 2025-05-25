'use client'

import Image from 'next/image'
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { useRegister } from "../hook/useRegister";
import { RegisterData } from "../typesAuth";

import bgImage from "@/../public/bgImage.jpg"
import logo from '@/../public/logo.png';
import image34 from '@/../public/imLogin.png';

const RegisterForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterData>();
  const { onSubmit } = useRegister(reset);

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Fondo */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={bgImage}
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
      </div>

      {/* Capa semitransparente */}
      <div className="fixed inset-0 bg-[#D9D9D9] opacity-60" />

      {/* Logo más arriba */}
      <div className="absolute top-0 w-[150px] h-[212px]">
        <Image 
          src={logo} 
          alt="Logo Matezone" 
          fill 
          className="object-contain" 
          priority
        />
      </div>

      {/* Contenedor principal */}
      <div className="relative w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-between p-4 mt-[130px] lg:mt-0">
        {/* Imagen izquierda */}
        <div className="hidden lg:flex w-[45%] items-center justify-end">
          <div className="relative w-full max-w-[400px] aspect-[585/332] border-4 border-black">
            <Image 
              src={image34} 
              alt="Imagen decorativa" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="hidden lg:block absolute left-1/2 h-[50vh] bg-black w-[2px] transform -translate-x-1/2" />

        {/* Formulario */}
        <div className="w-[45%] flex flex-col items-center">
          <h2 className="font-roboto font-bold text-[60px] mb-6 text-black text-center">
            Registro
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
            {/* Nombre */}
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[16px] text-[#1E1E1E]">Nombre</label>
              <input
                {...register("name", { required: "El nombre es obligatorio" })}
                className="w-full px-4 py-2 bg-white border border-[#D9D9D9] rounded-lg font-inter text-[16px] text-[#1E1E1E]"
                placeholder="Nombre"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Apellido */}
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[16px] text-[#1E1E1E]">Apellido</label>
              <input
                {...register("surnames", { required: "El apellido es obligatorio" })}
                className="w-full px-4 py-2 bg-white border border-[#D9D9D9] rounded-lg font-inter text-[16px] text-[#1E1E1E]"
                placeholder="Apellido"
              />
              {errors.surnames && <p className="text-red-500 text-sm">{errors.surnames.message}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[16px] text-[#1E1E1E]">Correo electrónico</label>
              <input
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "El correo no es válido"
                  }
                })}
                className="w-full px-4 py-2 bg-white border border-[#D9D9D9] rounded-lg font-inter text-[16px] text-[#1E1E1E]"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Contraseña */}
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[16px] text-[#1E1E1E]">Contraseña</label>
              <input
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{8,}$/,
                    message: "Debe tener al menos 1 mayúscula, 1 número, 1 carácter especial y mínimo 8 caracteres"
                  }
                })}
                type="password"
                className="w-full px-4 py-2 bg-white border border-[#D9D9D9] rounded-lg font-inter text-[16px] text-[#1E1E1E]"
                placeholder="Contraseña"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Teléfono */}
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[16px] text-[#1E1E1E]">Teléfono</label>
              <input
                {...register("phoneNumber", {
                  required: "El teléfono es obligatorio",
                  pattern: {
                    value: /^[0-9\s()+-]+$/,
                    message: "Teléfono no válido"
                  }
                })}
                className="w-full px-4 py-2 bg-white border border-[#D9D9D9] rounded-lg font-inter text-[16px] text-[#1E1E1E]"
                placeholder="Teléfono"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full py-3 bg-[#0CAA2A] rounded-[15px] flex items-center justify-center transform hover:scale-105 transition-transform"
            >
              <span className="font-tilt-warp text-[32px] text-white">
                Registrarse
              </span>
            </button>
          </form>

          {/* Link a login */}
          <Link
            href="/auth/login"
            className="mt-6 font-inter text-[16px] text-[#8aff8a] hover:text-[#0CAA2A] hover:underline"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm