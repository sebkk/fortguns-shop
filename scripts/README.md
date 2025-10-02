# Scripts

This directory contains utility scripts for the FortGuns Shop project.

## Fetch Global Infos

Fetches data from the global_infos WordPress API endpoint and saves it to a static JSON file.

### Usage

```bash
npm run fetch-global-infos
# or
pnpm fetch-global-infos
```

### Configuration

Before running the script, make sure to:

1. Set the `NEXT_PUBLIC_API_URL` environment variable to your WordPress API base URL
2. Or update the `BASE_URL` constant in the script file

### Output

The script will create a `public/data/global-infos.json` file containing the fetched data.

### Example Output Structure

```json
{
  "acf": {
    // Your ACF fields data here
  }
}
```

## Fetch Header Menu

Fetches the header navigation menu using the Next.js API endpoint and saves it to a static JSON file.

### Usage

```bash
npm run fetch-header-menu
# or
pnpm fetch-header-menu
```

### Configuration

Before running the script, make sure to:

1. Your Next.js development server is running (`npm run dev`)
2. Set the `NEXT_PUBLIC_API_URL` environment variable to your WordPress API base URL
3. The script calls the `/api/fetch-header-menu` endpoint which uses the same logic as the application's `getHeaderNavigation` handler

### Output

The script will create a `src/constants/api/header-menu.ts` file containing the fetched menu data as a TypeScript module.

### Example Output Structure

```typescript
/* eslint-disable prettier/prettier */
// This file is auto-generated. Do not edit manually.
import { NavMenuResponse } from '@/types/menus';

export const headerMenu: NavMenuResponse = {
  term_id: 123,
  name: 'Header Navigation',
  slug: 'header-nav',
  items: [
    {
      ID: 1,
      title: 'Home',
      url: '/',
      menu_order: 1,
      child_items: [],
    },
  ],
};

export default headerMenu;
```

### Error Handling

Both scripts include comprehensive error handling for:

- Network timeouts
- API errors
- File system errors
- Invalid responses

Check the console output for detailed error information if the script fails.
