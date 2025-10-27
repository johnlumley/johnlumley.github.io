declare namespace my = "//my/ns/module";
declare type my:unit as enum("metres", "miles");

declare function my:convert($value as xs:decimal, $from as my:unit, $to as my:unit) as xs:decimal {
    if ($from = $to) then (
        $value
    ) else if ($from = "metres" and $to = "miles") then (
        $value * 0.000621371
    ) else if ($from = "miles" and $to = "metres") then (
        $value * 1609.34
    ) else (
        error(xs:QName("my:invalid-unit"), "Invalid unit conversion")
    )
};

my:convert(1000.0, "metres", "miles")
