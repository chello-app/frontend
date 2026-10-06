import type { AssistantState } from '@chello/ui/types/assistant.types';
import type { AssistantBubbleStatus } from '@chello/ui/types/command.types';
import {
  COMMAND_CAPTURE_STATES,
  selectIsAmbientEnabled,
  selectIsCommandThinking,
  selectIsCommandService,
} from '@chello/ui/lib/assistant/assistantRuntime';
import type { MicAppearance } from '@chello/ui/lib/assistant/voice/micAppearance';
import { deriveMicAppearanceFromRuntime } from '@chello/ui/lib/assistant/voice/micAppearance';

export type MicIntentAction = MicAppearance['action'];

export function resolveMicIntentAction(
  runtime: AssistantState,
  options: {
    tutorialActive: boolean;
    permissionsGateBlocked?: boolean;
    assistantBubbleStatus?: AssistantBubbleStatus | null;
  },
): MicIntentAction {
  return deriveMicAppearanceFromRuntime(runtime, options).action;
}

export function describeMicIntent(
  runtime: AssistantState,
  assistantBubbleStatus?: AssistantBubbleStatus | null,
): string {
  if (selectIsCommandService(runtime)) {
    if (selectIsCommandThinking(runtime, assistantBubbleStatus)) return 'cancel_thinking';
    if (COMMAND_CAPTURE_STATES.has(runtime.commandState)) return 'exit_command_service';
    return 'exit_command_service';
  }
  if (selectIsAmbientEnabled(runtime)) return 'toggle_service_off';
  return 'toggle_service_on';
}
