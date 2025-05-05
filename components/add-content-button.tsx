"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, ImageIcon, Video, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AddContentButtonProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "center"
  onAddImage?: () => void
  onAddVideo?: () => void
  onAddText?: () => void
}

export default function AddContentButton({
  position = "center",
  onAddImage,
  onAddVideo,
  onAddText,
}: AddContentButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  }

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className={`absolute z-40 ${positionClasses[position]}`}>
      <motion.div initial={{ opacity: 0.9, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                className={`rounded-full p-0 w-12 h-12 ${
                  isOpen ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"
                }`}
                onClick={toggleOpen}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{isOpen ? "Close menu" : "Add new content"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-2 flex flex-col gap-2 min-w-[180px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex justify-start gap-2 border-green-200 hover:bg-green-50"
                    onClick={() => {
                      if (onAddImage) onAddImage()
                      setIsOpen(false)
                    }}
                  >
                    <ImageIcon className="h-4 w-4" />
                    <span>Add Image</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Upload and add a new image</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex justify-start gap-2 border-green-200 hover:bg-green-50"
                    onClick={() => {
                      if (onAddVideo) onAddVideo()
                      setIsOpen(false)
                    }}
                  >
                    <Video className="h-4 w-4" />
                    <span>Add Video</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Upload and add a new video</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex justify-start gap-2 border-green-200 hover:bg-green-50"
                    onClick={() => {
                      if (onAddText) onAddText()
                      setIsOpen(false)
                    }}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Add Text Content</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Add new text content</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
