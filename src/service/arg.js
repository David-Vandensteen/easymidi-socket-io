import arg from 'arg';
import { easymidi } from '#src/lib/easymidiIO';
import {
  name,
  author,
  version,
  license,
} from '#src/lib/package';

const { log } = console;

const showHelp = () => {
  log('');
  log('');
  log(name, '[options]');
  log('');
  log('     Required options:');
  log('');
  log('   -o    --midi-output         -- midi out interface name (needed on server mode)');
  log('   -p    --port                -- port');
  log('');
  log('     Extra options:');
  log('');
  log('   -i    --midi-input          -- midi in interface name');
  log('   --list     -l               -- show available midi interfaces');
  log('   --help                      -- show help');
  log('');
  log('single way example :');
  log(name, '-o MyMidiDeviceOut -p 3000');
  log('');
  log('bidirectional example :');
  log(name, '-o MyMidiDeviceOut -i MyMidiDeviceIn -p 3000');
  log('');
  log('version', version, author, license);
  process.exit(0);
};

class ArgService {
  constructor() {
    this.args = arg({
      '--midi-input': String,
      '--midi-output': String,
      '--port': Number,
      '--list': Boolean,
      '--help': Boolean,

      // Aliases
      '-i': '--midi-input',
      '-o': '--midi-output',
      '-l': '--list',
      '-p': '--port',
    });
  }

  get port() { return this.args['--port']; }

  get midiInput() { return this.args['--midi-input']; }

  get midiOutput() { return this.args['--midi-output']; }

  get list() { return this.args['--list']; }

  get help() { return this.args['--help']; }

  checkArgumentsAndHelp() {
    if (this.list) {
      log.title('show midi device :');
      log.info('midi inputs :', easymidi.getInputs().toString());
      log.info('midi outputs :', easymidi.getOutputs().toString());
      process.exit(0);
    }
    if (!this.port) showHelp();
    if (!this.midiOutput) showHelp();
  }
}

const argService = new ArgService();

export default argService;
export { argService };
