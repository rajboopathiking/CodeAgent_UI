"use client"

import { useState } from "react"
import { Plus, FileText, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import AddContentButton from "@/components/add-content-button"

export default function FAQPage() {
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([
    {
      question: "What types of events do you cater?",
      answer: "This is a placeholder answer. Add your own content here.",
    },
    {
      question: "How far in advance should I book your services?",
      answer: "This is a placeholder answer. Add your own content here.",
    },
  ])

  // This would be implemented to handle adding new FAQ items
  const handleAddText = () => {
    alert("Add FAQ functionality would be implemented here")
    // In a real implementation, this would open a form to add a new FAQ
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-green-700 max-w-2xl mx-auto">
            Find answers to common questions about our catering services
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {faqs.length === 0 ? (
            <div className="text-center p-8 border-2 border-dashed border-green-200 rounded-lg">
              <FileText className="h-16 w-16 text-green-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">No FAQs Yet</h3>
              <p className="text-green-600 mb-6">Add frequently asked questions to help your customers</p>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleAddText}>
                <Plus className="h-4 w-4 mr-2" /> Add FAQ
              </Button>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-green-200">
                  <AccordionTrigger className="text-green-800 hover:text-green-600">
                    <div className="flex items-center">
                      <span>{faq.question}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="ml-2 h-6 w-6 p-0 rounded-full hover:bg-green-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          alert("Edit FAQ functionality would be implemented here")
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-green-700">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          <AddContentButton position="bottom-right" onAddText={handleAddText} />
        </div>
      </div>
    </div>
  )
}
