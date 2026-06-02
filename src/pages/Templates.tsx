import { motion } from 'motion/react';
import { Wand2, Book, GitPullRequest, AlertCircle } from 'lucide-react';
import { MarkdownTemplate } from '../lib/types';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface TemplatesPageProps {
  title: string;
  subtitle: string;
  icon: 'book' | 'pr' | 'issue';
  templates: MarkdownTemplate[];
  handleCopy: (text: string) => void;
  setOutput: (v: string) => void;
  setView: (v: any) => void;
}

export default function TemplatesPage({
  title, subtitle, icon, templates, handleCopy, setOutput, setView
}: TemplatesPageProps) {
  const getIcon = () => {
    switch (icon) {
      case 'book': return <Book className="w-5 h-5" />;
      case 'pr': return <GitPullRequest className="w-5 h-5" />;
      case 'issue': return <AlertCircle className="w-5 h-5" />;
    }
  };

  const useTemplate = (content: string) => {
    setOutput(content);
    handleCopy(content);
    setView('markdown');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader
        icon={getIcon()}
        title={title}
        subtitle={subtitle}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((tmpl, idx) => (
          <Card key={idx} className="p-5 flex flex-col h-full">
            <h3 className="font-semibold text-zinc-100 mb-2">{tmpl.name}</h3>
            <p className="text-xs text-zinc-500 mb-4">{tmpl.description}</p>
            <div className="bg-zinc-950/50 rounded-xl p-3 max-h-32 overflow-y-auto custom-scrollbar mb-4 border border-zinc-800/50">
              <pre className="text-[10px] text-zinc-600 font-mono whitespace-pre-wrap">{tmpl.content.slice(0, 300)}...</pre>
            </div>
            <Button
              className="mt-auto w-full"
              onClick={() => useTemplate(tmpl.content)}
            >
              <Wand2 className="w-4 h-4 mr-2" /> Use Template
            </Button>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
