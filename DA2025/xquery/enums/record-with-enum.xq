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
  convert as fn($to as my:unit) as xs:decimal := fn {
    let $factor := my:factor(?unit, $to)
    return my:rect(?length * $factor,  ?width * $factor, $to)
  },
  area as fn() as xs:decimal := fn {
    ?length * ?width
  }
  describe as fn() as xs:string := fn {
    `A rectangle with length {?length} {?unit}, width {?width} {?unit} and an area of {. =?> area()} square {?unit}`
  }
);

let $pool := my:rect(50.0, 30.0, "metres")

return (
  $pool =?> describe(),
  $pool =?> convert("yards") =?> describe()
)
