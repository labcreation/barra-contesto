import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Riempimento } from '../types'

const ultimo = atom({ plugin: 'barra-contesto', key: 'ultimo' } as const, null)

const SEGMENTI = 20

function migliaia(n: number): string {
  return n >= 1000 ? `${Math.round(n / 1000)}k` : `${n}`
}

async function aggiorna($: EngineInterface): Promise<void> {
  try {
    const { context } = await $.session.usage()
    if (context.tokens === undefined || !context.window) return
    const percent = context.percent ?? Math.round((context.tokens / context.window) * 100)
    const valore: Riempimento = { percent, tokens: context.tokens, window: context.window }
    await update($, ultimo, () => valore)
  } catch {
    // lettura non disponibile in questo momento: la barra resta com'era
  }
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const r = await next(e)
    await aggiorna($).catch(() => undefined)
    return r
  })

  on('turn.complete', async ($, e, next) => {
    const r = await next(e)
    await aggiorna($).catch(() => undefined)
    return r
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const dato = await read($, ultimo)
    if (e.props.hasSurvey || dato === null) return next(e)

    const { Box, Text } = $.ui.resolve(e)
    const p = Math.max(0, Math.min(100, dato.percent))
    const pieni = Math.round((p / 100) * SEGMENTI)
    const colore = p >= 85 ? 'error' : p >= 60 ? 'warning' : 'success'

    return (
      <Box>
        <Text dimColor>Contesto </Text>
        <Text color={colore}>{'█'.repeat(pieni)}</Text>
        <Text dimColor>{'░'.repeat(SEGMENTI - pieni)}</Text>
        <Text color={colore}> {p}%</Text>
        <Text dimColor> ({migliaia(dato.tokens)} / {migliaia(dato.window)} token)</Text>
      </Box>
    )
  })
}
