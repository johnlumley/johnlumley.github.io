<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" fixed-namespaces="#default"
   xmlns:f="MyFunctions" exclude-result-prefixes="#all" expand-text="true" version="4.0">

   <xsl:template name="xsl:initial-template">
      <xsl:variable name="powers" as="array(*)">
         <xsl:array for-each="1 to 6" select="., . * .,. * . * ."/>
      </xsl:variable>
      <xsl:variable name="squares" as="array(*)">
         <xsl:array for-each="1 to 5">
            <square no="{.}">{. * .}</square>
         </xsl:array>
      </xsl:variable>
      <xsl:variable name="elements" as="array(*)">
         <xsl:array>
            <a/>
            <b/>
            <c/>
         </xsl:array>
      </xsl:variable>
      <out>
         <powers>{array:for-each($powers,string-join(?,'-'))}</powers>
         <squares>
            <xsl:sequence select="$squares?*"/>
         </squares>
         <elements>
            <xsl:sequence select="$elements?*"/>
         </elements>
      </out>
   </xsl:template>
</xsl:stylesheet>
