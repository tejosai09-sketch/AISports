import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  BookmarkIcon,
  BarChart3,
  User,
  Settings,
  Zap
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Generate AI Content', href: '/generator', icon: Sparkles },
  { name: 'Templates', href: '/templates', icon: FileText },
  { name: 'Saved Captions', href: '/saved', icon: BookmarkIcon },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:left-0 glassmorphism border-r border-white/10 z-40">
      <div className="flex items-center gap-3 h-16 px-6 border-b border-white/10">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#39FF14] to-[#00F0FF] neon-glow-green">
          <Zap className="w-6 h-6 text-black" />
        </div>
        <div>
          <h1 className="text-lg font-bold gradient-text">PlayBoost AI</h1>
          <p className="text-xs text-gray-400">Sports Marketing</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-[#39FF14]/20 to-[#00F0FF]/10 text-[#39FF14] border border-[#39FF14]/30 neon-glow-green'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="glassmorphism rounded-lg p-4 border border-[#39FF14]/20 neon-glow-green">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#39FF14]" />
            <p className="text-sm font-semibold text-white">Pro Tip</p>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Use the AI generator during peak hours for maximum engagement predictions.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
