import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { convertToMarkdown } from './lib/converter';
import { type ConversionType, type AppView } from './lib/types';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/Home';
import GitCommandsPage from './pages/GitCommands';
import LicenseGeneratorPage from './pages/LicenseGenerator';
import BadgesPage from './pages/Badges';
import MarkdownConverterPage from './pages/MarkdownConverter';
import TemplatesPage from './pages/Templates';
import WorkflowsPage from './pages/Workflows';
import GitmojisPage from './pages/Gitmojis';
import EmojisPage from './pages/Emojis';
import ProfileBuilder from './pages/ProfileBuilder';
import {
  features, gitCommands, licenses, badges, gitmojis, emojis, addons,
  workflowTemplates, readmeTemplates, prTemplates, issueTemplates
} from './lib/github-templates';

  export default function App() {
  const [view, setView] = useState<AppView>('home');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [type, setType] = useState<ConversionType>('README');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');

  const handleConvert = useCallback(async () => {

    if (!input.trim()) return;
    setIsLoading(true);
    try {
      const result = await convertToMarkdown(input, type);
      setOutput(result);
    } catch (error) {
      console.error('Conversion error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [input, type]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.trim() && view === 'markdown') {
        handleConvert();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [input, view, handleConvert]);

  const handleCopy = useCallback((text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const addAsset = useCallback((snippet: string) => {
    setOutput(prev => prev + '\n' + snippet);
  }, []);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
  }, []);

  const handleExport = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type.toLowerCase()}-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [output, type]);

  const tryExample = useCallback(() => {
    const examples: Record<ConversionType, string> = {
      README: "My project is a weather app called SkyCast. It uses OpenWeather API. Features: current weather, 5-day forecast, unit switching. Built with React and Tailwind. Installation: npm install, npm start. MIT License.",
      PR: "Fix the bug where the login button doesn't work on mobile. I updated the tailwind classes in Auth.tsx. Tested on Chrome and Safari. No breaking changes.",
      ISSUE: "The app crashes when I click the save button without a title. Expected: validation error. Actual: red screen of death. Steps: open app, go to compose, click save. System: Win 10, Chrome 120.",
      COMMENT: "The variable naming here is a bit confusing. Consider renaming 'data' to something more descriptive like 'userData' or 'responsePayload'. Also, the null check on line 42 could be more explicit.",
      RELEASE: "Added new dark mode theme. Fixed bug with login on mobile. Improved performance by 20%. Removed deprecated API endpoints. Updated dependencies to latest versions.",
      GENERAL: "Notes from the meeting: we need to update the logo, fix the header spacing, and launch by Friday. Assigning tasks: John handles design, Sarah handles code."
    };
    setInput(examples[type]);
  }, [type]);

  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomePage features={features} setView={setView} />;
      case 'markdown':
        return (
          <MarkdownConverterPage
            input={input} setInput={setInput} output={output} setOutput={setOutput}
            type={type} setType={setType} isLoading={isLoading} viewMode={viewMode}
            setViewMode={setViewMode} handleConvert={handleConvert} handleCopy={handleCopy}
            handleExport={handleExport} handleClear={handleClear} tryExample={tryExample}
            addAsset={addAsset} copied={copied} addons={addons}
          />
        );
      case 'commands':
        return <GitCommandsPage gitCommands={gitCommands} handleCopy={handleCopy} />;
      case 'license':
        return (
          <LicenseGeneratorPage
            licenses={licenses} handleCopy={handleCopy} copied={copied}
            setOutput={setOutput} setView={setView}
          />
        );
      case 'badges':
        return <BadgesPage badges={badges} handleCopy={handleCopy} />;
      case 'workflows':
        return <WorkflowsPage workflows={workflowTemplates} handleCopy={handleCopy} />;
      case 'gitmojis':
        return <GitmojisPage gitmojis={gitmojis} handleCopy={handleCopy} />;
      case 'emojis':
        return <EmojisPage emojis={emojis} handleCopy={handleCopy} />;
      case 'readme':
        return (
          <TemplatesPage
            title="README Templates"
            subtitle="Choose a template to get started"
            icon="book"
            templates={[
              { name: 'Basic README', description: 'Simple template for small projects', content: readmeTemplates.basic },
              { name: 'Advanced README', description: 'Full-featured template with all sections', content: readmeTemplates.advanced },
            ]}
            handleCopy={handleCopy} setOutput={setOutput} setView={setView}
          />
        );
      case 'pr':
        return (
          <TemplatesPage
            title="Pull Request Templates"
            subtitle="Standardize your contributions"
            icon="pr"
            templates={[
              { name: 'Default PR', description: 'Standard pull request template', content: prTemplates.default },
              { name: 'Bug Fix PR', description: 'Template for bug fixes', content: prTemplates.bugfix },
              { name: 'Feature PR', description: 'Template for new features', content: prTemplates.feature },
            ]}
            handleCopy={handleCopy} setOutput={setOutput} setView={setView}
          />
        );
      case 'issue':
        return (
          <TemplatesPage
            title="Issue Templates"
            subtitle="Help others report better issues"
            icon="issue"
            templates={[
              { name: 'Bug Report', description: 'Template for reporting bugs', content: issueTemplates.bug },
              { name: 'Feature Request', description: 'Template for feature requests', content: issueTemplates.feature },
            ]}
            handleCopy={handleCopy} setOutput={setOutput} setView={setView}
          />
        );
      case 'profile-builder':
        return (
          <ProfileBuilder
            addons={addons}
          />
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <h2 className="text-xl font-semibold mb-2 text-zinc-300">Coming Soon</h2>
            <p>This section is currently under development.</p>
            <button onClick={() => setView('home')} className="mt-4 text-orange-500 hover:underline">Return Home</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[var(--accent-subtle)]">
      <Header view={view} setView={setView} />

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8 min-h-[calc(100vh-8rem)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
