import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  Settings as SettingsIcon,
  Bell,
  Moon,
  Globe,
  Shield,
  LogOut,
  Trash2,
  ChevronRight,
  AlertCircle,
  Loader2
} from 'lucide-react';

function SettingsPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    setLoading(true);
    // Delete profile data
    await supabase.from('profiles').delete().eq('id', user.id);
    await supabase.from('captions').delete().eq('user_id', user.id);
    await supabase.from('user_analytics').delete().eq('user_id', user.id);

    // Note: In production, you'd want to use a Supabase Edge Function
    // to properly delete the auth user as well
    await signOut();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="glassmorphism rounded-xl p-6 border border-white/10">
        <h1 className="text-xl font-bold text-white mb-1">Settings</h1>
        <p className="text-sm text-gray-400">Manage your account and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {/* Notifications */}
        <div className="glassmorphism rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#39FF14]/20 flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#39FF14]" />
              </div>
              <div>
                <h3 className="font-medium text-white">Notifications</h3>
                <p className="text-sm text-gray-400">Manage email and push notifications</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Appearance */}
        <div className="glassmorphism rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/20 flex items-center justify-center">
                <Moon className="w-5 h-5 text-[#00F0FF]" />
              </div>
              <div>
                <h3 className="font-medium text-white">Appearance</h3>
                <p className="text-sm text-gray-400">Dark mode enabled</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Language */}
        <div className="glassmorphism rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#BF00FF]/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#BF00FF]" />
              </div>
              <div>
                <h3 className="font-medium text-white">Language</h3>
                <p className="text-sm text-gray-400">English (US)</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="glassmorphism rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-white">Privacy & Security</h3>
                <p className="text-sm text-gray-400">Manage your data and security settings</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Account Info */}
        <div className="glassmorphism rounded-xl p-5 border border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Account</h3>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>
          <div className="pl-14 space-y-2">
            <p className="text-xs text-gray-500">Account created: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
            <p className="text-xs text-gray-500">Last sign in: {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}</p>
          </div>
        </div>

        {/* Sign Out */}
        <button
          onClick={handleSignOut}
          disabled={loading}
          className="w-full glassmorphism rounded-xl p-5 border border-white/10 hover:border-red-500/30 transition-all text-left group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                <LogOut className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-medium text-red-400">Sign Out</h3>
                <p className="text-sm text-gray-400">Sign out of your account</p>
              </div>
            </div>
          </div>
        </button>

        {/* Delete Account */}
        <div className="glassmorphism rounded-xl p-5 border border-red-500/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <Trash2 className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-red-400 mb-1">Delete Account</h3>
              <p className="text-sm text-gray-400 mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
                >
                  Delete My Account
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <span>Confirm Delete</span>
                    )}
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm font-medium hover:bg-white/10 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center py-6">
        <p className="text-xs text-gray-500">PlayBoost AI v1.0.0</p>
        <p className="text-xs text-gray-600 mt-1">© 2026 PlayBoost AI. All rights reserved.</p>
      </div>
    </div>
  );
}

export default SettingsPage;
