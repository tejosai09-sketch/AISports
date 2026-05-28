import { useAuth } from '../hooks/useAuth';
import { Bell, Search, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-30 glassmorphism border-b border-white/10 px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search captions, templates..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400
                       focus:outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#39FF14]/50 transition-all group">
            <Bell className="w-5 h-5 text-gray-400 group-hover:text-[#39FF14] transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#39FF14] rounded-full animate-pulse-glow" />
          </button>

          <div className="relative group">
            <button className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#39FF14]/50 transition-all">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#39FF14] to-[#00F0FF] flex items-center justify-center">
                <User className="w-4 h-4 text-black" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">{user?.user_metadata?.venue_name || user?.email?.split('@')[0]}</p>
                <p className="text-xs text-gray-400">Venue Owner</p>
              </div>
            </button>

            <div className="absolute right-0 top-full mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="glassmorphism rounded-lg border border-white/10 overflow-hidden">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>View Profile</span>
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors w-full"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
