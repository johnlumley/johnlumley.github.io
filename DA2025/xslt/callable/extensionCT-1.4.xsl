<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" fixed-namespaces="#default"
   xmlns:f="MyFunctions" extension-element-prefixes="f" exclude-result-prefixes="#all" version="4.0">

   <xsl:template match="/*">
      <!-- The children of this match are Customers elements -->
      <directories>
         <!-- A call to f:directory for UK and France, 
              producing sorted listings of ContactName and Phone and excluding any managers -->
         <!-- A call to f:directory for Germany, producing a listing of Cities -->
      </directories>
   </xsl:template>

   <xsl:template name="f:directory" expand-text="yes">
      <!-- You'll have to set the types and any default values of these parameters
     to correspond with the use in the code below and the call argument attributes.
     Remember the context item is the same as in the call, i.e. /*
   -->
      <xsl:param name="countries" as="??"/>   <!-- The countries to report on -->
      <xsl:param name="data" as="??"/>  <!-- The data items to examine -->
      <xsl:param name="fields" as="??"/> <!-- The data 'fields' to use -->
      <xsl:param name="sorted" as="??"/> <!-- Sort the list -->

      <!-- You shouldn't need to change this code -->
      <xsl:variable name="field-elements" select="
            function($n) {$n//*[local-name() = $fields]}"/>
      <xsl:for-each select="tokenize($countries)">
         <directory country="{.}" fields="{$fields}">
            <xsl:for-each select="$data[.//Country eq current()]">
               <xsl:sort select="
                     if ($sorted) then
                        $field-elements(.) => head()
                     else
                        true()"/>
               <entry>
                  <xsl:sequence select="string-join($field-elements(.), ' -- ')"/>
               </entry>
            </xsl:for-each>
         </directory>
      </xsl:for-each>
   </xsl:template>
</xsl:stylesheet>
