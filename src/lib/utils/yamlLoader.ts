import { base } from '$app/paths';
import type { Card } from '$lib/types';
import yaml from 'js-yaml';

export async function loadToolsConfig(): Promise<Card[]> {
  try {
    const response = await fetch(`${base}/tools.yaml`);
    const yamlText = await response.text();
    const config = yaml.load(yamlText) as Card[];
    return config;
  } catch (error) {
    console.error('Failed to load tools configuration:', error);
    return [];
  }
}
