import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import {
  Globe, Palette, Smartphone, ShieldCheck,
  Zap, Bot
} from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Web Applications',
    description: 'Full-stack web apps with React, Next.js, and modern frameworks. Scalable and performant.',
    color: 'from-primary-500 to-primary-400',
    glow: 'shadow-primary-500/20',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Stunning interfaces with smooth animations and intuitive user experiences.',
    color: 'from-accent-pink to-accent-purple',
    glow: 'shadow-pink-500/20',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Pixel-perfect layouts that look flawless on every device and screen size.',
    color: 'from-accent-cyan to-primary-400',
    glow: 'shadow-cyan-500/20',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Backend',
    description: 'Production-grade APIs with authentication, databases, and bulletproof security.',
    color: 'from-accent-green to-accent-cyan',
    glow: 'shadow-green-500/20',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimized load times, SEO-ready architecture, and lightning-fast delivery.',
    color: 'from-yellow-400 to-orange-400',
    glow: 'shadow-yellow-500/20',
  },
  {
    icon: Bot,
    title: 'AI Integration',
    description: 'Smart chatbots, AI copilots, and intelligent automation built into your product.',
    color: 'from-accent-purple to-primary-500',
    glow: 'shadow-purple-500/20',
  },
]

export default function ServicesSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 })

  return (
    <section ref={ref} className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent-cyan tracking-wider uppercase">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-dark-100 max-w-2xl mx-auto text-lg">
            End-to-end web development solutions powered by the latest technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card glow-border p-8 hover:bg-white/[0.07] transition-all duration-300 group cursor-default hover:shadow-2xl ${service.glow}`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-dark-100 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
