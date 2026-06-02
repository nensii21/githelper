import { motion } from 'motion/react';
import { ChevronRight, Sparkles, Book, Award, Play, Smile, Terminal, Shield, FileText, GitPullRequest, AlertCircle, Github, Layout } from 'lucide-react';
import { Feature } from '../lib/types';
import Card from '../components/ui/Card';

interface HomePageProps {
  features: Feature[];
  setView: (view: any) => void;
}

const getIcon = (iconName: string) => {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    'file-text': FileText, 'git-pull-request': GitPullRequest, 'alert-circle': AlertCircle,
    'sparkles': Sparkles, 'book-open': Book, 'award': Award, 'play': Play, 'smile': Smile,
    'terminal': Terminal, 'shield': Shield, 'layout': Layout
  };
  const Icon = icons[iconName] || FileText;
  return <Icon className="w-5 h-5" />;
};

export default function HomePage({ features, setView }: HomePageProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="mb-10 pb-6 border-b border-[var(--border-default)]">
        <h2 className="text-2xl font-semibold text-[var(--text-bright)] mb-2">Welcome to GitHub Helper</h2>
        <p className="text-[var(--text-secondary)]">Your local toolkit for professional GitHub profile and project management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, idx) => (
          <motion.button
            key={feature.id}
            onClick={() => setView(feature.id as any)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx }}
            className="text-left w-full h-full outline-none"
          >
            <Card className="h-full flex flex-col hover:border-[var(--text-secondary)] transition-all p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-md bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-primary)]">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="font-semibold text-[var(--text-bright)] group-hover:text-[var(--color-info)] transition-colors">{feature.name}</h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{feature.description}</p>
              <div className="mt-auto flex items-center text-[var(--color-info)] text-xs font-medium">
                Open tool <ChevronRight className="w-3 h-3 ml-1" />
              </div>
            </Card>
          </motion.button>
        ))}
      </div>

      <div className="mt-12 pt-12 border-t border-[var(--border-default)]">
        <h3 className="text-lg font-medium text-[var(--text-bright)] mb-4 flex items-center gap-2">
          <Github className="w-5 h-5" />
          Quick Stats
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Git Commands', value: '80+', description: 'Complete reference guide' },
            { label: 'Markdown Templates', value: '12+', description: 'Ready to use structures' },
            { label: 'Asset Gallery', value: '50+', description: 'Badges, emojis and widgets' },
          ].map((stat, idx) => (
            <Card key={idx} hover={false} className="p-4 bg-[var(--bg-surface)]">
              <div className="text-xl font-bold text-[var(--text-bright)]">{stat.value}</div>
              <div className="text-sm font-medium text-[var(--text-primary)] mt-1">{stat.label}</div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">{stat.description}</div>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}