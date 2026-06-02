import { motion } from 'motion/react';
import { Play, Copy } from 'lucide-react';
import { WorkflowTemplate } from '../lib/types';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface WorkflowsPageProps {
  workflows: WorkflowTemplate[];
  handleCopy: (text: string) => void;
}

export default function WorkflowsPage({ workflows, handleCopy }: WorkflowsPageProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader
        icon={<Play className="w-5 h-5" />}
        title="Workflow Examples"
        subtitle={`${workflows.length} workflows available`}
      />

      <div className="space-y-4">
        {workflows.map((wf, idx) => (
          <Card key={idx} hover={false} className="p-0 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
              <div>
                <h3 className="font-semibold text-zinc-100">{wf.name}</h3>
                <p className="text-xs text-zinc-500 mt-1">{wf.description}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopy(wf.code)}
                className="text-orange-500"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <div className="bg-zinc-950/50 p-4 overflow-x-auto custom-scrollbar">
              <pre className="text-xs font-mono text-zinc-400 whitespace-pre">{wf.code}</pre>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
