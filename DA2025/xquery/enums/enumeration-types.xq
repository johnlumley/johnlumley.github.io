declare namespace my = "//my/ns/module";
declare type my:unit := enum("metres", "miles");

declare function my:convert($value as xs:decimal, $from as my:unit, $to as my:unit) as xs:decimal {
    (: ? :)
};
