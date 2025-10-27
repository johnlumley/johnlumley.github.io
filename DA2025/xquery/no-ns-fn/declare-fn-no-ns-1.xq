declare namespace my = "//my/ns/module";

(: three ways to declare a variable :)
declare variable $my:thing := "This";
declare variable $local:thing := "is";
declare variable $thing := "another value";
(: there is a fourth way, do you know it? :)

declare function my:render ($things as xs:string*) as xs:string {
  string-join($things, " ")
};

my:render(($my:thing, $local:thing, $thing))
