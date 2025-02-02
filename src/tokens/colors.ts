const colors = {
  primary: {
    DEFAULT: '#8fb9fe', // 'colours-primary': '#8fb9fe',
    '15': '#8fb9fe26', // 'colours-primary-15': '#8fb9fe26',
    '15-hover': '#c7dcff1a',
    '55': '#8fb9fe8c', // 'colours-primary-55': '#8fb9fe8c',
    on: '#101427', // 'colours-on-primary': '#101427',
    hover: '#a5c7fe', // 'colours-primary-hover': '#a5c7fe',
  },

  secondary: {
    DEFAULT: '#aacc00', //  'colours-secondary': '#aacc00',
    '15': '#aacc0026',
    '55': '#aacc008c',
    on: '#1E2600', // '--Colours-On-Secondary' : '#1E2600'
  },

  error: {
    DEFAULT: '#ff9b92', //  'colours-error': '#ff9b92',
    '15': '#ff9b9226', //  'colours-error-15': '#ff9b9226',
    '55': '#ff9b928c', // 'colours-error-55': '#ff9b928c',
    on: '#260b05', // 'colours-on-error': '#260b05',
    hover: '#ffafa8', // 'colours-error-hover': '#ffafa8',
  },

  success: {
    DEFAULT: '#70c79e', //  'colours-success': '#70c79e',
    '15': '#70c79e26', //  'colours-success-15': '#70c79e26',
    '55': '#70c79e8c', // 'colours-success-55': '#70c79e8c',
    on: '#001a0f', //  'colours-on-success': '#001a0f',
    hover: '#8dd2b1', // 'colours-error-success': '#8dd2b1',
  },

  warning: {
    DEFAULT: '#e6ab67', // 'colours-warning': '#e6ab67',
    '15': '#e6ab6726', //  'colours-warning-15': '#e6ab6726',
    '55': '#e6ab678c', //  'colours-warning-55': '#e6ab678c'
    on: '#201000', //  'colours-on-warning': '#201000',
    hover: '#ebbc85', // 'colours-warning-hover': '#ebbc85',
  },

  elevation: {
    '1': '#14191d', // 'colours-elevation-1': '#14191d',
    '2': '#1c2226', //  'colours-elevation-2': '#1c2226',
    '3': '#252d34', // 'colours-elevation-3': '#252d34',
    app: '#0b0e0f', // 'colours-app-bg': '#0b0e0f',
    'modal-bg-overlay': '#0b0e0fb2', //  'colours-modal-bg-overlay': '#0b0e0fb2',
    '2-hover': '#292F33',
  },

  fill: {
    DEFAULT: '#ffffff1a', // 'colours-fill': '#ffffff1a',
    disabled: '#ffffff66', // 'var(--color-fill-disabled)'
  },

  icons: {
    disabled: '#ffffff66', // alias for fill.disabled, 'colours-icons-disabled': 'var(--color-fill-disabled)',
    fill: '#ffffffab', // alias for text.secondary  'colours-icons-fill': 'var(--colours-text-secondary)',
  },

  stroke: {
    primary: '#dbeaff66', // 'colours-stroke-primary': '#dbeaff66',
    secondary: '#dbeaff40', //  'colours-stroke-secondary': '#dbeaff40',
    strong: '#ffffffe5', // alias for text.primary 'colours-stroke-strong': 'var(--colours-text-primary)',
    hover: '#edf4ffa5', // colours-stroke-primary-hover
  },
  text: {
    disabled: '#ffffff66', // alias for fill.disabled
    primary: '#ffffffe5', // 'colours-text-primary': '#ffffffe5',
    secondary: '#ffffffab', // 'colours-text-secondary': '#ffffffab',
    white: '#fffffff2', //rgba(255, 255, 255, 0.95)
  },
  hover: {
    color: '#ffffff33', // 'colours-hover-on-color': '#ffffff33',
    empty: '#ffffff0f', // 'colours-hover-on-empty': '#ffffff0f',
  },
};

export default colors;
