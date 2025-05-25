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

  // Factor de escala para reducir todo proporcionalmente
  const scaleFactor = 0.9;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fondo de imagen */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={bgImage}
          alt="Background"
          fill
          className="object-cover"
          quality={100}
        />
      </div>
      
      {/* Capa semitransparente */}
      <div className="fixed inset-0 bg-[#D9D9D9] opacity-60" />

      {/* Contenedor principal escalado */}
      <div 
        className="relative h-full w-full flex items-center justify-center"
        style={{ transform: `scale(${scaleFactor})`, transformOrigin: 'center' }}
      >
        {/* Contenido del formulario */}
        <div className="relative w-[1920px] h-[1080px]">
          {/* Logo Matezone */}
          <div className="absolute w-[268px] h-[379px] left-[839px] top-[-6px]">
            <Image 
              src={logo} 
              alt="Logo Matezone" 
              fill 
              className="object-contain" 
            />
          </div>

          {/* Imagen decorativa izquierda */}
          <div className="absolute w-[585px] h-[332px] left-[319px] top-[441px] border-4 border-black">
            <Image 
              src={image34} 
              alt="imagen decorativa" 
              fill 
              className="object-cover" 
            />
          </div>

          {/* Título "Registro" */}
          <h2 className="absolute w-[346px] h-[111.67px] left-[1000px] top-[325px] font-roboto font-bold text-[80px] leading-[40px] flex items-center justify-center text-black transform rotate-[0.36deg]">
            Registro
          </h2>

          {/* Barra negra decorativa */}
          <div className="absolute w-[613px] h-[2px] left-[673px] top-[650px] bg-black border-2 border-black transform rotate-[90.09deg]" />

          {/* Formulario */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="absolute left-[1022px] top-[429px] w-[362px] flex flex-col gap-8"
          >
            {/* Nombre */}
            <div className="flex flex-col gap-2 w-full">
              <label className="w-full h-[22px] font-inter font-normal text-[16px] leading-[140%] text-[#1E1E1E]">
                Nombre
              </label>
              <input
                {...register("name", {
                  required: "El nombre es obligatorio"
                })}
                className="w-full h-[40px] px-4 py-3 bg-white border border-[#D9D9D9] rounded-lg font-inter font-normal text-[16px] leading-[100%] text-[#B3B3B3]"
                placeholder="Nombre"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Apellido */}
            <div className="flex flex-col gap-2 w-full">
              <label className="w-full h-[22px] font-inter font-normal text-[16px] leading-[140%] text-[#1E1E1E]">
                Apellido
              </label>
              <input
                {...register("surnames", {
                  required: "El apellido es obligatorio"
                })}
                className="w-full h-[40px] px-4 py-3 bg-white border border-[#D9D9D9] rounded-lg font-inter font-normal text-[16px] leading-[100%] text-[#B3B3B3]"
                placeholder="Apellido"
              />
              {errors.surnames && (
                <p className="text-red-500 text-sm">{errors.surnames.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 w-full">
              <label className="w-full h-[22px] font-inter font-normal text-[16px] leading-[140%] text-[#1E1E1E]">
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
                className="w-full h-[40px] px-4 py-3 bg-white border border-[#D9D9D9] rounded-lg font-inter font-normal text-[16px] leading-[100%] text-[#B3B3B3]"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Contraseña */}
            <div className="flex flex-col gap-2 w-full">
              <label className="w-full h-[22px] font-inter font-normal text-[16px] leading-[140%] text-[#1E1E1E]">
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
                className="w-full h-[40px] px-4 py-3 bg-white border border-[#D9D9D9] rounded-lg font-inter font-normal text-[16px] leading-[100%] text-[#B3B3B3]"
                placeholder="Contraseña"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Teléfono */}
            <div className="flex flex-col gap-2 w-full">
              <label className="w-full h-[22px] font-inter font-normal text-[16px] leading-[140%] text-[#1E1E1E]">
                Teléfono
              </label>
              <input
                {...register("phoneNumber", {
                  required: "El teléfono es obligatorio",
                  pattern: {
                    value: /^[0-9\s()+-]+$/,
                    message: "Teléfono no válido"
                  }
                })}
                className="w-full h-[40px] px-4 py-3 bg-white border border-[#D9D9D9] rounded-lg font-inter font-normal text-[16px] leading-[100%] text-[#B3B3B3]"
                placeholder="Teléfono"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Botón de Registro */}
            <div className="relative w-[361.42px] h-[68px]">
              <button
                type="submit"
                className="absolute w-full h-full bg-[#0CAA2A] rounded-[15px] flex items-center justify-center"
                style={{ transform: 'matrix(1, 0.01, -0.01, 1, 0, 0)' }}
              >
                <span className="font-tilt-warp font-normal text-[40px] leading-[140%] text-center text-white">
                  Registrarse
                </span>
              </button>
            </div>
          </form>

          {/* Link para login */}
          <Link
            href="/auth/login"
            className="absolute w-[263px] h-[22px] left-[1074px] top-[1030px] font-inter font-normal text-[16px] leading-[140%] underline text-[#8aff8a] "
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm