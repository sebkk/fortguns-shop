import { promises as fs } from 'fs';
import path from 'path';

import { getFooter } from '@/handlers/footer/getFooter';
import { getGlobalInfos } from '@/handlers/globalInfos/getGlobalInfos';
import { getHeaderNavigation } from '@/handlers/header/getHeaderNavigation';
import { wait } from '@/helpers/wait';

async function fetchAllData(): Promise<void> {
  const dataFetchers = [
    {
      name: 'Global Infos',
      handler: getGlobalInfos,
      outputFile: 'src/constants/api/global-infos.ts',
      typeName: 'GlobalInfos',
      typeImport: '@/types/globalInfos',
    },
    {
      name: 'Header Menu',
      handler: getHeaderNavigation,
      outputFile: 'src/constants/api/header-menu.ts',
      typeName: 'NavMenuResponse',
      typeImport: '@/types/menus',
    },
    {
      name: 'Footer',
      handler: getFooter,
      outputFile: 'src/constants/api/footer.ts',
      typeName: 'FooterElement',
      typeImport: '@/types/footer',
    },
  ];

  // eslint-disable-next-line no-console
  console.log('🚀 Starting data fetch process...\n');

  let hasErrors = false;

  for (const fetcher of dataFetchers) {
    try {
      // eslint-disable-next-line no-console
      console.log(`🔄 Fetching ${fetcher.name}...`);

      const data = await fetcher.handler();

      if (!data) {
        // eslint-disable-next-line no-console
        console.error(`❌ ${fetcher.name} - No data received`);
        hasErrors = true;
        continue;
      }

      const OUTPUT_FILE = path.join(process.cwd(), fetcher.outputFile);
      const outputDir = path.dirname(OUTPUT_FILE);
      await fs.mkdir(outputDir, { recursive: true });

      const variableName = fetcher.name.toLowerCase().replace(/\s+/g, '');
      const tsContent = `
/* eslint-disable prettier/prettier */
// This file is auto-generated. Do not edit manually.
import { ${fetcher.typeName} } from '${fetcher.typeImport}';

export const ${variableName}: ${fetcher.typeName} = ${JSON.stringify(data, null, 2)};

export default ${variableName};
`;

      await fs.writeFile(OUTPUT_FILE, tsContent);

      // eslint-disable-next-line no-console
      console.log(`✅ ${fetcher.name} saved successfully`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(`❌ ${fetcher.name} Error:`, error.message);
      hasErrors = true;
    }

    // Add small delay between requests
    await wait({
      ms: 200,
      withBuild: false,
      name: `Fetch All Data - ${fetcher.name}`,
    });
  }

  if (hasErrors) {
    // eslint-disable-next-line no-console
    console.log('\n⚠️  Data fetch completed with some errors.');
  } else {
    // eslint-disable-next-line no-console
    console.log('\n🎉 Data fetch process completed successfully!');
  }
}

fetchAllData();
