let msalConfig = null;

export const loginRequest = {
  scopes: ['User.Read'],
};

export const getMsalConfig = async () => {
  if (msalConfig) return msalConfig;

  const res = await fetch(`${import.meta.env.VITE_CS365_URI}/api/auth/auth-config`); 
  const config = await res.json();
  
  msalConfig = {
    auth: {
      clientId: config.clientId,
      authority: `https://login.microsoftonline.com/${config.tenantId}`,
      redirectUri: config.redirectUri,
    },
  };

  return msalConfig;
};