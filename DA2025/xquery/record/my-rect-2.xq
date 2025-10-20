declare namespace my="//my/ns/module";

declare record my:rect(
  height as xs:decimal,
  width as xs:decimal,
  unit as xs:string
);

declare function my:area($rect as my:rect) as xs:decimal {
  $rect?height * $rect?width
};

let $pool := my:rect(5.0, 3.0, "meters")

return my:area($pool)