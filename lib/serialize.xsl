<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:svg="http://www.w3.org/2000/svg"
    xmlns:math="http://www.w3.org/2005/xpath-functions/math" xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:map="http://www.w3.org/2005/xpath-functions/map" xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT" xmlns:saxon="http://saxon.sf.net/"
    xmlns:js="http://saxonica.com/ns/globalJS" xmlns:doc="http://www.saxonica.com/ns/documentation" xmlns:jwL="https://lists.w3.org/Archives/Public/public-ixml/2022May/0099.html"
    exclude-result-prefixes="xs js v p r doc math map saxon svg f xlink ixsl jwL" xmlns:v="vector" xmlns:p="path" xmlns:r="rail" xmlns:f="MyFunctions"
    version="3.0" xmlns="http://www.w3.org/2000/svg">
    <xsl:function name="f:serialize" as="xs:string*" expand-text="false">
        <xsl:param name="in" as="item()*"/>
        <xsl:sequence select="f:serialize($in, '')"/>
    </xsl:function>
    <xsl:function name="f:serialize" as="xs:string*" expand-text="false">
        <xsl:param name="in" as="item()*"/>
        <xsl:param name="indent" as="xs:string"/>
        <xsl:for-each select="$in">
            <xsl:choose>
                <xsl:when test=". instance of map(*)">
                    <xsl:variable name="indent" select="$indent || '  '"/>
                    <!-- <xsl:text>map{</xsl:text>-->
                    <xsl:sequence
                        select="
                            'map{&#xA;' ||
                            (let $m := .
                            return
                                string-join(map:keys(.) ! ($indent || string(.) || ':' || (let $p := f:serialize($m(.), $indent)
                                return
                                    if (count($p) eq 1) then
                                        $p
                                    else
                                        ('(' || string-join($p, ',') || ')'))), ',&#xA;')) || '}'"/>
                    <!--<xsl:text>}</xsl:text>-->
                </xsl:when>
                <xsl:when test=". instance of attribute()">
                    <xsl:sequence select="name(.) || '=&quot;' || string(.) || '&quot;'"/>
                </xsl:when>
                <xsl:when test=". instance of xs:string">
                    <xsl:sequence select="'&quot;' || string(.) || '&quot;'"/>
                </xsl:when>
                <xsl:when test=". instance of xs:anyAtomicType">
                    <xsl:sequence select="string(.)"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:sequence select="serialize(., map{'indent':true(),'omit-xml-declaration': true()})"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:for-each>
    </xsl:function>
</xsl:stylesheet>