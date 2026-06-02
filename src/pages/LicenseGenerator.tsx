import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, CheckCircle, AlertTriangle, Copy, Printer, Check } from 'lucide-react';
import { License } from '../lib/types';
import { cn } from '../lib/utils';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface LicenseGeneratorPageProps {
  licenses: License[];
  handleCopy: (text: string) => void;
  copied: boolean;
  setOutput: (v: string) => void;
  setView: (v: any) => void;
}

export default function LicenseGeneratorPage({
  licenses, handleCopy, copied, setOutput, setView
}: LicenseGeneratorPageProps) {
  const [selectedLicense, setSelectedLicense] = useState<string | null>(null);

  const currentLicense = licenses.find(l => l.id === selectedLicense);

  const handlePrint = () => {
    if (!currentLicense) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
        <head>
          <title>${currentLicense.name}</title>
          <style>
            body { font-family: 'Courier New', monospace; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6; }
            pre { white-space: pre-wrap; word-wrap: break-word; }
          </style>
        </head>
        <body>
          <pre>${currentLicense.text}</pre>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const useThisLicense = () => {
    if (!currentLicense) return;
    setOutput(currentLicense.text);
    handleCopy(currentLicense.text);
    setView('markdown');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader
        icon={<Shield className="w-5 h-5" />}
        title="License Generator"
        subtitle={`${licenses.length} licenses available`}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-zinc-100">Select License</h3>
          <div className="space-y-2">
            {licenses.map((lic) => (
              <button
                key={lic.id}
                onClick={() => setSelectedLicense(lic.id)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border transition-all outline-none",
                  selectedLicense === lic.id
                    ? "bg-orange-500/10 border-orange-500/50 glow-orange"
                    : "bg-[#121212]/50 border-zinc-800/50 hover:border-orange-500/30 hover:bg-zinc-900/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-zinc-100">{lic.name}</h4>
                    <p className="text-xs text-zinc-500 mt-1">{lic.description}</p>
                  </div>
                  {selectedLicense === lic.id && (
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-zinc-100">License Preview</h3>
          {currentLicense ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card hover={false} className="p-4 bg-zinc-900/30">
                  <h4 className="text-sm font-medium text-green-400 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Permissions
                  </h4>
                  <ul className="space-y-1">
                    {currentLicense.permissions.map((p, i) => (
                      <li key={i} className="text-xs text-zinc-400">• {p}</li>
                    ))}
                  </ul>
                </Card>
                <Card hover={false} className="p-4 bg-zinc-900/30">
                  <h4 className="text-sm font-medium text-yellow-400 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Conditions
                  </h4>
                  <ul className="space-y-1">
                    {currentLicense.conditions.length > 0 ? (
                      currentLicense.conditions.map((c, i) => (
                        <li key={i} className="text-xs text-zinc-400">• {c}</li>
                      ))
                    ) : (
                      <li className="text-xs text-zinc-500">None</li>
                    )}
                  </ul>
                </Card>
              </div>

              <Card hover={false} className="p-4 bg-zinc-950/50 max-h-64 overflow-y-auto custom-scrollbar">
                <pre className="text-xs text-zinc-400 whitespace-pre-wrap font-mono">{currentLicense.text}</pre>
              </Card>

              <div className="flex gap-2">
                <Button
                  onClick={useThisLicense}
                  className="flex-1"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Copied!' : 'Copy & Use License'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handlePrint}
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>
          ) : (
            <Card hover={false} className="p-8 text-center bg-zinc-900/30 border-dashed border-zinc-800">
              <Shield className="w-12 h-12 text-zinc-800 mx-auto mb-3" />
              <p className="text-zinc-500">Select a license to preview</p>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
}
