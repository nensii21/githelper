import { useState } from 'react';
import { motion } from 'motion/react';
import { Smile } from 'lucide-react';
import { Emoji } from '../lib/types';
import PageHeader from '../components/layout/PageHeader';
import SearchInput from '../components/ui/SearchInput';
import Card from '../components/ui/Card';

interface EmojisPageProps {
  emojis: Emoji[];
  handleCopy: (text: string) => void;
}

export default function EmojisPage({ emojis, handleCopy }: EmojisPageProps) {
  const [search, setSearch] = useState('');

  const filteredEmojis = emojis.filter(e =>
    search === '' || e.name.toLowerCase().includes(search.toLowerCase()) || e.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader
        icon={<Smile className="w-5 h-5" />}
        title="Emoji Codes"
        subtitle={`${emojis.length} emojis available`}
      />

      <SearchInput value={search} onChange={setSearch} placeholder="Search emojis..." className="mb-6" />

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {filteredEmojis.map((em, idx) => (
          <motion.button
            key={idx}
            onClick={() => handleCopy(em.code)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.005 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="outline-none"
          >
            <Card className="p-2 text-center group">
              <span className="text-lg block mb-1">{em.emoji}</span>
              <code className="text-[10px] text-zinc-500 font-mono line-clamp-1">{em.code}</code>
            </Card>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
