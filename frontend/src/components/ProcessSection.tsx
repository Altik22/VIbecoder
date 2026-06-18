import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { MessageSquare, Lightbulb, Code2, Rocket } from 'lucide-react'

const steps = [
  {
    icon: MessageSquare,
    step: '01',
    title: 'Discovery',
    description: 'Chat with our AI Copilot to define your vision, goals, and requirements — no boring forms.',
    color: 'text-accent-cyan',
    borderColor: 'border-accent-cyan/30',
  },
  {
    icon: Lightbulb,
    step: '02',
    title: 'Design',
    description: 'We craft wireframes and prototypes with stunning UI/UX tailored to your brand.',
    color: 'text-accent-purple',
    borderColor: 'border-accent-purple/30',
  },
  {
    icon: Code2,
    step: '03',
    title: 'Development',
    description: 'Clean, scalable code built with modern frameworks and best practices.',
    color: 'text-primary-400',
    borderColor: 'border-primary-400/30',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Launch',
    description: 'Deployed, optimized, and monitored — your site goes live with zero downtime.',
    color: 'text-accent-pink',
    borderColor: 'border-accent-pink/30',
  },
]

export default function ProcessSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 })

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent-green tracking-wider uppercase">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-dark-100 max-w-2xl mx-auto text-lg">
            From first conversation to final deployment — simple, transparent, efficient
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-cyan/20 via-primary-400/20 to-accent-pink/20 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative glass-card p-8 text-center border ${step.borderColor} hover:bg-white/[0.07] transition-all duration-300 group`}
              >
                <div className={`text-5xl font-black ${step.color} opacity-10 absolute top-4 right-4`}>
                  {step.step}
                </div>
                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-dark-100 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
