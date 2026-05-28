import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import {
  TrendingUp,
  MessageCircle,
  Hash,
  FileText,
  Calendar,
  Clock,
  Award,
  Target,
  BarChart3,
  PieChart
} from 'lucide-react';

type Analytics = {
  captions_generated: number;
  hashtags_generated: number;
  templates_used: number;
  top_sport: string;
  top_tone: string;
  last_generated_at: string;
};

function Analytics() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [user]);

  const fetchAnalytics = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_analytics')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data) {
      setAnalytics(data);
    }
    setLoading(false);
  };

  const weeklyData = [
    { day: 'Mon', posts: 3, engagement: 75 },
    { day: 'Tue', posts: 5, engagement: 82 },
    { day: 'Wed', posts: 7, engagement: 90 },
    { day: 'Thu', posts: 2, engagement: 65 },
    { day: 'Fri', posts: 8, engagement: 95 },
    { day: 'Sat', posts: 6, engagement: 88 },
    { day: 'Sun', posts: 4, engagement: 78 }
  ];

  const sportBreakdown = [
    { sport: 'Cricket', percentage: 45, color: 'from-[#39FF14] to-[#00F0FF]' },
    { sport: 'Football', percentage: 30, color: 'from-[#00F0FF] to-[#BF00FF]' },
    { sport: 'Badminton', percentage: 15, color: 'from-[#BF00FF] to-[#39FF14]' },
    { sport: 'Others', percentage: 10, color: 'from-gray-500 to-gray-600' }
  ];

  const topHashtags = [
    '#CricketTournament',
    '#WeekendLeague',
    '#PlayToWin',
    '#SportsArena',
    '#BookNow'
  ];

  const bestTimes = [
    { time: '6:00 PM - 8:00 PM', engagement: 95, label: 'Peak' },
    { time: '7:00 PM - 9:00 PM', engagement: 88, label: 'High' },
    { time: '10:00 AM - 12:00 PM', engagement: 82, label: 'Good' },
    { time: '5:00 PM - 7:00 PM', engagement: 78, label: 'Good' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-[#39FF14]/30 border-t-[#39FF14] rounded-full animate-spin" />
      </div>
    );
  }

  const maxPosts = Math.max(...weeklyData.map(d => d.posts));

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="glassmorphism rounded-xl p-6 border border-white/10">
        <h1 className="text-xl font-bold text-white mb-1">Analytics Dashboard</h1>
        <p className="text-sm text-gray-400">Track your content performance and insights</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard
          icon={MessageCircle}
          label="Total Captions"
          value={analytics?.captions_generated || 0}
          trend="+12%"
          color="from-[#39FF14] to-[#00F0FF]"
        />
        <OverviewCard
          icon={Hash}
          label="Hashtags Generated"
          value={analytics?.hashtags_generated || 0}
          trend="+8%"
          color="from-[#00F0FF] to-[#BF00FF]"
        />
        <OverviewCard
          icon={FileText}
          label="Templates Used"
          value={analytics?.templates_used || 0}
          trend="+5%"
          color="from-[#BF00FF] to-[#39FF14]"
        />
        <OverviewCard
          icon={TrendingUp}
          label="Avg Engagement"
          value="87%"
          trend="+15%"
          color="from-[#39FF14] to-[#00F0FF]"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <div className="glassmorphism rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-[#39FF14]" />
            <h2 className="text-lg font-semibold text-white">Weekly Activity</h2>
          </div>

          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{day.day}</span>
                  <span className="text-white font-medium">{day.posts} posts</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#39FF14] to-[#00F0FF] rounded-full transition-all duration-500"
                    style={{ width: `${(day.posts / maxPosts) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Posting Times */}
        <div className="glassmorphism rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-[#00F0FF]" />
            <h2 className="text-lg font-semibold text-white">Best Posting Times</h2>
          </div>

          <div className="space-y-3">
            {bestTimes.map((time, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{time.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#39FF14] to-[#00F0FF] rounded-full"
                      style={{ width: `${time.engagement}%` }}
                    />
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    time.label === 'Peak' ? 'bg-[#39FF14]/20 text-[#39FF14]' :
                    'bg-white/10 text-gray-300'
                  }`}>
                    {time.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sport Breakdown */}
        <div className="glassmorphism rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-[#BF00FF]" />
            <h2 className="text-lg font-semibold text-white">Content by Sport</h2>
          </div>

          <div className="space-y-4">
            {sportBreakdown.map((sport, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">{sport.sport}</span>
                  <span className="text-sm font-medium text-white">{sport.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${sport.color} rounded-full`}
                    style={{ width: `${sport.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Hashtags */}
        <div className="glassmorphism rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-[#39FF14]" />
            <h2 className="text-lg font-semibold text-white">Top Performing Hashtags</h2>
          </div>

          <div className="space-y-3">
            {topHashtags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-gradient-to-br from-[#39FF14]/20 to-[#00F0FF]/20 flex items-center justify-center text-xs text-white font-medium">
                    {index + 1}
                  </span>
                  <span className="text-gray-300">{tag}</span>
                </div>
                <div className="text-sm text-[#39FF14]">
                  {90 - index * 5}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Tips */}
      <div className="glassmorphism rounded-xl p-6 border border-[#39FF14]/30 neon-glow-green">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-[#39FF14]" />
          <h2 className="text-lg font-semibold text-white">AI Recommendations</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-white/5">
            <h3 className="font-medium text-white mb-2">Best Performance</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your {analytics?.top_sport || 'cricket'} content performs 25% better than average.
              Consider posting more {analytics?.top_sport || 'cricket'} related content on weekends.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white/5">
            <h3 className="font-medium text-white mb-2">Opportunity</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Try using {analytics?.top_tone || 'energetic'} tone more often - it shows 18% higher
              engagement for your audience. Add more emojis for better reach.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewCard({
  icon: Icon,
  label,
  value,
  trend,
  color
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  trend: string;
  color: string;
}) {
  return (
    <div className="glassmorphism rounded-xl p-5 border border-white/10 card-hover">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-black" />
        </div>
        <span className="text-xs text-[#39FF14] font-medium">{trend}</span>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}

export default Analytics;
