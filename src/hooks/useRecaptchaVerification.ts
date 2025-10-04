import { useCallback, useEffect, useState } from 'react';

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface RecaptchaVerificationResult {
  verified: boolean;
  score?: number;
  error?: string;
}

interface UseRecaptchaVerificationReturn {
  verifyRecaptcha: (token: string) => Promise<RecaptchaVerificationResult>;
  executeRecaptcha: (action?: string) => Promise<string>;
  isVerifying: boolean;
  isRecaptchaReady: boolean;
}

export const useRecaptchaVerification = (): UseRecaptchaVerificationReturn => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);

  const { executeRecaptcha: googleExecuteRecaptcha } = useGoogleReCaptcha();

  // Monitor when reCaptcha is ready
  useEffect(() => {
    if (googleExecuteRecaptcha) {
      setIsRecaptchaReady(true);
    } else {
      setIsRecaptchaReady(false);
    }
  }, [googleExecuteRecaptcha]);

  const verifyRecaptcha = useCallback(
    async (token: string): Promise<RecaptchaVerificationResult> => {
      setIsVerifying(true);

      try {
        const response = await fetch('/api/verify-recaptcha', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!data.success) {
          return {
            verified: false,
            error: data.error || 'Verification failed',
          };
        }

        return {
          verified: data.verified,
          score: data.score,
          error: data.error,
        };
      } catch (error) {
        console.error('Error verifying reCaptcha:', error);
        return {
          verified: false,
          error: 'Network error during verification',
        };
      } finally {
        setIsVerifying(false);
      }
    },
    [],
  );

  // Wrapper for executeRecaptcha with error handling
  const executeRecaptcha = useCallback(
    async (action: string = 'submit'): Promise<string> => {
      if (!googleExecuteRecaptcha) {
        throw new Error('reCaptcha is not ready');
      }

      try {
        const token = await googleExecuteRecaptcha(action);
        return token;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    [googleExecuteRecaptcha],
  );

  return {
    verifyRecaptcha,
    executeRecaptcha,
    isVerifying,
    isRecaptchaReady,
  };
};
