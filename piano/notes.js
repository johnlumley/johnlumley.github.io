var context = new AudioContext();

var keySetUp =[];
var keySetDown =[];
function setKeys(keys) {
   keySetUp =[];
   keySetDown =[];
   for (const k of keys) {
      const u = k.getElementsByClassName('up').item(0);
      const d = k.getElementsByClassName('down').item(0);
      keySetUp.push(u);
      keySetDown.push(d);
   }
}
function keysDown(time, keys, dur = 0) {
   if (time == 0) {
      /*const delay = 1000 * (context.currentTime - measureStart);*/
       /*      console.log('KD len:' + keys.length + ' dur: ' + dur.toFixed(0) + ' delay: ' + delay.toFixed(0));
       */ for (const k of keys) {
         keySetUp[k].style.display = 'none';
         keySetDown[k].style.display = 'inline';
      }
   } else {
      setTimeout(keysDown, time, 0, keys, time);
   }
}
function keysUp(time, keys, dur = 0) {
   if (time == 0) {
      const delay = 1000 * (context.currentTime - measureStart);
      /*console.log('KU len:' + keys.length + ' dur: ' + dur.toFixed(0) + ' delay: ' + delay.toFixed(0));*/
      if (dur > delay + 15) {
         console.log('Skipped - KU:' + keys + ' dur: ' + dur.toFixed(0) + ' delay: ' + delay.toFixed(0));
      }
      for (const k of keys) {
         keySetUp[k].style.display = 'inline';
         keySetDown[k].style.display = 'none';
      }
   } else {
      setTimeout(keysUp, time, 0, keys, time);
   }
}

function closeContext() {
   if (context != null) {
      context.close()
   }
   context = null
}
function openContext() {
   context = new AudioContext;
   activeInst.setContext(context);
   initClean();
}

function piano(frequency, type, duration = 1, volume = 0.5, delay = 0) {
   let inst = activeInst.find (type)
   let record = {
      time: inst._ac.currentTime + delay,
      frequency: frequency,
      velocity: (volume == null ? 1: volume),
      duration: (duration == null ? Instrument.toneLength: duration /*- arpeggioDelay*/),
      gainNode: null,
      oscillators: null,
   };
   inst._makeSound(record);
}
function lift() {
   for (const key in activeInst.members) {
      let inst = activeInst.members[key];
      for (const r of inst._startSet) {
         r.gainNode && r.gainNode.disconnect();
         r.gainNode = null
      }
   }
}
var measuresClean =[];
function initClean() {
   measuresClean =[];
   for (let i = 0; i < 9; i++) {
      measuresClean.push([]);
   }
}
function clean() {
   const c = measuresClean.shift();
   for (const r of c) {
      r.gainNode && r.gainNode.disconnect();
      r.gainNode = null
   }
   measuresClean.push([]);
}


function addInstrument(name) {
   activeInst.add(instruments[name]);
}

/*  This is just a temporary store */
var currentScore = null;
function setCurrentScore(score) {
   currentScore = score
}
function getCurrentScore() {
   return currentScore;
}

var currentScoreJSON = null;
function setCurrentScoreJSON(score) {
   currentScoreJSON = JSON.parse(score);
}
function playMeasureJSON(no, beat, volume, voicingJSON = "") {
   const measure = currentScoreJSON[no];
   const voicing = JSON.parse(voicingJSON);
   for (const n of measure.notes) {
      if (voicing[n.part] && voicing[n.part].checked) {
         piano(n.freq, voicing[n.part].voice, n.duration * beat, n.volume * volume, n.start * beat);
      } else {
         piano(n.freq, n.voice, n.duration * beat, n.volume * volume, n.start * beat);
      }
   }   
   for (const kd of measure.keyDown) {
      keysDown(980 * beat * kd.beat, kd.keys)
   }
   for (const kd of measure.keyUp) {
      keysUp(980 * beat * kd.beat, kd.keys)
   }
}

var measureStart = 0;
var previousStart = 0;
function recordStart() {
   if (context != null) {
      previousStart = measureStart;
      measureStart = context.currentTime;
      console.log('MS:' + measureStart + ' delay:' +(1000 *(measureStart - previousStart)).toFixed(0));
   }
}


/* Wavetables from https://github.com/PencilCode/musical.js */
const wavetables = {
   piano: {
      real:[0, 0, -0.203569, 0.5, -0.401676, 0.137128, -0.104117, 0.115965, -0.004413, 0.067884, -0.00888, 0.0793, -0.038756, 0.011882, -0.030883, 0.027608, -0.013429, 0.00393, -0.014029, 0.00972, -0.007653, 0.007866, -0.032029, 0.046127, -0.024155, 0.023095, -0.005522, 0.004511, -0.003593, 0.011248, -0.004919, 0.008505],
      imag:[0, 0.147621, 0, 0.000007, -0.00001, 0.000005, -0.000006, 0.000009,
      0, 0.000008, -0.000001, 0.000014, -0.000008, 0.000003, -0.000009, 0.000009, -0.000005, 0.000002, -0.000007, 0.000005, -0.000005, 0.000005, -0.000023, 0.000037, -0.000021, 0.000022, -0.000006, 0.000005, -0.000004, 0.000014, -0.000007, 0.000012],
      // How to adjust the harmonics for the higest notes.
      mult:[1, 1, 0.18, 0.016, 0.01, 0.01, 0.01, 0.004,
      0.014, 0.02, 0.014, 0.004, 0.002, 0.00001],
      // The frequencies at which to interpolate the harmonics.
      freq:[65, 80, 100, 135, 180, 240, 620, 1360],
      // The default filter settings to use for the piano wave.
      // TODO: this approach attenuates low notes too much -
      // this should be fixed.
      defs: {
         wave: 'piano', gain: 0.5,
         attack: 0.002, decay: 0.25, sustain: 0.03, release: 0.1,
         decayfollow: 0.7,
         cutoff: 800, cutfollow: 0.1, resonance: 1, detune: 0.9994
      }
   },
   trombone: {
      real:[
      0.000000,
      0.171738,
      0.131907, -0.194800, -0.129913, -0.081043,
      0.049213,
      0.027828, -0.008357, -0.005044,
      0.002145,
      0.000773, -0.001392, -0.000916, -0.000012,
      0.000323, -0.000003,
      0.000127, -0.000135, -0.000029, -0.000031,
      0.000087, -0.000091,
      0.000005, -0.000026,
      0.000027, -0.000062, -0.000017, -0.000002,
      0.000002,
      0.000012, -0.000024],
      imag:[
      0.000000, -0.090905,
      0.482287, 0.259485,
      0.009402, -0.125271, -0.046816,
      0.007872,
      0.001762, -0.010488, -0.002305,
      0.001791,
      0.001101, -0.000303, -0.000064,
      0.000143,
      0.000059,
      0.000116,
      0.000120, -0.000011, -0.000066, -0.000019,
      0.000024,
      0.000014,
      0.000069,
      0.000056,
      0.000005,
      0.000002, -0.000026, -0.000015,
      0.000055,
      0.000012],
      // How to adjust the harmonics for the higest notes.
      mult:[1, 1, 0.18, 0.016, 0.01, 0.01, 0.01, 0.004,
      0.014, 0.02, 0.014, 0.004, 0.002, 0.00001],
      // The frequencies at which to interpolate the harmonics.
      freq:[65, 80, 100, 135, 180, 240, 620, 1360],
      // The default filter settings to use for the piano wave.
      // TODO: this approach attenuates low notes too much -
      // this should be fixed.
      defs: {
         wave: 'trombone', gain: 0.5,
         attack: 0.002, decay: 0.25, sustain: 0.03, release: 0.1,
         decayfollow: 0.7,
         cutoff: 800, cutfollow: 0.1, resonance: 1, detune: 0.9994
      }
   },
   wurlitzer: {
      real:[
      0.000000, -0.000000, -0.382713,
      0.500000, -0.114418,
      0.453856, -0.121481,
      0.273632, -0.190467,
      0.116104, -0.171632,
      0.024640, -0.133620,
      0.028582, -0.103649,
      0.085895, -0.075858,
      0.088487, -0.028478,
      0.065485, -0.007914,
      0.040534, -0.035028,
      0.023703, -0.021164,
      0.018341, -0.013231,
      0.010474, -0.008555,
      0.005816, -0.005546,
      0.005456],
      imag:[
      0.000000,
      0.321119, -0.000002,
      0.000007, -0.000003,
      0.000017, -0.000007,
      0.000020, -0.000018,
      0.000014, -0.000026,
      0.000004, -0.000029,
      0.000007, -0.000031,
      0.000029, -0.000028,
      0.000038, -0.000013,
      0.000036, -0.000005,
      0.000026, -0.000024,
      0.000019, -0.000019,
      0.000018, -0.000013,
      0.000012, -0.000011,
      0.000007, -0.000008,
      0.000007],
      // How to adjust the harmonics for the higest notes.
      mult:[1, 1, 0.18, 0.016, 0.01, 0.01, 0.01, 0.004,
      0.014, 0.02, 0.014, 0.004, 0.002, 0.00001],
      // The frequencies at which to interpolate the harmonics.
      freq:[65, 80, 100, 135, 180, 240, 620, 1360],
      // The default filter settings to use for the piano wave.
      // TODO: this approach attenuates low notes too much -
      // this should be fixed.
      defs: {
         wave: 'wurlitzer', gain: 0.5,
         attack: 0.002, decay: 0.5, sustain: 0.53, release: 0.1,
         decayfollow: 0.7,
         cutoff: 800, cutfollow: 0.1, resonance: 1, detune: 0.9994
      }
   },
   organ2: {
      real:[
      0.000000, -0.000000, -0.042008,
      0.010474, -0.138038,
      0.002641, -0.001673,
      0.001039, -0.021054,
      0.000651, -0.000422,
      0.000334, -0.000236,
      0.000191, -0.000161,
      0.000145, -0.018478,
      0.000071, -0.000066,
      0.000047, -0.000044,
      0.000041, -0.000034,
      0.000031, -0.000030,
      0.000028, -0.000025,
      0.000024, -0.000022,
      0.000020],
      imag:[
      0.000000,
      0.196487, -0.000000,
      0.000000, -0.000003,
      0.000000, -0.000000,
      0.000000, -0.000002,
      0.000000, -0.000000,
      0.000000, -0.000000,
      0.000000, -0.000000,
      0.000000, -0.000007,
      0.000000, -0.000000,
      0.000000, -0.000000,
      0.000000, -0.000000,
      0.000000, -0.000000,
      0.000000, -0.000000,
      0.000000, -0.000000,
      0.000000, -0.000000,
      0.000000],
      // How to adjust the harmonics for the higest notes.
      mult:[1, 1, 0.18, 0.016, 0.01, 0.01, 0.01, 0.004,
      0.014, 0.02, 0.014, 0.004, 0.002, 0.00001],
      // The frequencies at which to interpolate the harmonics.
      freq:[65, 80, 100, 135, 180, 240, 620, 1360],
      // The default filter settings to use for the piano wave.
      // TODO: this approach attenuates low notes too much -
      // this should be fixed.
      defs: {
         wave: 'wurlitzer', gain: 0.5,
         attack: 0.002, decay: 0.5, sustain: 0.53, release: 0.1,
         decayfollow: 0.7,
         cutoff: 800, cutfollow: 0.1, resonance: 1, detune: 0.9994
      }
   },
   organ3: {
      real:[
      0.000000, -0.000000, -0.060720,
      0.030357, -0.015136,
      0.006684, -0.003512,
      0.002544, -0.002455,
      0.002315, -0.001264,
      0.004643, -0.000089,
      0.000353, -0.000165,
      0.000152, -0.000145,
      0.000184, -0.000123,
      0.000216, -0.000135,
      0.000222, -0.000219,
      0.000066, -0.000701,
      0.000387, -0.000125,
      0.000341, -0.000117,
      0.004817, -0.000568,
      0.003995],
      imag:[
      0.000000,
      0.168526, -0.000000,
      0.000000, -0.000000,
      0.000000,
      0.000000,
      0.000000,
      0.000000,
      0.000000,
      0.000000,
      0.000001,
      0.000000,
      0.000000,
      0.000000,
      0.000000,
      0.000000,
      0.000000,
      0.000000,
      0.000000,
      0.000000,
      0.000000,
      0.000000,
      0.000000, -0.000001,
      0.000000,
      0.000000,
      0.000000,
      0.000000,
      0.000006, -0.000001,
      0.000006],
      // How to adjust the harmonics for the higest notes.
      mult:[1, 1, 0.18, 0.016, 0.01, 0.01, 0.01, 0.004,
      0.014, 0.02, 0.014, 0.004, 0.002, 0.00001],
      // The frequencies at which to interpolate the harmonics.
      freq:[65, 80, 100, 135, 180, 240, 620, 1360],
      // The default filter settings to use for the piano wave.
      // TODO: this approach attenuates low notes too much -
      // this should be fixed.
      defs: {
         wave: 'wurlitzer', gain: 0.5,
         attack: 0.002, decay: 0.5, sustain: 0.53, release: 0.1,
         decayfollow: 0.7,
         cutoff: 800, cutfollow: 0.1, resonance: 1, detune: 0.9994
      }
   },
   chorus: {
      real:[
      0.000000, -0.056752, -0.485551,
      0.414947,
      0.037289, -0.089027,
      0.041126,
      0.025816, -0.000195, -0.002759, -0.019563,
      0.000880, -0.017563, -0.002858,
      0.001327, -0.000568, -0.000064, -0.000954, -0.000392, -0.000428,
      0.001213, -0.001126, -0.000210,
      0.000262,
      0.000032, -0.000070, -0.000023,
      0.000035,
      0.000059,
      0.000468,
      0.000205, -0.000136],
      imag:[
      0.000000, -0.142044,
      0.119331,
      0.086961,
      0.000519,
      0.061124, -0.008195,
      0.003663, -0.001992, -0.005229, -0.003499,
      0.002940,
      0.003171,
      0.011203,
      0.000387,
      0.000902, -0.000191,
      0.000550,
      0.000462, -0.000264,
      0.000833, -0.000158, -0.000038,
      0.000010, -0.000177, -0.000061,
      0.000129, -0.000167, -0.000071,
      0.000171,
      0.000137,
      0.000078],
      // How to adjust the harmonics for the higest notes.
      mult:[1, 1, 0.18, 0.016, 0.01, 0.01, 0.01, 0.004,
      0.014, 0.02, 0.014, 0.004, 0.002, 0.00001],
      // The frequencies at which to interpolate the harmonics.
      freq:[65, 80, 100, 135, 180, 240, 620, 1360],
      // The default filter settings to use for the piano wave.
      // TODO: this approach attenuates low notes too much -
      // this should be fixed.
      defs: {
         wave: 'chorus', gain: 0.5,
         attack: 0.002, decay: 0.5, sustain: 0.83, release: 0.1,
         decayfollow: 0.7,
         cutoff: 800, cutfollow: 0.1, resonance: 1, detune: 0.9994
      }
   },
   guitar12: {
      real:[
      0.000000, -0.000000, -0.179748,
      0.252497, -0.212162,
      0.069443, -0.067304,
      0.006291, -0.063344,
      0.007604, -0.069661,
      0.004429, -0.019030,
      0.000601, -0.001895,
      0.000841, -0.009026,
      0.001311, -0.024059,
      0.002217, -0.019063,
      0.002118, -0.048490,
      0.000659, -0.007014,
      0.000529, -0.003632,
      0.000157, -0.000265,
      0.000046, -0.000325,
      0.000503],
      imag:[
      0.000000,
      0.208930, -0.000001,
      0.000004, -0.000005,
      0.000003, -0.000004,
      0.000000, -0.000006,
      0.000001, -0.000010,
      0.000001, -0.000004,
      0.000000, -0.000001,
      0.000000, -0.000003,
      0.000001, -0.000012,
      0.000001, -0.000011,
      0.000001, -0.000035,
      0.000001, -0.000006,
      0.000000, -0.000004,
      0.000000,
      0.000000,
      0.000000,
      0.000000,
      0.000001],
      // How to adjust the harmonics for the higest notes.
      mult:[1, 1, 0.18, 0.016, 0.01, 0.01, 0.01, 0.004,
      0.014, 0.02, 0.014, 0.004, 0.002, 0.00001],
      // The frequencies at which to interpolate the harmonics.
      freq:[65, 80, 100, 135, 180, 240, 620, 1360],
      // The default filter settings to use for the piano wave.
      // TODO: this approach attenuates low notes too much -
      // this should be fixed.
      defs: {
         wave: 'chorus', gain: 0.5,
         attack: 0.002, decay: 0.05, sustain: 0.03, release: 0.1,
         decayfollow: 0.7,
         cutoff: 800, cutfollow: 0.1, resonance: 1, detune: 0.9994
      }
   }
}
const wave = new PeriodicWave(context, {
   real: wavetables.piano.real,
   imag: wavetables.piano.imag,
});

function makeWaves (wavedata) {
   function makePeriodicWave(data) {
      let n = data.real.length,
      real = new Float32Array(n),
      imag = new Float32Array(n),
      j;
      for (j = 0; j < n;++ j) {
         real[j] = data.real[j];
         imag[j] = data.imag[j];
      }
      return context.createPeriodicWave(real, imag);
   }
   function makeMultiple(data, mult, amt) {
      let result = {
         real:[], imag:[]
      },
      j, n = data.real.length, m;
      for (j = 0; j < n;++ j) {
         m = Math.log(mult[Math.min(j, mult.length - 1)]);
         result.real.push(data.real[j] * Math.exp(amt * m));
         result.imag.push(data.imag[j] * Math.exp(amt * m));
      }
      return result;
   }
   let result = {
   },
   k, d, n, j, ff, record, wave, pw;
   for (k in wavedata) {
      d = wavedata[k];
      wave = makePeriodicWave(d);
      if (! wave) {
         continue;
      }
      record = {
         wave: wave
      };
      // A strategy for computing higher frequency waveforms: apply
      // multipliers to each harmonic according to d.mult.  These
      // multipliers can be interpolated and applied at any number
      // of transition frequencies.
      if (d.mult) {
         ff = wavedata[k].freq;
         record.freq = {
         };
         for (j = 0; j < ff.length;++ j) {
            wave =
            makePeriodicWave(makeMultiple(d, d.mult, (j + 1) / ff.length));
            if (wave) {
               record.freq[ff[j]] = wave;
            }
         }
      }
      // This wave has some default filter settings.
      if (d.defs) {
         record.defs = d.defs;
      }
      result[k] = record;
   }
   return result;
}

const instrumentWaves = makeWaves(wavetables);