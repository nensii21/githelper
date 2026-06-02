import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Settings, Eye, Code, User,
  BarChart3, Languages, Zap,
  Copy, Check, Info, MousePointer2, Trophy,
  Keyboard, Monitor, Smartphone, Tablet,
  ZoomIn, ZoomOut, RefreshCw, Download, ExternalLink,
  X, Sparkles,
  Activity, Quote, Clock, Music,
  Flame, BarChart, Laugh, FolderKanban, LineChart,
  Image
} from 'lucide-react';
import { cn } from '../lib/utils';
import Card from '../components/ui/Card';
import { Addon } from '../lib/types';

// ─── Constants ───────────────────────────────────────────────────────────
const THEMES = ['dark', 'radical', 'merko', 'gruvbox', 'tokyonight', 'onedark', 'cobalt'];
const TROPHY_THEMES = ['flat', 'onedark', 'gruvbox', 'dracula', 'monokai', 'chalk', 'nord', 'alduin', 'darkhub', 'juicyfresh', 'radical', 'onestar', 'discord', 'gitdimmed', 'tokyonight', 'matrix', 'buddhism'];
const ACTIVITY_THEMES = ['react-dark', 'github-compact', 'dracula', 'tokyo-night', 'nord', 'high-contrast', 'gruvbox', 'one-dark', 'rogue', 'xcode', 'coral', 'minimal'];
const STREAK_ALT_THEMES = ['dark', 'radical', 'merko', 'gruvbox', 'tokyonight', 'onedark', 'cobalt', 'synthwave', 'highcontrast', 'dracula', 'monokai', 'nord', 'catppuccin-mocha', 'nightowl', 'gotham', 'ocean-dark', 'midnight-purple', 'neon-dark', 'dark-minimalist', 'transparent'];
const SUMMARY_THEMES = ['dracula', 'github', 'github_dark', 'monokai', 'nord_dark', 'radical', 'solarized', 'solarized_dark', 'tokyonight', '2077', 'gruvbox', 'nord_bright', 'vue'];
const QUOTE_THEMES = ['dark', 'radical', 'merko', 'gruvbox', 'tokyonight', 'onedark', 'cobalt', 'synthwave', 'highcontrast', 'dracula'];
const JOKE_THEMES = ['default', 'dark', 'radical', 'synthwave', 'dracula'];

const CAPSULE_TYPES = ['waving', 'egg', 'shark', 'rect', 'soft', 'rounded', 'cylinder', 'venom', 'transparent'];
const CAPSULE_ANIMATIONS = ['fadeIn', 'scaleIn', 'blink', 'blinking', 'twinkling'];

const COLOR_PRESETS = [
  { name: 'gray', hex: '#6c757d' }, { name: 'black', hex: '#000000' },
  { name: 'red', hex: '#dc3545' }, { name: 'blue', hex: '#0d6efd' },
  { name: 'green', hex: '#198754' }, { name: 'orange', hex: '[var(--accent-primary)]' },
  { name: 'purple', hex: '#6f42c1' }, { name: 'cyan', hex: '#00d4ff' }
];

const BADGE_COLORS = ['brightgreen', 'green', 'yellow', 'orange', 'red', 'blue', 'blueviolet', 'ff5e1a', '00d4ff'];

const SKILL_CATEGORIES: Record<string, string[]> = {
  'Frontend': ['js', 'ts', 'react', 'vue', 'angular', 'svelte', 'nextjs', 'nuxtjs', 'html', 'css', 'tailwind', 'bootstrap', 'sass', 'jquery'],
  'Backend': ['nodejs', 'deno', 'python', 'django', 'flask', 'fastapi', 'java', 'spring', 'cs', 'dotnet', 'php', 'laravel', 'ruby', 'rails', 'go', 'rust', 'cpp', 'c', 'express', 'nestjs', 'graphql'],
  'Database': ['mongodb', 'mysql', 'postgres', 'redis', 'sqlite', 'firebase', 'supabase', 'cassandra', 'elasticsearch', 'dynamodb'],
  'DevOps': ['docker', 'kubernetes', 'aws', 'gcp', 'azure', 'vercel', 'netlify', 'heroku', 'nginx', 'linux', 'ubuntu', 'debian', 'bash'],
  'Tools': ['git', 'github', 'gitlab', 'vscode', 'vim', 'neovim', 'idea', 'figma', 'postman'],
  'Mobile': ['flutter', 'dart', 'kotlin', 'swift', 'androidstudio']
};

const FONTS = ['Fira+Code', 'Roboto', 'Inter', 'JetBrains+Mono', 'Orbitron'];

const SNAKE_YAML = `name: generate animation
on:
  schedule:
    - cron: "0 */12 * * *"
  workflow_dispatch:
  push:
    branches:
    - main
jobs:
  generate:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - name: generate snake.svg
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: \${{ github.repository_owner }}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark
      - name: push snake.svg to the output branch
        uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`;

// ─── Template definitions ────────────────────────────────────────────────
const PROFILE_TEMPLATES = [
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Just stats + languages, center aligned',
    tags: ['Minimal', 'Clean'],
    widgets: ['stats', 'languages'],
    alignment: 'center' as const,
  },
  {
    id: 'full-developer',
    name: 'Full Developer',
    description: 'Header + typing + stats + skills + activity + trophy',
    tags: ['Animated', 'Complete'],
    widgets: ['stats', 'languages', 'streak', 'trophy', 'typingSvg', 'skillIcons', 'activityGraph'],
    alignment: 'center' as const,
  },
  {
    id: 'opensource',
    name: 'Open Source',
    description: 'Focus on contribution stats + streak + snake',
    tags: ['Contributions', 'Animated'],
    widgets: ['stats', 'streak', 'snake', 'activityGraph'],
    alignment: 'center' as const,
  },
  {
    id: 'frontend',
    name: 'Frontend Dev',
    description: 'Typing header + skill icons (frontend) + stats',
    tags: ['Frontend', 'Skills'],
    widgets: ['typingSvg', 'skillIcons', 'stats', 'languages'],
    alignment: 'center' as const,
  },
  {
    id: 'backend',
    name: 'Backend Engineer',
    description: 'Stats + wakatime + activity graph + langs',
    tags: ['Backend', 'Stats-focused'],
    widgets: ['stats', 'languages', 'wakatime', 'activityGraph'],
    alignment: 'left' as const,
  },
  {
    id: 'datascience',
    name: 'Data Scientist',
    description: 'WakaTime + languages + activity + quote',
    tags: ['Data', 'Academic'],
    widgets: ['stats', 'languages', 'wakatime', 'activityGraph', 'devQuote'],
    alignment: 'left' as const,
  },
  {
    id: 'devops',
    name: 'DevOps Engineer',
    description: 'Snake + activity + stats + skill icons (devops)',
    tags: ['DevOps', 'Animated'],
    widgets: ['snake', 'activityGraph', 'stats', 'skillIcons'],
    alignment: 'center' as const,
  },
  {
    id: 'creative',
    name: 'Creative Dev',
    description: 'Animated banner + typing + skills + spotify + joke',
    tags: ['Creative', 'Fun'],
    widgets: ['typingSvg', 'skillIcons', 'stats', 'joke', 'spotify'],
    alignment: 'center' as const,
  },
];

// ─── Types ───────────────────────────────────────────────────────────────
interface WidgetConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'stats' | 'visual' | 'social' | 'activity' | 'fun' | 'setup';
  hasLivePreview: boolean;
}

interface ProfileBuilderProps {
  addons?: Addon[];
}

// ─── Toggle Switch ───────────────────────────────────────────────────────
function Toggle({ checked, onChange, size = 'md' }: { checked: boolean; onChange: (v: boolean) => void; size?: 'sm' | 'md' }) {
  const w = size === 'sm' ? 'w-8' : 'w-10';
  const h = size === 'sm' ? 'h-4' : 'h-5';
  const dot = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3';
  const onPos = size === 'sm' ? 'left-4.5' : 'left-6';
  return (
    <div
      onClick={(e) => { e.stopPropagation(); onChange(!checked); }}
      className={cn(w, h, "rounded-full relative transition-all duration-300 cursor-pointer shrink-0", checked ? "bg-[[var(--accent-primary)]]" : "bg-[[var(--border-default)]]")}
    >
      <div className={cn("absolute top-0.5 bg-white rounded-full transition-all duration-300", dot, checked ? onPos : "left-1")} />
    </div>
  );
}

// ─── Section label ───────────────────────────────────────────────────────
function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4 px-1">
      <span className="text-[[var(--accent-primary)]]">{icon}</span>
      <h2 className="text-sm font-bold uppercase tracking-widest text-[[var(--text-secondary)]]">{label}</h2>
    </div>
  );
}

// ─── Color picker preset ─────────────────────────────────────────────────
function ColorPresetPicker({ value, onChange, colors = COLOR_PRESETS }: { value: string; onChange: (v: string) => void; colors?: { name: string; hex: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map(c => (
        <button
          key={c.name}
          onClick={() => onChange(c.hex.replace('#', ''))}
          className={cn(
            "w-6 h-6 rounded-full border-2 transition-all hover:scale-110",
            value === c.hex.replace('#', '') ? "border-white scale-110" : "border-transparent"
          )}
          style={{ backgroundColor: c.hex }}
          title={c.name}
        />
      ))}
    </div>
  );
}

// ─── Small select ────────────────────────────────────────────────────────
function Select({ value, onChange, options, label }: { value: string; onChange: (v: string) => void; options: string[]; label?: string }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-medium text-[[var(--text-secondary)]]">{label}</label>}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-[[var(--bg-deep)]] border border-[[var(--border-default)]] rounded-lg px-3 py-2 text-sm text-[[var(--text-primary)]] outline-none focus:border-[[var(--accent-primary)]]/50 transition-colors"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ─── Input ───────────────────────────────────────────────────────────────
function TextInput({ value, onChange, label, placeholder, note }: { value: string; onChange: (v: string) => void; label?: string; placeholder?: string; note?: string }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-medium text-[[var(--text-secondary)]]">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[[var(--bg-deep)]] border border-[[var(--border-default)]] rounded-lg px-3 py-2 text-sm text-[[var(--text-primary)]] outline-none focus:border-[[var(--accent-primary)]]/50 transition-colors placeholder:text-[[var(--text-muted)]]"
      />
      {note && <p className="text-[9px] text-[[var(--text-muted)]]">{note}</p>}
    </div>
  );
}

// ─── Slider ──────────────────────────────────────────────────────────────
function Slider({ value, onChange, min, max, label }: { value: number; onChange: (v: number) => void; min: number; max: number; label?: string }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-medium text-[[var(--text-secondary)]]">{label}: {value}</label>}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-[[var(--accent-primary)]] h-1.5"
      />
    </div>
  );
}

// ─── Code block with copy ────────────────────────────────────────────────
function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [c, setC] = useState(false);
  const copy = () => { navigator.clipboard.writeText(code); setC(true); setTimeout(() => setC(false), 2000); };
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-medium text-[[var(--text-secondary)]]">{label}</label>}
      <div className="relative group">
        <pre className="bg-[[var(--bg-deep)]] border border-[[var(--border-default)]] rounded-lg p-3 text-xs font-mono text-[[var(--text-secondary)]] overflow-x-auto custom-scrollbar max-h-60">
          {code}
        </pre>
        <button
          onClick={copy}
          className="absolute top-2 right-2 p-1.5 rounded-md bg-[[var(--bg-surface)]] hover:bg-[[var(--border-default)]] text-[[var(--text-secondary)]] opacity-0 group-hover:opacity-100 transition-all"
        >
          {c ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
}

// ─── Widget card in sidebar ──────────────────────────────────────────────
function WidgetCard({
  widget, enabled, isActive,
  onToggle, onClick, children
}: {
  widget: WidgetConfig; enabled: boolean; isActive: boolean;
  onToggle: () => void; onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div
        onClick={onClick}
        className={cn(
          "flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all duration-300",
          enabled ? "bg-[#161b33] border-[[var(--accent-primary)]]/30" : "bg-[#0e0e1c] border-[rgba(255,255,255,0.07)]",
          "hover:shadow-[0_0_20px_rgba(255,94,26,0.1)] hover:border-[[var(--accent-primary)]]/20"
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center transition-colors shrink-0 text-sm",
            enabled ? "bg-[[var(--accent-primary)]] text-white" : "bg-[[var(--bg-surface)]] text-[[var(--text-secondary)]]"
          )}>
            {widget.icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white text-sm truncate">{widget.name}</h3>
            <p className="text-[10px] text-[[var(--text-secondary)]] truncate">{widget.description}</p>
          </div>
        </div>
        <Toggle checked={enabled} onChange={onToggle} />
      </div>

      <AnimatePresence>
        {isActive && enabled && children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 mt-1 bg-[#121225] border border-[rgba(255,255,255,0.07)] rounded-xl space-y-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function ProfileBuilder({ addons = [] }: ProfileBuilderProps) {
  const [username, setUsername] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeWidget, setActiveWidget] = useState<string | null>('stats');
  const [activeTab, setActiveTab] = useState<'builder' | 'templates'>('builder');
  const [zoom, setZoom] = useState(100);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [alignment, setAlignment] = useState<'center' | 'left' | 'mixed'>('center');
  const [sidebarCategory, setSidebarCategory] = useState<string>('all');

  // ─── Widget enabled states ─────────────────────────────────────────────
  const [widgetStates, setWidgetStates] = useState<Record<string, { enabled: boolean; options: Record<string, any> }>>({
    // Existing widgets
    stats: { enabled: true, options: { theme: 'radical', hide_border: false, count_private: true, show_icons: true } },
    languages: { enabled: true, options: { theme: 'radical', layout: 'compact', hide_border: false } },
    streak: { enabled: false, options: { theme: 'radical', hide_border: false } },
    // New widgets
    trophy: { enabled: false, options: { theme: 'radical', no_frame: false, no_bg: false, row: 1, column: 6 } },
    visitorBadge: { enabled: false, options: { leftText: 'visitors', leftColor: '6c757d', rightColor: 'ff5e1a', style: 'flat' } },
    typingSvg: { enabled: false, options: { lines: 'Hi 👋;Full Stack Developer;Open Source Enthusiast;Welcome to my profile!', font: 'Fira+Code', size: 22, color: 'F75C7E', center: true, width: 435, pause: 1000 } },
    skillIcons: { enabled: false, options: { icons: ['js', 'ts', 'react', 'nodejs', 'python', 'docker', 'git'], theme: 'dark', perline: 10 } },
    activityGraph: { enabled: false, options: { theme: 'react-dark', hide_border: false, area: true, title: '' } },
    devQuote: { enabled: false, options: { type: 'horizontal', theme: 'dark' } },
    wakatime: { enabled: false, options: { wakaUser: '', theme: 'radical', hide_border: false, layout: 'compact', langs_count: 10 } },
    snake: { enabled: false, options: {} },
    spotify: { enabled: false, options: {} },
    streakAlt: { enabled: false, options: { theme: 'radical', hide_border: false, border_radius: 4, date_format: 'M j[, Y]', mode: 'daily' } },
    profileViews: { enabled: false, options: { color: 'ff5e1a', style: 'flat', label: 'Profile Views' } },
    joke: { enabled: false, options: { theme: 'dark', qColor: '00d4ff', aColor: 'ff5e1a' } },
    summaryCards: { enabled: false, options: { theme: 'github_dark', utcOffset: 0, showAll: true } },
    metrics: { enabled: false, options: {} },
  });

  // ─── Header section state ──────────────────────────────────────────────
  const [headerEnabled, setHeaderEnabled] = useState(false);
  const [headerOptions, setHeaderOptions] = useState({
    capsuleType: 'waving',
    capsuleColor: 'gradient',
    capsuleHeight: 200,
    capsuleText: '',
    capsuleFontSize: 40,
    capsuleFontColor: 'ffffff',
    capsuleAnimation: 'fadeIn',
    greeting: '',
    aboutMe: '',
    socialLinkedin: '',
    socialTwitter: '',
    socialEmail: '',
    socialPortfolio: '',
    workingOn: '',
    learning: '',
    funFact: '',
    footerEnabled: false,
  });

  // ─── Load from localStorage ────────────────────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pb_widgetStates');
      if (saved) setWidgetStates(JSON.parse(saved));
      const savedHeader = localStorage.getItem('pb_headerOptions');
      if (savedHeader) setHeaderOptions(JSON.parse(savedHeader));
      const savedHeaderEnabled = localStorage.getItem('pb_headerEnabled');
      if (savedHeaderEnabled) setHeaderEnabled(JSON.parse(savedHeaderEnabled));
      const savedUsername = localStorage.getItem('pb_username');
      if (savedUsername) setUsername(savedUsername);
      const savedAlignment = localStorage.getItem('pb_alignment');
      if (savedAlignment) setAlignment(savedAlignment as any);
    } catch { }
  }, []);

  // ─── Save to localStorage ─────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('pb_widgetStates', JSON.stringify(widgetStates));
  }, [widgetStates]);
  useEffect(() => {
    localStorage.setItem('pb_headerOptions', JSON.stringify(headerOptions));
  }, [headerOptions]);
  useEffect(() => {
    localStorage.setItem('pb_headerEnabled', JSON.stringify(headerEnabled));
  }, [headerEnabled]);
  useEffect(() => {
    if (username) localStorage.setItem('pb_username', username);
  }, [username]);
  useEffect(() => {
    localStorage.setItem('pb_alignment', alignment);
  }, [alignment]);

  // ─── Widget definitions ────────────────────────────────────────────────
  const WIDGET_DEFS: WidgetConfig[] = [
    { id: 'stats', name: 'GitHub Stats', description: 'Overall statistics', icon: <BarChart3 className="w-4 h-4" />, category: 'stats', hasLivePreview: true },
    { id: 'languages', name: 'Top Languages', description: 'Most used languages', icon: <Languages className="w-4 h-4" />, category: 'stats', hasLivePreview: true },
    { id: 'streak', name: 'Streak Stats', description: 'Contribution streaks', icon: <Zap className="w-4 h-4" />, category: 'stats', hasLivePreview: true },
    { id: 'trophy', name: 'GitHub Trophies', description: 'Achievement trophies', icon: <Trophy className="w-4 h-4" />, category: 'stats', hasLivePreview: true },
    { id: 'visitorBadge', name: 'Visitor Counter', description: 'Profile visitor badge', icon: <Eye className="w-4 h-4" />, category: 'social', hasLivePreview: true },
    { id: 'typingSvg', name: 'Animated Typing', description: 'Typing text animation', icon: <Keyboard className="w-4 h-4" />, category: 'visual', hasLivePreview: true },
    { id: 'skillIcons', name: 'Tech Stack', description: 'Technology skill icons', icon: <Monitor className="w-4 h-4" />, category: 'visual', hasLivePreview: true },
    { id: 'activityGraph', name: 'Activity Graph', description: 'Contribution graph', icon: <Activity className="w-4 h-4" />, category: 'activity', hasLivePreview: true },
    { id: 'devQuote', name: 'Dev Quote', description: 'Inspirational quotes', icon: <Quote className="w-4 h-4" />, category: 'fun', hasLivePreview: true },
    { id: 'wakatime', name: 'WakaTime Stats', description: 'Coding time stats', icon: <Clock className="w-4 h-4" />, category: 'stats', hasLivePreview: true },
    { id: 'snake', name: 'Snake Contributions', description: 'Animated snake — viral!', icon: <span className="text-sm">🐍</span>, category: 'setup', hasLivePreview: false },
    { id: 'spotify', name: 'Spotify Now Playing', description: 'Live music on profile', icon: <Music className="w-4 h-4" />, category: 'setup', hasLivePreview: false },
    { id: 'streakAlt', name: 'DemoLab Streak', description: 'Alternative streak stats', icon: <Flame className="w-4 h-4" />, category: 'stats', hasLivePreview: true },
    { id: 'profileViews', name: 'Profile Views (komarev)', description: 'Classic view counter', icon: <BarChart className="w-4 h-4" />, category: 'social', hasLivePreview: true },
    { id: 'joke', name: 'Programming Jokes', description: 'Random dev jokes', icon: <Laugh className="w-4 h-4" />, category: 'fun', hasLivePreview: true },
    { id: 'summaryCards', name: 'Profile Summary Cards', description: '5 beautiful cards', icon: <FolderKanban className="w-4 h-4" />, category: 'stats', hasLivePreview: true },
    { id: 'metrics', name: 'GitHub Metrics', description: 'Advanced metrics', icon: <LineChart className="w-4 h-4" />, category: 'setup', hasLivePreview: false },
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'stats', label: 'Stats' },
    { id: 'visual', label: 'Visual' },
    { id: 'activity', label: 'Activity' },
    { id: 'social', label: 'Social' },
    { id: 'fun', label: 'Fun' },
    { id: 'setup', label: 'Setup Required' },
  ];

  const filteredWidgets = sidebarCategory === 'all'
    ? WIDGET_DEFS
    : WIDGET_DEFS.filter(w => w.category === sidebarCategory);

  // ─── Helpers ───────────────────────────────────────────────────────────
  const user = username || 'username';

  const toggleWidget = (id: string) => {
    setWidgetStates(prev => ({
      ...prev,
      [id]: { ...prev[id], enabled: !prev[id].enabled }
    }));
  };

  const updateOption = (widgetId: string, key: string, value: any) => {
    setWidgetStates(prev => ({
      ...prev,
      [widgetId]: { ...prev[widgetId], options: { ...prev[widgetId].options, [key]: value } }
    }));
  };

  const updateHeader = (key: string, value: any) => {
    setHeaderOptions(prev => ({ ...prev, [key]: value }));
  };

  // ─── URL builders ─────────────────────────────────────────────────────
  const getWidgetUrl = (id: string): string => {
    const o = widgetStates[id]?.options || {};
    switch (id) {
      case 'stats': return `https://github-readme-stats.vercel.app/api?username=${user}&show_icons=${o.show_icons}&theme=${o.theme}&hide_border=${o.hide_border}&count_private=${o.count_private}`;
      case 'languages': return `https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=${o.layout}&theme=${o.theme}&hide_border=${o.hide_border}`;
      case 'streak': return `https://github-readme-streak-stats.herokuapp.com/?user=${user}&theme=${o.theme}&hide_border=${o.hide_border}`;
      case 'trophy': return `https://github-profile-trophy.vercel.app/?username=${user}&theme=${o.theme}&no-frame=${o.no_frame}&no-bg=${o.no_bg}&margin-w=4&row=${o.row}&column=${o.column}`;
      case 'visitorBadge': return `https://visitor-badge.laobi.icu/badge?page_id=${user}.${user}&left_color=%23${o.leftColor}&right_color=%23${o.rightColor}&left_text=${encodeURIComponent(o.leftText)}`;
      case 'typingSvg': {
        const lines = (o.lines || '').replace(/{username}/g, user).split(';').map((l: string) => encodeURIComponent(l.trim())).join(';');
        return `https://readme-typing-svg.demolab.com?font=${o.font}&size=${o.size}&pause=${o.pause}&color=${o.color}&center=${o.center}&vCenter=true&width=${o.width}&lines=${lines}`;
      }
      case 'skillIcons': return `https://skillicons.dev/icons?i=${(o.icons || []).join(',')}&theme=${o.theme}&perline=${o.perline}`;
      case 'activityGraph': {
        const title = o.title || `${user}'s GitHub Activity`;
        return `https://github-readme-activity-graph.vercel.app/graph?username=${user}&theme=${o.theme}&hide_border=${o.hide_border}&area=${o.area}&custom_title=${encodeURIComponent(title)}`;
      }
      case 'devQuote': return `https://quotes-github-profile.vercel.app/api?type=${o.type}&theme=${o.theme}`;
      case 'wakatime': return `https://github-readme-stats.vercel.app/api/wakatime?username=${o.wakaUser || user}&theme=${o.theme}&hide_border=${o.hide_border}&layout=${o.layout}&langs_count=${o.langs_count}`;
      case 'streakAlt': return `https://streak-stats.demolab.com/?user=${user}&theme=${o.theme}&hide_border=${o.hide_border}&border_radius=${o.border_radius}&date_format=${encodeURIComponent(o.date_format)}&mode=${o.mode}`;
      case 'profileViews': return `https://komarev.com/ghpvc/?username=${user}&color=${o.color}&style=${o.style}&label=${encodeURIComponent(o.label)}`;
      case 'joke': return `https://readme-jokes.vercel.app/api?theme=${o.theme}&qColor=%23${o.qColor}&aColor=%23${o.aColor}`;
      default: return '';
    }
  };

  const getSummaryCardUrls = (): string[] => {
    const o = widgetStates.summaryCards?.options || {};
    const base = 'https://github-profile-summary-cards.vercel.app/api/cards/';
    return [
      `${base}profile-details?username=${user}&theme=${o.theme}`,
      `${base}repos-per-language?username=${user}&theme=${o.theme}`,
      `${base}most-commit-language?username=${user}&theme=${o.theme}`,
      `${base}stats?username=${user}&theme=${o.theme}`,
      `${base}productive-time?username=${user}&theme=${o.theme}&utcOffset=${o.utcOffset}`,
    ];
  };

  // ─── Markdown generation ──────────────────────────────────────────────
  const generatedMarkdown = useMemo(() => {
    if (!username) return '<!-- Enter your username to generate markdown -->';

    const sections: string[] = [];
    const wrap = (md: string) => alignment === 'center' ? `<div align="center">\n\n${md}\n\n</div>` : md;

    // Header
    if (headerEnabled) {
      const h = headerOptions;
      if (h.capsuleText || h.capsuleType !== 'waving') {
        const text = h.capsuleText || username;
        sections.push(`![header](https://capsule-render.vercel.app/api?type=${h.capsuleType}&color=${h.capsuleColor}&height=${h.capsuleHeight}&section=header&text=${encodeURIComponent(text)}&fontSize=${h.capsuleFontSize}&fontColor=${h.capsuleFontColor}&animation=${h.capsuleAnimation})`);
      }
      if (h.greeting) sections.push(`\n${h.greeting}\n`);
      if (h.aboutMe) {
        const bullets = h.aboutMe.split('\n').filter(Boolean).map(l => `- ${l}`).join('\n');
        sections.push(bullets);
      }
      const socialBadges: string[] = [];
      if (h.socialLinkedin) socialBadges.push(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/${h.socialLinkedin})`);
      if (h.socialTwitter) socialBadges.push(`[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${h.socialTwitter})`);
      if (h.socialEmail) socialBadges.push(`[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${h.socialEmail})`);
      if (h.socialPortfolio) socialBadges.push(`[![Portfolio](https://img.shields.io/badge/Portfolio-ff5e1a?style=for-the-badge&logo=google-chrome&logoColor=white)](${h.socialPortfolio})`);
      if (socialBadges.length) sections.push(socialBadges.join(' '));

      const aboutItems: string[] = [];
      if (h.workingOn) aboutItems.push(`🔭 I'm currently working on **${h.workingOn}**`);
      if (h.learning) aboutItems.push(`🌱 I'm currently learning **${h.learning}**`);
      if (h.funFact) aboutItems.push(`⚡ Fun fact: **${h.funFact}**`);
      if (aboutItems.length) sections.push(aboutItems.join('\n\n'));
    }

    // Widgets
    const enabledWidgets = WIDGET_DEFS.filter(w => widgetStates[w.id]?.enabled);
    for (const w of enabledWidgets) {
      switch (w.id) {
        case 'stats': sections.push(`![${user}'s GitHub stats](${getWidgetUrl('stats')})`); break;
        case 'languages': sections.push(`![Top Langs](${getWidgetUrl('languages')})`); break;
        case 'streak': sections.push(`![GitHub Streak](${getWidgetUrl('streak')})`); break;
        case 'trophy': sections.push(`![Trophy](${getWidgetUrl('trophy')})`); break;
        case 'visitorBadge': sections.push(`![Visitors](${getWidgetUrl('visitorBadge')})`); break;
        case 'typingSvg': sections.push(`[![Typing SVG](${getWidgetUrl('typingSvg')})](https://git.io/typing-svg)`); break;
        case 'skillIcons': sections.push(`![Skills](${getWidgetUrl('skillIcons')})`); break;
        case 'activityGraph': sections.push(`![Activity Graph](${getWidgetUrl('activityGraph')})`); break;
        case 'devQuote': sections.push(`![Dev Quote](${getWidgetUrl('devQuote')})`); break;
        case 'wakatime': sections.push(`![WakaTime](${getWidgetUrl('wakatime')})`); break;
        case 'snake': sections.push(`![Snake animation](https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake-dark.svg)`); break;
        case 'spotify': sections.push(`![Spotify](https://novatorem-eight-phi.vercel.app/api/spotify)`); break;
        case 'streakAlt': sections.push(`![Streak](${getWidgetUrl('streakAlt')})`); break;
        case 'profileViews': sections.push(`![Profile Views](${getWidgetUrl('profileViews')})`); break;
        case 'joke': sections.push(`![Jokes Card](${getWidgetUrl('joke')})`); break;
        case 'summaryCards': {
          const urls = getSummaryCardUrls();
          sections.push(urls.map((u, i) => `![Summary Card ${i + 1}](${u})`).join('\n\n'));
          break;
        }
        case 'metrics': sections.push(`![Metrics](https://metrics.lecoq.io/${user}?template=classic&config.timezone=America%2FNew_York)`); break;
      }
    }

    // Footer
    if (headerEnabled && headerOptions.footerEnabled) {
      sections.push(`![footer](https://capsule-render.vercel.app/api?type=${headerOptions.capsuleType}&color=${headerOptions.capsuleColor}&height=100&section=footer)`);
    }

    const md = sections.join('\n\n');
    return alignment === 'center' ? `<div align="center">\n\n${md}\n\n</div>` : md;
  }, [username, widgetStates, headerEnabled, headerOptions, alignment]);

  // ─── Copy handler ─────────────────────────────────────────────────────
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ─── Download handler ─────────────────────────────────────────────────
  const handleDownload = () => {
    const blob = new Blob([generatedMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── Template loader ──────────────────────────────────────────────────
  const loadTemplate = (template: typeof PROFILE_TEMPLATES[0]) => {
    setWidgetStates(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => { next[k] = { ...next[k], enabled: false }; });
      template.widgets.forEach(wId => {
        if (next[wId]) next[wId] = { ...next[wId], enabled: true };
      });
      return next;
    });
    setAlignment(template.alignment);
    setActiveTab('builder');
  };

  // ─── Preview image refresh key ─────────────────────────────────────────
  const [refreshKey, setRefreshKey] = useState(0);

  // ─── Device width ─────────────────────────────────────────────────────
  const previewWidth = deviceMode === 'desktop' ? '100%' : deviceMode === 'tablet' ? '768px' : '375px';

  // ─── Skill icon picker state ──────────────────────────────────────────
  const [skillSearch, setSkillSearch] = useState('');

  // ─── Render Options Panel for each widget ──────────────────────────────
  const renderWidgetOptions = (id: string) => {
    const o = widgetStates[id]?.options || {};
    switch (id) {
      case 'stats':
        return (
          <>
            <Select label="Theme" value={o.theme} onChange={v => updateOption(id, 'theme', v)} options={THEMES} />
            <div className="grid grid-cols-2 gap-3">
              {['hide_border', 'count_private', 'show_icons'].map(key => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <Toggle size="sm" checked={o[key]} onChange={v => updateOption(id, key, v)} />
                  <span className="text-xs text-[[var(--text-secondary)]] capitalize">{key.replace(/_/g, ' ')}</span>
                </label>
              ))}
            </div>
          </>
        );
      case 'languages':
        return (
          <>
            <Select label="Theme" value={o.theme} onChange={v => updateOption(id, 'theme', v)} options={THEMES} />
            <Select label="Layout" value={o.layout} onChange={v => updateOption(id, 'layout', v)} options={['compact', 'normal', 'donut', 'donut-vertical', 'pie']} />
            <label className="flex items-center gap-2 cursor-pointer">
              <Toggle size="sm" checked={o.hide_border} onChange={v => updateOption(id, 'hide_border', v)} />
              <span className="text-xs text-[[var(--text-secondary)]]">Hide border</span>
            </label>
          </>
        );
      case 'streak':
        return (
          <>
            <Select label="Theme" value={o.theme} onChange={v => updateOption(id, 'theme', v)} options={THEMES} />
            <label className="flex items-center gap-2 cursor-pointer">
              <Toggle size="sm" checked={o.hide_border} onChange={v => updateOption(id, 'hide_border', v)} />
              <span className="text-xs text-[[var(--text-secondary)]]">Hide border</span>
            </label>
          </>
        );
      case 'trophy':
        return (
          <>
            <Select label="Theme" value={o.theme} onChange={v => updateOption(id, 'theme', v)} options={TROPHY_THEMES} />
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <Toggle size="sm" checked={o.no_frame} onChange={v => updateOption(id, 'no_frame', v)} />
                <span className="text-xs text-[[var(--text-secondary)]]">No frame</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Toggle size="sm" checked={o.no_bg} onChange={v => updateOption(id, 'no_bg', v)} />
                <span className="text-xs text-[[var(--text-secondary)]]">No background</span>
              </label>
            </div>
            <Select label="Rows" value={String(o.row)} onChange={v => updateOption(id, 'row', Number(v))} options={['1', '2', '3']} />
            <Select label="Columns" value={String(o.column)} onChange={v => updateOption(id, 'column', Number(v))} options={['3', '4', '5', '6']} />
          </>
        );
      case 'visitorBadge':
        return (
          <>
            <TextInput label="Left text" value={o.leftText} onChange={v => updateOption(id, 'leftText', v)} placeholder="visitors" />
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[[var(--text-secondary)]]">Left color</label>
              <ColorPresetPicker value={o.leftColor} onChange={v => updateOption(id, 'leftColor', v)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[[var(--text-secondary)]]">Right color</label>
              <ColorPresetPicker value={o.rightColor} onChange={v => updateOption(id, 'rightColor', v)} />
            </div>
            <Select label="Style" value={o.style} onChange={v => updateOption(id, 'style', v)} options={['flat', 'flat-square', 'for-the-badge', 'plastic']} />
          </>
        );
      case 'typingSvg':
        return (
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[[var(--text-secondary)]]">Lines (separate with ;)</label>
              <textarea
                value={o.lines}
                onChange={e => updateOption(id, 'lines', e.target.value)}
                placeholder="Hi 👋;Developer;Open Source"
                rows={3}
                className="w-full bg-[[var(--bg-deep)]] border border-[[var(--border-default)]] rounded-lg px-3 py-2 text-sm text-[[var(--text-primary)]] outline-none focus:border-[[var(--accent-primary)]]/50 resize-none"
              />
              <p className="text-[9px] text-[[var(--text-muted)]]">Use {'{username}'} for dynamic name. Max 5 lines.</p>
            </div>
            <Select label="Font" value={o.font} onChange={v => updateOption(id, 'font', v)} options={FONTS} />
            <Slider label="Size" value={o.size} onChange={v => updateOption(id, 'size', v)} min={14} max={32} />
            <TextInput label="Color (hex)" value={o.color} onChange={v => updateOption(id, 'color', v)} placeholder="F75C7E" />
            <label className="flex items-center gap-2 cursor-pointer">
              <Toggle size="sm" checked={o.center} onChange={v => updateOption(id, 'center', v)} />
              <span className="text-xs text-[[var(--text-secondary)]]">Center align</span>
            </label>
            <Slider label="Width" value={o.width} onChange={v => updateOption(id, 'width', v)} min={300} max={800} />
            <Select label="Pause" value={String(o.pause)} onChange={v => updateOption(id, 'pause', Number(v))} options={['500', '1000', '2000', '3000']} />
          </>
        );
      case 'skillIcons': {
        const selectedIcons: string[] = o.icons || [];
        return (
          <>
            <TextInput label="Search icons" value={skillSearch} onChange={setSkillSearch} placeholder="Search..." />
            <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-3">
              {Object.entries(SKILL_CATEGORIES).map(([cat, icons]) => {
                const filtered = icons.filter(i => !skillSearch || i.includes(skillSearch.toLowerCase()));
                if (!filtered.length) return null;
                return (
                  <div key={cat}>
                    <p className="text-[10px] text-[[var(--accent-primary)]] font-bold uppercase mb-1.5">{cat}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {filtered.map(icon => {
                        const selected = selectedIcons.includes(icon);
                        return (
                          <button
                            key={icon}
                            onClick={() => {
                              const next = selected
                                ? selectedIcons.filter(i => i !== icon)
                                : [...selectedIcons, icon];
                              updateOption(id, 'icons', next);
                            }}
                            className={cn(
                              "px-2 py-1 rounded text-[10px] font-mono border transition-all",
                              selected
                                ? "bg-[[var(--accent-primary)]]/20 border-[[var(--accent-primary)]]/50 text-[[var(--accent-primary)]]"
                                : "bg-[#0e0e1c] border-[[var(--border-default)]] text-[[var(--text-secondary)]] hover:border-[[var(--text-muted)]]"
                            )}
                          >
                            {icon}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            {selectedIcons.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[[var(--text-secondary)]]">Selected ({selectedIcons.length})</label>
                <div className="flex flex-wrap gap-1">
                  {selectedIcons.map(icon => (
                    <span key={icon} className="flex items-center gap-1 px-2 py-0.5 bg-[[var(--accent-primary)]]/10 border border-[[var(--accent-primary)]]/30 rounded text-[10px] text-[[var(--accent-primary)]]">
                      {icon}
                      <X className="w-2.5 h-2.5 cursor-pointer hover:text-white" onClick={() => updateOption(id, 'icons', selectedIcons.filter(i => i !== icon))} />
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <Toggle size="sm" checked={o.theme === 'dark'} onChange={v => updateOption(id, 'theme', v ? 'dark' : 'light')} />
                <span className="text-xs text-[[var(--text-secondary)]]">Dark theme</span>
              </label>
            </div>
            <Slider label="Per line" value={o.perline} onChange={v => updateOption(id, 'perline', v)} min={5} max={20} />
          </>
        );
      }
      case 'activityGraph':
        return (
          <>
            <Select label="Theme" value={o.theme} onChange={v => updateOption(id, 'theme', v)} options={ACTIVITY_THEMES} />
            <TextInput label="Custom title" value={o.title} onChange={v => updateOption(id, 'title', v)} placeholder={`${user}'s GitHub Activity`} />
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <Toggle size="sm" checked={o.hide_border} onChange={v => updateOption(id, 'hide_border', v)} />
                <span className="text-xs text-[[var(--text-secondary)]]">Hide border</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Toggle size="sm" checked={o.area} onChange={v => updateOption(id, 'area', v)} />
                <span className="text-xs text-[[var(--text-secondary)]]">Area fill</span>
              </label>
            </div>
          </>
        );
      case 'devQuote':
        return (
          <>
            <Select label="Layout" value={o.type} onChange={v => updateOption(id, 'type', v)} options={['horizontal', 'vertical']} />
            <Select label="Theme" value={o.theme} onChange={v => updateOption(id, 'theme', v)} options={QUOTE_THEMES} />
          </>
        );
      case 'wakatime':
        return (
          <>
            <TextInput label="WakaTime username" value={o.wakaUser} onChange={v => updateOption(id, 'wakaUser', v)} placeholder="your-wakatime-user" note="Requires a free WakaTime account → wakatime.com" />
            <Select label="Theme" value={o.theme} onChange={v => updateOption(id, 'theme', v)} options={THEMES} />
            <Select label="Layout" value={o.layout} onChange={v => updateOption(id, 'layout', v)} options={['default', 'compact']} />
            <label className="flex items-center gap-2 cursor-pointer">
              <Toggle size="sm" checked={o.hide_border} onChange={v => updateOption(id, 'hide_border', v)} />
              <span className="text-xs text-[[var(--text-secondary)]]">Hide border</span>
            </label>
            <Slider label="Languages count" value={o.langs_count} onChange={v => updateOption(id, 'langs_count', v)} min={5} max={15} />
          </>
        );
      case 'snake':
        return (
          <div className="space-y-4">
            <div className="p-3 bg-[[var(--accent-primary)]]/5 border border-[[var(--accent-primary)]]/20 rounded-lg">
              <p className="text-xs text-[[var(--text-primary)]] mb-2"><span className="text-[[var(--accent-primary)]] font-bold">⚡ Note:</span> This widget requires GitHub Actions to generate.</p>
              <ol className="text-[10px] text-[[var(--text-secondary)]] space-y-1 list-decimal list-inside">
                <li>Create <code className="text-[[var(--accent-primary)]]">.github/workflows/</code> folder in profile repo</li>
                <li>Create <code className="text-[[var(--accent-primary)]]">snake.yml</code> with workflow below</li>
                <li>Enable GitHub Actions in your repo</li>
                <li>Add the image markdown to your README</li>
              </ol>
            </div>
            <CodeBlock label="snake.yml (GitHub Actions)" code={SNAKE_YAML} />
            <CodeBlock label="README markdown" code={`![Snake animation](https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake-dark.svg)`} />
          </div>
        );
      case 'spotify':
        return (
          <div className="space-y-4">
            <div className="p-3 bg-[#1DB954]/10 border border-[#1DB954]/20 rounded-lg">
              <p className="text-xs text-[[var(--text-primary)]] mb-2"><span className="text-[#1DB954] font-bold">🎵 Spotify Integration</span></p>
              <p className="text-[10px] text-[[var(--text-secondary)]] mb-3">Display your current Spotify track on your GitHub profile. Requires backend setup.</p>
              <div className="space-y-2">
                <p className="text-[10px] text-[[var(--accent-primary)]] font-bold">Recommended: novatorem (free hosting)</p>
                <ol className="text-[10px] text-[[var(--text-secondary)]] space-y-1 list-decimal list-inside">
                  <li>Fork <a href="https://github.com/novatorem/novatorem" target="_blank" className="text-[#58a6ff] underline">novatorem/novatorem</a></li>
                  <li>Deploy to Vercel with Spotify API credentials</li>
                  <li>Add the image to your README</li>
                </ol>
              </div>
            </div>
            <CodeBlock label="README markdown" code={`![Spotify](https://novatorem-eight-phi.vercel.app/api/spotify)`} />
          </div>
        );
      case 'streakAlt':
        return (
          <>
            <Select label="Theme" value={o.theme} onChange={v => updateOption(id, 'theme', v)} options={STREAK_ALT_THEMES} />
            <label className="flex items-center gap-2 cursor-pointer">
              <Toggle size="sm" checked={o.hide_border} onChange={v => updateOption(id, 'hide_border', v)} />
              <span className="text-xs text-[[var(--text-secondary)]]">Hide border</span>
            </label>
            <Slider label="Border radius" value={o.border_radius} onChange={v => updateOption(id, 'border_radius', v)} min={0} max={20} />
            <Select label="Date format" value={o.date_format} onChange={v => updateOption(id, 'date_format', v)} options={['M j[, Y]', 'j M[, Y]', 'M j', 'j M', 'd F Y', 'd.m.Y']} />
            <Select label="Mode" value={o.mode} onChange={v => updateOption(id, 'mode', v)} options={['daily', 'weekly']} />
          </>
        );
      case 'profileViews':
        return (
          <>
            <Select label="Color" value={o.color} onChange={v => updateOption(id, 'color', v)} options={BADGE_COLORS} />
            <Select label="Style" value={o.style} onChange={v => updateOption(id, 'style', v)} options={['flat', 'flat-square', 'plastic', 'for-the-badge']} />
            <TextInput label="Label" value={o.label} onChange={v => updateOption(id, 'label', v)} placeholder="Profile Views" />
          </>
        );
      case 'joke':
        return (
          <>
            <Select label="Theme" value={o.theme} onChange={v => updateOption(id, 'theme', v)} options={JOKE_THEMES} />
            <TextInput label="Question color (hex)" value={o.qColor} onChange={v => updateOption(id, 'qColor', v)} placeholder="00d4ff" />
            <TextInput label="Answer color (hex)" value={o.aColor} onChange={v => updateOption(id, 'aColor', v)} placeholder="ff5e1a" />
          </>
        );
      case 'summaryCards':
        return (
          <>
            <Select label="Theme" value={o.theme} onChange={v => updateOption(id, 'theme', v)} options={SUMMARY_THEMES} />
            <Select label="UTC Offset" value={String(o.utcOffset)} onChange={v => updateOption(id, 'utcOffset', Number(v))} options={Array.from({ length: 27 }, (_, i) => String(i - 12))} />
          </>
        );
      case 'metrics':
        return (
          <div className="space-y-4">
            <div className="p-3 bg-[[var(--accent-primary)]]/5 border border-[[var(--accent-primary)]]/20 rounded-lg">
              <p className="text-xs text-[[var(--text-primary)]] mb-2"><span className="text-[[var(--accent-primary)]] font-bold">📉 GitHub Metrics</span></p>
              <p className="text-[10px] text-[[var(--text-secondary)]] mb-3">Advanced GitHub metrics showing habits, achievements, and repository analysis. Requires GitHub Actions.</p>
              <ol className="text-[10px] text-[[var(--text-secondary)]] space-y-1 list-decimal list-inside">
                <li>Create a GitHub Actions workflow</li>
                <li>Add METRICS_TOKEN secret to your repo</li>
                <li>The action generates an SVG on schedule</li>
              </ol>
            </div>
            <CodeBlock label="GitHub Actions Workflow" code={`name: Metrics
on:
  schedule: [{cron: "0 0 * * *"}]
  workflow_dispatch:
jobs:
  github-metrics:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: lowlighter/metrics@latest
        with:
          token: \${{ secrets.METRICS_TOKEN }}
          user: ${user}
          template: classic
          base: header, activity, community, repositories`} />
            <CodeBlock label="README markdown" code={`![Metrics](https://metrics.lecoq.io/${user}?template=classic)`} />
          </div>
        );
      default: return null;
    }
  };

  // ─── Render preview for each widget ────────────────────────────────────
  const renderWidgetPreview = (id: string) => {
    if (!widgetStates[id]?.enabled) return null;
    const url = getWidgetUrl(id);

    // Setup widgets
    if (id === 'snake' || id === 'spotify' || id === 'metrics') {
      const labels: Record<string, string> = {
        snake: '🐍 Snake Contribution Animation',
        spotify: '🎵 Spotify Now Playing',
        metrics: '📉 GitHub Metrics',
      };
      return (
        <div className="w-full p-6 rounded-lg border border-dashed border-[[var(--border-default)]] bg-[#0a0a18] flex flex-col items-center justify-center text-center gap-2">
          <p className="text-sm font-semibold text-white">{labels[id]}</p>
          <p className="text-[10px] text-[[var(--text-muted)]]">Requires setup — see widget config for instructions</p>
        </div>
      );
    }

    // Summary cards
    if (id === 'summaryCards') {
      return (
        <div className="w-full space-y-3">
          {getSummaryCardUrls().map((cardUrl, i) => (
            <img
              key={`${cardUrl}-${refreshKey}`}
              src={cardUrl}
              alt={`Summary Card ${i + 1}`}
              className="w-full h-auto rounded-lg border border-[rgba(255,255,255,0.05)]"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          ))}
        </div>
      );
    }

    if (!url) return null;
    return (
      <img
        key={`${url}-${refreshKey}`}
        src={url}
        alt={WIDGET_DEFS.find(w => w.id === id)?.name || id}
        className="w-full h-auto rounded-lg border border-[rgba(255,255,255,0.05)]"
        onError={(e) => {
          const el = e.target as HTMLImageElement;
          el.style.opacity = '0.3';
          el.alt = 'Failed to load widget';
        }}
      />
    );
  };

  // ─── Character count ──────────────────────────────────────────────────
  const charCount = generatedMarkdown.length;
  const sizeKB = (new Blob([generatedMarkdown]).size / 1024).toFixed(1);

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[[var(--bg-deep)]] text-[[var(--text-primary)]] font-inter">
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 lg:px-6 py-4 lg:py-8">

        {/* ─── Title ──────────────────────────────────────────────────── */}
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-6 lg:h-8 bg-[[var(--accent-primary)]] rounded-full" />
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">GitHub Profile Builder</h1>
          </div>
          <p className="text-[[var(--text-secondary)]] text-base lg:text-lg">Build your perfect GitHub profile README with live preview</p>
        </div>

        {/* ─── Tab bar: Builder | Templates ───────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['builder', 'templates'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
                activeTab === tab
                  ? "bg-[[var(--accent-primary)]] text-white shadow-lg shadow-[[var(--accent-primary)]]/20"
                  : "bg-[#0e0e1c] text-[[var(--text-secondary)]] hover:text-white border border-[rgba(255,255,255,0.07)]"
              )}
            >
              {tab === 'builder' ? '🔧 Builder' : '📋 Templates'}
            </button>
          ))}
        </div>

        {/* ═══ TEMPLATES TAB ═════════════════════════════════════════════ */}
        {activeTab === 'templates' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
              {PROFILE_TEMPLATES.map(t => (
                <div key={t.id} className="bg-[#0e0e1c] border border-[rgba(255,255,255,0.07)] rounded-xl p-4 sm:p-5 hover:border-[[var(--accent-primary)]]/30 transition-all group">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[[var(--accent-primary)]]" />
                    <h3 className="font-bold text-white text-sm">{t.name}</h3>
                  </div>
                  <p className="text-[11px] text-[[var(--text-secondary)]] mb-3 line-clamp-2">{t.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {t.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-[[var(--accent-primary)]]/10 text-[[var(--accent-primary)]] rounded text-[9px] font-medium">{tag}</span>
                    ))}
                  </div>
                  <div className="text-[10px] text-[[var(--text-muted)]] mb-3">
                    {t.widgets.length} widgets: {t.widgets.join(', ')}
                  </div>
                  <button
                    onClick={() => loadTemplate(t)}
                    className="w-full py-2 bg-[[var(--accent-primary)]]/10 hover:bg-[[var(--accent-primary)]] text-[[var(--accent-primary)]] hover:text-white rounded-lg text-xs font-semibold transition-all"
                  >
                    Use Template
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ═══ BUILDER TAB ═══════════════════════════════════════════════ */}
        {activeTab === 'builder' && (
          <>
            {/* ─── Username Input ──────────────────────────────────────── */}
            <Card hover={false} className="mb-4 sm:mb-6 p-1 bg-[#0e0e1c] border-[rgba(255,255,255,0.07)] shadow-2xl">
              <div className="relative group">
                <User className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[[var(--text-secondary)]] group-focus-within:text-[[var(--accent-primary)]] transition-colors" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your GitHub username..."
                  className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-4 sm:py-5 bg-transparent text-lg sm:text-xl text-white placeholder:text-[[var(--text-muted)]] outline-none transition-all"
                />
              </div>
            </Card>

            {/* ─── Quick Presets ────────────────────────────────────────── */}
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
              {PROFILE_TEMPLATES.map(t => (
                <button
                  key={t.id}
                  onClick={() => loadTemplate(t)}
                  className="px-3 py-1.5 rounded-full bg-[#0e0e1c] border border-[rgba(255,255,255,0.07)] text-[11px] text-[[var(--text-secondary)]] hover:text-[[var(--accent-primary)]] hover:border-[[var(--accent-primary)]]/30 transition-all"
                >
                  {t.name}
                </button>
              ))}
            </div>

            {/* ─── Three Column Layout ─────────────────────────────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">

              {/* ═══ LEFT: Widget Configurator ════════════════════════════ */}
              <div className="xl:col-span-2 space-y-3 order-2 xl:order-1">

                {/* Category filter - improved scrolling */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSidebarCategory(cat.id)}
                      className={cn(
                        "px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all whitespace-nowrap",
                        sidebarCategory === cat.id
                          ? "bg-[[var(--accent-primary)]] text-white"
                          : "bg-[#0e0e1c] text-[[var(--text-secondary)]] hover:text-white border border-[rgba(255,255,255,0.07)]"
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* ─── Profile Header Section ──────────────────────────── */}
                <div className="space-y-2">
                  <div
                    onClick={() => setActiveWidget(activeWidget === 'header' ? null : 'header')}
                    className={cn(
                      "flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all duration-300",
                      headerEnabled ? "bg-[#1a1540] border-purple-500/30" : "bg-[#0e0e1c] border-[rgba(255,255,255,0.07)]",
                      "hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", headerEnabled ? "bg-purple-600 text-white" : "bg-[[var(--bg-surface)]] text-[[var(--text-secondary)]]")}>
                        <Image className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">Profile Header</h3>
                        <p className="text-[10px] text-[[var(--text-secondary)]]">Banner, greeting, socials</p>
                      </div>
                    </div>
                    <Toggle checked={headerEnabled} onChange={setHeaderEnabled} />
                  </div>

                  <AnimatePresence>
                    {activeWidget === 'header' && headerEnabled && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="p-4 mt-1 bg-[#121225] border border-[rgba(255,255,255,0.07)] rounded-xl space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar">
                          <p className="text-[10px] text-[[var(--accent-primary)]] font-bold uppercase">Capsule Render Banner</p>
                          <Select label="Type" value={headerOptions.capsuleType} onChange={v => updateHeader('capsuleType', v)} options={CAPSULE_TYPES} />
                          <TextInput label="Color" value={headerOptions.capsuleColor} onChange={v => updateHeader('capsuleColor', v)} placeholder="gradient, auto, hex" />
                          <Slider label="Height" value={headerOptions.capsuleHeight} onChange={v => updateHeader('capsuleHeight', v)} min={100} max={300} />
                          <TextInput label="Text" value={headerOptions.capsuleText} onChange={v => updateHeader('capsuleText', v)} placeholder={username || 'Your Name'} />
                          <Slider label="Font size" value={headerOptions.capsuleFontSize} onChange={v => updateHeader('capsuleFontSize', v)} min={16} max={60} />
                          <TextInput label="Font color (hex)" value={headerOptions.capsuleFontColor} onChange={v => updateHeader('capsuleFontColor', v)} placeholder="ffffff" />
                          <Select label="Animation" value={headerOptions.capsuleAnimation} onChange={v => updateHeader('capsuleAnimation', v)} options={CAPSULE_ANIMATIONS} />

                          <hr className="border-[[var(--border-default)]]" />
                          <p className="text-[10px] text-[[var(--accent-primary)]] font-bold uppercase">About Section</p>
                          <TextInput label="Greeting line" value={headerOptions.greeting} onChange={v => updateHeader('greeting', v)} placeholder="# Hi there 👋" />
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-[[var(--text-secondary)]]">About me (one bullet per line)</label>
                            <textarea
                              value={headerOptions.aboutMe}
                              onChange={e => updateHeader('aboutMe', e.target.value)}
                              rows={3}
                              placeholder="Full Stack Developer&#10;Open source contributor&#10;Coffee lover"
                              className="w-full bg-[[var(--bg-deep)]] border border-[[var(--border-default)]] rounded-lg px-3 py-2 text-sm text-[[var(--text-primary)]] outline-none focus:border-[[var(--accent-primary)]]/50 resize-none"
                            />
                          </div>

                          <hr className="border-[[var(--border-default)]]" />
                          <p className="text-[10px] text-[[var(--accent-primary)]] font-bold uppercase">Social Links</p>
                          <TextInput label="LinkedIn username" value={headerOptions.socialLinkedin} onChange={v => updateHeader('socialLinkedin', v)} placeholder="johndoe" />
                          <TextInput label="Twitter/X handle" value={headerOptions.socialTwitter} onChange={v => updateHeader('socialTwitter', v)} placeholder="johndoe" />
                          <TextInput label="Email" value={headerOptions.socialEmail} onChange={v => updateHeader('socialEmail', v)} placeholder="you@mail.com" />
                          <TextInput label="Portfolio URL" value={headerOptions.socialPortfolio} onChange={v => updateHeader('socialPortfolio', v)} placeholder="https://yoursite.com" />

                          <hr className="border-[[var(--border-default)]]" />
                          <p className="text-[10px] text-[[var(--accent-primary)]] font-bold uppercase">Quick Info</p>
                          <TextInput label="🔭 Working on" value={headerOptions.workingOn} onChange={v => updateHeader('workingOn', v)} placeholder="My awesome project" />
                          <TextInput label="🌱 Learning" value={headerOptions.learning} onChange={v => updateHeader('learning', v)} placeholder="Rust, GraphQL" />
                          <TextInput label="⚡ Fun fact" value={headerOptions.funFact} onChange={v => updateHeader('funFact', v)} placeholder="I love coffee" />

                          <hr className="border-[[var(--border-default)]]" />
                          <label className="flex items-center gap-2 cursor-pointer">
                            <Toggle size="sm" checked={headerOptions.footerEnabled} onChange={v => updateHeader('footerEnabled', v)} />
                            <span className="text-xs text-[[var(--text-secondary)]]">Add footer banner</span>
                          </label>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ─── Widget List ─────────────────────────────────────── */}
                <SectionLabel icon={<Settings className="w-4 h-4" />} label="Widgets" />
                <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
                  {filteredWidgets.map(widget => (
                    <WidgetCard
                      key={widget.id}
                      widget={widget}
                      enabled={widgetStates[widget.id]?.enabled || false}
                      isActive={activeWidget === widget.id}
                      onToggle={() => toggleWidget(widget.id)}
                      onClick={() => setActiveWidget(activeWidget === widget.id ? null : widget.id)}
                    >
                      {renderWidgetOptions(widget.id)}
                    </WidgetCard>
                  ))}
                </div>
              </div>

              {/* ═══ CENTER: Live Preview ═════════════════════════════════ */}
              <div className="xl:col-span-7 space-y-3 order-1 xl:order-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                  {/* Highlighted Live Preview label - MORE PROMINENT */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-[[var(--accent-primary)]]/20 to-[[var(--accent-primary)]]/5 border-2 border-[[var(--accent-primary)]]/50 px-4 py-2 rounded-xl shadow-lg shadow-[[var(--accent-primary)]]/15">
                      <Eye className="w-5 h-5 text-[[var(--accent-primary)]]" />
                      <span className="text-base font-bold text-white tracking-wide">Live Preview</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] animate-pulse shadow-[0_0_8px_rgba(39,201,63,0.6)]" title="Live" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {/* Device mode */}
                    {[
                      { mode: 'desktop' as const, icon: <Monitor className="w-3.5 h-3.5" /> },
                      { mode: 'tablet' as const, icon: <Tablet className="w-3.5 h-3.5" /> },
                      { mode: 'mobile' as const, icon: <Smartphone className="w-3.5 h-3.5" /> },
                    ].map(d => (
                      <button
                        key={d.mode}
                        onClick={() => setDeviceMode(d.mode)}
                        className={cn("p-1.5 rounded transition-all", deviceMode === d.mode ? "bg-[[var(--accent-primary)]] text-white" : "text-[[var(--text-muted)]] hover:text-[[var(--text-secondary)]]")}
                      >
                        {d.icon}
                      </button>
                    ))}
                    <div className="w-px h-4 bg-[[var(--border-default)]] mx-1" />
                    {/* Zoom */}
                    <button onClick={() => setZoom(Math.max(50, zoom - 25))} className="p-1 text-[[var(--text-muted)]] hover:text-white"><ZoomOut className="w-3.5 h-3.5" /></button>
                    <span className="text-[10px] text-[[var(--text-secondary)]] w-8 text-center">{zoom}%</span>
                    <button onClick={() => setZoom(Math.min(125, zoom + 25))} className="p-1 text-[[var(--text-muted)]] hover:text-white"><ZoomIn className="w-3.5 h-3.5" /></button>
                    <div className="w-px h-4 bg-[[var(--border-default)]] mx-1" />
                    <button onClick={() => setRefreshKey(k => k + 1)} className="p-1.5 rounded text-[[var(--text-muted)]] hover:text-[[var(--accent-primary)]] transition-colors" title="Refresh all">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* GitHub-style frame — ENHANCED glowing focal point */}
                <div className="rounded-2xl overflow-hidden border-2 border-[[var(--accent-primary)]]/40 shadow-[0_0_0_1px_rgba(255,94,26,0.2),0_0_80px_rgba(255,94,26,0.2),0_0_120px_rgba(255,94,26,0.1),0_25px_80px_rgba(0,0,0,0.6)] ring-2 ring-[[var(--accent-primary)]]/20 bg-[[var(--bg-primary)]] relative flex flex-col h-full">
                  {/* Corner accent highlights */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[[var(--accent-primary)]]/30 to-transparent rounded-bl-2xl pointer-events-none" />
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[[var(--accent-primary)]]/30 to-transparent rounded-br-2xl pointer-events-none" />
                  {/* Browser chrome - fills width, shrinks to fit content */}
                  <div className="bg-[[var(--bg-surface)]] px-4 py-2.5 flex items-center gap-3 border-b border-[[var(--accent-primary)]]/15 shrink-0">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex-1 bg-[[var(--bg-primary)]] border border-[rgba(255,94,26,0.12)] rounded-md px-3 py-1 text-[11px] text-[[var(--text-secondary)]] font-mono truncate">
                      github.com/{user}
                    </div>
                  </div>

                  {/* Preview content - flex-1 to fill remaining space, handles overflow */}
                  <div
                    className="flex-1 bg-[[var(--bg-primary)]] p-4 sm:p-6 overflow-auto custom-scrollbar"
                    style={{ maxHeight: 'calc(100vh - 200px)' }}
                  >
                    <div
                      style={{
                        width: zoom > 100 ? previewWidth : undefined,
                        maxWidth: zoom <= 100 ? '100%' : undefined,
                        transform: zoom <= 100 ? `scale(${zoom / 100})` : undefined,
                        transformOrigin: 'top center',
                      }}
                      className={zoom > 100 ? "inline-block" : "mx-auto space-y-5 flex flex-col items-center"}
                    >
                      {!username ? (
                        <div className="flex flex-col items-center justify-center h-full text-center mt-20">
                          <div className="w-16 h-16 rounded-full bg-[[var(--bg-surface)]] flex items-center justify-center mb-4">
                            <MousePointer2 className="w-8 h-8 text-[[var(--text-muted)]] animate-bounce" />
                          </div>
                          <h3 className="text-white font-semibold mb-1">Waiting for username</h3>
                          <p className="text-[[var(--text-secondary)]] text-sm max-w-[200px]">Enter your GitHub username to see the magic happen.</p>
                        </div>
                      ) : (
                        <>
                          {/* Header preview */}
                          {headerEnabled && (
                            <>
                              {headerOptions.capsuleText && (
                                <img
                                  src={`https://capsule-render.vercel.app/api?type=${headerOptions.capsuleType}&color=${headerOptions.capsuleColor}&height=${headerOptions.capsuleHeight}&section=header&text=${encodeURIComponent(headerOptions.capsuleText || user)}&fontSize=${headerOptions.capsuleFontSize}&fontColor=${headerOptions.capsuleFontColor}&animation=${headerOptions.capsuleAnimation}`}
                                  alt="Header banner"
                                  className="w-full rounded-lg"
                                />
                              )}
                              {headerOptions.greeting && (
                                <p className="text-white text-2xl font-bold text-center">{headerOptions.greeting.replace(/^#+\s*/, '')}</p>
                              )}
                              {headerOptions.aboutMe && (
                                <div className="text-sm text-[[var(--text-secondary)]] text-center">
                                  {headerOptions.aboutMe.split('\n').filter(Boolean).map((l, i) => (
                                    <p key={i}>• {l}</p>
                                  ))}
                                </div>
                              )}
                              {(headerOptions.socialLinkedin || headerOptions.socialTwitter || headerOptions.socialEmail || headerOptions.socialPortfolio) && (
                                <div className="flex flex-wrap gap-2 justify-center">
                                  {headerOptions.socialLinkedin && <img src={`https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white`} alt="LinkedIn" className="h-7" />}
                                  {headerOptions.socialTwitter && <img src={`https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white`} alt="Twitter" className="h-7" />}
                                  {headerOptions.socialEmail && <img src={`https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white`} alt="Email" className="h-7" />}
                                  {headerOptions.socialPortfolio && <img src={`https://img.shields.io/badge/Portfolio-ff5e1a?style=for-the-badge&logo=google--chrome&logoColor=white`} alt="Portfolio" className="h-7" />}
                                </div>
                              )}
                              {(headerOptions.workingOn || headerOptions.learning || headerOptions.funFact) && (
                                <div className="text-sm text-[[var(--text-secondary)]] space-y-1">
                                  {headerOptions.workingOn && <p>🔭 I'm currently working on <strong className="text-white">{headerOptions.workingOn}</strong></p>}
                                  {headerOptions.learning && <p>🌱 I'm currently learning <strong className="text-white">{headerOptions.learning}</strong></p>}
                                  {headerOptions.funFact && <p>⚡ Fun fact: <strong className="text-white">{headerOptions.funFact}</strong></p>}
                                </div>
                              )}
                            </>
                          )}

                          {/* Widget previews */}
                          {WIDGET_DEFS.filter(w => widgetStates[w.id]?.enabled).map(widget => (
                            <motion.div
                              key={widget.id}
                              initial={{ scale: 0.95, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="w-full rounded-lg overflow-hidden"
                            >
                              {renderWidgetPreview(widget.id)}
                            </motion.div>
                          ))}

                          {/* Footer */}
                          {headerEnabled && headerOptions.footerEnabled && (
                            <img
                              src={`https://capsule-render.vercel.app/api?type=${headerOptions.capsuleType}&color=${headerOptions.capsuleColor}&height=100&section=footer`}
                              alt="Footer"
                              className="w-full rounded-lg"
                            />
                          )}

                          {/* No widgets message */}
                          {WIDGET_DEFS.filter(w => widgetStates[w.id]?.enabled).length === 0 && !headerEnabled && (
                            <div className="text-center py-20 text-[[var(--text-muted)]]">
                              <p>No widgets enabled. Toggle widgets on the left panel.</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ═══ RIGHT: Markdown Output ═══════════════════════════════ */}
              <div className="xl:col-span-3 space-y-3 order-3">
                <div className="flex items-center justify-between mb-2">
                  <SectionLabel icon={<Code className="w-4 h-4" />} label="Markdown Code" />
                  <div className="flex items-center gap-1.5">
                    {(['center', 'left', 'mixed'] as const).map(a => (
                      <button
                        key={a}
                        onClick={() => setAlignment(a)}
                        className={cn("px-2 py-1 rounded text-[10px] font-medium transition-all", alignment === a ? "bg-[[var(--accent-primary)]] text-white" : "text-[[var(--text-muted)]] hover:text-[[var(--text-secondary)]]")}
                      >
                        {a.charAt(0).toUpperCase() + a.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <Card hover={false} className="bg-[#0e0e1c] border-[rgba(255,255,255,0.07)] p-0 overflow-hidden flex flex-col" style={{ minHeight: '500px', maxHeight: 'calc(85vh - 100px)' }}>
                  {/* Code window chrome */}
                  <div className="p-3 bg-[[var(--bg-surface)]]/50 border-b border-[rgba(255,255,255,0.07)] flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      <span className="text-[10px] text-[[var(--text-muted)]] ml-2 font-mono">README.md</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[[var(--text-muted)]]">
                      <span>{charCount} chars</span>
                      <span>·</span>
                      <span>{sizeKB} KB</span>
                    </div>
                  </div>

                  {/* Code content */}
                  <textarea
                    readOnly
                    value={generatedMarkdown}
                    className="flex-1 bg-transparent p-5 font-mono text-xs text-[[var(--text-secondary)]] resize-none outline-none leading-relaxed custom-scrollbar"
                  />

                  {/* Actions */}
                  <div className="p-3 bg-[[var(--bg-surface)]]/30 border-t border-[rgba(255,255,255,0.07)] space-y-2 shrink-0">
                    {/* Copy button */}
                    <button
                      onClick={handleCopy}
                      className={cn(
                        "w-full py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2",
                        copied
                          ? "bg-[#27c93f]/20 text-[#27c93f] border border-[#27c93f]/30"
                          : "bg-[[var(--accent-primary)]] text-white hover:bg-[#ff4500] shadow-lg shadow-[[var(--accent-primary)]]/20"
                      )}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied to Clipboard!' : 'Copy All Markdown'}
                    </button>

                    {/* Secondary actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={handleDownload}
                        className="flex-1 py-2 rounded-lg text-xs font-medium bg-[[var(--bg-surface)]] text-[[var(--text-primary)]] hover:bg-[[var(--border-default)]] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download .md
                      </button>
                      {username && (
                        <a
                          href={`https://github.com/${username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 rounded-lg text-xs font-medium bg-[[var(--bg-surface)]] text-[[var(--text-primary)]] hover:bg-[[var(--border-default)]] transition-colors flex items-center justify-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Open Profile
                        </a>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex items-start gap-2 pt-1">
                      <Info className="w-3.5 h-3.5 text-[[var(--accent-primary)]] mt-0.5 shrink-0" />
                      <p className="text-[10px] text-[[var(--text-secondary)]]">
                        Paste this markdown into your GitHub Profile README.md file to display your stats.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}
