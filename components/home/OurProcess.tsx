import step1 from "../../public/img/step1.avif"
import step2 from "../../public/img/step2.jpg"
import step3 from "../../public/img/step3.avif"
import step4 from "../../public/img/step4.jpg"
import step5 from "../../public/img/step5.jpg"

export default function OurProcess() {
  // const steps = [
  //   {
  //     id: 1,
  //     title: "High Nutritional Value",
  //     description: "Organic foods preserve far more natural vitamins and minerals.",
  //     image: "https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  //   },
  //   {
  //     id: 2,
  //     title: "Preserves the Environment",
  //     description: "Sustainable farming ensures soil conversation & reduced air pollution.",
  //     image: "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  //   },
  //   {
  //     id: 3,
  //     title: "Certified Organic Sources",
  //     description: "Our products are strictly quality controlled and independently verified.",
  //     image: "https://i.pinimg.com/736x/fa/9e/a1/fa9ea111040fd3afe0e241f128fc46e8.jpg"
  //   },
  //   {
  //     id: 4,
  //     title: "No Chemicals & Pesticides",
  //     description: "We don’t use artificial fertilisers or additives in our food.",
  //     image: "https://i.pinimg.com/736x/fd/29/04/fd290431d98282cbb445fa4833efaea8.jpg"
  //   }
  // ];

  const steps = [
    {
      id: 1,
      title: "Discover Curated Fashion",
      description: "Explore handpicked collections crafted for every mood, season, and occasion. From timeless classics to runway-inspired trends — discover fashion that elevates your everyday style.",
      image: step1
    },
    {
      id: 2,
      title: "Find Your Perfect Fit",
      description: "Select silhouettes, fabrics, and sizes that match your personal aesthetic. Our detailed size guides and style insights ensure you choose pieces that look and feel just right.",
      image: step2
    },
    {
      id: 3,
      title: "Smooth & Secure Checkout",
      description: "Enjoy a refined shopping experience with a fast, seamless checkout flow. Multiple safe payment options let you confirm your favorite looks in just a few clicks.",
      image: step3
    },
    {
      id: 4,
      title: "Packed with Precision",
      description: "Every order is carefully inspected, steam-pressed, and packed with premium materials. We ensure your garments arrive fresh, crisp, and ready to wear.",
      image: step4
    },
    {
      id: 5,
      title: "Delivered Right to Your Doorstep",
      description: "Experience fast, reliable delivery with real-time tracking at every step. Your style essentials reach you safely — just the way premium shopping should be.",
      image: step5
    }
  ];

  return (
    <section className="py-20 bg-secBgImage bg-cover bg-center bg-no-repeat w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl text-[#3529d9] font-bold mb-4">Our Process</h2>
          <p className="text-black max-w-2xl mx-auto">
             Crafted with Care from Start to Finish.
          </p>
        </div>

        <div className="flex flex-col space-y-24">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl">
                    <img
                      src={step.image?.src}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold z-10">
                    {step.id}
                  </div>
                  <div className="absolute -top-4 -left-4 w-full h-full border-2 border-red-600 rounded-xl z-0"></div>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-[#3529d9]">{step.title}</h3>
                <p className="text-lg text-black">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}