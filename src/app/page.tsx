import Navbar from '@/modules/landing/components/navbar';
import Hero from '@/modules/landing/components/heroSection';
import Benefits from '@/modules/landing/components/benefits';
import ProductList from '@/modules/landing/components/landingProd';
import Testimonials from '@/modules/landing/components/testimonials';
import Footer from '@/modules/landing/components/footer';

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Benefits />
      <ProductList />
      <Testimonials />
      <Footer />
    </main>
  );
}
