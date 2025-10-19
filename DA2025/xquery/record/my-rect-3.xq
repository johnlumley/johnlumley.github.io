declare namespace my="//my/ns/module";

declare record my:rect(
  height as xs:decimal,
  width as xs:decimal,
  unit as xs:string
  area as fn() as xs:decimal  := fn { ?height * ?width }
);

let $hall := my:rect( 15.0, 18.0, "foot") 

return $hall =?> area()