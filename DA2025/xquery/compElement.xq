declare default element namespace "http://www.w3.org/1999/xhtml";
declare namespace svg="http://www.w3.org/2000/svg";

element #body {
  element #div {
    attribute { "class" } { "container" },
    element #Q{}h1 { "SVG Example" },
    element #Q{http://www.w3.org/2000/svg}svg {}
  }
}
