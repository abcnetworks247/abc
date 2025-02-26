import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111827]">
      <div className="px-4 md:px-6 py-12 ">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-2xl font-semibold text-white">
                Let's keep in touch!
              </h3>
              <p className="text-sm mt-2 text-white/80">
                Find us on any of these platforms. We respond within 1-2
                business days.
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white hover:bg-white/10"
                asChild
              >
                <a
                  href="https://web.facebook.com/ABCAmbaTelevision"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white hover:bg-white/10"
                asChild
              >
                <a
                  href="https://twitter.com/AbcAmbaTV"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white hover:bg-white/10"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white hover:bg-white/10"
                asChild
              >
                <a
                  href="https://www.youtube.com/c/ABCAmbaTV"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </a>
              </Button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-[12px] font-semibold uppercase tracking-wider text-white">
                Useful Links
              </h4>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/about"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-[12px] font-semibold uppercase tracking-wider text-white">
                Social Accounts
              </h4>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="https://www.facebook.com/ABCAmbaTelevision/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Facebook
                </Link>
                <Link
                  href="https://twitter.com/AbcAmbaTV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Twitter
                </Link>
                <Link
                  href="https://www.youtube.com/c/ABCAmbaTV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  YouTube
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <Separator className="my-8 bg-white/20" />
        <div className="text-sm text-white">
          <p>
            Copyright © {new Date().getFullYear()} ABC Network 24,{" "}
            <a
              href="https://www.klipto.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              Powered by - Klipto Inc.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
