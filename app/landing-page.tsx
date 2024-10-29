import Image from 'next/image'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import '../styles/globals.css'; // Make sure this contains the @font-face

export default function Home() {
  return (
    <div className={`flex flex-col min-h-screen relative ${aeonik.className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8957f8d6daf162c3ec0d5fd53af26635-Ebtmlghe6meHQJa2j3t8wutaNBvERh.jpg"
          alt="Skincare texture background"
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
      <main className="flex-grow flex items-center justify-center px-4 relative z-10">
        <div className="text-center space-y-8 max-w-3xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#371F76] leading-tight">
            Discover personalized skincare recommendations tailored to your unique needs
          </h1>
          <Button asChild size="lg" className="text-lg px-8 py-6 font-medium bg-[#371F76] text-[#AAF0D2] hover:bg-[#4a2a9f]">
            <Link href="/skincare-routine">Start Now</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}