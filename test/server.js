import { easymidiIO } from '#src/lib/easymidiIO';

const { log } = console;

easymidiIO.startServer('mcc-in', 3000);
log(easymidiIO.getInputs());
