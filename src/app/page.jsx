"use client"
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PharmacySvg from '/public/pharmacy.svg';
import HeroImage from '/public/images/shelf.jpg';
import { FaClinicMedical, FaTruck, FaUserMd, FaShieldAlt, FaClock, FaHospitalUser, FaStethoscope, FaMobileAlt, FaUserShield } from 'react-icons/fa';
import { MdOutlineHealthAndSafety } from 'react-icons/md';

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="absolute inset-0">
        <Image
          src={HeroImage}
          alt="Pharmacy Background"
          layout="fill"
          objectFit="cover"
          className="opacity-10"
          priority
        />
      </div>

      <div className="relative z-10">
        <nav className="p-4 backdrop-blur-sm bg-black/20">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Image
                src={PharmacySvg}
                alt="Idrugdes Logo"
                width={48}
                height={48}
                className="hover:scale-105 transition-transform"
              />
              <span className="text-white text-2xl font-bold tracking-tight">Idrugdes</span>
            </div>
            <Link href="/sign-in" className="text-white hover:text-blue-400 transition-colors">
              Sign In
            </Link>
            <Link href="/sign-up" className="text-white hover:text-blue-400 transition-colors">
              Sign Up
            </Link>

          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Your Digital <span className="text-blue-400">Healthcare</span> Companion
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Experience the future of healthcare with secure prescription management and doorstep medication delivery.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="p-8 bg-white/10 rounded-xl backdrop-blur-lg transform hover:scale-105 transition-all duration-300 hover:bg-white/15"
              >
                <FaClinicMedical className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Digital Prescriptions</h3>
                <p className="text-gray-300">Securely manage and track your prescriptions with our advanced digital platform.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="p-8 bg-white/10 rounded-xl backdrop-blur-lg transform hover:scale-105 transition-all duration-300 hover:bg-white/15"
              >
                <FaTruck className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Swift Delivery</h3>
                <p className="text-gray-300">Get medications delivered to your doorstep with our reliable delivery service.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="p-8 bg-white/10 rounded-xl backdrop-blur-lg transform hover:scale-105 transition-all duration-300 hover:bg-white/15"
              >
                <FaUserMd className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Expert Guidance</h3>
                <p className="text-gray-300">Access professional healthcare advice from qualified pharmacists anytime.</p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="flex items-center justify-center gap-3 text-gray-300"
              >
                <FaShieldAlt className="w-6 h-6 text-blue-400" />
                <span>Secure & Encrypted</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="flex items-center justify-center gap-3 text-gray-300"
              >
                <FaClock className="w-6 h-6 text-blue-400" />
                <span>24/7 Service</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="flex items-center justify-center gap-3 text-gray-300"
              >
                <FaHospitalUser className="w-6 h-6 text-blue-400" />
                <span>Licensed Partners</span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24"
            >
              <Link
                href="/store"
                className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg w-full sm:w-auto text-center"
              >
                Find a Pharmacy
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center"
              >
                Learn More
              </Link>
            </motion.div>

            {/* How It Works Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-center mb-24"
            >
              <h2 className="text-4xl font-bold text-white mb-12">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                    <FaStethoscope className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">1. Get Prescription</h3>
                  <p className="text-gray-300">Visit your doctor and get your digital or physical prescription</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                    <FaMobileAlt className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">2. Upload Prescription</h3>
                  <p className="text-gray-300">Upload your prescription through our secure platform</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                    <FaUserShield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">3. Verification</h3>
                  <p className="text-gray-300">Our pharmacists verify your prescription for accuracy</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                    <FaTruck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">4. Delivery</h3>
                  <p className="text-gray-300">Receive your medications at your doorstep</p>
                </div>
              </div>
            </motion.div>

            {/* Why Choose Us Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold text-white mb-12">Why Choose Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="flex items-start gap-4 text-left">
                  <div className="flex-shrink-0">
                    <MdOutlineHealthAndSafety className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Licensed Pharmacies</h3>
                    <p className="text-gray-300">Partner with verified and licensed pharmacies to ensure medication quality and safety</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-left">
                  <div className="flex-shrink-0">
                    <FaShieldAlt className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Secure Platform</h3>
                    <p className="text-gray-300">Advanced encryption and security measures to protect your medical information</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-left">
                  <div className="flex-shrink-0">
                    <FaUserMd className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Expert Support</h3>
                    <p className="text-gray-300">Access to professional pharmacists for consultation and medication guidance</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-left">
                  <div className="flex-shrink-0">
                    <FaClock className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">24/7 Availability</h3>
                    <p className="text-gray-300">Round-the-clock service for prescription uploads and customer support</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Page;
