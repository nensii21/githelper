import {
  type Feature,
  type GitCommand,
  type Badge,
  type Gitmoji,
  type Emoji,
  type License,
  type WorkflowTemplate,
  type Addon
} from './types';

export const addons: Addon[] = [
  {
    name: 'GitHub Stats',
    category: 'Stats',
    snippet: '![Your GitHub stats](https://github-readme-stats.vercel.app/api?username=YOUR-USERNAME&show_icons=true&theme=radical)'
  },
  {
    name: 'Top Languages',
    category: 'Stats',
    snippet: '![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=YOUR-USERNAME&layout=compact&theme=radical)'
  },
  {
    name: 'Contribution Graph',
    category: 'Stats',
    snippet: '[![GitHub Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=YOUR-USERNAME&theme=react-dark)](https://github.com/ashutosh00710/github-readme-activity-graph)'
  },
  {
    name: 'Profile Trophies',
    category: 'Visual',
    snippet: '[![github-trophy](https://github-profile-trophy.vercel.app/?username=YOUR-USERNAME)](https://github.com/ryo-ma/github-profile-trophy)'
  },
  {
    name: 'Visitor Counter',
    category: 'Utils',
    snippet: '![Visitors](https://komarev.com/ghpvc/?username=YOUR-USERNAME&color=blue)'
  },
  {
    name: 'Skills/Icons',
    category: 'Visual',
    snippet: '<p align="left">\n  <a href="https://skillicons.dev">\n    <img src="https://skillicons.dev/icons?i=js,ts,react,nextjs,tailwind,nodejs,mongodb,git" />\n  </a>\n</p>'
  },
  {
    name: 'Streak Stats',
    category: 'Stats',
    snippet: '![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=YOUR-USERNAME&theme=radical)'
  }
];

export const features: Feature[] = [
  {
    id: 'profile-builder',
    name: 'Profile Builder',
    description: 'Build your perfect GitHub profile README with live widgets',
    icon: 'layout',
    category: 'generator',
  },
  {
    id: 'markdown',
    name: 'Markdown Converter',
    description: 'Transform messy thoughts into clean, structured Markdown',
    icon: 'file-text',
    category: 'converter',
  },
  {
    id: 'readme',
    name: 'README Generator',
    description: 'Create professional GitHub README files with ease',
    icon: 'book-open',
    category: 'generator',
  },
  {
    id: 'pr-template',
    name: 'PR Template',
    description: 'Pull Request templates for better descriptions',
    icon: 'git-pull-request',
    category: 'generator',
  },
  {
    id: 'issue-template',
    name: 'Issue Template',
    description: 'Bug report and feature request templates',
    icon: 'alert-circle',
    category: 'generator',
  },
  {
    id: 'badges',
    name: 'Badge Gallery',
    description: 'Shields.io badges for your projects',
    icon: 'award',
    category: 'guide',
  },
  {
    id: 'workflows',
    name: 'Workflow Examples',
    description: 'GitHub Actions workflow templates',
    icon: 'play',
    category: 'guide',
  },
  {
    id: 'gitmojis',
    name: 'Gitmoji Picker',
    description: 'Emoji commit messages made easy',
    icon: 'smile',
    category: 'cheatsheet',
  },
  {
    id: 'commands',
    name: 'Git Commands',
    description: 'Complete Git command reference with examples',
    icon: 'terminal',
    category: 'cheatsheet',
  },
  {
    id: 'license',
    name: 'License Generator',
    description: 'Generate LICENSE files for your projects',
    icon: 'shield',
    category: 'generator',
  },
  {
    id: 'emojis',
    name: 'Emoji Guide',
    description: 'GitHub-flavored emoji codes',
    icon: 'smile',
    category: 'cheatsheet',
  },
];

export const gitCommands: GitCommand[] = [
  // Basics - Getting Started
  { command: 'git init', description: 'Initialize a new Git repository', details: 'Creates a new .git directory in the current folder. Use --initial-branch to set the default branch name.', category: 'Basics', difficulty: 'Beginner', example: 'git init' },
  { command: 'git clone <url>', description: 'Clone a repository from URL', details: 'Downloads a copy of a remote repository. Includes all files, history, and branches.', category: 'Basics', difficulty: 'Beginner', example: 'git clone https://github.com/user/repo.git' },
  { command: 'git clone <url> <folder>', description: 'Clone into specific folder', details: 'Clone the repository and place it in the specified folder name.', category: 'Basics', difficulty: 'Beginner', example: 'git clone https://github.com/user/repo.git my-folder' },
  { command: 'git status', description: 'Show working tree status', details: 'Displays the state of the working directory and staging area. Shows which files are modified.', category: 'Basics', difficulty: 'Beginner', example: 'git status' },
  { command: 'git add .', description: 'Stage all changes', details: 'Adds all new and modified files to the staging area. Use -A for all files including deletions.', category: 'Basics', difficulty: 'Beginner', example: 'git add .' },
  { command: 'git add <file>', description: 'Stage specific file', details: 'Add a specific file to staging area. Use git reset to unstage.', category: 'Basics', difficulty: 'Beginner', example: 'git add index.js' },
  { command: 'git commit -m "message"', description: 'Commit staged changes', details: 'Records changes from staging area with a message. The message should be descriptive.', category: 'Basics', difficulty: 'Beginner', example: 'git commit -m "Add new feature"' },
  { command: 'git commit -am "message"', description: 'Stage and commit in one step', details: 'Only works for modified files that were previously committed. Does not add new files.', category: 'Basics', difficulty: 'Beginner', example: 'git commit -am "Fix bug"' },
  { command: 'git commit --amend', description: 'Modify last commit', details: 'Replace the tip of the current branch by adding changes to the previous commit.', category: 'Basics', difficulty: 'Intermediate', example: 'git commit --amend -m "New message"' },
  { command: 'git log', description: 'Show commit history', details: 'Displays the commit history. Use --oneline for compact view, --graph for visual branch graph.', category: 'Basics', difficulty: 'Beginner', example: 'git log --oneline --graph' },
  { command: 'git log -n', description: 'Show last n commits', details: 'Display only the last n commits. Useful for recent history.', category: 'Basics', difficulty: 'Beginner', example: 'git log -5' },
  { command: 'git diff', description: 'Show unstaged changes', details: 'Shows differences between working directory and staging area.', category: 'Basics', difficulty: 'Beginner', example: 'git diff' },
  { command: 'git diff --staged', description: 'Show staged changes', details: 'Shows differences between staging area and last commit.', category: 'Basics', difficulty: 'Beginner', example: 'git diff --staged' },
  { command: 'git diff <commit1> <commit2>', description: 'Compare two commits', details: 'Shows differences between two specific commits.', category: 'Basics', difficulty: 'Intermediate', example: 'git diff abc123 def456' },

  // Branching
  { command: 'git branch', description: 'List all branches', details: 'Shows all local branches. Add -r for remote branches, -a for all branches.', category: 'Branching', difficulty: 'Beginner', example: 'git branch -a' },
  { command: 'git branch <name>', description: 'Create new branch', details: 'Creates a new branch at the current commit without switching to it.', category: 'Branching', difficulty: 'Beginner', example: 'git branch feature-login' },
  { command: 'git branch -d <name>', description: 'Delete branch', details: 'Safely deletes a branch. Use -D to force delete unmerged branches.', category: 'Branching', difficulty: 'Beginner', example: 'git branch -d old-feature' },
  { command: 'git branch -m <old> <new>', description: 'Rename branch', details: 'Renames a local branch. Use git push to update remote after rename.', category: 'Branching', difficulty: 'Intermediate', example: 'git branch -m old-name new-name' },
  { command: 'git checkout <branch>', description: 'Switch to branch', details: 'Switches to an existing branch. Discards uncommitted changes.', category: 'Branching', difficulty: 'Beginner', example: 'git checkout main' },
  { command: 'git checkout -b <branch>', description: 'Create and switch branch', details: 'Creates a new branch and switches to it in one command.', category: 'Branching', difficulty: 'Beginner', example: 'git checkout -b new-feature' },
  { command: 'git switch <branch>', description: 'Switch to branch (new)', details: 'Modern way to switch branches. Safer than checkout for Git 2.23+.', category: 'Branching', difficulty: 'Beginner', example: 'git switch main' },
  { command: 'git switch -c <branch>', description: 'Create and switch (new)', details: 'Creates and switches to a new branch. Modern alternative to checkout -b.', category: 'Branching', difficulty: 'Beginner', example: 'git switch -c feature-new' },
  { command: 'git merge <branch>', description: 'Merge branch into current', details: 'Integrates changes from another branch into current branch. May cause conflicts.', category: 'Branching', difficulty: 'Intermediate', example: 'git merge feature-login' },
  { command: 'git merge --no-ff <branch>', description: 'Merge with no fast-forward', details: 'Creates a merge commit even if merge could be fast-forwarded. Preserves branch history.', category: 'Branching', difficulty: 'Intermediate', example: 'git merge --no-ff feature-login' },
  { command: 'git rebase <branch>', description: 'Rebase onto branch', details: 'Reapplies commits on top of another branch. Creates linear history.', category: 'Branching', difficulty: 'Advanced', example: 'git rebase main' },
  { command: 'git rebase -i HEAD~n', description: 'Interactive rebase', details: 'Allows you to edit, reorder, squash, or drop commits in the last n commits.', category: 'Branching', difficulty: 'Advanced', example: 'git rebase -i HEAD~3' },
  { command: 'git cherry-pick <commit>', description: 'Apply specific commit', details: 'Apply changes from a specific commit to current branch.', category: 'Branching', difficulty: 'Advanced', example: 'git cherry-pick abc1234' },
  { command: 'git cherry-pick <start>..<end>', description: 'Pick range of commits', details: 'Apply a range of commits to current branch.', category: 'Branching', difficulty: 'Advanced', example: 'git cherry-pick abc123..def456' },

  // Remote
  { command: 'git remote -v', description: 'List remote repositories', details: 'Shows all remote repositories with their URLs.', category: 'Remote', difficulty: 'Beginner', example: 'git remote -v' },
  { command: 'git remote add <name> <url>', description: 'Add remote repository', details: 'Adds a new remote repository with a name (usually origin).', category: 'Remote', difficulty: 'Beginner', example: 'git remote add origin https://github.com/user/repo.git' },
  { command: 'git remote remove <name>', description: 'Remove remote', details: 'Removes a remote repository and all its tracking branches.', category: 'Remote', difficulty: 'Beginner', example: 'git remote remove origin' },
  { command: 'git fetch', description: 'Download remote changes', details: 'Downloads objects from remote but does not merge them. Updates tracking branches.', category: 'Remote', difficulty: 'Intermediate', example: 'git fetch origin' },
  { command: 'git fetch --all', description: 'Fetch all remotes', details: 'Downloads updates from all configured remote repositories.', category: 'Remote', difficulty: 'Intermediate', example: 'git fetch --all' },
  { command: 'git pull', description: 'Fetch and merge', details: 'Downloads and integrates changes from remote. Equivalent to git fetch + git merge.', category: 'Remote', difficulty: 'Beginner', example: 'git pull origin main' },
  { command: 'git pull --rebase', description: 'Pull with rebase', details: 'Fetches and rebases instead of merging. Creates linear history.', category: 'Remote', difficulty: 'Intermediate', example: 'git pull --rebase origin main' },
  { command: 'git push', description: 'Upload commits to remote', details: 'Uploads local commits to remote repository.', category: 'Remote', difficulty: 'Beginner', example: 'git push origin main' },
  { command: 'git push -u <remote> <branch>', description: 'Push and set upstream', details: 'Sets the upstream branch for subsequent pushes. -u is shorthand for --set-upstream.', category: 'Remote', difficulty: 'Intermediate', example: 'git push -u origin feature-login' },
  { command: 'git push <remote> --delete <branch>', description: 'Delete remote branch', details: 'Removes a branch from the remote repository.', category: 'Remote', difficulty: 'Intermediate', example: 'git push origin --delete old-feature' },
  { command: 'git push --force', description: 'Force push (dangerous)', details: 'Forces push even if it overwrites remote changes. Use with caution!', category: 'Remote', difficulty: 'Advanced', example: 'git push --force' },
  { command: 'git push --force-with-lease', description: 'Safe force push', details: 'Force push but checks that no one else pushed changes. Safer than --force.', category: 'Remote', difficulty: 'Advanced', example: 'git push --force-with-lease' },

  // Undo
  { command: 'git reset HEAD <file>', description: 'Unstage a file', details: 'Removes a file from staging area without changing working directory.', category: 'Undo', difficulty: 'Beginner', example: 'git reset HEAD index.js' },
  { command: 'git reset HEAD~1', description: 'Undo last commit', details: 'Moves HEAD back one commit. Keeps changes in working directory.', category: 'Undo', difficulty: 'Intermediate', example: 'git reset HEAD~1' },
  { command: 'git reset --soft HEAD~1', description: 'Undo commit (keep staged)', details: 'Moves HEAD back but keeps changes staged.', category: 'Undo', difficulty: 'Intermediate', example: 'git reset --soft HEAD~1' },
  { command: 'git reset --hard HEAD~1', description: 'Undo commit (discard changes)', details: 'Completely removes last commit and all changes. DANGEROUS!', category: 'Undo', difficulty: 'Advanced', example: 'git reset --hard HEAD~1' },
  { command: 'git revert <commit>', description: 'Create reverting commit', details: 'Creates a new commit that undoes changes from a specific commit. Safer for shared repos.', category: 'Undo', difficulty: 'Advanced', example: 'git revert abc123' },
  { command: 'git checkout -- <file>', description: 'Discard local changes', details: 'Reverts file to last committed state. Discards all local changes.', category: 'Undo', difficulty: 'Beginner', example: 'git checkout -- index.js' },
  { command: 'git restore <file>', description: 'Restore file (new)', details: 'Modern way to restore file. Git 2.23+ alternative to checkout.', category: 'Undo', difficulty: 'Beginner', example: 'git restore index.js' },
  { command: 'git restore --staged <file>', description: 'Unstage file (new)', details: 'Removes file from staging area using restore command.', category: 'Undo', difficulty: 'Beginner', example: 'git restore --staged index.js' },

  // Stash
  { command: 'git stash', description: 'Temporarily save changes', details: 'Saves uncommitted changes for later. Working directory becomes clean.', category: 'Stash', difficulty: 'Intermediate', example: 'git stash' },
  { command: 'git stash save "message"', description: 'Stash with message', details: 'Saves changes with a descriptive message.', category: 'Stash', difficulty: 'Intermediate', example: 'git stash save "WIP: login feature"' },
  { command: 'git stash list', description: 'List all stashes', details: 'Shows all stashed changesets with their indices.', category: 'Stash', difficulty: 'Intermediate', example: 'git stash list' },
  { command: 'git stash pop', description: 'Apply and remove stash', details: 'Applies most recent stash and removes it from stash list.', category: 'Stash', difficulty: 'Intermediate', example: 'git stash pop' },
  { command: 'git stash apply', description: 'Apply stash (keep stash)', details: 'Applies stash changes without removing from stash list.', category: 'Stash', difficulty: 'Intermediate', example: 'git stash apply stash@{1}' },
  { command: 'git stash drop', description: 'Delete a stash', details: 'Removes a specific stash from the stash list.', category: 'Stash', difficulty: 'Intermediate', example: 'git stash drop stash@{2}' },
  { command: 'git stash clear', description: 'Clear all stashes', details: 'Removes all stashed changesets. Cannot be undone!', category: 'Stash', difficulty: 'Advanced', example: 'git stash clear' },
  { command: 'git stash show -p', description: 'Show stash contents', details: 'Shows the diff of stashed changes.', category: 'Stash', difficulty: 'Intermediate', example: 'git stash show -p' },

  // Tags
  { command: 'git tag', description: 'List all tags', details: 'Shows all tags in the repository.', category: 'Tags', difficulty: 'Beginner', example: 'git tag' },
  { command: 'git tag <name>', description: 'Create lightweight tag', details: 'Creates a tag at current commit without any message.', category: 'Tags', difficulty: 'Beginner', example: 'git tag v1.0.0' },
  { command: 'git tag -a <name> -m "msg"', description: 'Create annotated tag', details: 'Creates a tag with a message. Recommended for releases.', category: 'Tags', difficulty: 'Intermediate', example: 'git tag -a v1.0.0 -m "Release 1.0.0"' },
  { command: 'git tag -a <name> <commit>', description: 'Tag specific commit', details: 'Tags a specific commit (not the current one).', category: 'Tags', difficulty: 'Intermediate', example: 'git tag -a v0.9.0 abc123' },
  { command: 'git push <remote> <tag>', description: 'Push tag to remote', details: 'Uploads a single tag to remote.', category: 'Tags', difficulty: 'Intermediate', example: 'git push origin v1.0.0' },
  { command: 'git push <remote> --tags', description: 'Push all tags', details: 'Uploads all tags to remote.', category: 'Tags', difficulty: 'Intermediate', example: 'git push origin --tags' },
  { command: 'git tag -d <name>', description: 'Delete local tag', details: 'Removes a tag from local repository.', category: 'Tags', difficulty: 'Intermediate', example: 'git tag -d v0.9.0' },
  { command: 'git push <remote> --delete <tag>', description: 'Delete remote tag', details: 'Removes a tag from remote repository.', category: 'Tags', difficulty: 'Intermediate', example: 'git push origin --delete v1.0.0' },

  // Configuration
  { command: 'git config --global user.name', description: 'Set username', details: 'Sets the author name used for commits globally.', category: 'Config', difficulty: 'Beginner', example: 'git config --global user.name "John Doe"' },
  { command: 'git config --global user.email', description: 'Set email', details: 'Sets the author email used for commits globally.', category: 'Config', difficulty: 'Beginner', example: 'git config --global user.email "john@example.com"' },
  { command: 'git config --list', description: 'List all config', details: 'Shows all Git configuration settings.', category: 'Config', difficulty: 'Beginner', example: 'git config --list' },
  { command: 'git config --global alias.<name>', description: 'Create command alias', details: 'Creates a shortcut for frequently used commands.', category: 'Config', difficulty: 'Intermediate', example: 'git config --global alias.st status' },
  { command: 'git config --global core.editor', description: 'Set default editor', details: 'Sets the text editor used for commit messages.', category: 'Config', difficulty: 'Intermediate', example: 'git config --global core.editor "code --wait"' },

  // Advanced
  { command: 'git reflog', description: 'Show reference log', details: 'Shows a log of where HEAD and branch refs have been. Recover lost commits.', category: 'Advanced', difficulty: 'Advanced', example: 'git reflog' },
  { command: 'git reflog show HEAD@{n}', description: 'Show specific reflog', details: 'Shows a specific entry in the reflog.', category: 'Advanced', difficulty: 'Advanced', example: 'git reflog show HEAD@{5}' },
  { command: 'git bisect start', description: 'Start binary search', details: 'Begin the binary search process to find the commit that introduced a bug.', category: 'Advanced', difficulty: 'Advanced', example: 'git bisect start' },
  { command: 'git bisect bad', description: 'Mark current as broken', details: 'Mark the current commit as broken.', category: 'Advanced', difficulty: 'Advanced', example: 'git bisect bad' },
  { command: 'git bisect good <commit>', description: 'Mark known good commit', details: 'Mark a commit that is known to work correctly.', category: 'Advanced', difficulty: 'Advanced', example: 'git bisect good v1.0.0' },
  { command: 'git clean -n', description: 'Preview untracked files', details: 'Shows which untracked files would be removed. -n is dry run.', category: 'Advanced', difficulty: 'Intermediate', example: 'git clean -n' },
  { command: 'git clean -fd', description: 'Remove untracked files', details: 'Removes all untracked files and directories.', category: 'Advanced', difficulty: 'Advanced', example: 'git clean -fd' },
  { command: 'git rm <file>', description: 'Remove file from git', details: 'Removes file from both working directory and staging area.', category: 'Advanced', difficulty: 'Intermediate', example: 'git rm old-file.js' },
  { command: 'git rm --cached <file>', description: 'Untrack file (keep local)', details: 'Removes file from tracking but keeps it in working directory.', category: 'Advanced', difficulty: 'Advanced', example: 'git rm --cached big-file.log' },
  { command: 'git grep "<pattern>"', description: 'Search in codebase', details: 'Search for a pattern in tracked files.', category: 'Advanced', difficulty: 'Intermediate', example: 'git grep "function"' },
  { command: 'git show <commit>', description: 'Show commit details', details: 'Shows the changes in a specific commit.', category: 'Advanced', difficulty: 'Intermediate', example: 'git show abc123' },
  { command: 'git shortlog', description: 'Summary by author', details: 'Shows commit summary grouped by author.', category: 'Advanced', difficulty: 'Intermediate', example: 'git shortlog -sn' },
  { command: 'git archive -o <file>', description: 'Create archive', details: 'Creates a zip or tar archive of the repository.', category: 'Advanced', difficulty: 'Advanced', example: 'git archive -o archive.zip HEAD' },
  { command: 'git worktree add <path> <branch>', description: 'Add worktree', details: 'Allows working on multiple branches simultaneously.', category: 'Advanced', difficulty: 'Advanced', example: 'git worktree add ../my-branch feature-login' },
  { command: 'git worktree list', description: 'List worktrees', details: 'Shows all working trees attached to the repository.', category: 'Advanced', difficulty: 'Advanced', example: 'git worktree list' },
];

export const badges = [
  { name: 'License: MIT', code: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)', category: 'License' },
  { name: 'License: Apache 2.0', code: '[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)', category: 'License' },
  { name: 'License: GPL v3', code: '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0.html)', category: 'License' },
  { name: 'Build Status', code: '[![Build Status](https://travis-ci.org/username/repo.svg?branch=master)](https://travis-ci.org/username/repo)', category: 'Build' },
  { name: 'GitHub Actions', code: '[![GitHub Actions](https://github.com/username/repo/actions/workflows/ci/badge.svg)](https://github.com/username/repo/actions)', category: 'Build' },
  { name: 'Build', code: '[![Build](https://circleci.com/gh/username/repo.svg?style=shield)](https://circleci.com/gh/username/repo)', category: 'Build' },
  { name: 'Version', code: '[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/username/repo)', category: 'Version' },
  { name: 'Package Version', code: '[![npm version](https://img.shields.io/npm/v/package-name.svg)](https://www.npmjs.com/package/package-name)', category: 'Version' },
  { name: 'Downloads', code: '[![Downloads](https://img.shields.io/badge/downloads-1k%2B-green.svg)](https://github.com/username/repo)', category: 'Downloads' },
  { name: 'npm Downloads', code: '[![npm downloads](https://img.shields.io/npm/dm/package-name.svg)](https://www.npmjs.com/package/package-name)', category: 'Downloads' },
  { name: 'Last Commit', code: '[![Last Commit](https://img.shields.io/badge/last%20commit-January-blue.svg)](https://github.com/username/repo)', category: 'Commit' },
  { name: 'Last Release', code: '[![Last Release](https://img.shields.io/github/release/username/repo.svg)](https://github.com/username/repo/releases/latest)', category: 'Commit' },
  { name: 'Contributors', code: '[![Contributors](https://img.shields.io/badge/contributors-10-orange.svg)](https://github.com/username/repo)', category: 'Community' },
  { name: 'Forks', code: '[![Forks](https://img.shields.io/badge/forks-5-blue.svg)](https://github.com/username/repo/fork)', category: 'Community' },
  { name: 'Stars', code: '[![Stars](https://img.shields.io/badge/stars-100%2B-yellow.svg)](https://github.com/username/repo/stargazers)', category: 'Community' },
  { name: 'Watchers', code: '[![Watchers](https://img.shields.io/badge/watchers-3-blue.svg)](https://github.com/username/repo/watchers)', category: 'Community' },
  { name: 'Code Coverage', code: '[![Coverage](https://img.shields.io/badge/coverage-90%25-green.svg)](https://github.com/username/repo)', category: 'Quality' },
  { name: 'CodeFactor', code: '[![CodeFactor](https://img.shields.io/codefactor/grade/github/username/repo)](https://www.codefactor.io/repos/github/username/repo)', category: 'Quality' },
  { name: 'Maintainability', code: '[![Maintainability](https://img.shields.io/codeclimate/maintainability/username/repo)](https://codeclimate.com/github/username/repo)', category: 'Quality' },
  { name: 'Language: TypeScript', code: '[![Language: TypeScript](https://img.shields.io/badge/language-TypeScript-blue.svg)](https://github.com/username/repo)', category: 'Language' },
  { name: 'Language: Python', code: '[![Language: Python](https://img.shields.io/badge/language-Python-blue.svg)](https://github.com/username/repo)', category: 'Language' },
  { name: 'Language: JavaScript', code: '[![Language: JavaScript](https://img.shields.io/badge/language-JavaScript-yellow.svg)](https://github.com/username/repo)', category: 'Language' },
  { name: 'Dependencies', code: '[![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg)](https://github.com/username/repo)', category: 'Dependency' },
  { name: 'Security', code: '[![Security](https://img.shields.io/badge/security-dependabot-blue.svg)](https://github.com/username/repo)', category: 'Dependency' },
  { name: 'Open Source', code: '[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/username/awesome-open-source-contribution)', category: 'Community' },
  { name: 'Premium', code: '[![Premium](https://upload.wikimedia.org/wikipedia/commons/4/43/Geckoboard_Premium_Badge.png)](https://geckoboard.com)', category: 'Other' },
];

export const gitmojis = [
  { emoji: '✨', code: ':sparkles:', name: 'Introduce new features' },
  { emoji: '🐛', code: ':bug:', name: 'Fix a bug' },
  { emoji: '📝', code: ':memo:', name: 'Add or update documentation' },
  { emoji: '🎨', code: ':art:', name: 'Improve structure / format of code' },
  { emoji: '⚡️', code: ':zap:', name: 'Improve performance' },
  { emoji: '🔥', code: ':fire:', name: 'Remove code or files' },
  { emoji: '💄', code: ':lipstick:', name: 'Add or update the UI and style files' },
  { emoji: '♻️', code: ':recycle:', name: 'Refactor code' },
  { emoji: '🔧', code: ':wrench:', name: 'Add or update configuration files' },
  { emoji: '➕', code: ':heavy_plus_sign:', name: 'Add a dependency' },
  { emoji: '➖', code: ':heavy_minus_sign:', name: 'Remove a dependency' },
  { emoji: '🔒', code: ':lock:', name: 'Fix security issues' },
  { emoji: '🚧', code: ':construction:', name: 'Work in progress' },
  { emoji: '✅', code: ':white_check_mark:', name: 'Add or update tests' },
  { emoji: '📦', code: ':package:', name: 'Add or update compiled files or packages' },
  { emoji: '👷', code: ':construction_worker:', name: 'Add or update CI build system' },
  { emoji: '🚀', code: ':rocket:', name: 'Deploy stuff' },
  { emoji: '💡', code: ':bulb:', name: 'Add or update comments in source code' },
  { emoji: '📖', code: ':book:', name: 'Add or update the README' },
  { emoji: '🔀', code: ':twisted_rightwards_arrows:', name: 'Merge branches' },
  { emoji: '📌', code: ':pushpin:', name: 'Pin dependencies to specific versions' },
  { emoji: '👽', code: ':alien:', name: 'Update code due to external API changes' },
  { emoji: '🚚', code: ':truck:', name: 'Move or rename resources' },
  { emoji: '🎉', code: ':tada:', name: 'Initial commit' },
  { emoji: '❄️', code: ':snowflake:', name: 'Change configuration files' },
  { emoji: '🧹', code: ':broom:', name: 'Cleanup code or files' },
  { emoji: '🍱', code: ':bento:', name: 'Add or update assets' },
  { emoji: '🧪', code: ':test_tube:', name: 'Add a failing test' },
  { emoji: '⏪', code: ':rewind:', name: 'Revert changes' },
  { emoji: '🔖', code: ':bookmark:', name: 'Release / Version tags' },
  { emoji: '🥅', code: ':goal_net:', name: 'Catch errors' },
  { emoji: '💬', code: ':speech_balloon:', name: 'Add or update text and literals' },
  { emoji: '🌐', code: ':globe_with_meridians:', name: 'Internationalization' },
  { emoji: '🧩', code: ':puzzle:', name: 'Add or update dependencies' },
  { emoji: '👥', code: ':busts_in_silhouette:', name: 'Add or update contributor(s)' },
  { emoji: '🚸', code: ':children_crossing:', name: 'Improve user experience' },
  { emoji: '🏗️', code: ':building_construction:', name: 'Make architectural changes' },
  { emoji: '📱', code: ':iphone:', name: 'Work on responsive design' },
  { emoji: '🤖', code: ':robot:', name: 'Automate a process' },
  { emoji: '♿', code: ':wheelchair:', name: 'Improve accessibility' },
  { emoji: '💻', code: ':computer:', name: 'Work on dev tools' },
  { emoji: '🍻', code: ':beers:', name: 'Write code casually' },
  { emoji: '💺', code: ':seat:', name: 'Fix seatbelts' },
  { emoji: '🪴', code: ':potted_plant:', name: 'Add or update dependencies' },
  { emoji: '🧱', code: ':bricks:', name: 'Infrastructure changes' },
  { emoji: '🧑‍💻', code: ':technologist:', name: 'Improve developer experience' },
  { emoji: '✏️', code: ':pencil2:', name: 'Fix typos' },
];

export const licenses = [
  {
    name: 'MIT License',
    id: 'mit',
    shortName: 'MIT',
    description: 'Simple and permissive license allowing reuse with attribution',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    conditions: ['License and copyright notice'],
    limitations: ['No liability', 'No warranty'],
    text: `MIT License

Copyright (c) ${new Date().getFullYear()}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
  },
  {
    name: 'Apache License 2.0',
    id: 'apache',
    shortName: 'Apache',
    description: 'Permissive license with explicit patent grants',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use', 'Patent use'],
    conditions: ['License and notice', 'State changes'],
    limitations: ['No liability', 'No warranty'],
    text: `Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.

2. Grant of Copyright License.

3. Grant of Patent License.

4. Redistributions.

5. Submission of Contributions.

6. Trademarks.

7. Disclaimer of Warranty.

8. Limitation of Liability.

9. Accepting Warranty or Additional Liability.

Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

Copyright ${new Date().getFullYear()}

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`,
  },
  {
    name: 'GNU GPLv3',
    id: 'gpl',
    shortName: 'GPLv3',
    description: 'Strong copyleft license requiring derivative works to be open source',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Patent use'],
    conditions: ['Disclose source', 'Same license', 'State changes'],
    limitations: ['No liability', 'No warranty'],
    text: `GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) ${new Date().getFullYear()}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`,
  },
  {
    name: 'BSD 3-Clause',
    id: 'bsd',
    shortName: 'BSD',
    description: 'Permissive license with clause preventing use of contributor names',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    conditions: ['License and copyright notice'],
    limitations: ['No liability', 'No warranty'],
    text: `BSD 3-Clause License

Copyright (c) ${new Date().getFullYear()}

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`,
  },
  {
    name: 'ISC License',
    id: 'isc',
    shortName: 'ISC',
    description: 'Simplified MIT-style license with equivalent terms',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    conditions: ['License and copyright notice'],
    limitations: ['No liability', 'No warranty'],
    text: `ISC License

Copyright (c) ${new Date().getFullYear()}

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`,
  },
  {
    name: 'Mozilla Public License 2.0',
    id: 'mpl',
    shortName: 'MPL',
    description: 'Weak copyleft license designed for Firefox, Thunderbird',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    conditions: ['Disclose source', 'Keep open'],
    limitations: ['No liability', 'No warranty'],
    text: `Mozilla Public License Version 2.0

1. Definitions.

2. Grant of Copyright License.

3. Grant of Patent License.

4. Distribution.

5. Notice Requirements.

6. Disclaimer of Warranty.

7. Limitation of Liability.

8. Acceptance.

9. Requirement to Provide Support.

This Source Code Form is subject to the terms of the
Mozilla Public License, v. 2.0.

Copyright ${new Date().getFullYear()} `,
  },
  {
    name: 'The Unlicense',
    id: 'unlicense',
    shortName: 'Unlicense',
    description: 'Public domain dedication with no conditions',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use', 'Use patent claims'],
    conditions: [],
    limitations: ['No liability', 'No warranty'],
    text: `This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.`,
  },
  {
    name: 'Creative Commons Zero v1.0',
    id: 'cc0',
    shortName: 'CC0',
    description: 'Public domain equivalent for creative works',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    conditions: [],
    limitations: ['No warranty'],
    text: `Creative Commons Zero v1.0 Universal

The person who associated a work with this deed has dedicated the work to
the public domain by waiving all of his or her rights to the work worldwide
under copyright law, including all related and neighboring rights, to the
extent allowed by law.

You can copy, modify, distribute and perform the work, even for commercial
purposes, all without asking permission.

In no way are the following rights affected, and they are specifically
left intact:

- Fair use rights
- Other rights retained by the original author(s)

This waiver is subject to applicable law.`,
  },
];

export const emojis = [
  { code: ':tada:', emoji: '🎉', name: 'party' },
  { code: ':rocket:', emoji: '🚀', name: 'rocket' },
  { code: ':sparkles:', emoji: '✨', name: 'sparkles' },
  { code: ':zap:', emoji: '⚡️', name: 'zap' },
  { code: ':fire:', emoji: '🔥', name: 'fire' },
  { code: ':bug:', emoji: '🐛', name: 'bug' },
  { code: ':alien:', emoji: '👽', name: 'alien' },
  { code: ':robot:', emoji: '🤖', name: 'robot' },
  { code: ':art:', emoji: '🎨', name: 'art' },
  { code: ':memo:', emoji: '📝', name: 'memo' },
  { code: ':book:', emoji: '📖', name: 'book' },
  { code: ':clipboard:', emoji: '📋', name: 'clipboard' },
  { code: ':wrench:', emoji: '🔧', name: 'wrench' },
  { code: ':hammer:', emoji: '🔨', name: 'hammer' },
  { code: ':gear:', emoji: '⚙️', name: 'gear' },
  { code: ':lock:', emoji: '🔒', name: 'lock' },
  { code: ':key:', emoji: '🔑', name: 'key' },
  { code: ':bulb:', emoji: '💡', name: 'bulb' },
  { code: ':star:', emoji: '⭐', name: 'star' },
  { code: ':heart:', emoji: '❤️', name: 'heart' },
  { code: ':check:', emoji: '✅', name: 'check' },
  { code: ':x:', emoji: '❌', name: 'x' },
  { code: ':warning:', emoji: '⚠️', name: 'warning' },
  { code: ':question:', emoji: '❓', name: 'question' },
  { code: ':white_check_mark:', emoji: '✅', name: 'white_check_mark' },
  { code: ':bell:', emoji: '🔔', name: 'bell' },
  { code: ':calendar:', emoji: '📅', name: 'calendar' },
  { code: ':clock:', emoji: '🕐', name: 'clock' },
  { code: ':eye:', emoji: '👁️', name: 'eye' },
  { code: ':glasses:', emoji: '👓', name: 'glasses' },
  { code: ':computer:', emoji: '💻', name: 'computer' },
  { code: ':mobile:', emoji: '📱', name: 'mobile' },
  { code: ':email:', emoji: '📧', name: 'email' },
  { code: ':link:', emoji: '🔗', name: 'link' },
  { code: ':paperclip:', emoji: '📎', name: 'paperclip' },
  { code: ':file:', emoji: '📄', name: 'file' },
  { code: ':folder:', emoji: '📁', name: 'folder' },
  { code: ':pushpin:', emoji: '📌', name: 'pushpin' },
  { code: ':bookmark:', emoji: '🔖', name: 'bookmark' },
  { code: ':rainbow:', emoji: '🌈', name: 'rainbow' },
  { code: ':sun:', emoji: '☀️', name: 'sun' },
  { code: ':moon:', emoji: '🌙', name: 'moon' },
  { code: ':cloud:', emoji: '☁️', name: 'cloud' },
  { code: ':snowflake:', emoji: '❄️', name: 'snowflake' },
  { code: ':drop:', emoji: '💧', name: 'drop' },
  { code: ':wave:', emoji: '👋', name: 'wave' },
  { code: ':hand:', emoji: '✋', name: 'hand' },
  { code: '+1:', emoji: '👍', name: '+1' },
  { code: '-1:', emoji: '👎', name: '-1' },
  { code: ':clap:', emoji: '👏', name: 'clap' },
  { code: ':pray:', emoji: '🙏', name: 'pray' },
];

export const workflowTemplates = [
  {
    name: 'Node.js CI',
    description: 'Continuous integration for Node.js projects with matrix testing',
    code: `name: Node.js CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x, 22.x]

    steps:
    - uses: actions/checkout@v4
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test`,
  },
  {
    name: 'Python CI',
    description: 'Continuous integration for Python projects with flake8 and pytest',
    code: `name: Python CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ['3.9', '3.10', '3.11', '3.12']

    steps:
    - uses: actions/checkout@v4
    - name: Set up Python \${{ matrix.python-version }}
      uses: actions/setup-python@v5
      with:
        python-version: \${{ matrix.python-version }}
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install flake8 pytest
    - name: Lint with flake8
      run: |
        flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
    - name: Test with pytest
      run: pytest`,
  },
  {
    name: 'Deploy to Production',
    description: 'Simple deployment workflow for production environments',
    code: `name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Deploy
      run: |
        echo "Deploying to production..."
        # Add your deployment commands here`,
  },
  {
    name: 'Docker Build & Push',
    description: 'Build and push Docker images to container registry',
    code: `name: Docker Build & Push

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3
    - name: Login to Docker Hub
      uses: docker/login-action@v3
      with:
        username: \${{ secrets.DOCKER_USERNAME }}
        password: \${{ secrets.DOCKER_PASSWORD }}
    - name: Build and push
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: myapp:latest,myapp:\${{ github.sha }}`,
  },
  {
    name: 'Auto Label PR',
    description: 'Automatically label pull requests based on changes',
    code: `name: Auto Label PR

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  label:
    runs-on: ubuntu-latest
    steps:
    - name: Label PR
      uses: actions/labeler@v5
      with:
        repo-token: \${{ secrets.GITHUB_TOKEN }}
        configuration-path: .github/labeler.yml`,
  },
  {
    name: 'Node.js Package Release',
    description: 'Publish Node.js package to npm on release',
    code: `name: Node.js Package

on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
        registry-url: 'https://registry.npmjs.org'
    - run: npm ci
    - run: npm test
    - run: npm publish
      env:
        NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}`,
  },
  {
    name: 'Security Audit',
    description: 'Run security audit on dependencies',
    code: `name: Security Audit

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Run security audit
      run: npm audit --audit-level=high`,
  },
  {
    name: 'Code Coverage',
    description: 'Upload code coverage to Codecov',
    code: `name: Code Coverage

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  coverage:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    - run: npm ci
    - run: npm test -- --coverage
    - uses: codecov/codecov-action@v4
      with:
        token: \${{ secrets.CODECOV_TOKEN }}`,
  },
];

export const readmeTemplates = {
  basic: `# Project Name

Brief description of what this project does.

## Features

- Feature 1
- Feature 2
- Feature 3

## Installation

\\\`\\\`\\\`bash
npm install project-name
\\\`\\\`\\\`

## Usage

\\\`\\\`\\\`javascript
import { something } from 'project-name';

something();
\\\`\\\`\\\`

## License

MIT`,
  advanced: `# Project Name

[![License](https://img.shields.io/badge/license-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/username/repo)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.x-brightgreen)](https://nodejs.org)

## Description

A brief description of what this project does and why it's useful.

## Features

- ⚡️ Lightning fast
- 🎨 Beautiful UI
- 🔒 Secure by default
- 📱 Mobile responsive
- 🌍 Cross-platform

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

\\\`\\\`\\\`bash
# Clone the repository
git clone https://github.com/username/repo.git

# Navigate to the project directory
cd repo

# Install dependencies
npm install
\\\`\\\`\\\`

### Configuration

Create a \`.env\` file in the root directory:

\\\`\\\`\\\`
VARIABLE_NAME=value
\\\`\\\`\\\`

### Running

\\\`\\\`\\\`bash
npm run dev
\\\`\\\`\\\`

### Building

\\\`\\\`\\\`bash
npm run build
\\\`\\\`\\\`

## Usage

\\\`\\\`\\\`javascript
import { something } from 'project-name';

// Example usage
something();
\\\`\\\`\\\`

## API Reference

| Method | Description | Parameters |
|--------|-------------|------------|
| method1 | Description 1 | param1, param2 |
| method2 | Description 2 | param1 |

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

Distributed under the MIT License. See \`LICENSE\` for more information.

## Acknowledgments

- List any resources or contributors
- Inspiration
- Etc.`,
};

export const prTemplates = {
  default: `## Summary

<!-- Brief description of what this PR does -->

## Changes Made

<!-- What changes were made in this PR -->

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] This change requires a documentation update

## Testing

<!-- How was this tested -->

- [ ] Unit tests pass
- [ ] Manual testing done
- [ ] No breaking changes

## Checklist

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Screenshots (if applicable)

<!-- Add screenshots here -->

## Additional Context

<!-- Any additional context about the PR -->`, bugfix: `## Bug Fix Summary

**Fixed Issue:** #ISSUE_NUMBER

### Description

<!-- Brief description of the bug and what was fixed -->

### Root Cause

<!-- What was causing the bug -->

### Changes Made

<!-- List the specific changes -->

### Testing

- [ ] Tested the fix locally
- [ ] Verified the issue no longer occurs
- [ ] Tested related functionality

### Before/After

**Before:**
<!-- Screenshot or description -->

**After:**
<!-- Screenshot or description -->`, feature: `## Feature Summary

**Related Issue:** #ISSUE_NUMBER

### Description

<!-- What feature was added -->

### Implementation Details

<!-- How the feature was implemented -->

### Usage

<!-- How to use the new feature -->

\\\`\\\`\\\`example
// Code example
\\\`\\\`\\\`

### Testing

- [ ] Added unit tests
- [ ] Manual testing done
- [ ] Edge cases handled

### Breaking Changes

<!-- Are there any breaking changes -->`,
};

export const issueTemplates = {
  bug: `## Bug Description

<!-- A clear and concise description of what the bug is -->

### Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

### Expected Behavior

<!-- What you expected to happen -->

### Actual Behavior

<!-- What actually happened -->

### Screenshots

<!-- If applicable, add screenshots to help explain your problem -->

### Environment

- OS: [e.g., Windows 10, macOS 12]
- Browser: [e.g., Chrome 100, Safari 15]
- Version: [e.g., 1.0.0]

### Possible Fix

<!-- If you have any suggestions for what could fix this -->`, feature: `## Feature Description

<!-- A clear and concise description of what the feature is -->

### Problem Solved

<!-- What problem does this feature solve -->

### Proposed Solution

<!-- How do you propose to implement this -->

### Alternatives Considered

<!-- Any alternative solutions you considered -->

### Additional Context

<!-- Add any other context about the feature request here -->

### mockup

<!-- If applicable, add a mockup or design -->`,
};