import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const techCategories = [
  {
    title: 'Frontend',
    items: [
      { name: 'React', icon: '⚛️' },
      { name: 'TypeScript', icon: '🔷' },
      { name: 'Next.js', icon: '▲' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'Framer Motion', icon: '🎬' },
      { name: 'GSAP', icon: '✨' },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Python', icon: '🐍' },
      { name: 'FastAPI', icon: '⚡' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'Redis', icon: '🔴' },
      { name: 'Docker', icon: '🐳' },
    ],
  },
  {
    title: 'AI & Tools',
    items: [
      { name: 'OpenAI', icon: '🤖' },
      { name: 'LangChain', icon: '🔗' },
      { name: 'Git', icon: '📦' },
      { name: 'CI/CD', icon: '🔄' },
      { name: 'AWS', icon: '☁️' },
      { name: 'Vercel', icon: '🚀' },
    ],
  },
]

export default function TechStackSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 })

  return (
    <section ref={ref} className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent-purple tracking-wider uppercase">
            Technology
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">
            Our <span className="gradient-text-warm">Tech Stack</span>
          </h2>
          <p className="text-dark-100 max-w-2xl mx-auto text-lg">
            We use industry-leading technologies to build fast, reliable, and beautiful products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.15 }}
              className="glass-card p-8"
            >
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                {cat.title}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {cat.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: catIdx * 0.15 + i * 0.05 }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-default group"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="text-sm text-dark-50 font-medium">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
