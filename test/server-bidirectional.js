import { easymidiIO } from '#src/lib/easymidiIO';

const { log } = console;

easymidiIO.startServer('mcc-in', 3000, { midiInput: 'mcc-out' });

log('midi input :');
log(easymidiIO.getInputs());

log('midi output :');
log(easymidiIO.getOutputs());
