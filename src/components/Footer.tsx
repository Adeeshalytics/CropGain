export default function Footer() {
  return (
    <footer className="bg-teal-900 text-white py-8 w-full text-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <div className="text-left text-3xl -mt-24 font-bold mb-4 ml-8">
            CropGain
          </div>
          <div className="flex space-x-4 ml-8">
            <a href="#" aria-label="LinkedIn">
              <img src="/assets/linkedin.svg" alt="LinkedIn" className="h-6" />
            </a>
            <a href="#" aria-label="Twitter">
              <img src="/assets/twitter.svg" alt="Twitter" className="h-6" />
            </a>
            <a href="#" aria-label="Facebook">
              <img src="/assets/facebook.svg" alt="Facebook" className="h-6" />
            </a>
            <a href="#" aria-label="YouTube">
              <img src="/assets/youtube.svg" alt="YouTube" className="h-6" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 text-center md:text-left mt-3">
          <div className="mb-2">
            <h3 className="font-semibold mb-2 text-2xl">About</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Our Value
                </a>
              </li>
            </ul>
          </div>

          <div className="mb-2">
            <h3 className="font-semibold mb-2 text-2xl">Our Standards</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Farmland Management
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pasture and Livestock
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Certification Database
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Standards Guidance
                </a>
              </li>
            </ul>
          </div>

          <div className="mb-2">
            <h3 className="font-semibold mb-2 text-2xl">Membership</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  How to Join
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Program Users
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Founding Supporters
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Certification Bodies
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Member Portal
                </a>
              </li>
            </ul>
          </div>

          <div className="mb-2">
            <h3 className="font-semibold mb-2 text-2xl">Resources</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Case Studies
                </a>
              </li>
            </ul>
          </div>

          <div className="list-none font-bold mb-2 text-lg">
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Accessibility
              </a>
            </li>
          </div>
        </div>
      </div>

      <div className="w-full text-center mt-8 border-t border-teal-700 pt-4">
        <p className="text-sm">© 2024 CropGain. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
