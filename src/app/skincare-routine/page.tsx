"use client"

import { useState } from "react"
import Image from 'next/image'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, ArrowLeft, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { aeonik } from '../../fonts'

const questions = [
  {
    id: "gender",
    question: "Are you male or female?",
    options: ["Male", "Female", "Prefer not to say"]
  },
  {
    id: "currentRoutine",
    question: "Do you currently have a skincare routine?",
    options: ["No", "I have a basic routine", "I have a multi-step routine"]
  },
  {
    id: "budget",
    question: "What's your budget?",
    options: ["Low", "Medium", "High"]
  },
  {
    id: "skinType",
    question: "What's your skin type?",
    options: ["Dry", "Oily", "Combination", "Normal", "Sensitive"]
  },
  {
    id: "concerns",
    question: "What's your main skin concern?",
    options: ["Acne", "Aging", "Hyperpigmentation", "Dryness", "Redness"]
  },
  {
    id: "sensitivity",
    question: "How sensitive is your skin?",
    options: ["Not sensitive", "Slightly sensitive", "Very sensitive"]
  },
  {
    id: "climate",
    question: "What climate do you live in?",
    options: ["Dry", "Humid", "Temperate", "Cold"]
  },
  {
    id: "sunExposure",
    question: "How much sun exposure do you get daily?",
    options: ["Minimal", "Moderate", "High"]
  },
  {
    id: "age",
    question: "What's your age range?",
    options: ["Under 20", "20-30", "31-40", "41-50", "Over 50"]
  }
]

export default function SkincareRoutineGenerator() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [routine, setRoutine] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [direction, setDirection] = useState(0)

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer })
    if (currentQuestion < questions.length - 1) {
      setDirection(1)
      setCurrentQuestion(currentQuestion + 1)
    } else {
      generateRoutine()
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setDirection(-1)
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const generateRoutine = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/generate-routine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      })

      if (!response.ok) {
        throw new Error('Failed to generate routine')
      }

      const data = await response.json()
      setRoutine(data.routine)
    } catch (error) {
      console.error('Error generating routine:', error)
      setRoutine("We're sorry, but we couldn't generate your routine at this time. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`flex flex-col min-h-screen ${aeonik.className}`}>
      {/* Header */}
      <header className="bg-[#371F76] p-4 flex justify-between items-center z-20 relative">
        <Link href="/" className="text-[#AAF0D2] text-xl font-bold">
          liora.space
        </Link>
        <Link href="/how-it-works" className="text-[#AAF0D2] hover:underline">
          How it works
        </Link>
      </header>

      {/* Main Content with Background Image */}
      <main className="flex-grow flex relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2f8337a9ffd6393699861a337745c565-XMiHzTEzWJM95804YuYazwMpOloIks.jpg"
            alt="Creamy texture background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>

        {/* Content */}
        <div className="flex items-center justify-center w-full p-4 md:p-8 z-10 relative">
          <Card className="w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#371F76]">Skincare Routine Generator</CardTitle>
              <CardDescription>Answer a few questions to get your personalized skincare routine.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-[#371F76]" />
                  <p className="text-[#371F76]">Generating your personalized skincare routine...</p>
                </div>
              ) : routine ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#371F76]">Your Personalized Skincare Routine:</h3>
                  <div className="whitespace-pre-wrap text-gray-700">{routine}</div>
                </div>
              ) : (
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  <motion.div
                    key={currentQuestion}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-[#371F76]">{questions[currentQuestion].question}</h3>
                    <RadioGroup 
                      onValueChange={handleAnswer}
                      value={answers[questions[currentQuestion].id] || ""}
                      className="space-y-2"
                    >
                      {questions[currentQuestion].options.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={option} className="peer sr-only" />
                          <Label
                            htmlFor={option}
                            className="flex flex-1 cursor-pointer items-center justify-between rounded-md border-2 border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-[#371F76] peer-data-[state=checked]:bg-[#371F76]/10"
                          >
                            <span className="text-gray-700 peer-data-[state=checked]:text-[#371F76]">{option}</span>
                            <Check className="invisible h-4 w-4 text-[#371F76] peer-data-[state=checked]:visible" />
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </motion.div>
                </AnimatePresence>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {!routine && !isLoading && currentQuestion > 0 && (
                <Button 
                  onClick={handleBack} 
                  variant="outline"
                  size="sm"
                  className="text-[#371F76] border-[#371F76] hover:bg-[#371F76] hover:text-white"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              )}
              {(routine || isLoading) && (
                <Button 
                  onClick={() => {
                    setCurrentQuestion(0)
                    setAnswers({})
                    setRoutine(null)
                  }} 
                  disabled={isLoading}
                  className="bg-[#371F76] text-white hover:bg-[#371F76]/90"
                >
                  Start Over
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}