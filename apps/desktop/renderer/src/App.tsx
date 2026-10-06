import { useEffect, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@chello/ui/lib/platform/query/createQueryClient';
import { startClientContextResponder } from '@chello/ui/lib/assistant/realtime/clientContextResponder';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SystemProvider } from '@chello/ui/contexts/SystemContext';
import { NotificationProvider } from '@chello/ui/contexts/NotificationContext';
import { AuthProvider } from '@chello/ui/contexts/AuthContext';
import { AssistantRuntimeProvider } from '@chello/ui/contexts/AssistantRuntimeContext';
import { ServiceProvider } from '@chello/ui/contexts/ServiceContext';
import { CommandProvider } from '@chello/ui/contexts/CommandContext';
import { AudioProvider } from '@chello/ui/contexts/AudioContext';
import { TitleBar } from '@chello/ui/components/TitleBar';
import AssistantLayout from '@chello/ui/pages/AssistantLayout';
import LoginPage from '@chello/ui/pages/LoginPage';

export function App() {
  const [queryClient] = useState(() => createQueryClient());

  useEffect(() => {
    return startClientContextResponder();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SystemProvider>
        <MemoryRouter initialEntries={['/assistant']}>
          <AuthProvider>
            <NotificationProvider>
              <div className="flex h-full min-h-0 flex-col overflow-hidden bg-zinc-950">
                <TitleBar />
                <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-zinc-950">
                  <div className="flex h-full min-h-0 flex-1 flex-col bg-zinc-950">
                    <Routes>
                      <Route path="/login" element={<LoginPage />} />
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
                      <Route path="/app" element={<Navigate to="/assistant" replace />} />
                      <Route path="/" element={<Navigate to="/assistant" replace />} />
                      <Route path="*" element={<Navigate to="/assistant" replace />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </NotificationProvider>
          </AuthProvider>
        </MemoryRouter>
      </SystemProvider>
    </QueryClientProvider>
  );
}
