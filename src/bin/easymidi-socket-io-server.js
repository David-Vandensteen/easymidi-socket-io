#!/usr/bin/env node
import { argService } from '#src/service/arg';
import { easymidiIO } from '#src/lib/easymidiIO';

const {
  port, midiInput, midiOutput,
} = argService;

argService.checkArgumentsAndHelp();
easymidiIO.startServer(midiOutput, port, { midiInput });
