import { type ConversionType } from './types';

/**
 * Utility functions for text processing
 */
const textUtils = {
  capitalize: (str: string): string => 
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),

  clean: (text: string): string => 
    text.replace(/\s+/g, ' ').replace(/,\s*/g, ', ').trim(),

  splitSentences: (text: string): string[] => {
    const sentences = text.split(/(?<=[.!?])\s+/);
    return sentences.map(s => textUtils.clean(s)).filter(Boolean);
  },

  formatList: (items: string[]): string => {
    if (!items.length) return '';
    return items.map(item => `- ${textUtils.capitalize(item.trim())}`).join('\n');
  },

  detectBulletPoints: (text: string): string[] => {
    return text.split('\n')
      .map(line => line.trim())
      .filter(line => /^[-*•]\s*/.test(line))
      .map(line => line.replace(/^[-*•]\s*/, ''));
  }
};

/**
 * README Converter
 */
function convertToREADME(text: string): string {
  let output = '';

  // Title
  const titleMatch = text.match(/(?:called|named|project)\s+([A-Z][a-zA-Z0-9\-_]+)/i);
  const projectName = titleMatch ? titleMatch[1] : 'My Project';
  output += `# ${projectName}\n\n`;

  // Description
  const descriptionMatch = text.match(/(?:is a|it's a|this is)\s+([^.]+)/i);
  if (descriptionMatch) {
    output += `${textUtils.capitalize(descriptionMatch[1].trim())}.\n\n`;
  } else {
    output += `${textUtils.splitSentences(text)[0] || 'Project description goes here.'}\n\n`;
  }

  // Features
  const featureMatch = text.match(/(?:features?|capabilities?|functions?)\s*:?\s*([^.]+(?:\s+and\s+[^.]+)?)/i);
  if (featureMatch) {
    output += `## Features\n\n`;
    const featureList = featureMatch[1].split(/\s+and\s+|\s*,\s*/).filter(Boolean);
    output += textUtils.formatList(featureList);
    output += '\n\n';
  } else {
    const sentences = textUtils.splitSentences(text);
    const featureKeywords = ['can', 'allows', 'supports', 'enables', 'provides'];
    const inferredFeatures = sentences.filter(s =>
      featureKeywords.some(k => s.toLowerCase().includes(k))
    );
    if (inferredFeatures.length) {
      output += `## Features\n\n${textUtils.formatList(inferredFeatures)}\n\n`;
    }
  }

  // Tech Stack
  const techMatch = text.match(/(?:built with|uses|using|tech stack)\s+([^.]+)/i);
  if (techMatch) {
    output += `## Tech Stack\n\n`;
    const techList = techMatch[1].split(/\s+and\s+|\s*,\s*/).filter(Boolean);
    output += textUtils.formatList(techList);
    output += '\n\n';
  }

  // Installation
  const installMatch = text.match(/(?:install|installation|setup)\s*:?\s*([^.]+)/i);
  if (installMatch) {
    output += `## Installation\n\n\`\`\`bash\n${installMatch[1].trim()}\n\`\`\`\n\n`;
  }

  // Usage
  const usageMatch = text.match(/(?:usage|use)\s*:?\s*([^.]+)/i);
  if (usageMatch) {
    output += `## Usage\n\n${textUtils.capitalize(usageMatch[1].trim())}\n\n`;
  }

  // License
  const licenseMatch = text.match(/license\s*:?\s*([^\s.]+)/i);
  if (licenseMatch) {
    output += `## License\n\n${licenseMatch[1].toUpperCase()} License\n`;
  }

  return output.trim();
}

/**
 * Pull Request Converter
 */
function convertToPR(text: string): string {
  let output = '';

  output += '## Summary\n\n';
  const summaryMatch = text.match(/(?:fixed|added|updated|changed)\s+([^.]+)/i);
  output += `${textUtils.capitalize(summaryMatch ? summaryMatch[1].trim() : textUtils.splitSentences(text)[0])}.\n\n`;

  output += '## Changes Made\n\n';
  const changes = text.match(/(?:also|and|additionally)\s+([^.]+(?:\s+and\s+[^.]+)?)/gi);
  if (changes) {
    const changeList = changes.map(c => c.replace(/^(?:also|and|additionally)\s+/i, '').replace(/\.$/, ''));
    output += textUtils.formatList(changeList);
  } else {
    const sentences = textUtils.splitSentences(text);
    const changeList = sentences.filter(s =>
      !s.toLowerCase().includes('test') && !s.toLowerCase().includes('breaking')
    );
    output += textUtils.formatList(changeList);
  }
  output += '\n\n';

  if (text.toLowerCase().includes('test')) {
    output += '## Testing\n\n- [x] Tested on local environment\n- [ ] CI/CD passes\n\n';
  }

  if (text.toLowerCase().includes('breaking')) {
    output += '## Breaking Changes\n\n⚠️ This PR contains breaking changes.\n\n';
  }

  output += '## Checklist\n\n';
  output += '- [ ] Code follows project conventions\n';
  output += '- [ ] Tests pass locally\n';
  output += '- [ ] Documentation updated\n';

  return output.trim();
}

/**
 * Issue Converter
 */
function convertToIssue(text: string): string {
  let output = '';
  const isBug = /crash|bug|error|broken|fail|not working/i.test(text);

  if (isBug) {
    output += '## Bug Description\n\n';
    const descMatch = text.match(/(?:when|i try|the app)\s+([^.]+)/i);
    output += `${textUtils.capitalize(descMatch ? descMatch[1] : textUtils.splitSentences(text)[0])}\n\n`;

    output += '## Steps to Reproduce\n\n';
    const stepsMatch = text.match(/(?:steps?:|step|st(?:eps?)?:)\s*([^.]+)/i);
    if (stepsMatch) {
      const stepList = stepsMatch[1].split(/,|and/).map(s => s.trim()).filter(Boolean);
      output += textUtils.formatList(stepList);
    } else {
      output += '1. Open the application\n2. Perform the action\n3. Observe the error\n\n';
    }

    const expectedMatch = text.match(/(?:expected|should)\s+([^.]+)/i);
    const actualMatch = text.match(/(?:actual|but instead|it)\s+([^.]+)/i);
    
    output += `## Expected Behavior\n\n${expectedMatch ? textUtils.capitalize(expectedMatch[1]) : 'Works correctly'}\n\n`;
    output += `## Actual Behavior\n\n${actualMatch ? textUtils.capitalize(actualMatch[1]) : 'An error occurs'}\n\n`;
  } else {
    output += '## Feature Description\n\n';
    output += `${textUtils.capitalize(textUtils.splitSentences(text)[0])}.\n\n`;
    output += '## Proposed Solution\n\n';
    const solutionMatch = text.match(/(?:solution|fix|should|could)\s+([^.]+)/i);
    output += `${solutionMatch ? textUtils.capitalize(solutionMatch[1]) : 'Describe the proposed changes here'}\n\n`;
  }

  return output.trim();
}

/**
 * Release Notes Converter
 */
function convertToRelease(text: string): string {
  let output = '# Release Notes\n\n';
  const versionMatch = text.match(/(?:version|v)?\s*(\d+\.\d+\.\d+)/i);
  output += `## ${versionMatch ? versionMatch[1] : '1.0.0'} (${new Date().toLocaleDateString()})\n\n`;

  const sections: Record<string, string[]> = {
    '🚀 Added': [],
    '🔧 Changed': [],
    '🐛 Fixed': [],
    '🔥 Removed': []
  };

  const keywords: Record<string, string[]> = {
    '🚀 Added': ['added', 'new', 'introduced', 'created'],
    '🔧 Changed': ['improved', 'updated', 'enhanced', 'modified'],
    '🐛 Fixed': ['fix', 'fixed', 'bug', 'resolved', 'solved'],
    '🔥 Removed': ['removed', 'deleted', 'deprecated']
  };

  for (const sentence of textUtils.splitSentences(text)) {
    let matched = false;
    for (const [section, keys] of Object.entries(keywords)) {
      if (keys.some(k => sentence.toLowerCase().includes(k))) {
        sections[section].push(sentence);
        matched = true;
        break;
      }
    }
    if (!matched) sections['🔧 Changed'].push(sentence);
  }

  for (const [section, items] of Object.entries(sections)) {
    if (items.length) {
      output += `### ${section}\n\n${textUtils.formatList(items)}\n\n`;
    }
  }

  return output.trim();
}

/**
 * Main Conversion Function
 */
export async function convertToMarkdown(
  text: string,
  type: ConversionType
): Promise<string> {
  if (!text.trim()) return '';
  const cleanedText = textUtils.clean(text);

  switch (type) {
    case 'README': return convertToREADME(cleanedText);
    case 'PR': return convertToPR(cleanedText);
    case 'ISSUE': return convertToIssue(cleanedText);
    case 'RELEASE': return convertToRelease(cleanedText);
    default:
      // Simplified General/Comment converter
      return `# Generated Output\n\n${textUtils.splitSentences(cleanedText).map(s => textUtils.capitalize(s)).join('.\n\n')}.`;
  }
}
