
import {Link }from "react-router-dom"

export default function LandingPage() {
  return (
    <>
      <div className="bg-gray-50/90 border-t border-b border-gray-200 dark:bg-gray-950 dark:border-gray-800 dark:border-gray-800 transition-colors">
        <div className="container px-4 md:px-6">
          
        </div>
      </div>
      <header className="w-full py-12 md:py-16 xl:py-20 transition-colors">
        <div className="container flex flex-col items-center justify-center px-4 md:px-6 space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">Extract PDF Pages</h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Select the pages you want to extract and create a new PDF with ease.
            </p>
          </div>
        </div>
      </header>
      <section className="w-full py-12 md:py-16 xl:py-20 transition-colors">
        <div className="container px-4 md:px-6">
          <div className="grid items-start gap-4 md:grid-cols-2 md:gap-8 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Effortless PDF Page Extraction
                </h2>
                <p className="max-w-[500px] text-gray-500 dark:text-gray-400">
                  DOCUVIEW makes it simple to extract specific pages from your PDF files. No more complex software or
                  confusing interfaces.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                alt="Image"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="310"
                src="/placeholder.svg"
                width="550"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-16 xl:py-20 transition-colors">
        <div className="container px-4 md:px-6">
          <div className="grid items-start gap-4 md:grid-cols-2 md:gap-8 lg:gap-12">
            <div className="flex items-center justify-center">
              <img
                alt="Image"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="310"
                src="/placeholder.svg"
                width="550"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple PDF Page Selection
                </h2>
                <p className="max-w-[500px] text-gray-500 dark:text-gray-400">
                  With our intuitive interface, you can easily view the pages in your PDF and select the ones you want
                  to extract.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-16 xl:py-20 transition-colors">
        <div className="container px-4 md:px-6">
          <div className="grid items-start gap-4 md:grid-cols-2 md:gap-8 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Create a New PDF</h2>
                <p className="max-w-[500px] text-gray-500 dark:text-gray-400">
                  After selecting your pages, you can generate a new PDF with a single click. It's fast, convenient, and
                  hassle-free.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                alt="Image"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="310"
                src="/placeholder.svg"
                width="550"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-16 xl:py-20 transition-colors">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Extract PDF Pages?
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Experience the seamless process of extracting PDF pages with DOCUVIEW. Sign up now to get started.
              </p>
            </div>
            <div className="mx-auto max-w-sm space-y-4">
              <input placeholder="Enter your email" type="email" />
              <button className="w-full" size="lg">
                Sign Up
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sign up to receive updates about our platform. We promise not to spam your inbox.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full transition-colors">
        <div className="container flex flex-col gap-4 px-4 py-12 md:px-6 md:gap-8 lg:py-16 xl:gap-12 xl:flex-row">
          <div className="flex items-center space-x-2">
            <TerminalIcon className="h-6 w-6" />
            <span className="font-semibold">DOCUVIEW</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link className="font-medium text-sm tracking-wide hover:underline" href="#">
              Home
            </Link>
            <Link className="font-medium text-sm tracking-wide hover:underline" href="#">
              Features
            </Link>
            <Link className="font-medium text-sm tracking-wide hover:underline" href="#">
              Pricing
            </Link>
            <Link className="font-medium text-sm tracking-wide hover:underline" href="#">
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4 md:ml-auto">
            <Link className="font-medium text-sm tracking-wide hover:underline" href="#">
              Terms
            </Link>
            <Link className="font-medium text-sm tracking-wide hover:underline" href="#">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}

function TerminalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  )
}
