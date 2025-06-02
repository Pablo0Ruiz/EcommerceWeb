import Navbar from '@/modules/landing/components/navbar';
import Hero from '@/modules/landing/components/heroSection';
import Benefits from '@/modules/landing/components/benefits';
import ProductList from '@/modules/landing/components/landingProd';
import Testimonials from '@/modules/landing/components/testimonials';
import Footer from '@/modules/landing/components/footer';
import fondo from '@/../../public/fondo_landing.jpg';

export default function Home() {
  return (
    <main
      className="text-gray-900 bg-cover bg-center bg-no-repeat min-h-screen"
      style={{
        backgroundImage: `url(${fondo.src})`,
      }}
    >
      <div className="backdrop-brightness-75 min-h-screen">
        <Navbar />
        <Hero />
        <Benefits />
        <ProductList />
        <Testimonials />
        <Footer />
      </div>
    </main>
  );
}
