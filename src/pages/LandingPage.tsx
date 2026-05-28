import { Link } from 'react-router-dom';
import {
  Zap,
  Sparkles,
  TrendingUp,
  Clock,
  Users,
  MessageCircle,
  Hash,
  Globe,
  ChevronRight,
  Star,
  Play,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const features = [
  {
    icon: MessageCircle,
    title: 'AI Captions',
    description: 'Generate engaging social media captions for tournaments, offers, and events instantly.'
  },
  {
    icon: Hash,
    title: 'Smart Hashtags',
    description: 'AI-powered trending and local hashtags to boost your visibility and engagement.'
  },
  {
    icon: Clock,
    title: 'Save Hours',
    description: 'What takes hours now takes seconds. Focus on your venue, not marketing.'
  },
  {
    icon: TrendingUp,
    title: 'Boost Bookings',
    description: 'Professional marketing content that fills your slots and maximizes revenue.'
  },
  {
    icon: Globe,
    title: 'Multi-Platform',
    description: 'Content optimized for Instagram, WhatsApp, Facebook, and more.'
  },
  {
    icon: Sparkles,
    title: 'Instant Results',
    description: 'Generate promotional content in seconds, not hours or days.'
  }
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Cricket Turf Owner',
    location: 'Mumbai',
    content: "PlayBoost AI transformed how we market our turf. We've seen 40% increase in weekend bookings since we started using it. The captions are professional and engaging!",
    rating: 5
  },
  {
    name: 'Priya Sharma',
    role: 'Badminton Academy Director',
    location: 'Delhi',
    content: "Finally, a tool that understands sports venues! The AI-generated content captures the excitement of tournaments perfectly. Our engagement has tripled.",
    rating: 5
  },
  {
    name: 'Amit Patel',
    role: 'Football Turf Manager',
    location: 'Bangalore',
    content: "We used to spend thousands on marketing agencies. Now with PlayBoost AI, we create better content in-house at a fraction of the cost.",
    rating: 5
  }
];

const stats = [
  { label: 'Captions Generated', value: '50K+', icon: MessageCircle },
  { label: 'Active Venues', value: '2,500+', icon: Users },
  { label: 'Promotions Created', value: '75K+', icon: Sparkles }
];

const sports = [
  { name: 'Cricket', emoji: '🏏', color: 'from-[#39FF14] to-[#00F0FF]' },
  { name: 'Football', emoji: '⚽', color: 'from-[#00F0FF] to-[#BF00FF]' },
  { name: 'Badminton', emoji: '🏸', color: 'from-[#BF00FF] to-[#39FF14]' },
  { name: 'Basketball', emoji: '🏀', color: 'from-[#00F0FF] to-[#39FF14]' },
  { name: 'Volleyball', emoji: '🏐', color: 'from-[#39FF14] to-[#BF00FF]' },
  { name: 'Tennis', emoji: '🎾', color: 'from-[#BF00FF] to-[#00F0FF]' }
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#39FF14]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00F0FF]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[#BF00FF]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 glassmorphism border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#39FF14] to-[#00F0FF] flex items-center justify-center neon-glow-green">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-lg font-bold gradient-text">PlayBoost AI</h1>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#sports" className="text-sm text-gray-400 hover:text-white transition-colors">Sports</a>
              <a href="#testimonials" className="text-sm text-gray-400 hover:text-white transition-colors">Testimonials</a>
              <Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors">Login</Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#39FF14] to-[#00F0FF] text-black text-sm font-semibold hover:scale-105 transition-transform neon-glow-green"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism border border-[#39FF14]/30 mb-6">
              <Sparkles className="w-4 h-4 text-[#39FF14]" />
              <span className="text-sm text-gray-300">AI-Powered Marketing Platform</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">AI-Powered Sports Venue</span>
              <br />
              <span className="text-white">Marketing Assistant</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Generate captions, promotions, hashtags, and tournament marketing content instantly.
              No marketing team needed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                to="/register"
                className="group btn-primary text-black px-8 py-4 text-lg flex items-center gap-2"
              >
                <span>Generate Content</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="group px-8 py-4 rounded-lg glassmorphism border border-white/20 text-white font-semibold flex items-center gap-2 hover:border-[#39FF14]/50 transition-all">
                <Play className="w-5 h-5 text-[#39FF14]" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="glassmorphism rounded-xl p-6 border border-white/10 card-hover">
                  <stat.icon className="w-8 h-8 text-[#39FF14] mb-3" />
                  <p className="text-3xl font-bold gradient-text mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Powerful Features</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to market your sports venue like a pro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="glassmorphism rounded-xl p-6 border border-white/10 card-hover group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#39FF14]/20 to-[#00F0FF]/20 flex items-center justify-center mb-4 group-hover:neon-glow-green transition-all">
                  <feature.icon className="w-6 h-6 text-[#39FF14]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Categories */}
      <section id="sports" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Supports All Sports</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              AI-generated content for every type of sports venue
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sports.map((sport, index) => (
              <div key={index} className="glassmorphism rounded-xl p-6 border border-white/10 text-center card-hover cursor-pointer group">
                <div className={`text-5xl mb-3 group-hover:scale-110 transition-transform`}>
                  {sport.emoji}
                </div>
                <p className="font-semibold text-white">{sport.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Output */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39FF14]/20 text-[#39FF14] text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Sample Output</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                From Input to <span className="gradient-text">Engaging Content</span>
              </h2>

              <div className="space-y-4 mb-8">
                {[
                  'Professional captions ready to post',
                  'Trending hashtags for maximum reach',
                  'Multiple content formats',
                  'Editable and customizable'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#39FF14]" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/register" className="btn-primary inline-flex items-center gap-2 text-black">
                <span>Try It Now</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="glassmorphism rounded-xl p-6 border border-[#39FF14]/30 neon-glow-green">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-[#39FF14]">Example Output</span>
                <span className="text-xs text-gray-400">Instagram</span>
              </div>
              <p className="text-white leading-relaxed mb-4">
                🏏 Ready to dominate the pitch this weekend? Join our exciting cricket tournament and battle for the ₹10,000 prize pool!
                <br /><br />
                Limited team slots available. Register now and bring your A-game! 🔥
              </p>
              <div className="flex flex-wrap gap-2">
                {['#CricketTournament', '#WeekendLeague', '#PlayToWin', '#SportsArena', '#CricketLovers'].map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-[#39FF14]/20 text-[#39FF14] text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Loved by Venue Owners</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join thousands of sports venues already using PlayBoost AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glassmorphism rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#39FF14] fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#39FF14] to-[#00F0FF] flex items-center justify-center text-black font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs text-gray-400">{testimonial.role} - {testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glassmorphism rounded-2xl p-8 md:p-12 border border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#39FF14]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00F0FF]/10 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Start Marketing <span className="gradient-text">Smarter Today</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of sports venues who have already transformed their marketing with AI
              </p>
              <Link
                to="/register"
                className="btn-primary inline-flex items-center gap-2 text-black px-8 py-4 text-lg"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-sm text-gray-500 mt-4">No credit card required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#39FF14] to-[#00F0FF] flex items-center justify-center">
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg font-bold gradient-text">PlayBoost AI</h3>
              </div>
              <p className="text-sm text-gray-400">
                AI-powered marketing platform for sports venues and turf owners.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Templates</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © 2026 PlayBoost AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
