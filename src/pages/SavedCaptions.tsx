import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import {
  Bookmark,
  Search,
  Filter,
  Copy,
  Check,
  Trash2,
  Star,
  MoreVertical,
  Calendar,
  Eye,
  X,
  Instagram,
  MessageCircle,
  Facebook
} from 'lucide-react';

type Caption = {
  id: string;
  created_at: string;
  venue_name: string;
  sport_type: string;
  tournament_name: string;
  offer_details: string;
  date_time: string;
  prize_pool: string;
  available_slots: number;
  location: string;
  audience_type: string;
  tone: string;
  instagram_caption: string;
  whatsapp_message: string;
  facebook_post: string;
  hashtags: string[];
  headline: string;
  story_idea: string;
  ad_copy: string;
  is_favorite: boolean;
};

function SavedCaptions() {
  const { user } = useAuth();
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCaption, setSelectedCaption] = useState<Caption | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    fetchCaptions();
  }, [user]);

  const fetchCaptions = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('captions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setCaptions(data);
    }
    setLoading(false);
  };

  const deleteCaption = async (id: string) => {
    await supabase.from('captions').delete().eq('id', id);
    setCaptions(captions.filter(c => c.id !== id));
    if (selectedCaption?.id === id) {
      setSelectedCaption(null);
    }
  };

  const toggleFavorite = async (caption: Caption) => {
    const newValue = !caption.is_favorite;
    await supabase
      .from('captions')
      .update({ is_favorite: newValue })
      .eq('id', caption.id);

    setCaptions(captions.map(c =>
      c.id === caption.id ? { ...c, is_favorite: newValue } : c
    ));
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const filteredCaptions = captions.filter(caption =>
    caption.venue_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    caption.tournament_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    caption.sport_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-[#39FF14]/30 border-t-[#39FF14] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="glassmorphism rounded-xl p-6 border border-white/10">
        <h1 className="text-xl font-bold text-white mb-1">Saved Captions</h1>
        <p className="text-sm text-gray-400">Manage your generated marketing content</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search saved captions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#39FF14]"
        />
      </div>

      {/* Captions List */}
      {filteredCaptions.length === 0 ? (
        <div className="glassmorphism rounded-xl p-12 border border-white/10 text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-400 mb-2">No saved captions</h3>
          <p className="text-sm text-gray-500">Generate content and save it here for quick access</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredCaptions.map((caption) => (
            <div
              key={caption.id}
              className="glassmorphism rounded-xl p-5 border border-white/10 hover:border-[#39FF14]/30 transition-all cursor-pointer"
              onClick={() => setSelectedCaption(caption)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-white">
                      {caption.tournament_name || caption.offer_details || 'Regular Post'}
                    </h3>
                    {caption.is_favorite && (
                      <Star className="w-4 h-4 text-[#39FF14] fill-current" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="capitalize">{caption.sport_type}</span>
                    <span className="text-gray-600">•</span>
                    <span className="capitalize">{caption.tone}</span>
                    {caption.prize_pool && (
                      <>
                        <span className="text-gray-600">•</span>
                        <span>{caption.prize_pool}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(caption);
                    }}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <Star className={`w-4 h-4 ${caption.is_favorite ? 'text-[#39FF14] fill-current' : 'text-gray-400'}`} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCaption(caption.id);
                    }}
                    className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                {caption.instagram_caption.substring(0, 100)}...
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(caption.created_at).toLocaleDateString()}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(caption.instagram_caption, caption.id);
                  }}
                  className="flex items-center gap-1 text-xs text-[#39FF14] hover:underline"
                >
                  {copiedField === caption.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedField === caption.id ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Caption Detail Modal */}
      {selectedCaption && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glassmorphism rounded-2xl border border-white/10 max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin">
            <div className="sticky top-0 glassmorphism border-b border-white/10 p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {selectedCaption.tournament_name || selectedCaption.offer_details || 'Caption Details'}
              </h2>
              <button
                onClick={() => setSelectedCaption(null)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Quick Info */}
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-lg bg-[#39FF14]/20 text-[#39FF14] text-sm capitalize">
                  {selectedCaption.sport_type}
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#00F0FF]/20 text-[#00F0FF] text-sm capitalize">
                  {selectedCaption.tone}
                </span>
                {selectedCaption.prize_pool && (
                  <span className="px-3 py-1 rounded-lg bg-[#BF00FF]/20 text-[#BF00FF] text-sm">
                    {selectedCaption.prize_pool}
                  </span>
                )}
              </div>

              {/* Instagram */}
              <ContentSection
                title="Instagram Caption"
                icon={Instagram}
                content={selectedCaption.instagram_caption}
                onCopy={() => copyToClipboard(selectedCaption.instagram_caption, 'instagram-modal')}
                copied={copiedField === 'instagram-modal'}
              />

              {/* WhatsApp */}
              <ContentSection
                title="WhatsApp Message"
                icon={MessageCircle}
                content={selectedCaption.whatsapp_message}
                onCopy={() => copyToClipboard(selectedCaption.whatsapp_message, 'whatsapp-modal')}
                copied={copiedField === 'whatsapp-modal'}
              />

              {/* Facebook */}
              <ContentSection
                title="Facebook Post"
                icon={Facebook}
                content={selectedCaption.facebook_post}
                onCopy={() => copyToClipboard(selectedCaption.facebook_post, 'facebook-modal')}
                copied={copiedField === 'facebook-modal'}
              />

              {/* Hashtags */}
              <div>
                <h3 className="font-semibold text-white mb-3">Hashtags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCaption.hashtags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-[#BF00FF]/20 text-[#BF00FF] text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ContentSection({
  title,
  icon: Icon,
  content,
  onCopy,
  copied
}: {
  title: string;
  icon: React.ElementType;
  content: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-gray-400" />
          <h3 className="font-semibold text-white">{title}</h3>
        </div>
        <button
          onClick={onCopy}
          className="flex items-center gap-1 text-sm text-[#39FF14] hover:underline"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <p className="text-sm text-gray-300 whitespace-pre-wrap glassmorphism rounded-lg p-4 border border-white/10">
        {content}
      </p>
    </div>
  );
}

export default SavedCaptions;
