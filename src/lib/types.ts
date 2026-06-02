export type ConversionType = 'README' | 'PR' | 'ISSUE' | 'COMMENT' | 'RELEASE' | 'GENERAL';
export type AppView = 'home' | 'markdown' | 'badges' | 'workflows' | 'gitmojis' | 'commands' | 'license' | 'emojis' | 'readme' | 'pr' | 'issue' | 'profile-builder';


export interface Feature {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'converter' | 'guide' | 'generator' | 'cheatsheet';
}

export interface GitCommand {
  command: string;
  description: string;
  details: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  example?: string;
}

export interface Badge {
  name: string;
  code: string;
  category: string;
}

export interface Gitmoji {
  emoji: string;
  code: string;
  name: string;
}

export interface Emoji {
  emoji: string;
  code: string;
  name: string;
}

export interface License {
  name: string;
  id: string;
  shortName: string;
  description: string;
  permissions: string[];
  conditions: string[];
  limitations: string[];
  text: string;
}

export interface WorkflowTemplate {
  name: string;
  description: string;
  code: string;
}

export interface MarkdownTemplate {
  name: string;
  description: string;
  content: string;
}

export interface Addon {
  name: string;
  category: string;
  snippet: string;
  previewUrl?: string;
}