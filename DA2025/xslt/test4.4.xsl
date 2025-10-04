<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" fixed-namespaces="#default" exclude-result-prefixes="#all" version="4.0" xmlns:f="MyFunctions">


   <xsl:mode on-no-match="shallow-copy"/>
   <xsl:strip-space elements="*"/>

   <xsl:template match="year">
      <xsl:copy>
         <xsl:for-each-group select="1 to 10" split-when="count($group) = 3">
            <a g="{current-group()}"/>
         </xsl:for-each-group>
         <xsl:for-each-group select="1, 2, 5, 6, 7, 10, 11" split-when="$next ne ($group[last()] + 1)">
            <a g="{current-group()}"/>
         </xsl:for-each-group>
      </xsl:copy>
   </xsl:template>

</xsl:stylesheet>
