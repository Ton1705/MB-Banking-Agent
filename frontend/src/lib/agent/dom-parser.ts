export interface DOMContext {
  page: string;
  components: string[];
  actions: string[];
}

export function extractDOMContext(): DOMContext {
  // Find current page
  const pageElement = document.querySelector('[data-page]');
  const page = pageElement ? pageElement.getAttribute('data-page') || 'unknown' : 'unknown';

  // Find all available components
  const componentElements = document.querySelectorAll('[data-component]');
  const components = Array.from(componentElements)
    .map(el => el.getAttribute('data-component'))
    .filter(Boolean) as string[];

  // Find all available actions
  const actionElements = document.querySelectorAll('[data-action]');
  const actions = Array.from(actionElements)
    .map(el => el.getAttribute('data-action'))
    .filter(Boolean) as string[];

  // Remove duplicates
  return {
    page,
    components: [...new Set(components)],
    actions: [...new Set(actions)]
  };
}
