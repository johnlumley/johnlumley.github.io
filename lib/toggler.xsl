<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT" 
    xmlns:doc="http://www.saxonica.com/ns/documentation"
    xmlns:map="http://www.w3.org/2005/xpath-functions/map"  xmlns:array="http://www.w3.org/2005/xpath-functions/array"
    xmlns:saxon="http://saxon.sf.net/" xmlns:H="http://www.w3.org/1999/xhtml"   xmlns="http://www.w3.org/1999/xhtml"
    xmlns:err="http://www.w3.org/2005/xqt-errors" xmlns:t="http://www.w3.org/2010/09/qt-fots-catalog" xmlns:f="MyFunctions"
    xmlns:sef="http://ns.saxonica.com/xslt/export" exclude-result-prefixes="xs" version="3.0" expand-text="yes">
    
    <!-- DROPPED: xmlns:xp="http://saxonica.com/xpathParse" xmlns:p="CR-xpath-30-20130108"  xmlns:dc="http://purl.org/dc/elements/1.1/" -->

    <!-- Make a toggling checkbox -->
    <xsl:function name="f:makeToggler" as="element()">
        <xsl:param name="class"/>
        <xsl:param name="value"/>
        <xsl:sequence select="f:makeToggler($class, $value, false())"/>
    </xsl:function>
    <xsl:function name="f:makeToggler" as="element()">
        <xsl:param name="class"/>
        <xsl:param name="value"/>
        <xsl:param name="checked" as="xs:boolean"/>
        <xsl:sequence select="f:makeToggler($class, $value, $value, $value,$checked)"/>
    </xsl:function>
    <xsl:function name="f:makeToggler" as="element()">
        <xsl:param name="class"/>
        <xsl:param name="value"/>
        <xsl:param name="label"/>
        <xsl:param name="id"/>
        <xsl:sequence select="f:makeToggler($class, $value, $label, $id,false())"/>
    </xsl:function>
    <xsl:function name="f:makeToggler" as="element()">
        <xsl:param name="class"/>
        <xsl:param name="value"/>
        <xsl:param name="label"/>
        <xsl:param name="id"/>
        <xsl:param name="checked" as="xs:boolean"/>
        <div class="toggler">
            <input class="{$class}" type="checkbox" id="{$id}" value="{$value}">
                <xsl:if test="$checked">
                    <xsl:attribute name="checked"/>
                </xsl:if>
            </input>
            <label class="box" for="{$id}"/>
            <label class="text" for="{$id}">{$label}</label>
        </div>
    </xsl:function>

    <xsl:function name="f:makeRadio" as="element()">
        <xsl:param name="class"/>
        <xsl:param name="value"/>
        <xsl:param name="checked" as="xs:boolean"/>
        <xsl:param name="group"/>
        <xsl:sequence select="f:makeRadio($class, $value, $checked, $group, $value, $value)"/>
    </xsl:function>
    <xsl:function name="f:makeRadio" as="element()">
        <xsl:param name="class"/>
        <xsl:param name="value"/>
        <xsl:param name="checked" as="xs:boolean"/>
        <xsl:param name="group"/>
        <xsl:param name="label"/>
        <xsl:param name="id"/>
        <div class="toggler">
            <input class="{$class}" type="radio" name="{$group}" id="{$id}" value="{$value}">
                <xsl:if test="$checked">
                    <xsl:attribute name="checked"/>
                </xsl:if>
            </input>
            <label class="box" for="{$id}"/>
            <label class="text" for="{$id}">{$label}</label>
        </div>
    </xsl:function>

</xsl:stylesheet>
