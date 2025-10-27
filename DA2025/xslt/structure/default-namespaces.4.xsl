<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
   fixed-namespaces="#default f=MyFunctions" xmlns:ar="MyArray" exclude-result-prefixes="#all"
   version="4.0" expand-text="true">
   <xsl:mode on-no-match="shallow-copy"/>

   <xsl:function name="f:example">
      <xsl:element name="math:example-result"/>
      <xsl:element name="f:example-result"/>
   </xsl:function>

   <xsl:template name="xsl:initial-template">
      <output>
         <for-each>
            <xsl:sequence select="
                  f:for-each(('a', 'b', 'c'), function ($x, $pos) {
                     $x || string($pos)
                  })"/>
         </for-each>
         <array-index-where>{ar:index-where([(1,2),(3,4,5)],function($x,$pos) { count($x) eq 2
            })}</array-index-where>
         <array-index-of>{ar:index-of([(1,2),(3,4,5)],(1,2))}</array-index-of>
         <xsl:sequence select="f:example()"/>
      </output>
   </xsl:template>
</xsl:stylesheet>
