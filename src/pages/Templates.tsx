import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import {
  FileText,
  Search,
  Filter,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  Calendar,
  Tag,
  Zap
} from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Templates', icon: FileText },
  { id: 'tournament', name: 'Tournament', icon: Sparkles },
  { id: 'offer', name: 'Offers', icon: Tag },
  { id: 'event', name: 'Events', icon: Calendar }
];

type Template = {
  id: string;
  name: string;
  category: string;
  sport_type: string;
  template_content: string;
  preview_text: string;
  is_premium: boolean;
  usage_count: number;
};

function Templates() {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('usage_count', { ascending: false });

    if (data) {
      setTemplates(data);
    }
    setLoading(false);
  };

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.preview_text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyTemplate = async (template: Template) => {
    await navigator.clipboard.writeText(template.template_content);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);

    // Update usage count
    await supabase
      .from('templates')
      .update({ usage_count: template.usage_count + 1 })
      .eq('id', template.id);
  };

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white mb-1">Promotion Templates</h1>
            <p className="text-sm text-gray-400">Ready-to-use templates for quick content creation</p>
          </div>
          <Link
            to="/generator"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#39FF14] to-[#00F0FF] text-black font-semibold hover:scale-105 transition-transform text-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create Custom</span>
          </Link>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#39FF14]"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'border-[#39FF14] bg-[#39FF14]/10 text-white'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/30'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span className="text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="glassmorphism rounded-xl border border-white/10 overflow-hidden hover:border-[#39FF14]/30 transition-all group"
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-white group-hover:text-[#39FF14] transition-colors">
                    {template.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{template.category}</span>
                    {template.sport_type && (
                      <>
                        <span className="text-gray-600">•</span>
                        <span className="text-xs text-gray-400">{template.sport_type}</span>
                      </>
                    )}
                  </div>
                </div>
                {template.is_premium && (
                  <span className="px-2 py-1 rounded bg-gradient-to-r from-[#BF00FF]/20 to-[#00F0FF]/20 text-[#BF00FF] text-xs font-medium">
                    Premium
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-400 line-clamp-2 mb-4">{template.preview_text}</p>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Zap className="w-3 h-3" />
                  <span>{template.usage_count} uses</span>
                </div>
                <button
                  onClick={() => copyTemplate(template)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#39FF14]/10 text-[#39FF14] text-sm font-medium hover:bg-[#39FF14]/20 transition-colors"
                >
                  {copiedId === template.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="glassmorphism rounded-xl p-12 border border-white/10 text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-400 mb-2">No templates found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
}

export default Templates;
