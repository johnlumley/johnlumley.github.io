<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" fixed-namespaces="#default"
   xmlns:f="MyFunctions" extension-element-prefixes="f" exclude-result-prefixes="#all" version="4.0">
   
   <xsl:template match="/*">
      <directories>
         <f:directory countries="UK France" sorted="true" data="*[not(contains(ContactTitle,'Manager'))]"
            fields="'ContactName','Phone'"/>
         <f:directory countries="Germany"  fields="'City'"/>
      </directories>
   </xsl:template>
   
   <xsl:template name="f:directory" expand-text="yes">      
      <xsl:param name="countries" as="xs:string"/>
      <xsl:param name="data" as="item()*" select="*"/>
      <xsl:param name="fields" as="xs:string+"/>
      <xsl:param name="sorted" as="xs:boolean" select="false()"/>
      <xsl:variable name="field-elements" select="
         function($n) {$n//*[local-name() = $fields]}"/>
      <xsl:for-each select="tokenize($countries)">
         <directory country="{.}" fields="{$fields}">
            <xsl:for-each select="$data[.//Country eq current()]">
               <xsl:sort select="if($sorted) then $field-elements(.) => head() else true()"/>
               <entry>
                  <xsl:sequence select="string-join($field-elements(.), ' -- ')"/>
               </entry>
            </xsl:for-each>
         </directory>
      </xsl:for-each>
   </xsl:template>
</xsl:stylesheet>
