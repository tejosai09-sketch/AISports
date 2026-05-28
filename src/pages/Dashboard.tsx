import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  Sparkles,
  FileText,
  BookmarkIcon,
  TrendingUp,
  Clock,
  ChevronRight,
  Zap,
  MessageCircle,
  Hash,
  Calendar,
  Users
} from 'lucide-react';

function Dashboard() {
  const { user } = useAuth();

  const quickStats = [
    { label: 'Captions Generated', value: '47', change: '+12', icon: MessageCircle, color: 'from-[#39FF14] to-[#00F0FF]' },
    { label: 'Saved Drafts', value: '23', change: '+5', icon: BookmarkIcon, color: 'from-[#00F0FF] to-[#BF00FF]' },
    { label: 'Templates Used', value: '15', change: '+3', icon: FileText, color: 'from-[#BF00FF] to-[#39FF14]' },
    { label: 'Engagement Rate', value: '89%', change: '+7%', icon: TrendingUp, color: 'from-[#39FF14] to-[#00F0FF]' }
  ];

  const recentGenerated = [
    {
      type: 'Tournament',
      title: 'Weekend Cricket Championship',
      sport: 'Cricket',
      date: '2 mins ago',
      preview: '🏏 Ready to dominate the pitch this weekend? Join our exciting cricket tournament...'
    },
    {
      type: 'Offer',
      title: 'Flash Sale - 50% Off',
      sport: 'Football',
      date: '1 hour ago',
      preview: '⚽ LAST MINUTE DEAL! Get 50% off on evening slots tonight. Limited slots available...'
    },
    {
      type: 'Event',
      title: 'Summer League Registration',
      sport: 'Badminton',
      date: '3 hours ago',
      preview: '🏆 Summer Badminton League is HERE! Register your team now and win exciting prizes...'
    }
  ];

  const bestPostingTimes = [
    { day: 'Monday', time: '6:00 PM - 8:00 PM', engagement: 'High' },
    { day: 'Wednesday', time: '7:00 PM - 9:00 PM', engagement: 'Very High' },
    { day: 'Friday', time: '5:00 PM - 7:00 PM', engagement: 'Peak' },
    { day: 'Sunday', time: '10:00 AM - 12:00 PM', engagement: 'High' }
  ];

  const trendingHashtags = [
    '#CricketTournament', '#WeekendLeague', '#PlayToWin', '#SportsArena',
    '#FootballFever', '#BadmintonLove', '#TurfLife', '#GameOn'
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Welcome Header */}
      <div className="glassmorphism rounded-xl p-6 border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Welcome back, {user?.user_metadata?.venue_name || 'Venue Owner'}!
            </h1>
            <p className="text-gray-400">
              Ready to create engaging content for your sports venue?
            </p>
          </div>
          <Link
            to="/generator"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#39FF14] to-[#00F0FF] text-black font-semibold hover:scale-105 transition-transform neon-glow-green"
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate Content</span>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="glassmorphism rounded-xl p-5 border border-white/10 card-hover">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-black" />
              </div>
              <span className="text-xs text-[#39FF14] font-medium">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Generated Content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent Generated Content</h2>
            <Link to="/saved" className="text-sm text-[#39FF14] hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentGenerated.map((item, index) => (
              <div key={index} className="glassmorphism rounded-xl p-4 border border-white/10 hover:border-[#39FF14]/30 transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.type === 'Tournament' ? 'bg-[#39FF14]/20 text-[#39FF14]' :
                      item.type === 'Offer' ? 'bg-[#00F0FF]/20 text-[#00F0FF]' :
                      'bg-[#BF00FF]/20 text-[#BF00FF]'
                    }`}>
                      {item.type}
                    </span>
                    <span className="text-xs text-gray-400">{item.sport}</span>
                  </div>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <h3 className="font-medium text-white group-hover:text-[#39FF14] transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">{item.preview}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* AI Tip Card */}
          <div className="glassmorphism rounded-xl p-5 border border-[#39FF14]/30 neon-glow-green">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-[#39FF14]" />
              <h3 className="font-semibold text-white">AI Tip of the Day</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Posts with emojis get 25% more engagement. Try adding sport-specific emojis like 🏏, ⚽, or 🏀 to your captions!
            </p>
          </div>

          {/* Best Posting Times */}
          <div className="glassmorphism rounded-xl p-5 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-[#00F0FF]" />
              <h3 className="font-semibold text-white">Best Posting Times</h3>
            </div>
            <div className="space-y-3">
              {bestPostingTimes.map((time, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{time.day}</p>
                    <p className="text-xs text-gray-400">{time.time}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    time.engagement === 'Peak' ? 'bg-[#39FF14]/20 text-[#39FF14]' :
                    time.engagement === 'Very High' ? 'bg-[#00F0FF]/20 text-[#00F0FF]' :
                    'bg-white/10 text-gray-300'
                  }`}>
                    {time.engagement}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Hashtags */}
          <div className="glassmorphism rounded-xl p-5 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Hash className="w-5 h-5 text-[#BF00FF]" />
              <h3 className="font-semibold text-white">Trending Hashtags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingHashtags.map((tag, index) => (
                <span key={index} className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-xs hover:bg-[#39FF14]/20 hover:text-[#39FF14] transition-all cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/generator" className="glassmorphism rounded-xl p-5 border border-white/10 hover:border-[#39FF14]/30 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#39FF14]/20 to-[#39FF14]/10 flex items-center justify-center group-hover:neon-glow-green transition-all">
              <Sparkles className="w-6 h-6 text-[#39FF14]" />
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-[#39FF14] transition-colors">AI Generator</h3>
              <p className="text-sm text-gray-400">Create new content</p>
            </div>
          </div>
        </Link>

        <Link to="/templates" className="glassmorphism rounded-xl p-5 border border-white/10 hover:border-[#00F0FF]/30 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00F0FF]/20 to-[#00F0FF]/10 flex items-center justify-center group-hover:neon-glow-blue transition-all">
              <FileText className="w-6 h-6 text-[#00F0FF]" />
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-[#00F0FF] transition-colors">Templates</h3>
              <p className="text-sm text-gray-400">Ready-made templates</p>
            </div>
          </div>
        </Link>

        <Link to="/analytics" className="glassmorphism rounded-xl p-5 border border-white/10 hover:border-[#BF00FF]/30 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#BF00FF]/20 to-[#BF00FF]/10 flex items-center justify-center group-hover:neon-glow-purple transition-all">
              <TrendingUp className="w-6 h-6 text-[#BF00FF]" />
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-[#BF00FF] transition-colors">Analytics</h3>
              <p className="text-sm text-gray-400">View insights</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
