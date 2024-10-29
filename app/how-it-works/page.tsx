import Image from 'next/image'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { aeonik } from '@/app/fonts'

export default function HowItWorks() {
  return (
    <div className={`flex flex-col min-h-screen relative ${aeonik.className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c136072e025fd0dcbc7a1a5bca3ef216-m4wWlLX4DQnPZDE2lEgZwFGYTJhTmB.jpg"
          alt="Silky texture background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      
      {/* Header */}
      <header className="bg-[#371F76] p-4 flex justify-between items-center relative z-10">
        <Link href="/" className="text-[#AAF0D2] text-xl font-bold">
          liora.space
        </Link>
        <Link href="/how-it-works" className="text-[#AAF0D2] hover:underline">
          How it works
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-16 relative z-10">
        <div className="max-w-4xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#371F76] mb-4">1</div>
              <h2 className="text-xl font-semibold text-[#371F76] mb-2">Tell us about your skin</h2>
              <p className="text-gray-700">Answer a few simple questions about your skin type and concerns.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#371F76] mb-4">2</div>
              <h2 className="text-xl font-semibold text-[#371F76] mb-2">We find suitable products</h2>
              <p className="text-gray-700">Liora analyzes your needs and selects the most appropriate skincare products.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#371F76] mb-4">3</div>
              <h2 className="text-xl font-semibold text-[#371F76] mb-2">Generate your perfect routine</h2>
              <p className="text-gray-700">We create a personalized skincare routine tailored just for you.</p>
            </div>
          </div>
          <div className="mt-16 text-center">
            <Button asChild size="lg" className="text-lg px-8 py-6 font-medium bg-[#371F76] text-[#AAF0D2] hover:bg-[#4a2a9f]">
              <Link href="/skincare-routine">Get Started</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}