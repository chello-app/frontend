/** Must match backend `CHELLO_DESKTOP_OAUTH_ORIGIN` and Electron protocol handler. */
export const DESKTOP_OAUTH_RETURN_ORIGIN = 'chello://oauth';

export type DesktopOAuthCallbackParams = {
  access_token?: string;
  refresh_token?: string;
  linked?: string;
  next?: string;
  error?: string;
  error_description?: string;
};
