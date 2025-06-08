"use client";
import { useState, useEffect } from "react";
import { Header } from "@/modules/market/components/header";
import Image from "next/image";
import { Footer } from "@/modules/market/components/footer";
import { PopUp } from "@/shared/components/popup";
import { Product } from "@/modules/product/typesProduct";
import Link from "next/link";
import { CATEGORIES } from "@/shared/components/categories";
import { useRouter, useSearchParams } from "next/navigation";
import bgMarket from "@/../public/matezone_market.jpeg";
import { useCartStore } from "@/modules/cart/hook/cart";
import { getProducts } from "@/modules/product/services/product";

export default function Market() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const category = searchParams.get("category");
    setSelectedCategory(category);
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await getProducts({
          category: selectedCategory || undefined,
        });
        const normalizedProducts = fetchedProducts.map((p) => ({
          ...p,
          id: p._id ? String(p._id) : String(p.id),
          category:
            p.category.charAt(0).toUpperCase() +
            p.category.slice(1).toLowerCase(), // Capitalizar la primera letra
        }));

        setProducts(normalizedProducts);
        console.log("Productos cargados:", normalizedProducts);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar productos"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setShowPopup(true);
    addToCart(product);
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  const handleContinueShopping = () => {
    setShowPopup(false);
  };

  const clearFilter = () => {
    setSelectedCategory(null);
    router.push("/market");
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const productsByCategory = CATEGORIES.map((category) => ({
    ...category,
    products: filteredProducts.filter((p) => p.category === category.value),
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-100/30 min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <Image
          src={bgMarket}
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
      </div>

      <Header />
      <main className="container mx-auto p-4">
        {/* Filtro activo */}
        {selectedCategory && (
          <div className="mb-4 flex justify-between items-center bg-white p-3 rounded shadow">
            <span className="text-gray-700">
              Mostrando:{" "}
              <strong>
                {CATEGORIES.find((c) => c.value === selectedCategory)?.name}
              </strong>
            </span>
            <button
              onClick={clearFilter}
              className="text-[#131921] hover:text-[#0CAA2A] text-sm font-medium"
            >
              Mostrar todos los productos
            </button>
          </div>
        )}

        {/* Secciones de productos */}

        {productsByCategory.map(
          ({ name, value, products }) =>
            products.length > 0 && (
              <section key={value} className="mb-8 bg-white/0 p-4 rounded">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{name}</h2>
                  <Link
                    href={`/${value.toLowerCase()}`}
                    className="text-[#000000] hover:text-[#0CAA2A] text-sm"
                  >
                    Ver todos
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <Link
                      href={`/product/${product.id}`}
                      key={product.id}
                      className="group border bg-white border-gray-200 hover:border-[#0CAA2A] rounded-xl p-3 transition cursor-pointer"
                    >
                      <div className="relative h-48 w-full mb-3">
                        <Image
                          src={product.images[0] || bgMarket}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#131921]">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg text-gray-900">
                          {product.price.toFixed(2)}€
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            product.stock > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.stock > 0 ? "En stock" : "Agotado"}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                        className={`mt-2 w-full py-1 rounded text-sm font-medium transition ${
                          product.stock > 0
                            ? "bg-[#0CAA2A] hover:bg-green-700 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        disabled={product.stock <= 0}
                      >
                        {product.stock > 0 ? "Añadir al carrito" : "Sin stock"}
                      </button>
                    </Link>
                  ))}
                </div>
              </section>
            )
        )}
      </main>
      <Footer />

      <PopUp
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title={`${selectedProduct?.name} añadido al carrito`}
        message={`Precio: ${selectedProduct?.price.toFixed(2)}€${
          selectedProduct?.discount
            ? ` (${selectedProduct.discount}% de descuento)`
            : ""
        }`}
        primaryButtonText="Seguir comprando"
        secondaryButtonText="Ir al carrito"
        onPrimaryButtonClick={handleContinueShopping}
        secondaryButtonHref="/cart"
        primaryButtonColor="bg-[#0CAA2A] hover:bg-green-700 text-white"
        secondaryButtonColor="bg-white border border-[#131921] hover:bg-gray-100"
        showSuccessIcon={true}
        animationDuration={300}
      />
    </div>
  );
}
