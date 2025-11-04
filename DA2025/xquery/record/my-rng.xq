declare namespace my="//my/ns";

declare record my:rng (
  seed as xs:anyAtomicType? := (),
  rng as map(*)? := (),
  seq as xs:double* := (),
  init as fn(my:rng) as my:rng := function ($self) {
      map:put($self, 'rng',
        random-number-generator($self?seed))
  },
  add as fn(my:rng) as my:rng := function ($self) {
    $self
    => map:put("seq", ($self?seq, $self?rng?number))
    => map:put("rng", $self?rng?next())
  }
);

my:rng()
  =?> init()
  =?> add()
  -> ?seq,
my:rng("DA2025")
  =?> init()
  =?> add()
  =?> add()
  -> ?seq