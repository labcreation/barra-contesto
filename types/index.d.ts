export type Riempimento = { percent: number; tokens: number; window: number }

declare module 'claude-code' {
  interface PluginState {
    'barra-contesto': { ultimo: Riempimento | null }
  }
}
