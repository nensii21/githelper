import { motion } from 'motion/react';
import {
  FileText, Image as ImageIcon, Shield, Link as LinkIcon,
  Terminal, Table, Quote, Trash2, Sparkles, Wand2, Eye,
  Code2, Download, Copy, Check, BarChart3, Puzzle
} from 'lucide-react';
import { type ConversionType, type Addon } from '../lib/types';
import { cn } from '../lib/utils';
import MarkdownPreview from '../components/MarkdownPreview';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface MarkdownConverterPageProps {
  input: string;
  setInput: (v: string) => void;
  output: string;
  setOutput: (v: string) => void;
  type: ConversionType;
  setType: (v: ConversionType) => void;
  isLoading: boolean;
  viewMode: 'preview' | 'raw';
  setViewMode: (v: 'preview' | 'raw') => void;
  handleConvert: () => void;
  handleCopy: (text: string) => void;
  handleExport: () => void;
  handleClear: () => void;
  tryExample: () => void;
  addAsset: (snippet: string) => void;
  copied: boolean;
  addons: Addon[];
}

export default function MarkdownConverterPage({
  input, setInput, output, setOutput, type, setType, isLoading, viewMode, setViewMode,
  handleConvert, handleCopy, handleExport, handleClear, tryExample, addAsset, copied,
  addons
}: MarkdownConverterPageProps) {
  const assets = [
    { name: 'Image', icon: ImageIcon, snippet: '![Alt text](https://picsum.photos/seed/project/800/400)' },
    { name: 'Badge', icon: Shield, snippet: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)' },
    { name: 'Link', icon: LinkIcon, snippet: '[Link Text](https://example.com)' },
    { name: 'Code', icon: Terminal, snippet: '```bash\nnpm install\n```' },
    { name: 'Table', icon: Table, snippet: '| Header 1 | Header 2 | Header 3 |\n|----------|----------|----------|\n| Data 1.1 | Data 1.2 | Data 1.3 |\n| Data 2.1 | Data 2.2 | Data 2.3 |' },
    { name: 'Quote', icon: Quote, snippet: '> Your brilliant quote goes here.' },
  ];

  const types: ConversionType[] = ['README', 'PR', 'ISSUE', 'COMMENT', 'RELEASE', 'GENERAL'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[calc(100vh-12rem)]">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 h-full">
        {/* Input Panel */}
        <div className="flex flex-col gap-4 flex-1 min-h-0">
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800/50">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={cn(
                    "px-3 md:px-4 py-2 rounded-lg text-[10px] md:text-[11px] font-bold uppercase tracking-wider transition-all",
                    type === t ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="text-zinc-600 hover:text-red-400"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden md:inline">Clear</span>
            </Button>
          </div>

          <div className="relative flex-1 flex flex-col min-h-0">
            <Card hover={false} className="flex-1 p-0 overflow-hidden bg-zinc-900/20 border-zinc-800/50 focus-within:border-orange-500/50 focus-within:ring-1 focus-within:ring-orange-500/20 transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onBlur={handleConvert}
                placeholder={`What's on your mind for this ${type.toLowerCase()}?\n\nPaste your messy notes here...`}
                className="w-full h-full bg-transparent p-4 md:p-6 resize-none font-sans text-base md:text-lg text-zinc-200 leading-relaxed outline-none placeholder:text-zinc-700"
              />
            </Card>
            <div className="flex items-center justify-between mt-3 px-1">
              <div className="flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
                <div className="flex items-center gap-1.5">
                  <Sparkles className={cn("w-3 h-3", isLoading ? "animate-pulse text-orange-500" : "text-zinc-500")} />
                  {isLoading ? 'Converting...' : 'Auto-Sync'}
                </div>
                <div className="w-1 h-1 rounded-full bg-zinc-800" />
                <div>{input.length} chars</div>
              </div>
              <button onClick={tryExample} className="text-xs text-orange-500 hover:text-orange-400 flex items-center gap-1 font-medium transition-colors">
                <Wand2 className="w-3.5 h-3.5" /> Try Example
              </button>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col gap-4 flex-1 min-h-0 lg:border-l lg:border-zinc-800/50 lg:pl-12">
          <div className="flex items-center justify-between">
            <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800/50">
              <button
                onClick={() => setViewMode('preview')}
                className={cn(
                  "px-3 py-2 text-[10px] font-bold uppercase rounded-lg transition-all flex items-center gap-1.5",
                  viewMode === 'preview' ? "bg-zinc-800 text-orange-500" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <Eye className="w-3.5 h-3.5" />Preview
              </button>
              <button
                onClick={() => setViewMode('raw')}
                className={cn(
                  "px-3 py-2 text-[10px] font-bold uppercase rounded-lg transition-all flex items-center gap-1.5",
                  viewMode === 'raw' ? "bg-zinc-800 text-orange-500" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <Code2 className="w-3.5 h-3.5" />Raw
              </button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleExport}
                disabled={!output}
              >
                <Download className="w-3.5 h-3.5 mr-2" />
                Export
              </Button>
              <Button
                size="sm"
                onClick={() => handleCopy(output)}
                disabled={!output}
              >
                {copied ? <Check className="w-3.5 h-3.5 mr-2" /> : <Copy className="w-3.5 h-3.5 mr-2" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            <Card hover={false} className="flex-1 p-0 overflow-hidden bg-zinc-900/20 border-zinc-800/50 shadow-2xl">
              <div className="h-full overflow-y-auto custom-scrollbar relative">
                {output ? (
                  viewMode === 'preview' ? (
                    <div className="p-6 md:p-8">
                      <MarkdownPreview content={output} />
                    </div>
                  ) : (
                    <textarea
                      value={output}
                      onChange={(e) => setOutput(e.target.value)}
                      className="w-full h-full bg-transparent p-6 md:p-8 resize-none font-mono text-sm text-zinc-400 leading-relaxed outline-none"
                    />
                  )
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-700 gap-4 p-6">
                    <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(249,115,22,0.1)]">
                      <FileText className="w-8 h-8 opacity-40 text-orange-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold uppercase tracking-widest mb-1">Ready</p>
                      <p className="text-[11px] font-medium opacity-50 italic">Type to convert</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
            <div className="mt-4 p-2 bg-zinc-900/50 border border-zinc-800/50 rounded-xl flex gap-2 overflow-x-auto no-scrollbar items-center">
              <span className="text-[10px] font-bold text-zinc-500 uppercase px-3 whitespace-nowrap border-r border-zinc-800 mr-1">Basics</span>
              {assets.map((asset) => (
                <button
                  key={asset.name}
                  onClick={() => addAsset(asset.snippet)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs text-zinc-300 transition-colors whitespace-nowrap"
                >
                  <asset.icon className="w-3 h-3 text-orange-500" />
                  {asset.name}
                </button>
              ))}
              <span className="text-[10px] font-bold text-zinc-500 uppercase px-3 whitespace-nowrap border-r border-zinc-800 mr-1 ml-2">Add-ons</span>
              {addons.map((addon) => (
                <button
                  key={addon.name}
                  onClick={() => addAsset(addon.snippet)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs text-zinc-300 transition-colors whitespace-nowrap"
                >
                  {addon.category === 'Stats' ? <BarChart3 className="w-3 h-3 text-blue-400" /> : <Puzzle className="w-3 h-3 text-green-400" />}
                  {addon.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
