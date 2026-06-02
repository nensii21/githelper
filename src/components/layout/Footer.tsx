import { Rocket } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-4 py-8 border-t border-zinc-900 text-center">
      <p className="text-xs text-zinc-600">
        <span className="inline-flex items-center gap-1">
          <Rocket className="w-3 h-3" />
          100% Local
        </span>
        <span className="mx-2">•</span>
        Works Offline
        <span className="mx-2">•</span>
        No API Required
      </p>
    </footer>
  );
}
