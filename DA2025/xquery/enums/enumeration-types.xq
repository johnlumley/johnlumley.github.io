declare namespace my = "//my/ns/module";
declare type my:unit as enum("metres", "miles");

declare function my:is-unit($value as xs:string) as xs:boolean {
  $value instance of my:unit
};

my:is-unit("metres"),
my:is-unit("yards")