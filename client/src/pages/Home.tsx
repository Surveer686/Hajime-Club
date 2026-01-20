import { Link } from "wouter";
import { ArrowRight, Shield, Calendar, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://pixabay.com/get/gae0cf2c0abfc6e9f6e7a6d748173b0dfae16789236c8a476635669ab8f829a35e89fa0359f3d8278fe09a67e9b6c43e0d7081733fd4cd26fee0754ea3fc41335_1280.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm font-medium tracking-wide text-gray-300">ACCEPTING NEW MEMBERS</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight mb-6 text-white drop-shadow-2xl">
              DISCIPLINE IS<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-200">DESTINY</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Master the art of Judo and self-defense. Forge your body, sharpen your mind, and join a community dedicated to growth.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <button className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                  Start Your Journey
                </button>
              </Link>
              <Link href="/about">
                <button className="px-8 py-4 rounded-xl text-lg font-semibold bg-white/5 border border-white/10 backdrop-blur hover:bg-white/10 transition-all text-white w-full sm:w-auto">
                  Learn More
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-primary mb-4">Why Choose Hajime Club?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We don't just teach techniques; we cultivate character. Our holistic approach builds warriors in life, not just on the mats.
            </p>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Shield className="w-10 h-10 text-secondary" />,
                title: "Defense Mastery",
                desc: "Learn practical self-defense techniques that work in real-world scenarios."
              },
              {
                icon: <Users className="w-10 h-10 text-secondary" />,
                title: "Strong Community",
                desc: "Join a supportive brotherhood dedicated to mutual growth and respect."
              },
              {
                icon: <Star className="w-10 h-10 text-secondary" />,
                title: "Expert Guidance",
                desc: "Train under experienced instructors who value discipline and safety."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={item}
                className="bg-white p-8 rounded-2xl shadow-lg border border-border hover:border-secondary/50 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="bg-primary/5 p-4 rounded-xl inline-block mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 skew-x-12 transform origin-top" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Ready to Step on the Mat?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Training is tough, but regret is tougher. Join us today and start building the best version of yourself.
          </p>
          <Link href="/register">
            <button className="btn-secondary text-lg flex items-center gap-2 mx-auto">
              Join Now <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
