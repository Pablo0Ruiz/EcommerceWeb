"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCards from "@/modules/product/components/productCard";
import { useCartStore } from "@/modules/cart/hook/cart";
import CartList from "@/modules/cart/components/viewCart";
import HeaderWizardSteps from "@/modules/cart/utils/headerWizard";
import { doesCookieExist } from "@/shared/utils/cookies";
import carrito from "@/../public/carrito.png";
import { PopUp } from "@/shared/components/popup";
import { useRouter } from "next/navigation";
import { EmailModal } from "@/shared/components/emailModal";
import { EmailUser } from "@/shared/components/emailModal";

const CartPage = () => {
  const { cart, loadCart, addToCart, removeFromCart, decreaseQuantity } =
    useCartStore();
  const [showPopup, setShowPopup] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadCart();
    const handleStorageChange = () => loadCart();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadCart]);

  const checkAuth = () => {
    const token = doesCookieExist("token");
    const userCookie = doesCookieExist("user");
    return !!token || !!userCookie;
  };

  const handleSiguiente = () => {
    if (!checkAuth()) {
      setShowPopup(true);
    } else {
      router.push("/cart/delivery");
    }
  };

  const handleEmailSuccess = (data: { token: string; user: EmailUser}) => {
    console.log("Registro exitoso:", data);
    // Aquí puedes guardar el token en cookies/localStorage si es necesario
    router.push("/cart/delivery");
  };

  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      {/* Imagen de fondo */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={carrito}
          alt="Fondo del carrito"
          fill
          className="object-cover"
          style={{ objectPosition: "center 33%" }}
          quality={100}
          priority
        />
      </div>

      <HeaderWizardSteps currentStep={2} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Botón Volver al Market */}
        <div className="mb-6">
          <Link
            href="/market"
            className="flex items-center text-white hover:text-gray-200 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver al mercado
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-white">
          Detalles del carrito
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3 space-y-4">
            {cart.length > 0 ? (
              cart.map((product) => (
                <ProductCards
                  key={product.id}
                  producto={product}
                  add={addToCart}
                  remove={removeFromCart}
                  disminuirItem={decreaseQuantity}
                />
              ))
            ) : (
              <p className="text-gray-500 p-4 bg-white rounded-lg">
                No hay productos en el carrito
              </p>
            )}
          </div>

          <div className="w-full md:w-1/3">
            <CartList
              showNextButton={true}
              nextButtonLabel="Siguiente"
              nextStepPath=""
            />
            <button
              onClick={handleSiguiente}
              className={`mt-4 w-full py-3 rounded-lg bg-[#0CAA2A] hover:bg-green-700 text-white`}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>

      {/* Popup para login o continuar como invitado */}
      <PopUp
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title="Inicia sesión"
        message="Para tener todos los beneficios, te recomendamos iniciar sesión"
        primaryButtonText="Iniciar sesión"
        secondaryButtonText="Registrarse"
        tertiaryButtonText="Continuar como invitado"
        onPrimaryButtonClick={() => router.push("/auth/login")}
        onSecondaryButtonClick={() => router.push("/auth/register")}
        onTertiaryButtonClick={() => {
          setShowPopup(false);
          setShowEmailModal(true);
        }}
        primaryButtonColor="bg-[#0CAA2A] hover:bg-green-700 text-white"
        secondaryButtonColor="bg-white border border-[#131921] hover:bg-gray-100"
        tertiaryButtonColor="bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
        logo={true}
      />

      {/* Modal para registro de email */}
      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSuccess={handleEmailSuccess}
      />
    </main>
  );
};

export default CartPage;