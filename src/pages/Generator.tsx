import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import {
  Sparkles,
  Copy,
  RefreshCw,
  Bookmark,
  Share2,
  Download,
  Check,
  ChevronDown,
  Loader2,
  Zap,
  AlertCircle
} from 'lucide-react';
import type { Database } from '../types/database';

type Caption = Database['public']['Tables']['captions']['Row'];

const sportTypes = [
  { id: 'cricket', name: 'Cricket', emoji: '🏏' },
  { id: 'football', name: 'Football', emoji: '⚽' },
  { id: 'badminton', name: 'Badminton', emoji: '🏸' },
  { id: 'basketball', name: 'Basketball', emoji: '🏀' },
  { id: 'volleyball', name: 'Volleyball', emoji: '🏐' },
  { id: 'tennis', name: 'Tennis', emoji: '🎾' },
  { id: 'gaming', name: 'Gaming', emoji: '🎮' },
  { id: 'box-cricket', name: 'Box Cricket', emoji: '🏏' }
];

const toneOptions = [
  { id: 'professional', name: 'Professional' },
  { id: 'energetic', name: 'Energetic' },
  { id: 'funny', name: 'Funny & Witty' },
  { id: 'youth', name: 'Youth-Focused' },
  { id: 'premium', name: 'Premium' },
  { id: 'local', name: 'Local Vibe' },
  { id: 'tournament', name: 'Tournament Hype' }
];

const audienceTypes = [
  'General Public',
  'Sports Enthusiasts',
  'Corporate Teams',
  'College Students',
  'Amateur Players',
  'Professional Players',
  'Families',
  'Kids & Teens'
];

function Generator() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    venueName: user?.user_metadata?.venue_name || '',
    sportType: '',
    tournamentName: '',
    offerDetails: '',
    dateTime: '',
    prizePool: '',
    availableSlots: '',
    location: '',
    audienceType: '',
    tone: 'energetic'
  });

  const [output, setOutput] = useState({
    instagramCaption: '',
    whatsappMessage: '',
    facebookPost: '',
    hashtags: [] as string[],
    headline: '',
    storyIdea: '',
    adCopy: ''
  });

  useEffect(() => {
    if (user?.user_metadata?.venue_name) {
      setFormData(prev => ({ ...prev, venueName: user.user_metadata.venue_name }));
    }
  }, [user]);

  const generateContent = async () => {
    if (!formData.venueName || !formData.sportType) {
      alert('Please fill in venue name and sport type');
      return;
    }

    setLoading(true);
    setGenerated(false);

    // Simulate AI generation with realistic content
    await new Promise(resolve => setTimeout(resolve, 2000));

    const sport = sportTypes.find(s => s.id === formData.sportType);
    const tone = toneOptions.find(t => t.id === formData.tone);

    // Generate content based on inputs
    const content = generateAIContent(formData, sport, tone);
    setOutput(content);
    setGenerated(true);
    setLoading(false);

    // Update user analytics
    await updateUserAnalytics();
  };

  const generateAIContent = (data: typeof formData, sport: typeof sportTypes[0] | undefined, tone: typeof toneOptions[0] | undefined) => {
    const sportEmoji = sport?.emoji || '🏆';
    const sportName = sport?.name || 'Sports';

    // Generate Instagram Caption
    let instagramCaption = '';
    if (data.tournamentName) {
      instagramCaption = `${sportEmoji} ${tone?.id === 'funny' ? 'Warning: Extreme competition ahead! 😄' : 'Ready to dominate?'}\n\n`;
      instagramCaption += `Join our ${data.tournamentName} at ${data.venueName}!\n`;
      if (data.prizePool) {
        instagramCaption += `💰 Prize Pool: ${data.prizePool}\n`;
      }
      if (data.availableSlots) {
        instagramCaption += `🔥 Only ${data.availableSlots} slots left!\n`;
      }
      instagramCaption += `\n📅 ${data.dateTime || 'This Weekend'}\n📍 ${data.location || data.venueName}\n\n`;
      instagramCaption += tone?.id === 'energetic' ? 'Let\'s GO! 🔥' : 'Register now! 💪';
    } else if (data.offerDetails) {
      instagramCaption = `${sportEmoji} FLASH DEAL ALERT! ⚡\n\n`;
      instagramCaption += `${data.offerDetails}\n\n`;
      instagramCaption += `Available at ${data.venueName}\n`;
      if (data.dateTime) {
        instagramCaption += `⏰ ${data.dateTime}\n`;
      }
      instagramCaption += `\nBook now before it\'s gone! 🏃`;
    } else {
      instagramCaption = `${sportEmoji} ${data.venueName} - Your ${sportName} Destination!\n\n`;
      instagramCaption += `Book your slots now and experience the best ${sportName.toLowerCase()} facilities in town! 🏟️\n\n`;
      instagramCaption += `📍 ${data.location || 'Prime Location'}\n`;
      instagramCaption += `📞 Book now!`;
    }

    // Generate WhatsApp Message
    let whatsappMessage = `*${data.venueName}* ${sportEmoji}\n\n`;
    if (data.tournamentName) {
      whatsappMessage += `🏆 *${data.tournamentName}*\n\n`;
      if (data.prizePool) {
        whatsappMessage += `💰 Prize: ${data.prizePool}\n`;
      }
      whatsappMessage += `📅 ${data.dateTime || 'Coming Soon'}\n`;
      whatsappMessage += `📍 ${data.location || data.venueName}\n\n`;
      whatsappMessage += `${data.availableSlots ? `🔥 Only ${data.availableSlots} slots available!\n\n` : ''}`;
      whatsappMessage += `Reply to book now! ✅`;
    } else {
      whatsappMessage += `Hey! Check out our amazing ${sportName.toLowerCase()} facilities! 🏟️\n\n`;
      whatsappMessage += `${data.offerDetails ? `⚡ ${data.offerDetails}\n\n` : ''}`;
      whatsappMessage += `Book now: [Your Booking Link]\n\n`;
      whatsappMessage += `For queries, reply here! 😊`;
    }

    // Generate Facebook Post
    let facebookPost = `${sportEmoji} ${data.tournamentName || 'Exciting News!'} at ${data.venueName}!\n\n`;
    if (data.tournamentName) {
      facebookPost += `Calling all ${sportName.toLowerCase()} enthusiasts! 📢\n\n`;
      facebookPost += `Join us for an epic ${data.tournamentName}!\n`;
      if (data.prizePool) {
        facebookPost += `💰 Win from a prize pool of ${data.prizePool}!\n`;
      }
      facebookPost += `\n📅 Date: ${data.dateTime || 'TBA'}\n`;
      facebookPost += `📍 Venue: ${data.location || data.venueName}\n`;
      facebookPost += `\nSlots filling fast! Register now:\n`;
      facebookPost += `[Registration Link]\n\n`;
      facebookPost += `Don't miss out! Tag your teammates! 👇`;
    } else {
      facebookPost += `Experience premium ${sportName.toLowerCase()} at ${data.venueName}! 🏟️\n\n`;
      facebookPost += `${data.offerDetails || 'Book your slots today!'}\n\n`;
      facebookPost += `📍 ${data.location || 'Visit us at ' + data.venueName}\n`;
      facebookPost += `\nBook now: [Link]`;
    }

    // Generate Hashtags
    const hashtags = [
      `#${sportName.replace(' ', '')}`,
      `#${data.venueName.replace(/\s+/g, '')}`,
      `#SportsVenue`,
      data.tournamentName ? '#Tournament' : '',
      data.offerDetails ? '#SpecialOffer' : '',
      '#BookNow',
      '#PlaySports',
      `#${sportName}Turf`,
      '#sportsarena',
      '#turf',
      data.audienceType?.includes('Corporate') ? '#CorporateSports' : '',
      '#WeekendVibes'
    ].filter(Boolean) as string[];

    // Generate Headline
    let headline = '';
    if (data.tournamentName) {
      headline = `${sportEmoji} ${data.tournamentName} - Register Now!`;
    } else if (data.offerDetails) {
      headline = `⚡ Special ${sportName} Offer at ${data.venueName}!`;
    } else {
      headline = `Play ${sportName} at ${data.venueName} - Book Today!`;
    }

    // Generate Story Idea
    let storyIdea = '';
    if (data.tournamentName) {
      storyIdea = `📱 Story: Countdown timer to registration deadline with team highlights and previous tournament action shots\n\n`;
      storyIdea += `Slide 1: "${sportEmoji} REGISTRATIONS OPEN!"\n`;
      storyIdea += `Slide 2: Prize pool announcement\n`;
      storyIdea += `Slide 3: Venue tour\n`;
      storyIdea += `Slide 4: "Register Now" CTA with link`;
    } else {
      storyIdea = `📱 Story: Quick venue tour with booking CTA\n\n`;
      storyIdea += `Slide 1: ${sportEmoji} facility highlight\n`;
      storyIdea += `Slide 2: ${data.offerDetails || 'Premium amenities'}\n`;
      storyIdea += `Slide 3: Slots availability\n`;
      storyIdea += `Slide 4: Book Now button`;
    }

    // Generate Ad Copy
    let adCopy = `${sportEmoji} ${data.venueName} - ${sportName} Excellence\n\n`;
    adCopy += data.tournamentName
      ? `🏆 Join ${data.tournamentName}\n${data.prizePool ? 'Prize: ' + data.prizePool + '\n' : ''}Limited slots!`
      : `${data.offerDetails || 'Premium facilities. Affordable prices.'}\nBook today!`;

    return {
      instagramCaption,
      whatsappMessage,
      facebookPost,
      hashtags,
      headline,
      storyIdea,
      adCopy
    };
  };

  const updateUserAnalytics = async () => {
    if (!user) return;

    const { data: existing } = await supabase
      .from('user_analytics')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('user_analytics')
        .update({
          captions_generated: existing.captions_generated + 1,
          hashtags_generated: existing.hashtags_generated + output.hashtags.length,
          top_sport: formData.sportType,
          top_tone: formData.tone,
          last_generated_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);
    } else {
      await supabase
        .from('user_analytics')
        .insert({
          user_id: user.id,
          captions_generated: 1,
          hashtags_generated: output.hashtags.length,
          top_sport: formData.sportType,
          top_tone: formData.tone,
          last_generated_at: new Date().toISOString()
        });
    }
  };

  const saveCaption = async () => {
    if (!user) return;
    setSaving(true);

    await supabase.from('captions').insert({
      user_id: user.id,
      venue_name: formData.venueName,
      sport_type: formData.sportType,
      tournament_name: formData.tournamentName,
      offer_details: formData.offerDetails,
      date_time: formData.dateTime,
      prize_pool: formData.prizePool,
      available_slots: parseInt(formData.availableSlots) || 0,
      location: formData.location,
      audience_type: formData.audienceType,
      tone: formData.tone,
      instagram_caption: output.instagramCaption,
      whatsapp_message: output.whatsappMessage,
      facebook_post: output.facebookPost,
      hashtags: output.hashtags,
      headline: output.headline,
      story_idea: output.storyIdea,
      ad_copy: output.adCopy
    });

    setSaving(false);
    setSavedMessage('Caption saved successfully!');
    setTimeout(() => setSavedMessage(null), 3000);
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="glassmorphism rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#39FF14] to-[#00F0FF] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Content Generator</h1>
            <p className="text-sm text-gray-400">Create professional marketing content in seconds</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="space-y-4">
          <div className="glassmorphism rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-6">Enter Details</h2>

            <div className="space-y-5">
              {/* Venue Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Venue Name *</label>
                <input
                  type="text"
                  value={formData.venueName}
                  onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                  placeholder="e.g., Champions Turf"
                  className="input-field"
                />
              </div>

              {/* Sport Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Sport Type *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {sportTypes.map((sport) => (
                    <button
                      key={sport.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, sportType: sport.id })}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        formData.sportType === sport.id
                          ? 'border-[#39FF14] bg-[#39FF14]/10 text-white neon-glow-green'
                          : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{sport.emoji}</span>
                      <span className="text-xs">{sport.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tournament Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tournament Name (Optional)</label>
                <input
                  type="text"
                  value={formData.tournamentName}
                  onChange={(e) => setFormData({ ...formData, tournamentName: e.target.value })}
                  placeholder="e.g., Weekend Cricket Championship"
                  className="input-field"
                />
              </div>

              {/* Offer Details */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Offer/Discount Details (Optional)</label>
                <input
                  type="text"
                  value={formData.offerDetails}
                  onChange={(e) => setFormData({ ...formData, offerDetails: e.target.value })}
                  placeholder="e.g., 50% off on evening slots"
                  className="input-field"
                />
              </div>

              {/* Two columns: Date/Time & Prize Pool */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date & Time</label>
                  <input
                    type="text"
                    value={formData.dateTime}
                    onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                    placeholder="e.g., Sat-Sun, 6 PM"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Prize Pool</label>
                  <input
                    type="text"
                    value={formData.prizePool}
                    onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
                    placeholder="e.g., ₹10,000"
                    className="input-field"
                  />
                </div>
              </div>

              {/* Two columns: Slots & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Available Slots</label>
                  <input
                    type="number"
                    value={formData.availableSlots}
                    onChange={(e) => setFormData({ ...formData, availableSlots: e.target.value })}
                    placeholder="e.g., 16"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Andheri West"
                    className="input-field"
                  />
                </div>
              </div>

              {/* Audience Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Target Audience</label>
                <select
                  value={formData.audienceType}
                  onChange={(e) => setFormData({ ...formData, audienceType: e.target.value })}
                  className="select-field"
                >
                  <option value="">Select audience type</option>
                  {audienceTypes.map((audience) => (
                    <option key={audience} value={audience}>{audience}</option>
                  ))}
                </select>
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Content Tone</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {toneOptions.map((tone) => (
                    <button
                      key={tone.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, tone: tone.id })}
                      className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                        formData.tone === tone.id
                          ? 'border-[#00F0FF] bg-[#00F0FF]/10 text-white'
                          : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      {tone.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateContent}
                disabled={loading || !formData.venueName || !formData.sportType}
                className="w-full btn-primary text-black font-semibold py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating AI Content...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Generate Content</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          {!generated && !loading && (
            <div className="glassmorphism rounded-xl p-12 border border-white/10 text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-400 mb-2">AI Output Will Appear Here</h3>
              <p className="text-sm text-gray-500">Fill in the details and click Generate</p>
            </div>
          )}

          {loading && (
            <div className="glassmorphism rounded-xl p-12 border border-white/10 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#39FF14]/20 to-[#00F0FF]/20 flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-10 h-10 text-[#39FF14] animate-spin" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI is Creating Your Content...</h3>
              <p className="text-sm text-gray-400">Analyzing venue details and generating engaging captions</p>
            </div>
          )}

          {generated && (
            <>
              {/* Save Button */}
              {savedMessage && (
                <div className="glassmorphism rounded-lg p-3 border border-[#39FF14]/30 flex items-center gap-2 text-[#39FF14]">
                  <Check className="w-5 h-5" />
                  <span className="text-sm">{savedMessage}</span>
                </div>
              )}

              {/* Output Cards */}
              <OutputCard
                title="Instagram Caption"
                content={output.instagramCaption}
                onCopy={() => copyToClipboard(output.instagramCaption, 'instagram')}
                onRegenerate={generateContent}
                onSave={saveCaption}
                copied={copiedField === 'instagram'}
                saving={saving}
              />

              <OutputCard
                title="WhatsApp Message"
                content={output.whatsappMessage}
                onCopy={() => copyToClipboard(output.whatsappMessage, 'whatsapp')}
                onRegenerate={generateContent}
                onSave={saveCaption}
                copied={copiedField === 'whatsapp'}
                saving={saving}
              />

              <OutputCard
                title="Facebook Post"
                content={output.facebookPost}
                onCopy={() => copyToClipboard(output.facebookPost, 'facebook')}
                onRegenerate={generateContent}
                onSave={saveCaption}
                copied={copiedField === 'facebook'}
                saving={saving}
              />

              {/* Hashtags Card */}
              <div className="glassmorphism rounded-xl p-5 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Hashtags</h3>
                  <button
                    onClick={() => copyToClipboard(output.hashtags.join(' '), 'hashtags')}
                    className="text-sm text-[#39FF14] hover:underline flex items-center gap-1"
                  >
                    {copiedField === 'hashtags' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedField === 'hashtags' ? 'Copied!' : 'Copy All'}</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {output.hashtags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 rounded-full bg-[#BF00FF]/20 text-[#BF00FF] text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <OutputCard
                title="Promotional Headline"
                content={output.headline}
                onCopy={() => copyToClipboard(output.headline, 'headline')}
                onRegenerate={generateContent}
                onSave={saveCaption}
                copied={copiedField === 'headline'}
                saving={saving}
                compact
              />

              <OutputCard
                title="Story Idea"
                content={output.storyIdea}
                onCopy={() => copyToClipboard(output.storyIdea, 'story')}
                onRegenerate={generateContent}
                onSave={saveCaption}
                copied={copiedField === 'story'}
                saving={saving}
              />

              <OutputCard
                title="Ad Copy"
                content={output.adCopy}
                onCopy={() => copyToClipboard(output.adCopy, 'ad')}
                onRegenerate={generateContent}
                onSave={saveCaption}
                copied={copiedField === 'ad'}
                saving={saving}
                compact
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Output Card Component
function OutputCard({
  title,
  content,
  onCopy,
  onRegenerate,
  onSave,
  copied,
  saving,
  compact = false
}: {
  title: string;
  content: string;
  onCopy: () => void;
  onRegenerate: () => void;
  onSave: () => void;
  copied: boolean;
  saving: boolean;
  compact?: boolean;
}) {
  return (
    <div className={`glassmorphism rounded-xl ${compact ? 'p-4' : 'p-5'} border border-white/10`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-white">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onCopy}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#39FF14]/50 transition-all text-gray-400 hover:text-[#39FF14]"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={onRegenerate}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#00F0FF]/50 transition-all text-gray-400 hover:text-[#00F0FF]"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#BF00FF]/50 transition-all text-gray-400 hover:text-[#BF00FF] disabled:opacity-50"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className={`text-gray-300 ${compact ? 'text-sm' : 'text-sm leading-relaxed'} whitespace-pre-wrap`}>
        {content}
      </p>
    </div>
  );
}

export default Generator;
