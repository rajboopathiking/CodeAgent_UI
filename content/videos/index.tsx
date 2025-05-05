"use client"

import { useState } from "react"
import { VideoIcon, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import AddContentButton from "@/components/add-content-button"

export default function VideosPage() {
  const [videos, setVideos] = useState<string[]>([])

  // This would be implemented to handle actual video uploads
  const handleAddVideo = () => {
    alert("Video upload functionality would be implemented here")
    // In a real implementation, this would open a file picker and upload the video
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-900 mb-4">Our Videos</h1>
          <p className="text-green-700 max-w-2xl mx-auto">Watch videos of our cooking process and catering events</p>
        </div>

        <div className="relative min-h-[400px] border-2 border-dashed border-green-200 rounded-lg flex items-center justify-center">
          {videos.length === 0 ? (
            <div className="text-center p-8">
              <VideoIcon className="h-16 w-16 text-green-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">No Videos Yet</h3>
              <p className="text-green-600 mb-6">Add videos to showcase your cooking process and events</p>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleAddVideo}>
                <Upload className="h-4 w-4 mr-2" /> Upload Videos
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{/* Videos would be displayed here */}</div>
          )}

          <AddContentButton position="center" onAddVideo={handleAddVideo} />
        </div>
      </div>
    </div>
  )
}
