export const TABLE_OPT = {
  ROWS_DEFAULT: 10,
  ROWS_OPTIONS: [10, 25, 50],
};

export const MESSAGES = {
  TIME_LONG: 86400000, // One day
  TIME_SHORT: 600000, // Ten minutes
};

export const API_PATH = {
  // The Endorser Service API
  ADMIN_CONFIG: '/admin/config',

  ALLOW_CONFIG: '/allow/config',
  ALLOW_CREDENTIAL_DEFINITION: '/allow/credential-definition',
  ALLOW_PUBLISH_DID: '/allow/publish-did',
  ALLOW_SCHEMA: '/allow/schema',

  CONNECTION: '/connections/',
  CONNECTIONS: '/connections/?page_size=100&page_num=1',
  CONNECTIONS_ACCEPT: (connId: string) => `/connections/${connId}/accept`,
  CONNECTIONS_REJECT: (connId: string) => `/connections/${connId}/reject`,

  ENDORSE_TRANSACTION: '/endorse/transactions/',
  ENDORSE_TRANSACTIONS: '/endorse/transactions?page_size=100&page_num=1',
  ENDORSE_TRANSACTIONS_ENDORSE: (tranId: string) => `/endorse/transactions/${tranId}/endorse`,
  ENDORSE_TRANSACTIONS_REJECT: (tranId: string) => `/endorse/transactions/${tranId}/reject`,

  // The application backend
  CONFIG: '/config',
  OIDC_ENDORSER_LOGIN: '/api/endorserLogin',
};

// json editor config
export const JSON_EDITOR_DEFAULTS = {
  mainMenuBar: false,
  mode: 'text' as any,
  statusBar: false,
  navigationBar: false,
  indentation: 2,
  tabSize: 2,
};
