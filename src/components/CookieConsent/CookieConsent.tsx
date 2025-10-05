'use client';

import { useTranslations } from 'next-intl';
import CookieConsent from 'react-cookie-consent';

import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

const CookieConsentComponent = () => {
  const t = useTranslations();
  const { updateConsent, trackEvent } = useGoogleAnalytics();

  return (
    <CookieConsent
      location='bottom'
      buttonText={t('cookieConsentAccept')}
      declineButtonText={t('cookieConsentDecline')}
      enableDeclineButton
      flipButtons
      style={{
        background: '#1c1c1c',
        color: '#dddddd',
        borderTop: '1px solid #242d25',
        padding: '16px 20px',
        fontSize: '14px',
        lineHeight: '1.5',
        zIndex: 9999,
        boxShadow: '0 -2px 10px #0000001a',
      }}
      buttonStyle={{
        background: '#356d35',
        color: '#dddddd',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        margin: '8px',
        transition: 'background-color 0.2s ease',
      }}
      declineButtonStyle={{
        background: 'transparent',
        color: '#ffffffc7',
        border: '1px solid #ffffffc7',
        borderRadius: '4px',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        marginRight: '8px',
        transition: 'all 0.2s ease',
      }}
      expires={365}
      cookieName='fortguns-cookie-consent'
      cookieValue='accepted'
      declineCookieValue='declined'
      onAccept={() => {
        // Enable Google Analytics tracking
        updateConsent('granted');
        trackEvent('cookie_consent', 'user_interaction', 'accepted');
      }}
      onDecline={() => {
        // Disable Google Analytics tracking
        updateConsent('denied');
        trackEvent('cookie_consent', 'user_interaction', 'declined');
      }}
    >
      {t('cookieConsentMessage')}
    </CookieConsent>
  );
};

export default CookieConsentComponent;
