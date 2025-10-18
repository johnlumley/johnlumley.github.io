<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" fixed-namespaces="#default"
   exclude-result-prefixes="#all" version="4.0" xmlns:f="MyFunctions" expand-text="true">


   <xsl:mode on-no-match="shallow-copy"/>
   <xsl:strip-space elements="*"/>

   <xsl:template name="xsl:initial-template">
      <result>
         <xsl:for-each-group select="1 to 10" split-when="count($group) = 3">
            <a g="{current-group()}"/>
         </xsl:for-each-group>
         <xsl:for-each-group select="1 to 4,5, 7 to 9, 10 to 12, 14, 15, 20 to 22"
            split-when="$next ne ($group[last()] + 1)">
            <b g="{current-group()}"/>
         </xsl:for-each-group>
      </result>
   </xsl:template>

</xsl:stylesheet>
