import { motion } from 'motion/react';
import { Smile } from 'lucide-react';
import { Gitmoji } from '../lib/types';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';

interface GitmojisPageProps {
  gitmojis: Gitmoji[];
  handleCopy: (text: string) => void;
}

export default function GitmojisPage({ gitmojis, handleCopy }: GitmojisPageProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader
        icon={<Smile className="w-5 h-5" />}
        title="Gitmoji Picker"
        subtitle={`${gitmojis.length} gitmojis available`}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {gitmojis.map((gm, idx) => (
          <motion.button
            key={idx}
            onClick={() => handleCopy(gm.code)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.01 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-left outline-none"
          >
            <Card className="p-3 h-full">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{gm.emoji}</span>
                <span className="text-xs font-mono text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">{gm.code}</span>
              </div>
              <p className="text-xs text-zinc-500 line-clamp-1">{gm.name}</p>
            </Card>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
