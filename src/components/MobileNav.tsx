import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Sparkles, FileText, BookmarkIcon, BarChart3 } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Generate', href: '/generator', icon: Sparkles },
  { name: 'Templates', href: '/templates', icon: FileText },
  { name: 'Saved', href: '/saved', icon: BookmarkIcon },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 glassmorphism border-t border-white/10 px-4 py-2 z-50">
      <div className="flex items-center justify-around gap-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? 'text-[#39FF14]'
                  : 'text-gray-400'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default MobileNav;
