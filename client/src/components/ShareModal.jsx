"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Link } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { toast } from "sonner"

const ShareModal = ({ isOpen, onClose, url, title, image }) => {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied to clipboard")
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Share this article</DialogTitle>
          <DialogDescription>
            Choose a platform to share this article or copy the link.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 my-4">
          <div className="w-full max-w-sm bg-white rounded-lg overflow-hidden shadow-sm">
            {image && (
              <div className="relative h-48 w-full">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                {title}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 justify-center">
          {/* <input
            className="flex-1 px-3 py-2 text-sm border rounded-md"
            value={url}
            readOnly
          /> */}
          <div className="flex justify-center space-x-4">
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="icon"
                className="bg-[#1877F2] hover:bg-[#0E5A9E] text-white"
              >
                <Facebook className="h-5 w-5" />
              </Button>
            </a>
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="icon"
                className="bg-[#1DA1F2] hover:bg-[#0C85D0] text-white"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </a>
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="icon"
                className="bg-[#0A66C2] hover:bg-[#004182] text-white"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="icon"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white"
              >
                <FaWhatsapp className="h-5 w-5" />
              </Button>
            </a>
          </div>
          <Button onClick={copyToClipboard} variant="secondary">
            <Link className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
