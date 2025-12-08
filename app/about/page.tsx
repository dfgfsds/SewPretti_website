import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* About Section */}
      <section className="py-20 bg-[#F8F7F2]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-8 text-gray-900">
              About Us
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
             At SewPretti, we believe in the beauty of thoughtful creation. What began as a small vision has grown into a space that 
             values authenticity, creativity, and purpose. Our story is about finding joy in the details — where every idea, design, 
             and effort comes together to reflect care, connection, and a love for what we do.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We’re inspired by everyday moments and the people who bring them to life. Every step we take is guided by our belief that 
              true beauty lies in simplicity, intention, and the heart behind every creation.
            </p>
            <div className="max-w-3xl mx-auto text-center mt-12">
              <span>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  To celebrate creativity, authenticity, and meaningful expression — 
                  making every creation a reflection of care and purpose.
                </p>
              </span>

              <span>
                <h2 className="text-3xl font-bold mb-6">Our Values</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We value honesty, creativity, and connection. 
                  We believe in growing with intention, embracing imperfections, 
                  and creating with heart in everything we do.
                </p>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Be Part of Our Journey
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Every story, every step, and every creation begins with inspiration. Join us as we continue to explore, create, and share 
            what makes life truly SewPretti.
          </p>
          <Button asChild size="lg" className="bg-red-400 hover:bg-red-500 text-white px-8 py-3 rounded-full">
            <Link href="/products">Get in touch</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
