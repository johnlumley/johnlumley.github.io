declare namespace my="//my/ns/module";

declare record my:rect(
  height as xs:decimal,
  width as xs:decimal,
  unit as xs:string
);

my:rect(4.0, 2.0, "meters")?height 
(: => serialize({"method":"adaptive"}) :)
(: -> serialize(., {"method":"adaptive"}) :)
