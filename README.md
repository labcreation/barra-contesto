# barra-contesto

Mostra sopra il campo di scrittura una barra da 0 a 100% che indica quanto è pieno il contesto della conversazione corrente, con i token usati e la dimensione della finestra del modello. La barra è verde sotto il 60%, gialla fino all'85% e rossa oltre. Si aggiorna all'avvio della sessione e alla fine di ogni turno (quindi anche dopo una compattazione). Non richiede configurazione.

## Installazione

Nel terminale di Claude Code, al prompt:

`/plugin install barra-contesto --marketplace labcreation/barra-contesto`

Da una shell:

`claude plugin install barra-contesto --marketplace labcreation/barra-contesto`

Nell'app desktop, dove `/plugin` non è disponibile: clic su + accanto al campo di scrittura, poi Plugins, Add marketplace con `labcreation/barra-contesto`, poi Add plugin.

Il repository è privato: l'installazione funziona solo per chi può leggerlo su GitHub e ha già una credenziale git per github.com sul proprio computer (chiave SSH, oppure `gh auth login` seguito da `gh auth setup-git`).
