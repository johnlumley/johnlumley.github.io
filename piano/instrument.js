const defaultTimbre = {
   wave: 'square', // Oscillator type.
   gain: 0.5, // Overall gain at maximum attack.
   attack: 0.002, // Attack time at the beginning of a tone.
   decay: 0.4, // Rate of exponential decay after attack.
   decayfollow: 0, // Amount of decay shortening for higher notes.
   sustain: 0, // Portion of gain to sustain indefinitely.
   release: 0.1, // Release time after a tone is done.
   cutoff: 0, // Low-pass filter cutoff frequency.
   cutfollow: 0, // Cutoff adjustment, a multiple of oscillator freq.
   resonance: 0, // Low-pass filter resonance.
   detune: 0 // Detune factor for a second oscillator.
};

class InstrumentX {
   constructor (options) {
      this.name = options.wave;
      this._ac = null
      // Audio context.
      this._timbre = makeTimbre(options);
      // The instrument's timbre.
      this._wavetable = options.wavetable
      
      this._startSet =[];
      // Unstarted tones already sent to WebAudio.
      
      this._out = null;
   }
   static timeOffset = 0.0625;
   // Seconds to delay all audiable timing.
   static toneLength = 1;
   // Default duration of a tone.
   static cleanupDelay = 0.1;
   
   setContext(context) {
      //this._atop.ac = context;
      this._ac = context;
      let dcn = context.createDynamicsCompressor();
      dcn.ratio.value = 16;
      dcn.attack.value = 0.0005;
      // All audio for the instrument
      // multiplexes through a single gain node with a master volume.
      let g = context.createGain();
      g.gain.value = 1
      g.connect(dcn)
      dcn.connect(context.destination)
      this._out = g
   }
   attach() {
   }
   
   // Tells the WebAudio API to play a tone (now or soon).  The passed
   // record specifies a start time and release time, an ADSR envelope,
   // and other timbre parameters.  This function sets up a WebAudio
   // node graph for the tone generators and filters for the tone.
   _makeSound(record) {
      let timbre = record.timbre || this._timbre,
      starttime = record.time + InstrumentX.timeOffset,
      releasetime = starttime + record.duration,
      attacktime = Math.min(releasetime, starttime + timbre.attack),
      decaytime = timbre.decay *
      Math.pow(440 / record.frequency, timbre.decayfollow),
      decaystarttime = attacktime,
      stoptime = releasetime + timbre.release,
      doubled = timbre.detune && timbre.detune != 1.0,
      amp = timbre.gain * record.velocity * (doubled ? 0.5: 1.0),
      //ac = this._atop.ac,
      ac = this._ac,
      g, f, o, o2, pwave, k, wf, bwf;
      // Only hook up tone generators if it is an audible sound.
      if (record.duration > 0 && record.velocity > 0) {
         g = ac.createGain();
         g.gain.value = 0;
         g.gain.setValueAtTime(0, starttime);
         g.gain.linearRampToValueAtTime(amp, attacktime);
         // For the beginning of the decay, use linearRampToValue instead
         // of setTargetAtTime, because it avoids http://crbug.com/254942.
         while (decaystarttime < attacktime + 1 / 32 &&
         decaystarttime + 1 / 256 < releasetime) {
            // Just trace out the curve in increments of 1/256 sec
            // for up to 1/32 seconds.
            decaystarttime += 1 / 256;
            g.gain.linearRampToValueAtTime(
            amp * (timbre.sustain + (1 - timbre.sustain) *
            Math.exp((attacktime - decaystarttime) / decaytime)),
            decaystarttime);
         }
         // For the rest of the decay, use setTargetAtTime.
         g.gain.setTargetAtTime(amp * timbre.sustain,
         decaystarttime, decaytime);
         // Then at release time, mark the value and ramp to zero.
         g.gain.setValueAtTime(amp * (timbre.sustain + (1 - timbre.sustain) *
         Math.exp((attacktime - releasetime) / decaytime)), releasetime);
         g.gain.linearRampToValueAtTime(0, stoptime);
         g.connect(this._out);
         // Hook up a low-pass filter if cutoff is specified.
         if ((! timbre.cutoff && ! timbre.cutfollow) || timbre.cutoff == Infinity) {
            f = g;
         } else {
            // Apply the cutoff frequency adjusted using cutfollow.
            f = ac.createBiquadFilter();
            f.frequency.value =
            timbre.cutoff + record.frequency * timbre.cutfollow;
            f.Q.value = timbre.resonance;
            f.connect(g);
         }
         // Hook up the main oscillator.
         o = this.makeOscillator(timbre.wave, record.frequency);
         o.connect(f);
         o.start(starttime);
         o.stop(stoptime);
         // Hook up a detuned oscillator.
         if (doubled) {
            o2 = this.makeOscillator(
            timbre.wave, record.frequency * timbre.detune);
            o2.connect(f);
            o2.start(starttime);
            o2.stop(stoptime);
         }
         // Store nodes in the record so that they can be modified
         // in case the tone is truncated later.
         record.gainNode = g;
         record.oscillators =[o];
         if (doubled) {
            record.oscillators.push(o2);
         }
         record.cleanuptime = stoptime;
      } else {
         // Inaudible sounds are scheduled: their purpose is to truncate
         // audible tones at the same pitch.  But duration is set to zero
         // so that they are cleaned up quickly.
         record.duration = 0;
      }
      this._startSet.push(record);
   }
   makeOscillator(wavename, freq) {
      /*if (wavename == 'noise') {
       var whiteNoise = atop.ac.createBufferSource();
       whiteNoise.buffer = getWhiteNoiseBuf();
       whiteNoise.loop = true;
       return whiteNoise;
       }*/
      let ac = this._ac;
      let wavetable = this._wavetable, o = ac.createOscillator(),
      k, pwave, bwf, wf;
      try {
         if (wavetable) {
            // Use a customized wavetable.
            pwave = wavetable.wave;
            if (wavetable.freq) {
               bwf = 0;
               // Look for a higher-frequency variant.
               for (k in wavetable.freq) {
                  wf = Number(k);
                  if (freq > wf && wf > bwf) {
                     bwf = wf;
                     pwave = wavetable.freq[bwf];
                  }
               }
            }
            o.setPeriodicWave(pwave);
         } else {
            o.type = wavename;
         }
      }
      catch (e) {
         if (window.console) {
            window.console.log(e);
         }
         // If unrecognized, just use square.
         // TODO: support "noise" or other wave shapes.
         o.type = 'square';
      }
      o.frequency.value = freq;
      return o;
   }
}


function makeTimbre(options) {
   if (! options) {
      options = {
      };
   }
   if (typeof (options) == 'string') {
      // Abbreviation: name a wave to get a default timbre for that wave.
      options = {
         wave: options
      };
   }
   let result = {
   },
   key,
   wt = options.wavetable/*s && options.wavetables[options.wave]*/;
   for (key in defaultTimbre) {
      if (options.hasOwnProperty(key)) {
         result[key] = options[key];
      } else if (wt && wt.defs && wt.defs.hasOwnProperty(key)) {
         result[key] = wt.defs[key];
      } else {
         result[key] = defaultTimbre[key];
      }
   }
   return result;
}

function makeInstruments() {
   let result = {
   }
   for (const i in instrumentWaves) {
      result[i] = new InstrumentX({
         wave: i, detune: 0, wavetable: instrumentWaves[i]
      })
   }
   for (const i of[ 'sine', 'square', 'sawtooth', 'triangle']) {
      result[i] = new InstrumentX({
         wave: i/*, detune: 0, wavetable: instrumentWaves[i]*/
      })
   }
   return result
}

class InstrumentSet {
   constructor () {
      this.members = {
      }
   }
   clear() {
      this.members = {
      }
   }
   add(i) {
      this.members[i.name] = i
   }
   find (inst) {
      return this.members[inst]
   }
   setContext(context) {
      for (const i in this.members) {
         this.members[i].setContext(context);
      }
   }
}
const activeInst = new InstrumentSet
const instruments = makeInstruments()
function availableInstruments() {
   return Object.keys(instruments)
}
/*const grand = instruments.piano

 console.log(grand)*/