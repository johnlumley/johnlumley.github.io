declare namespace my = "//my/ns/module";
declare type my:unit as enum("metres", "miles");

declare function my:convert($value as xs:decimal, $from as my:unit, $to as my:unit) as xs:decimal {
    (: convert a value from one unit to another :)
    (: metres to miles factor: 0.000621371 :)
    (: miles to meters factor: 1609.34 :)
};
