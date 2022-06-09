<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
   xmlns:xs="http://www.w3.org/2001/XMLSchema"
   xmlns:math="http://www.w3.org/2005/xpath-functions/math" xmlns:doc="Documentation"
   xmlns:f="MyFunctions" exclude-result-prefixes="xs math" version="3.0">
   <xsl:mode name="make-controls" on-no-match="shallow-copy" doc:doc="Construct option controls"/>

   <xsl:template match="datalist/option" mode="make-controls">
      <xsl:copy>
         <xsl:apply-templates select="@*, *" mode="#current"/>
      </xsl:copy>
   </xsl:template>
   <xsl:template match="option" mode="make-controls">
      <xsl:sequence
         select="f:makeToggler((@name, ../@name, 'showTest')[1], ., ., (@id, generate-id(.))[1], exists(@default))"
      />
   </xsl:template>
   <xsl:template match="label" mode="make-controls">
      <xsl:sequence select="."/>
   </xsl:template>
   <xsl:template match="title" mode="make-controls">
      <label class="title">
         <xsl:apply-templates mode="#current"/>
      </label>
   </xsl:template>
   <xsl:template match="group[@type eq 'radio']/option" mode="make-controls">
      <xsl:param name="groupName" as="xs:string?" tunnel="true" select="'RadioOption'"/>
      <xsl:sequence
         select="f:makeRadio(../@class, (@value, .)[1], exists(@default), $groupName, ., generate-id(.))"/>
      <!-- <xsl:sequence select="f:makeRadio((../(@class, @name), 'showTest')[1], (@value, .)[1], exists(@default), ../@name, ., generate-id(.))"/>-->
   </xsl:template>
   <xsl:template match="group[@type eq 'radio']" mode="make-controls">
      <xsl:param name="group.id" as="xs:string?" tunnel="true"/>
      <xsl:variable name="name" select="
            if (@name) then
               @name
            else
               $group.id || generate-id(.)"/>
      <div class="radio {@class}" name="{$name}" id="{$name}">
         <xsl:apply-templates mode="#current">
            <xsl:with-param name="groupName" select="$name" tunnel="true"/>
         </xsl:apply-templates>
      </div>
   </xsl:template>

</xsl:stylesheet>
