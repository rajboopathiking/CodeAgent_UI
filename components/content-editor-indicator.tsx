"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit, ImageIcon, Video, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ContentEditorIndicatorProps {
  type: "image" | "video" | "text" | "mixed"
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
  tooltipText?: string
  onClick?: () => void
}

export default function ContentEditorIndicator({
  type,
  position = "top-right",
  tooltipText = "Edit content",
  onClick,
}: ContentEditorIndicatorProps) {
  const [isHovered, setIsHovered] = useState(false)

  const positionClasses = {
    "top-right": "top-2 right-2",
    "top-left": "top-2 left-2",
    "bottom-right": "bottom-2 right-2",
    "bottom-left": "bottom-2 left-2",
  }

  const getIcon = () => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "text":
        return <FileText className="h-4 w-4" />
      case "mixed":
        return <Edit className="h-4 w-4" />
      default:
        return <Edit className="h-4 w-4" />
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={`absolute z-30 ${positionClasses[position]}`}
            initial={{ opacity: 0.7, scale: 0.9 }}
            animate={{
              opacity: isHovered ? 1 : 0.7,
              scale: isHovered ? 1.1 : 1,
              boxShadow: isHovered ? "0 0 8px rgba(22, 101, 52, 0.5)" : "none",
            }}
            whileHover={{ opacity: 1, scale: 1.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 rounded-full p-0 bg-white/90 border-green-200 hover:bg-green-50"
              onClick={onClick}
            >
              {getIcon()}
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
