import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CTASection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section ref={ref} className="section-padding relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 via-accent-purple/20 to-accent-cyan/30" />
        <div className="absolute inset-0 bg-[#0a0a0f]/60 backdrop-blur-sm" />

        {/* Decorative orbs */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent-cyan/20 rounded-full blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary-500/20 rounded-full blur-[80px]" />

        <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">
            Ready to Build Something{' '}
            <span className="gradient-text">Amazing</span>?
          </h2>
          <p className="text-dark-50 text-lg max-w-xl mx-auto mb-10">
            Skip the forms. Talk to our AI Copilot and get your project started in minutes.
          </p>
          <Link
            to="/copilot"
            className="btn-primary text-lg inline-flex items-center gap-2 group"
          >
            Launch AI Copilot
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-dark-200">
          <span>&copy; {new Date().getFullYear()} VibeCoder. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="https://github.com/Altik22" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </section>
  )
}
