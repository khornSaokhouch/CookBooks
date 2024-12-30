// components/Footer.tsx
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer: React.FC = () => {
  return (
    <section className="footer-container px-20 py-20 border-t-2 border-b-2 border-blue-300 mb-2">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="footer-menu flex flex-col items-start">
          <ul className="flex list-none text-base text-ml">
            <li className="px-6">
              <Link href="#" className="hover:text-blue-600">ABOUT US</Link>
            </li>
            <li className="px-6">
              <Link href="#" className="hover:text-blue-600">CONTACT US</Link>
            </li>
            <li className="px-6">
              <Link href="#" className="hover:text-blue-600">FAQ</Link>
            </li>
            <li className="px-6">
              <Link href="#" className="hover:text-blue-600">PRIVACY POLICY</Link>
            </li>
            <li className="px-6">
              <Link href="#" className="hover:text-blue-600">DISCLAIMER</Link>
            </li>
          </ul>
          <div className="logo-footer mt-4 ">
            <img src="/logo.png" alt="Logo" className="w-[100px] ml-20" />
          </div>
        </div>

        <div className="footer-info flex flex-col items-start mt-8">
          <div className="contact flex items-center mb-4">
            <i className="fa-solid fa-location-dot text-blue-600 pr-2"></i>
            <span>Royal University Of Phnom Penh, Faculty Engineering, Department ITE</span>
          </div>
          <div className="contact flex items-center mb-4">
            <i className="fa-solid fa-phone text-blue-600 pr-2"></i>
            <span>(855) 456-7890</span>
          </div>
          <div className="social-media flex items-center">
            <p className="text-lg pr-4">Social Media:</p>
            <i className="fa-brands fa-facebook text-blue-600 pr-4 text-xl"></i>
            <i className="fa-brands fa-linkedin text-blue-600 pr-4 text-xl"></i>
            <i className="fa-brands fa-twitter text-blue-600 pr-4 text-xl"></i>
            <i className="fa-brands fa-instagram text-blue-600 pr-4 text-xl"></i>
            <i className="fa-brands fa-youtube text-blue-600 text-xl"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;