<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" fixed-namespaces="#default"
   exclude-result-prefixes="#all" version="4.0" xmlns:f="MyFunctions" expand-text="true">


   <xsl:mode on-no-match="shallow-skip"/>
   <xsl:strip-space elements="*"/>
   <xsl:param name="length" as="xs:integer" select="40"/>

   <xsl:template match="/">
      <xsl:apply-templates select="//para" separator="&#xA;"/>
   </xsl:template>

   <xsl:template match="para">
      <xsl:variable name="t" select="string-join(text(), ' ')"/>
      <xsl:variable name="lines" as="xs:string*">
         <xsl:for-each-group select="tokenize($t, '\s+')"
            split-when="($group, $next) ! string-length() => sum() + count($group) gt $length">
            <xsl:sequence select="string-join(current-group(), ' ') || '&#xA;'"/>
         </xsl:for-each-group>
      </xsl:variable>
      <xsl:sequence select="string-join($lines)"/>
   </xsl:template>



</xsl:stylesheet>
