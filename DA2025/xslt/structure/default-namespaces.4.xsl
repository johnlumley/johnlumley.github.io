<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
   fixed-namespaces="#default f=MyFunctions" exclude-result-prefixes="#all"
   version="4.0" expand-text="true">
   <xsl:mode on-no-match="shallow-copy"/>

   <xsl:function name="f:example">
      <xsl:element name="math:example-result"/>
      <xsl:element name="xs:integer"/>
      <xsl:element name="f:example-result"/>
   </xsl:function>

   <xsl:template name="xsl:initial-template">
      <output>
         <xsl:sequence select="f:example()"/>
      </output>
   </xsl:template>
</xsl:stylesheet>
