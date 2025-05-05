"use client"

import { useState } from "react"
import { ImageIcon, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import AddContentButton from "@/components/add-content-button"

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([])

  // This would be implemented to handle actual image uploads
  const handleAddImage = () => {
    alert("Image upload functionality would be implemented here")
    // In a real implementation, this would open a file picker and upload the image
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-900 mb-4">Our Gallery</h1>
          <p className="text-green-700 max-w-2xl mx-auto">
            Browse through images of our delicious food and catering events
          </p>
        </div>

        <div className="relative min-h-[400px] border-2 border-dashed border-green-200 rounded-lg flex items-center justify-center">
          {images.length === 0 ? (
            <div className="text-center p-8">
              <ImageIcon className="h-16 w-16 text-green-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">No Images Yet</h3>
              <p className="text-green-600 mb-6">Add images to your gallery to showcase your food and events</p>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleAddImage}>
                <Upload className="h-4 w-4 mr-2" /> Upload Images
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{/* Images would be displayed here */}</div>
          )}

          <AddContentButton position="center" onAddImage={handleAddImage} />
        </div>
      </div>
    </div>
  )
}
