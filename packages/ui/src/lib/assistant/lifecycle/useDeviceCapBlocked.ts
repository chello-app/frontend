import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getRealtimeClientId,
  subscribeRealtimeMessages,
} from '@chello/ui/lib/assistant/realtime/realtimeClient';
import { isDeviceCapBlocked } from '@chello/ui/lib/assistant/lifecycle/deviceCap';
import { serviceApi } from '@chello/ui/lib/workspace/api/service';
import { queryKeys } from '@chello/ui/lib/platform/query/queryKeys';
import { useSubscription } from '@chello/ui/lib/platform/query/queryHooks';

/** True when this device cannot use the mic affordance due to the free-tier device cap. */
export function useDeviceCapBlocked(enabled = true): boolean {
  const { data: sub } = useSubscription(enabled);
  const { data: clientIds } = useQuery({
    queryKey: queryKeys.serviceClients,
    queryFn: () => serviceApi.listClients(),
    enabled,
    staleTime: 15_000,
    refetchOnWindowFocus: true,
  });
  const [selfId, setSelfId] = useState<string | null>(() => getRealtimeClientId());

  useEffect(() => {
    setSelfId(getRealtimeClientId());
    return subscribeRealtimeMessages(msg => {
      if (msg.event !== 'session_ready') return;
      const clientId = typeof msg.client_id === 'string' ? msg.client_id : null;
      if (clientId) setSelfId(clientId);
    });
  }, []);

  return isDeviceCapBlocked(clientIds ?? [], sub?.limits.max_devices, selfId);
}
