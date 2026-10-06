import { api } from '@chello/ui/lib/workspace/api/http/client';
import { ENDPOINTS } from '@chello/ui/lib/workspace/api/http/constants';
import type { NetworkAction } from '@chello/ui/types/models.types';

import { buildEndpoint } from './utils';

export const actionsApi = {
  async reject(actionId: string): Promise<NetworkAction> {
    const endpoint = `${buildEndpoint(ENDPOINTS.ACTION_BY_ID, { actionId })}/reject`;
    const { data } = await api.post<NetworkAction>(endpoint);
    return data;
  },
};
