<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:math="http://www.w3.org/2005/xpath-functions/math"
   xmlns:map="http://www.w3.org/2005/xpath-functions/map" xmlns:saxon="http://saxon.sf.net/" xmlns:f="MyFunctions" xmlns:err="http://www.w3.org/2005/xqt-errors" xmlns:X="xslt2"
   exclude-result-prefixes="xs X math f saxon" version="4.0" expand-text="true">

   <xsl:output method="xml" indent="true"/>
   <xsl:namespace-alias stylesheet-prefix="X" result-prefix="xsl"/>

   <xsl:param name="debug" as="xs:boolean" select="true()" static="true"/>

   <xsl:mode on-no-match="shallow-copy"/>

   <xsl:function name="f:staticError">
      <xsl:param name="code" as="xs:integer"/>
      <xsl:param name="message" as="xs:string"/>
      <xsl:sequence select="error(xs:QName('err:XTSE' || $code), $message)"/>
   </xsl:function>
   <xsl:function name="f:err0010">
      <xsl:param name="context"/>
      <xsl:param name="content"/>
      <xsl:sequence select="error(xs:QName('err:XTSE0010'), 'An ' || name($context) || ' element may not contain ' || string-join($content ! name(.), ',') || ' elements')"/>
   </xsl:function>
   <xsl:function name="f:err3185">
      <xsl:param name="context"/>
      <xsl:param name="attribute" as="xs:string"/>
      <xsl:sequence select="error(xs:QName('err:XTSE3185'), 'An ' || name($context) || ' element with a ' || $attribute || ' attribute must be empty')"/>
   </xsl:function>
   <xsl:function name="f:err3185">
      <xsl:param name="context"/>
      <xsl:sequence select="f:err3185($context, 'select')"/>
   </xsl:function>

   <xsl:function name="f:boolean">
      <xsl:param name="in"/>
      <xsl:choose>
         <xsl:when test="empty($in)">
            <xsl:sequence select="false()"/>
         </xsl:when>
         <xsl:when test="normalize-space($in) = ('yes', 'true', '1')">
            <xsl:sequence select="true()"/>
         </xsl:when>
         <xsl:when test="normalize-space($in) = ('no', 'false', '0')">
            <xsl:sequence select="false()"/>
         </xsl:when>
         <xsl:otherwise>
            <xsl:sequence select="error(xs:QName('err:XTSE0010'), $in || ' is not a valid boolean value')"/>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:function>

   <xsl:template match="/">
      <xsl:try>
         <xsl:apply-templates/>
         <xsl:catch>
            <xsl:message>{$err:code} {$err:description}</xsl:message>
         </xsl:catch>
      </xsl:try>
   </xsl:template>

   <xsl:template match="xsl:stylesheet">
      <xsl:apply-templates mode="inclusions"/>
      <xsl:copy>
         <xsl:apply-templates select="@*"/>
         <xsl:text>            
         </xsl:text>
         <xsl:comment>DO NOT EDIT - 
            generated from {base-uri(.)} at {current-dateTime()} by {system-property('xsl:product-version')}</xsl:comment>
         <xsl:variable name="extension-element-prefixes" select="tokenize(@extension-element-prefixes)"/>
         <xsl:variable name="extension-named-templates" select="xsl:template[contains(@name, ':') and substring-before(@name, ':') = $extension-element-prefixes]"/>
         <!--<xsl:comment>{$extension-named-templates/@name}</xsl:comment>-->

         <xsl:variable name="record-types" as="element()*">
            <xsl:apply-templates select="xsl:record-type" mode="record-type"/>
         </xsl:variable>
         <xsl:variable name="item-types" select="map:merge((xsl:item-type, $record-types) ! map {@name: @as})"/>
         <xsl:apply-templates select="xsl:record-type" mode="record-type-constructor">
            <xsl:with-param name="item-types" as="map(*)" select="$item-types" tunnel="true"/>
         </xsl:apply-templates>

         <!-- <xsl:comment>item types: {map:keys($item-types)}</xsl:comment>-->
         <xsl:apply-templates>
            <xsl:with-param name="extension-named-templates" select="map:merge($extension-named-templates ! map:entry(@name, .))" tunnel="true"/>
            <xsl:with-param name="item-types" as="map(*)" select="$item-types" tunnel="true"/>
         </xsl:apply-templates>
      </xsl:copy>
   </xsl:template>

   <xsl:template match="@f:s[. eq '^']" mode="#all">
      <xsl:attribute name="{name()}" select="saxon:line-number(.)"/>
   </xsl:template>

   <xsl:template match="xsl:item-type"/>
   <xsl:template match="xsl:record-type"/>
   <xsl:template match="xsl:note"/>

   <xsl:template match="xsl:record-type" mode="record-type" expand-text="yes">
      <X:item-type name="{@name}" visibility="{@visibility otherwise 'private'}">
         <xsl:attribute name="as">
            <xsl:text>record(</xsl:text>
            <xsl:for-each select="xsl:field" separator=", ">
               <xsl:variable name="optional" as="xs:boolean" select="normalize-space(@required) = ('no', 'false', '0')"/> {@name}{'?'[$optional]} as {@as otherwise 'item()*'} </xsl:for-each>
            <xsl:if test="normalize-space(@extensible) = ('yes', 'true', '1')">
               <xsl:text>, *</xsl:text>
            </xsl:if>
            <xsl:text>)</xsl:text>
         </xsl:attribute>
      </X:item-type>
   </xsl:template>
   <xsl:template match="xsl:record-type" mode="record-type-constructor" expand-text="yes">
      <xsl:if test="f:boolean((@constructor, 'true')[1])">
         <xsl:variable name="constructor">
            <X:function name="{@name}" visibility="{(@visibility otherwise 'private')}">
               <xsl:variable name="as" as="element()">
                  <X:temp as="{@name}"/>
               </xsl:variable>
               <xsl:apply-templates select="$as/@as"/>

               <!-- if the record type is extensible, choose a name for the options parameter -->
               <xsl:variable name="options-param" as="xs:string?">
                  <xsl:if test="normalize-space(@extensible) = ('yes', 'true', 'a')">
                     <xsl:sequence select="('options', (1 to count(xsl:field)) ! `options{.}`)
                  [not(. = current()/xsl:field/@name)][1]"/>
                  </xsl:if>
               </xsl:variable>

               <!-- declare the parameters -->
               <xsl:for-each select="xsl:field">
                  <X:param name="{@name}" required="{(@required,'yes')[1]}">
                     <xsl:attribute name="as">
                        <xsl:variable name="as" select="normalize-space((@as, 'item()*')[1])"/>
                        <xsl:variable name="optional" select="normalize-space(@required) = ('no', 'false', '0')"/>
                        <xsl:choose>
                           <xsl:when test="not($optional)" select="$as"/>
                           <!-- for optional fields, amend the required type to allow () -->
                           <xsl:when test="matches($as, '[?*]$')">
                              <xsl:sequence select="$as"/>
                           </xsl:when>
                           <xsl:when test="matches($as, '\+$')">
                              <xsl:sequence select="replace($as, '\+$', '*')"/>
                           </xsl:when>
                           <xsl:otherwise>
                              <xsl:sequence select="$as || '?'"/>
                           </xsl:otherwise>
                        </xsl:choose>
                     </xsl:attribute>
                     <xsl:if test="@default">
                        <xsl:attribute name="select" select="@default"/>
                     </xsl:if>
                  </X:param>
               </xsl:for-each>

               <!-- for an extensible record type, declare the options parameter -->
               <xsl:if test="exists($options-param)">
                  <X:param name="{$options-param}" as="map(*)" required="no" select="{}"/>
               </xsl:if>

               <!-- function body: construct a map -->
               <X:map duplicates="fn($first, $second){{$first}}">
                  <xsl:for-each select="xsl:field">
                     <xsl:variable name="optional" select="normalize-space(@required) = ('no', 'false', '0')"/>
                     <xsl:choose>
                        <xsl:when test="$optional and not(@default)">
                           <!-- omit map entries for optional fields if no value is supplied -->
                           <X:if test="exists(${@name})">
                              <X:map-entry key="'{@name}'" select="${@name}"/>
                           </X:if>
                        </xsl:when>
                        <xsl:otherwise>
                           <X:map-entry key="'{@name}'" select="${@name}"/>
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:for-each>

                  <!-- if the record type is extensible, 
              add entries from the options parameter -->

                  <xsl:if test="exists($options-param)">
                     <X:sequence select="${$options-param}"/>
                  </xsl:if>

               </X:map>
            </X:function>
         </xsl:variable>
         <xsl:apply-templates select="$constructor"/>
      </xsl:if>
   </xsl:template>

   <xsl:template match="xsl:pipeline">
      <xsl:apply-templates select="." mode="pipeline"/>
   </xsl:template>

   <xsl:template match="
         xsl:otherwise[@select] | xsl:when[@select] | xsl:map[@select] | xsl:result-document[@select]
         | xsl:matching-substring[@select] | xsl:non-matching-substring[@select]">
      <xsl:if test="exists(node())">
         <xsl:sequence select="f:err3185(.)"/>
      </xsl:if>
      <xsl:copy>
         <xsl:apply-templates select="@* except @select" mode="#current"/>
         <xsl:apply-templates select="@select" mode="#current"/>
      </xsl:copy>
   </xsl:template>
   <xsl:template match="
         xsl:otherwise/@select | xsl:when/@select | xsl:map/@select | xsl:result-document/@select
         | xsl:matching-substring/@select | xsl:non-matching-substring/@select">
      <X:sequence>
         <xsl:sequence select="."/>
      </X:sequence>
   </xsl:template>

   <xsl:template match="xsl:if[@then]" priority="5">
      <xsl:if test="exists(node())">
         <xsl:sequence select="f:err3185(., 'then')"/>
      </xsl:if>
      <X:choose>
         <X:when>
            <xsl:sequence select="@test"/>
            <X:sequence select="{@then}"/>
         </X:when>
         <xsl:if test="@else">
            <X:otherwise>
               <X:sequence select="{@else}"/>
            </X:otherwise>
         </xsl:if>
      </X:choose>
   </xsl:template>

   <xsl:template match="xsl:select">
      <X:sequence>
         <xsl:attribute name="select">
            <xsl:value-of select="."/>
         </xsl:attribute>
      </X:sequence>
   </xsl:template>

   <xsl:template match="*">
      <xsl:param name="extension-named-templates" as="map(*)?" select="map {}" tunnel="true"/>
      <xsl:choose>
         <xsl:when test="map:contains($extension-named-templates, name())">
            <xsl:apply-templates select="." mode="extension-named-template"/>
         </xsl:when>
         <xsl:otherwise>
            <xsl:next-match/>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>

   <xsl:template match="xsl:*/@as" mode="#all">
      <xsl:param name="item-types" as="map(*)?" select="map {}" tunnel="true"/>
      <xsl:choose>
         <xsl:when test="map:contains($item-types, .)">
            <xsl:attribute name="{name(.)}" select="$item-types(.)"/>
         </xsl:when>
         <xsl:otherwise>
            <xsl:next-match/>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>

   <xsl:template match="xsl:include/@href | xsl:import/@href">
      <xsl:variable name="uri" select="resolve-uri(., base-uri(.))"/>
      <xsl:variable name="doc" select="doc($uri)"/>
      <xsl:variable name="version" select="$doc/xsl:stylesheet/@version" as="xs:decimal"/>
      <xsl:attribute name="href" select="
            if ($version eq 4.0) then
               replace(., '\.4\.', '.3.')
            else
               ."/>
   </xsl:template>
   <xsl:variable name="fixed-namespaces" as="map(*)" select="
         map {
            'array': 'http://www.w3.org/2005/xpath-functions/array',
            'err': 'http://www.w3.org/2005/xqt-errors',
            'fn': 'http://www.w3.org/2005/xpath-functions',
            'map': 'http://www.w3.org/2005/xpath-functions/map',
            'math': 'http://www.w3.org/2005/xpath-functions/math',
            'xml': 'http://www.w3.org/XML/1998/namespace',
            'xs': 'http://www.w3.org/2001/XMLSchema',
            'xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            'xsl': 'http://www.w3.org/1999/XSL/Transform'
         }"/>

   <xsl:template match="xsl:stylesheet/@fixed-namespaces">
      <xsl:variable name="parent" select=".."/>
      <xsl:for-each select="tokenize(.)">
         <xsl:choose>
            <xsl:when test=". eq '#default'">
               <xsl:for-each select="map:keys($fixed-namespaces)">
                  <xsl:variable name="prefix" select="."/>
                  <xsl:variable name="uri" select="$fixed-namespaces(.)"/>
                  <xsl:for-each select="$parent">
                     <xsl:namespace name="{$prefix}" select="$uri"/>
                  </xsl:for-each>
               </xsl:for-each>
            </xsl:when>
            <xsl:when test="contains(., '=')">
               <xsl:variable name="prefix" select="substring-before(., '=')"/>
               <xsl:variable name="uri" select="substring-after(., '=')"/>
               <xsl:for-each select="$parent">
                  <xsl:namespace name="{$prefix}" select="$uri"/>
               </xsl:for-each>
            </xsl:when>
            <xsl:when test="map:contains($fixed-namespaces, .)">
               <xsl:variable name="prefix" select="."/>
               <xsl:variable name="uri" select="$fixed-namespaces(.)"/>
               <xsl:for-each select="$parent">
                  <xsl:namespace name="{$prefix}" select="$uri"/>
               </xsl:for-each>
            </xsl:when>
            <xsl:otherwise>
               <xsl:sequence select="error(xs:QName('err:XTSE0122'), '&quot;' || . || '&quot; is not a permitted form for a fixed-namespace token')"/>
            </xsl:otherwise>
         </xsl:choose>
      </xsl:for-each>
   </xsl:template>

   <xsl:mode name="inclusions" on-no-match="deep-skip"/>
   <xsl:template match="xsl:include | xsl:import" mode="inclusions">
      <xsl:variable name="uri" select="resolve-uri(@href, base-uri(.))"/>
      <xsl:variable name="doc" select="doc($uri)"/>
      <xsl:variable name="version" select="$doc/xsl:stylesheet/@version" as="xs:decimal"/>
      <!-- <xsl:message>{@href}: {$version}</xsl:message>-->
      <xsl:if test="$version eq 4.0 and matches($uri, '\.4\.')">
         <!--<xsl:message>{serialize($doc,map{'indent':true()})}</xsl:message>-->
         <xsl:result-document href="{replace($uri,'\.4\.','.3.')}">
            <xsl:apply-templates select="$doc"/>
         </xsl:result-document>
      </xsl:if>
   </xsl:template>


   <xsl:template match="xsl:mode[xsl:template]">
      <xsl:if test="empty(@name)">
         <xsl:sequence select="error(xs:QName('err:XTSE4005'), 'An enclosing mode must have a @name attribute')"/>
      </xsl:if>
      <xsl:comment use-when="$debug">Enclosing mode: {@name}</xsl:comment>
      <xsl:copy>
         <xsl:apply-templates select="@* except @as" mode="#current"/>
      </xsl:copy>

      <xsl:apply-templates select="xsl:template" mode="#current">
         <xsl:with-param name="default-mode" as="attribute()" tunnel="true">
            <xsl:attribute name="mode" select="@name"/>
         </xsl:with-param>
         <xsl:with-param name="as" select="@as" as="attribute()?" tunnel="true"/>
         <xsl:with-param name="xpath-default-namespace" select="@xpath-default-namespace" as="attribute()?" tunnel="true"/>
         <xsl:with-param name="tunnel-parameters" as="element()*" select="xsl:note[@type eq 'tunnel-parameters']/xsl:param" tunnel="true"/>
      </xsl:apply-templates>
      <xsl:comment use-when="$debug">End mode: {@name}</xsl:comment>
   </xsl:template>

   <xsl:template match="xsl:mode/xsl:template">
      <xsl:param name="default-mode" as="attribute()" tunnel="true"/>
      <xsl:param name="as" as="attribute()?" tunnel="true"/>
      <xsl:param name="xpath-default-namespace" as="attribute()?" tunnel="true"/>
      <xsl:param name="tunnel-parameters" as="element()*" tunnel="true"/>
      <xsl:choose>
         <xsl:when test="empty(@match)">
            <xsl:sequence select="error(xs:QName('err:XTSE4010'), 'A template within an enclosing mode must have @match attribute')"/>
         </xsl:when>
         <xsl:when test="exists(@name)">
            <xsl:sequence select="error(xs:QName('err:XTSE4010'), 'A template within an enclosing mode must not have a name=&quot;' || @name || '&quot; attribute')"/>
         </xsl:when>
         <xsl:when test="exists(@mode)">
            <xsl:sequence select="error(xs:QName('err:XTSE4010'), 'A template within an enclosing mode must not have a mode=&quot;' || @mode || '&quot; attribute. ')"/>
         </xsl:when>
      </xsl:choose>
      <xsl:copy>
         <xsl:sequence select="$default-mode, $xpath-default-namespace"/>
         <xsl:apply-templates select="$as" mode="#current"/>
         <xsl:apply-templates select="@*" mode="#current"/>
         <xsl:sequence select="$tunnel-parameters"/>
         <xsl:apply-templates select="node()" mode="#current"/>
      </xsl:copy>
   </xsl:template>
   <xsl:template match="xsl:mode//xsl:apply-templates[empty(@mode)]">
      <xsl:copy>
         <xsl:apply-templates select="@*" mode="#current"/>
         <xsl:attribute name="mode" select="'#current'"/>
         <xsl:apply-templates select="node()" mode="#current"/>
      </xsl:copy>
   </xsl:template>

   <xsl:template match="xsl:apply-templates[empty(@mode)][@separator]" priority="2">
      <X:for-each select="{(@select,'node()')[1]}">
         <xsl:apply-templates select="xsl:sort"/>
         <X:apply-templates select="." mode="#current"/>
         <X:if test="position() lt last()">
            <X:text>{@separator}</X:text>
         </X:if>
      </X:for-each>
   </xsl:template>


   <xsl:template match="xsl:function[xsl:param/(@select | node())]">
      <xsl:variable name="definition" select="."/>
      <!-- TODO - check for param sequence constructors on required and check order -->
      <xsl:comment use-when="$debug">Defaulting function: {@name}</xsl:comment>
      <xsl:for-each select="xsl:param[@required eq 'no']">
         <X:function>
            <xsl:sequence select="$definition/@*"/>
            <xsl:apply-templates select="preceding-sibling::xsl:param" mode="#current"/>
            <xsl:choose>
               <xsl:when test="exists(@select)">
                  <X:sequence select="{$definition/@name}({(preceding-sibling::xsl:param)!('$'||@name)=> string-join(',')},{@select})"/>
               </xsl:when>
               <xsl:otherwise>
                  <X:variable>
                     <xsl:sequence select="@* except @required, node()"/>
                  </X:variable>
                  <X:sequence select="{$definition/@name}({(preceding-sibling::xsl:param|.)!('$'||@name)=> string-join(',')})"/>
               </xsl:otherwise>
            </xsl:choose>
         </X:function>
      </xsl:for-each>
      <xsl:copy>
         <xsl:sequence select="@*"/>
         <xsl:apply-templates mode="#current"/>
      </xsl:copy>
   </xsl:template>
   <xsl:template match="
         xsl:param[@required eq 'no']/@select |
         xsl:param[@required eq 'no']/node() |
         xsl:param/@required[. eq 'no'] |
         xsl:param/@required"/>


   <xsl:mode name="pipeline" on-no-match="shallow-copy"/>
   <xsl:template match="xsl:pipeline" mode="pipeline">
      <xsl:apply-templates mode="#current"/>
      <X:sequence select="$pipeTemp"/>
   </xsl:template>
   <xsl:template match="xsl:pipeline/xsl:apply-templates" mode="pipeline">
      <X:variable name="pipeTemp">
         <xsl:next-match/>
      </X:variable>
   </xsl:template>
   <xsl:template match="xsl:pipeline/xsl:apply-templates/@select[. eq '.']" mode="pipeline">
      <X:attribute name="select" select="$pipeTemp"/>
   </xsl:template>


   <xsl:mode name="extension-named-template" on-no-match="deep-skip"/>
   <xsl:template match="*" mode="extension-named-template">
      <xsl:param name="extension-named-templates" as="map(*)" tunnel="true"/>
      <X:call-template name="{name()}">
         <xsl:apply-templates select="@*" mode="#current">
            <xsl:with-param name="params" select="$extension-named-templates(name())/xsl:param"/>
         </xsl:apply-templates>
      </X:call-template>
   </xsl:template>
   <xsl:template match="@*" mode="extension-named-template">
      <xsl:param name="params" as="element()*"/>
      <xsl:variable name="param" select="$params[@name eq current()/name()]"/>
      <xsl:if test="empty($param)">
         <xsl:sequence select="error(xs:QName('err:XTSE0680'), 'Template ' || ../name() || ', invoked as an extension instruction, does not have a parameter &quot;' || name() || '&quot;.')"/>
      </xsl:if>
      <xsl:variable name="type" select="($param/@as, 'item()*')[1]"/>
      <xsl:choose>
         <xsl:when test="$type eq 'xs:boolean'">
            <xsl:variable name="value" select="normalize-space(.)"/>
            <xsl:choose>
               <xsl:when test=". = ('yes', 'true', '1')">
                  <X:with-param name="{name()}" select="true()"/>
               </xsl:when>
               <xsl:when test=". = ('no', 'false', '0')">
                  <X:with-param name="{name()}" select="false()"/>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:sequence
                     select="error(xs:QName('err:XTSE0020'), 'The value of parameter &quot;' || name() || '&quot; of template ' || ../name() || ', invoked as an extension instruction, must be yes|no | true|false | 1|0. Supplied:' || .)"
                  />
               </xsl:otherwise>
            </xsl:choose>
         </xsl:when>
         <xsl:when test="$type eq 'xs:string'">
            <xsl:variable name="value" select="normalize-space(.)"/>
            <X:with-param name="{name()}" select="'{$value}'"/>
         </xsl:when>
         <xsl:when test="starts-with($type, 'xs:')">
            <xsl:variable name="value" select="normalize-space(.)"/>
            <X:with-param name="{name()}" select="{$type||'('||$value||')'}"/>
         </xsl:when>
         <xsl:otherwise>
            <X:with-param name="{name()}" select="{.}"/>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>

   <xsl:template match="xsl:switch">
      <xsl:variable name="wrong-content" select="* except (xsl:when | xsl:otherwise)"/>
      <xsl:if test="exists($wrong-content)">
         <xsl:sequence select="f:err0010(., $wrong-content)"/>
      </xsl:if>
      <xsl:comment use-when="$debug">xsl:switch</xsl:comment>
      <xsl:variable name="selector" select="'Selector' || generate-id(.)"/>
      <X:variable name="{$selector}" select="exactly-one(data(({@select})))"/>
      <X:choose>
         <xsl:apply-templates mode="#current">
            <xsl:with-param name="selector" select="$selector"/>
         </xsl:apply-templates>
      </X:choose>
   </xsl:template>
   <xsl:template match="xsl:switch/xsl:when" priority="2">
      <xsl:param name="selector" as="xs:string"/>
      <X:when test="${$selector} = ({@test})">
         <xsl:apply-templates select="(@select, *)[1]" mode="#current"/>
      </X:when>
   </xsl:template>




   <xsl:template match="xsl:record">
      <xsl:variable name="xsl-attributes" select="@xsl:*"/>
      <xsl:variable name="ncname-attributes" select="@*[empty(prefix-from-QName(node-name()))]"/>
      <xsl:variable name="other-attributes" select="@* except ($xsl-attributes, $ncname-attributes)"/>
      <xsl:comment use-when="$debug">xsl:record</xsl:comment>
      <X:map>
         <xsl:sequence select="$other-attributes"/>
         <xsl:apply-templates select="$xsl-attributes, $ncname-attributes, node()" mode="#current"/>
      </X:map>
   </xsl:template>
   <xsl:template match="xsl:record/@*">
      <X:map-entry key="'{name()}'" select="{.}"/>
   </xsl:template>
   <xsl:template match="xsl:record/@xsl:*" priority="1">
      <xsl:attribute name="{local-name()}" select="."/>
   </xsl:template>


</xsl:stylesheet>
