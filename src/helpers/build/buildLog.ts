interface IBuildLogProps {
  type: 'success' | 'error' | 'info';
  message?: string;
  functionName: string;
  additionalLog?: unknown;
}

export const buildLog = ({
  type,
  message,
  functionName,
  additionalLog,
}: IBuildLogProps) => {
  if (!+process.env.IS_BUILD!) return;

  const functionNameWithPrefix = `[${functionName.toUpperCase()}]`;
  const messageWithPrefix = message ? ` - ${message}` : '';

  if (type === 'success') {
    // eslint-disable-next-line no-console
    console.log(
      `✅ SUCCESS ${functionNameWithPrefix}${messageWithPrefix}`,
      additionalLog,
    );
  } else if (type === 'error') {
    console.error(
      `❌ ERROR ${functionNameWithPrefix}${messageWithPrefix}`,
      additionalLog,
    );
  } else {
    // eslint-disable-next-line no-console
    console.log(
      `ℹ️ INFO ${functionNameWithPrefix}${messageWithPrefix}`,
      additionalLog,
    );
  }
};
