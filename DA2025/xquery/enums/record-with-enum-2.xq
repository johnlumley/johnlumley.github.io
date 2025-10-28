declare namespace my="//my/ns/module";
declare type my:unit as enum("metres", "yards");

declare function my:factor($from as my:unit, $to as my:unit) as xs:decimal {
    if ($from = $to) then (
        1
    ) else if ($from = "metres" and $to = "yards") then (
        1.09361
    ) else if ($from = "yards" and $to = "metres") then (
        0.9144
    ) else (
        error(xs:QName("my:invalid-unit"), `Cannot determine conversion factor from {$from} to {$to}`)
    )
};

declare record my:rect(
  length as xs:decimal,
  width as xs:decimal,
  unit as my:unit,
  area as fn(my:rect) as xs:decimal := fn {
    ?length × ?width
  },
  convert as fn(my:rect, my:unit) as my:rect := fn($rect, $to) {
    let $factor := my:factor($rect?unit, $to)
    return $rect
      => map:put('length', $rect?length × $factor)
      => map:put('width', $rect?width × $factor)
      => map:put('unit', $to)
  }
);

let $pool := my:rect(50.0, 30.0, "metres")

return $pool 
  =?> convert("yards")
  =?> area()
