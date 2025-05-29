'use client'
import Image from 'next/image'
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { useLogin } from "../hook/useLogin";
import { LoginData } from "../typesAuth";

import bgImage from "@/../public/bgImage.jpg"
import logo from '@/../public/logo.png';
import image34 from '@/../public/imLogin.png';

const LoginForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginData>();
  const { onSubmit } = useLogin(reset);

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Fondo de imagen */}
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

      {/* Logo */}
      <div className="absolute top-0 w-[150px] h-[212px]">
        <Image 
          src={logo} 
          alt="Logo Matezone" 
          fill 
          className="object-contain" 
          priority
        />
      </div>

      {/* Contenedor principal centrado */}
      <div className="relative w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-between p-4 mt-[130px] lg:mt-0">
        {/* Sección izquierda (imagen) */}
        <div className="hidden lg:flex w-[45%] items-center justify-end">
          <div className="relative w-full max-w-[400px] aspect-[585/332] border-4 border-black">
            <Image 
              src={image34} 
              alt="imagen decorativa" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>

        {/* Línea divisoria vertical centrada */}
        <div className="hidden lg:block absolute left-1/2 h-[50vh] bg-black w-[2px] transform -translate-x-1/2" />

        {/* Sección derecha (formulario) */}
        <div className="w-[45%] flex flex-col items-center">
          {/* Título "Log in" */}
          <h2 className="font-roboto font-bold text-[60px] leading-[60px] mb-6 text-black text-center">
            Log in
          </h2>

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="font-inter font-medium text-[16px] text-[#1E1E1E]">
                Correo electrónico
              </label>
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
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Contraseña */}
            <div className="flex flex-col gap-2">
              <label className="font-inter font-medium text-[16px] text-[#1E1E1E]">
                Contraseña
              </label>
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
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Botón de Login */}
            <button
              type="submit"
              className="w-full py-3 bg-[#0CAA2A] rounded-[15px] flex items-center justify-center transform hover:scale-105 transition-transform"
            >
              <span className="font-tilt-warp text-[32px] text-white">
                Log in
              </span>
            </button>
          </form>

          {/* Link de registro */}
          <Link
            href="/auth/register"
            className="mt-6 font-inter text-[16px] text-[#8aff8a] hover:text-[#0CAA2A] hover:underline"
          >
            ¿No tienes cuenta? Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm