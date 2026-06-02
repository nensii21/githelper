import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Copy, Info } from 'lucide-react';
import { GitCommand } from '../lib/types';
import { cn } from '../lib/utils';
import PageHeader from '../components/layout/PageHeader';
import SearchInput from '../components/ui/SearchInput';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

interface GitCommandsPageProps {
  gitCommands: GitCommand[];
  handleCopy: (text: string) => void;
}

export default function GitCommandsPage({ gitCommands, handleCopy }: GitCommandsPageProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [difficulty, setDifficulty] = useState<string>('All');
  const [expanded, setExpanded] = useState<number | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(gitCommands.map(c => c.category));
    return ['All', ...Array.from(cats)];
  }, [gitCommands]);

  const filteredCommands = useMemo(() => {
    return gitCommands.filter(cmd => {
      const matchesSearch = search === '' ||
        cmd.command.toLowerCase().includes(search.toLowerCase()) ||
        cmd.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || cmd.category === category;
      const matchesDifficulty = difficulty === 'All' || cmd.difficulty === difficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [gitCommands, search, category, difficulty]);

  const getDifficultyVariant = (d: string) => {
    switch (d) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      default: return 'default';
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader
        icon={<Terminal className="w-5 h-5" />}
        title="Git Commands Reference"
        subtitle={`${gitCommands.length} commands available`}
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchInput value={search} onChange={setSearch} placeholder="Search commands..." />
        <div className="flex gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all cursor-pointer outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all cursor-pointer outline-none"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      <p className="text-sm text-zinc-500 mb-4">{filteredCommands.length} commands found</p>

      <div className="grid gap-3">
        {filteredCommands.map((cmd, idx) => (
          <Card key={idx} hover={false} className="p-0 overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <code className="text-orange-500 font-mono text-sm">{cmd.command}</code>
                  <Badge variant={getDifficultyVariant(cmd.difficulty)}>{cmd.difficulty}</Badge>
                  <Badge variant="default">{cmd.category}</Badge>
                </div>
                <p className="text-sm text-zinc-400">{cmd.description}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(cmd.command)}
                  title="Copy command"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                {cmd.details && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setExpanded(expanded === idx ? null : idx)}
                    className={cn(expanded === idx && "text-orange-500")}
                    title="Show details"
                  >
                    <Info className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
            <AnimatePresence>
              {expanded === idx && cmd.details && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 pb-4 border-t border-zinc-800/50 overflow-hidden"
                >
                  <div className="pt-3">
                    <p className="text-xs text-zinc-500 mb-2">{cmd.details}</p>
                    {cmd.example && (
                      <div className="bg-zinc-950/50 rounded-lg p-3 border border-zinc-800/50">
                        <code className="text-xs text-zinc-400 font-mono">{cmd.example}</code>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
