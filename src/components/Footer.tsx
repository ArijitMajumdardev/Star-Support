export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          {/* Logo or Brand Name */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-semibold">Support Your Journey</h3>
            <p className="text-gray-400 text-sm">
              Empowering creators to follow their passion.
            </p>
          </div>
  
          {/* Navigation Links */}
          <div className="flex space-x-6">
            <a href="/about" className="text-gray-400 hover:text-yellow-300 text-sm">
              About Us
            </a>
            <a href="/privacy" className="text-gray-400 hover:text-yellow-300 text-sm">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-yellow-300 text-sm">
              Terms of Service
            </a>
            <a href="/contact" className="text-gray-400 hover:text-yellow-300 text-sm">
              Contact
            </a>
          </div>
  
          {/* Social Media or Contact */}
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-300"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-300"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.465.099 2.796.143v3.243h-1.917c-1.506 0-1.797.716-1.797 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.593 1.325-1.326V1.326C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a
              href="mailto:support@yourapp.com"
              className="text-gray-400 hover:text-yellow-300"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.016 3H3.984C2.896 3 2.01 3.888 2.01 4.98L2 19.02c0 1.08.897 1.98 1.985 1.98h16.032c1.09 0 1.984-.89 1.984-1.98V4.98c0-1.09-.89-1.98-1.984-1.98zM20.016 6l-8.016 4.988L3.984 6h16.032zm0 12H3.984V8.008l8.016 5.004 8.016-5.004V18z" />
              </svg>
            </a>
          </div>
        </div>
  
        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-6 pt-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Support Your Journey. All rights reserved.
        </div>
      </footer>
    );
  }
  