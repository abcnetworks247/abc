"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AboutComponent() {
  /**
   * The current pathname of the URL.
   * @type {string}
   */
  const pathname = usePathname();
  return (
    <div>
      {pathname === "/" ? (
        <section className="bg-gray-100">
          <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
              <div className="max-w-lg">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  About Us
                </h2>
                <p className="mt-4 text-gray-600 text-lg">
                  At Oravent, we go beyond decoration – we craft immersive
                  experiences that tell a story. With a passion for transforming
                  spaces, our dedicated team brings creativity and precision to
                  every project, turning ordinary venues into extraordinary
                  memories. From intimate gatherings to........
                </p>
                <div className="mt-8">
                  <Link
                    href="/about"
                    className="text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Read more about us
                    <span className="ml-2">&#8594;</span>
                  </Link>
                </div>
              </div>
              <div className="mt-12 md:mt-0">
                <img
                  // link to a random image from unsplash source: https://source.unsplash.com/random
                  src="/https://source.unsplash.com/random"
                  alt="About Us Image"
                  className="object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-gray-100">
          <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
              <div className="max-w-lg">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  About Us
                </h2>
                <p className="mt-4 text-gray-600 text-lg">
                  At Oravent, we go beyond decoration – we craft immersive
                  experiences that tell a story. With a passion for transforming
                  spaces, our dedicated team brings creativity and precision to
                  every project, turning ordinary venues into extraordinary
                  memories. From intimate gatherings to grand celebrations, we
                  pride ourselves on attention to detail and a commitment to
                  excellence. Let us be the brushstrokes to your canvas,
                  creating a tapestry of beauty for your special moments.
                  Welcome to a world where every event becomes a masterpiece.
                </p>
              </div>
              <div className="mt-12 md:mt-0">
                <img
                  src="/zeals-9.jpg"
                  alt="About Us Image"
                  className="object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
