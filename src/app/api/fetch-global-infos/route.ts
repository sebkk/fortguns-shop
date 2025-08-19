import { NextResponse } from 'next/server';

import { promises as fs } from 'fs';
import path from 'path';

import globalInfosApi from '@/api/global_infos';

// Configure for static export
export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  try {
    const response = await globalInfosApi.getGlobalInfos();

    const OUTPUT_FILE = path.join(
      process.cwd(),
      'src/constants/api/global-infos.ts',
    );
    const outputDir = path.dirname(OUTPUT_FILE);
    await fs.mkdir(outputDir, { recursive: true });

    const globalInfosData = response[0].acf.data.reduce((prev, item) => {
      return {
        ...prev,
        [item.acf_fc_layout]:
          item.acf_fc_layout === 'socials' ? item.socials : item.contact_infos,
      };
    }, {});

    const tsContent = `
    /* eslint-disable prettier/prettier */
    // This file is auto-generated. Do not edit manually.
      import { GlobalInfos } from '@/types/globalInfos';

      export const globalInfos: GlobalInfos = ${JSON.stringify(
        globalInfosData,
        null,
        2,
      )};

      export default globalInfos;
    `;

    await fs.writeFile(OUTPUT_FILE, tsContent);

    return NextResponse.json({
      success: true,
      message: 'Data fetched and saved as TypeScript file',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
