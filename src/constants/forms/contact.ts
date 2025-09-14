export const CONTACT_FORM_TOPICS_VALUES = {
  GENERAL: 'general',
  OFFER: 'offer',
  SERVICE: 'service',
  OTHER: 'other',
};

export const CONTACT_FORM_TOPICS_LABELS = {
  EMPTY: 'contactFormTopic',
  GENERAL: 'contactFormTopicGeneral',
  OFFER: 'contactFormTopicOffer',
  SERVICE: 'contactFormTopicService',
  OTHER: 'contactFormTopicOther',
};

export const CONTACT_FORM_TOPICS = [
  { value: '', label: CONTACT_FORM_TOPICS_LABELS.EMPTY },
  {
    value: CONTACT_FORM_TOPICS_VALUES.GENERAL,
    label: CONTACT_FORM_TOPICS_LABELS.GENERAL,
  },
  {
    value: CONTACT_FORM_TOPICS_VALUES.OFFER,
    label: CONTACT_FORM_TOPICS_LABELS.OFFER,
  },
  {
    value: CONTACT_FORM_TOPICS_VALUES.SERVICE,
    label: CONTACT_FORM_TOPICS_LABELS.SERVICE,
  },
  {
    value: CONTACT_FORM_TOPICS_VALUES.OTHER,
    label: CONTACT_FORM_TOPICS_LABELS.OTHER,
  },
];
