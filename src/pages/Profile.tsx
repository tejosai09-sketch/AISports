import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import {
  User,
  Mail,
  MapPin,
  Phone,
  Building2,
  Camera,
  Save,
  Loader2,
  Check,
  AlertCircle,
  Edit2
} from 'lucide-react';

type Profile = {
  id: string;
  venue_name: string;
  sport_types: string[];
  location: string;
  phone: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
};

const availableSports = [
  'Cricket',
  'Football',
  'Badminton',
  'Basketball',
  'Volleyball',
  'Tennis',
  'Table Tennis',
  'Box Cricket',
  'Gaming'
];

function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    venue_name: '',
    location: '',
    phone: '',
    sport_types: [] as string[]
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (data) {
      setProfile(data);
      setFormData({
        venue_name: data.venue_name || '',
        location: data.location || '',
        phone: data.phone || '',
        sport_types: data.sport_types || []
      });
    } else {
      // Create profile if doesn't exist
      const newProfile = {
        id: user.id,
        venue_name: user.user_metadata?.venue_name || '',
        sport_types: [],
        location: '',
        phone: ''
      };
      await supabase.from('profiles').insert(newProfile);
      setProfile(newProfile as Profile);
      setFormData({
        venue_name: newProfile.venue_name,
        location: '',
        phone: '',
        sport_types: []
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setError(null);

    const { error } = await supabase
      .from('profiles')
      .update({
        venue_name: formData.venue_name,
        location: formData.location,
        phone: formData.phone,
        sport_types: formData.sport_types,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) {
      setError(error.message);
    } else {
      setSaved(true);
      setIsEditing(false);
      setTimeout(() => setSaved(false), 3000);
      if (profile) {
        setProfile({
          ...profile,
          ...formData
        });
      }
    }
    setSaving(false);
  };

  const toggleSport = (sport: string) => {
    setFormData(prev => ({
      ...prev,
      sport_types: prev.sport_types.includes(sport)
        ? prev.sport_types.filter(s => s !== sport)
        : [...prev.sport_types, sport]
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-[#39FF14]/30 border-t-[#39FF14] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="glassmorphism rounded-xl p-6 border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white mb-1">Profile Settings</h1>
            <p className="text-sm text-gray-400">Manage your venue information</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      venue_name: profile?.venue_name || '',
                      location: profile?.location || '',
                      phone: profile?.phone || '',
                      sport_types: profile?.sport_types || []
                    });
                  }}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-primary text-black flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#39FF14] to-[#00F0FF] text-black font-semibold"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {saved && (
          <div className="mt-4 p-3 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/30 flex items-center gap-2 text-[#39FF14]">
            <Check className="w-5 h-5" />
            <span className="text-sm">Profile updated successfully!</span>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>

      {/* Profile Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Avatar & Basic Info */}
        <div className="lg:col-span-1">
          <div className="glassmorphism rounded-xl p-6 border border-white/10 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#39FF14] to-[#00F0FF] flex items-center justify-center text-3xl font-bold text-black">
                {formData.venue_name.charAt(0).toUpperCase() || 'V'}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Camera className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            <h2 className="text-lg font-semibold text-white mb-1">
              {formData.venue_name || 'Your Venue'}
            </h2>
            <p className="text-sm text-gray-400 mb-4">{user?.email}</p>

            <div className="space-y-2 text-sm text-gray-400">
              {formData.location && (
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{formData.location}</span>
                </div>
              )}
              {formData.phone && (
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{formData.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Venue Information */}
          <div className="glassmorphism rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-6">Venue Information</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Building2 className="w-4 h-4 inline mr-2" />
                  Venue Name
                </label>
                <input
                  type="text"
                  value={formData.venue_name}
                  onChange={(e) => setFormData({ ...formData, venue_name: e.target.value })}
                  disabled={!isEditing}
                  className="input-field disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="Enter venue name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  disabled={!isEditing}
                  className="input-field disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="e.g., Andheri West, Mumbai"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="input-field disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </div>

          {/* Sports Types */}
          <div className="glassmorphism rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-6">Sports Offered</h2>

            <div className="flex flex-wrap gap-2">
              {availableSports.map((sport) => (
                <button
                  key={sport}
                  type="button"
                  disabled={!isEditing}
                  onClick={() => toggleSport(sport)}
                  className={`px-4 py-2 rounded-lg border text-sm transition-all disabled:cursor-not-allowed ${
                    formData.sport_types.includes(sport)
                      ? 'border-[#39FF14] bg-[#39FF14]/10 text-[#39FF14]'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/30'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
