<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" fixed-namespaces="#default"
   xmlns:f="MyFunctions" xmlns:ar="MyArray" exclude-result-prefixes="#all" expand-text="true"
   version="4.0">

   <xsl:template match="/">
      <xsl:variable name="duplicates" as="array(*)">
         <!-- Something to collect the duplicate words of each para into an array -->
      </xsl:variable>
      <output>
         <xsl:for-each select="(: some 'iterator' over an array :)">
            <!-- A construction such as:
              <duplicates para="1">and by it The to of for</duplicates>
            -->
         </xsl:for-each>
      </output>
   </xsl:template>
</xsl:stylesheet>
