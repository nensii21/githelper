import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Copy } from 'lucide-react';
import { Badge as BadgeData } from '../lib/types';
import PageHeader from '../components/layout/PageHeader';
import SearchInput from '../components/ui/SearchInput';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface BadgesPageProps {
  badges: BadgeData[];
  handleCopy: (text: string) => void;
}

export default function BadgesPage({ badges, handleCopy }: BadgesPageProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(badges.map(b => b.category)))];

  const filteredBadges = badges.filter(b => {
    const matchesSearch = search === '' || b.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || b.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader
        icon={<Award className="w-5 h-5" />}
        title="Badge Gallery"
        subtitle={`${badges.length} badges available`}
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchInput value={search} onChange={setSearch} placeholder="Search badges..." />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 cursor-pointer outline-none"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredBadges.map((badge, idx) => (
          <Card key={idx} className="p-4 group h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-zinc-400">{badge.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopy(badge.code)}
                className="opacity-0 group-hover:opacity-100 transition-all h-8 w-8"
              >
                <Copy className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="bg-zinc-950/50 p-3 rounded-xl mb-3 flex items-center justify-center min-h-[48px]">
              <img
                src={badge.code.match(/src="([^"]+)"/)?.[1] || badge.code.match(/!\[.*\]\((.*)\)/)?.[1] || ''}
                alt={badge.name}
                className="h-5"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <code className="text-[10px] text-zinc-600 font-mono block truncate mt-auto bg-zinc-900/50 px-2 py-1 rounded">
              {badge.code}
            </code>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
