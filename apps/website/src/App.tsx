import { useEffect, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@chello/ui/lib/platform/query/createQueryClient';
import { startClientContextResponder } from '@chello/ui/lib/assistant/realtime/clientContextResponder';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SystemProvider } from '@chello/ui/contexts/SystemContext';
import { AuthProvider } from '@chello/ui/contexts/AuthContext';
import { AssistantRuntimeProvider } from '@chello/ui/contexts/AssistantRuntimeContext';
import { ServiceProvider } from '@chello/ui/contexts/ServiceContext';
import { CommandProvider } from '@chello/ui/contexts/CommandContext';
import { AudioProvider } from '@chello/ui/contexts/AudioContext';
import { NotificationProvider } from '@chello/ui/contexts/NotificationContext';
import AssistantLayout from '@chello/ui/pages/AssistantLayout';
import LandingPage from '@/pages/LandingPage';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Terms from '@/pages/Terms';
import LoginPage from '@chello/ui/pages/LoginPage';
import { OAuthCallback } from '@chello/ui/pages/OAuthCallback';
import { OAUTH_CALLBACK_PATH } from '@chello/ui/lib/platform/runtime/assistantPaths';

export function App() {
  const [queryClient] = useState(() => createQueryClient());

  useEffect(() => {
    return startClientContextResponder();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SystemProvider>
        <AuthProvider>
          <NotificationProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path={OAUTH_CALLBACK_PATH} element={<OAuthCallback />} />
              <Route path="/app" element={<Navigate to="/assistant" replace />} />
              <Route
                path="/assistant"
                element={
                  <AssistantRuntimeProvider>
                    <ServiceProvider>
                      <CommandProvider>
                        <AudioProvider>
                          <AssistantLayout />
                        </AudioProvider>
                      </CommandProvider>
                    </ServiceProvider>
                  </AssistantRuntimeProvider>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </NotificationProvider>
        </AuthProvider>
      </SystemProvider>
    </QueryClientProvider>
  );
}
