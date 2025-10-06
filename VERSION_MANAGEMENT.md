# Version Management - FortGuns Shop

## Overview

A version management system has been added to the project to facilitate tracking changes and publishing new versions of the application.

## Available Commands

### Basic versioning commands

```bash
# Increment patch version (0.1.0 → 0.1.1)
pnpm run version:patch

# Increment minor version (0.1.0 → 0.2.0)
pnpm run version:minor

# Increment major version (0.1.0 → 1.0.0)
pnpm run version:major

# Increment prerelease version (0.1.0 → 0.1.1-0)
pnpm run version:prerelease
```

### Information commands

```bash
# Show current version
pnpm run version:show
```

### Release commands (versioning + build)

```bash
# Patch release (versioning + build)
pnpm run release:patch

# Minor release (versioning + build)
pnpm run release:minor

# Major release (versioning + build)
pnpm run release:major
```

## How to Use

### 1. Standard workflow

```bash
# 1. Check current version
pnpm run version:show

# 2. Increment version (choose appropriate type)
pnpm run version:patch  # for bugfixes
pnpm run version:minor  # for new features
pnpm run version:major  # for breaking changes

# 3. Build application
pnpm run build
```

### 2. Quick release

```bash
# Automatic versioning + build
pnpm run release:patch  # or minor/major
```

## Version Types (Semantic Versioning)

- **MAJOR** (1.0.0): Breaking changes, incompatible API changes
- **MINOR** (0.1.0): New features, backward compatible
- **PATCH** (0.0.1): Bugfixes, security patches

## Files related to versioning

- `package.json` - main application version
- `CHANGELOG.md` - change history (manual updates)

## Manual CHANGELOG updates

Since the version helper script was removed, you need to manually update the `CHANGELOG.md` file when creating new releases:

1. Move changes from `[Unreleased]` section to a new version section
2. Add the release date
3. Update the version links at the bottom of the file

## Git Integration

- All `version:*` commands automatically create Git tags
- Tags are automatically pushed to repository
- Commit template has been configured in `.gitmessage`

## Usage Examples

### Bugfix release

```bash
pnpm run version:patch
# Version: 0.1.0 → 0.1.1
```

### New feature

```bash
pnpm run version:minor
# Version: 0.1.0 → 0.2.0
```

### Breaking change

```bash
pnpm run version:major
# Version: 0.1.0 → 1.0.0
```

## Notes

- Before incrementing version, make sure all changes are committed
- Manually update CHANGELOG.md before release (move changes from [Unreleased] to new version section)
- Use meaningful commit messages according to the convention in `.gitmessage`
