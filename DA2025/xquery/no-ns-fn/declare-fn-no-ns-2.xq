declare variable $local:thing := "This is";
declare variable $thing := "another value";

declare function render ($things as xs:string*) as xs:string {
  string-join($things, "")
};

render(($local:thing, $thing))
