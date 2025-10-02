export const wait = async ({
  ms = 0,
  withBuild = true,
  name,
}: {
  ms?: number;
  withBuild?: boolean;
  name?: string;
} = {}) => {
  if ((withBuild && !+process.env.IS_BUILD!) || ms === 0) return;

  // eslint-disable-next-line no-console
  console.log(`⏳ ${ms}ms WAITING... ${name || ''}`);

  await new Promise((resolve) => setTimeout(resolve, ms));
};
