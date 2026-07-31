export interface AgentAction {
  type: 'click' | 'type' | 'navigate';
  target: string; // The data-action, data-component, or path
  value?: string; // Value to type if action is 'type'
  description?: string; // Human readable description of what the agent is doing
}

/**
 * Executes a single action on the DOM.
 */
export async function executeAction(action: AgentAction): Promise<boolean> {
  return new Promise((resolve) => {
    // Add a slight delay to simulate human interaction
    setTimeout(() => {
      try {
        if (action.type === 'navigate') {
          // Find a navigation link or button that matches
          const element = document.querySelector(`[data-action="navigate-${action.target}"]`) as HTMLElement;
          if (element) {
            element.click();
            resolve(true);
            return;
          }
          // Special fallback for sidebar clicks
          const sidebarLink = Array.from(document.querySelectorAll('a')).find(
            a => a.getAttribute('href') === `/${action.target}` || a.getAttribute('href') === action.target
          );
          if (sidebarLink) {
            sidebarLink.click();
            resolve(true);
            return;
          }
        } 
        
        if (action.type === 'click') {
          const element = document.querySelector(`[data-action="${action.target}"]`) as HTMLElement;
          if (element) {
            element.click();
            resolve(true);
            return;
          }
        }
        
        if (action.type === 'type') {
          const element = document.querySelector(`[data-component="${action.target}"]`) as HTMLInputElement;
          if (element && action.value !== undefined) {
            // Set value and dispatch events to trigger React state updates
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            nativeInputValueSetter?.call(element, action.value);
            
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
            resolve(true);
            return;
          }
        }

        console.warn(`Could not execute action: ${action.type} on target: ${action.target}`);
        resolve(false);
      } catch (err) {
        console.error('Error executing action:', err);
        resolve(false);
      }
    }, 500); // 500ms delay per action for visual feedback
  });
}
