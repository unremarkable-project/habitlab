
  (function() {
    'use strict';

    var serializeValueToAttribute = Polymer.Base.serializeValueToAttribute;

    var propertyUtils = Polymer.StyleProperties;
    var styleTransformer = Polymer.StyleTransformer;
    var styleDefaults = Polymer.StyleDefaults;

    var nativeShadow = Polymer.Settings.useNativeShadow;
    var nativeVariables = Polymer.Settings.useNativeCSSProperties;

    Polymer.Base._addFeature({

      _prepStyleProperties: function() {
        // note: an element should produce an x-scope stylesheet
        // if it has any _ownStylePropertyNames
        if (!nativeVariables) {
          this._ownStylePropertyNames = this._styles && this._styles.length ?
            propertyUtils.decorateStyles(this._styles, this) :
            null;
        }
      },

      /**
       * An element's style properties can be directly modified by
       * setting key-value pairs in `customStyle` on the element
       * (analogous to setting `style`) and then calling `updateStyles()`.
       *
       */
      customStyle: null,

      /**
     * Returns the computed style value for the given property.
     * @param {String} property
     * @return {String} the computed value
     */
      getComputedStyleValue: function(property) {
        return !nativeVariables && this._styleProperties &&
          this._styleProperties[property] ||
          getComputedStyle(this).getPropertyValue(property);
      },

      // here we have an instance time spot to put custom property data
      _setupStyleProperties: function() {
        this.customStyle = {};
        this._styleCache = null;
        this._styleProperties = null;
        this._scopeSelector = null;
        this._ownStyleProperties = null;
        this._customStyle = null;
      },

      // TODO(dfreedm): should only be true if and only if browser doesn't
      // support native custom properties.
      _needsStyleProperties: function() {
        return Boolean(!nativeVariables && this._ownStylePropertyNames &&
          this._ownStylePropertyNames.length);
      },

      _validateApplyShim: function() {
        if (this.__applyShimInvalid) {
          // rerun apply shim
          Polymer.ApplyShim.transform(this._styles, this.__proto__);
          var cssText = styleTransformer.elementStyles(this);
          if (nativeShadow) {
            // replace style in template
            var templateStyle = this._template.content.querySelector('style');
            if (templateStyle) {
              templateStyle.textContent = cssText;
            }
          } else {
            // replace scoped style
            var shadyStyle = this._scopeStyle && this._scopeStyle.nextSibling;
            if (shadyStyle) {
              shadyStyle.textContent = cssText;
            }
          }
        }
      },

      _beforeAttached: function() {
        // note: do this once automatically,
        // then requires calling `updateStyles`
        if ((!this._scopeSelector || this.__stylePropertiesInvalid) &&
          this._needsStyleProperties()) {
          this.__stylePropertiesInvalid = false;
          this._updateStyleProperties();
        }
      },

      _findStyleHost: function() {
        var e = this, root;
        while ((root = Polymer.dom(e).getOwnerRoot())) {
          if (Polymer.isInstance(root.host)) {
            return root.host;
          }
          e = root.host;
        }
        return styleDefaults;
      },

      _updateStyleProperties: function() {
        var info, scope = this._findStyleHost();
        // ensure scope properties exist before any access of scope cache.
        if (!scope._styleProperties) {
          scope._computeStyleProperties();
        }
        // install cache in host if it doesn't exist.
        if (!scope._styleCache) {
          scope._styleCache = new Polymer.StyleCache();
        }
        var scopeData = propertyUtils
          .propertyDataFromStyles(scope._styles, this);
        // the scope cache does not evaluate if @media rules, :host(), or :host-context() rules defined in this element have changed
        // therefore, if we detect those rules, we opt-out of the scope cache
        var scopeCacheable = !this.__notStyleScopeCacheable;
        // look in scope cache
        if (scopeCacheable) {
          scopeData.key.customStyle = this.customStyle;
          info = scope._styleCache.retrieve(this.is, scopeData.key, this._styles);
        }
        // compute style properties (fast path, if cache hit)
        var scopeCached = Boolean(info);
        if (scopeCached) {
          // when scope cached, we can safely take style propertis out of the
          // scope cache because they are only for this scope.
          this._styleProperties = info._styleProperties;
        } else {
          this._computeStyleProperties(scopeData.properties);
        }
        this._computeOwnStyleProperties();
        // cache miss, do work!
        if (!scopeCached) {
          // and look in 2ndary global cache
          info = styleCache.retrieve(this.is,
            this._ownStyleProperties, this._styles);
        }
        var globalCached = Boolean(info) && !scopeCached;
        // now we have properties and a cached style if one
        // is available.
        var style = this._applyStyleProperties(info);
        // no cache so store in cache
        //console.warn(this.is, scopeCached, globalCached, info && info._scopeSelector);
        if (!scopeCached) {
          // create an info object for caching
          // TODO(sorvell): clone style node when using native Shadow DOM
          // so a style used in a root does not itself get stored in the cache
          // This can lead to incorrect sharing, but should be fixed
          // in `Polymer.StyleProperties.applyElementStyle`
          style = style && nativeShadow ? style.cloneNode(true) : style;
          info = {
            style: style,
            _scopeSelector: this._scopeSelector,
            _styleProperties: this._styleProperties
          };
          if (scopeCacheable) {
            scopeData.key.customStyle = {};
            this.mixin(scopeData.key.customStyle, this.customStyle);
            scope._styleCache.store(this.is, info, scopeData.key, this._styles);
          }
          // global cache key is all property values consumed in this element,
          // we _can_ use the global cache with @media, :host(), and :host-context() rules, as _computeStyleProperties will determine if those properties have changed
          if (!globalCached) {
            // save in global cache
            styleCache.store(this.is, Object.create(info), this._ownStyleProperties,
            this._styles);
          }
        }
      },

      _computeStyleProperties: function(scopeProps) {
        // get scope and make sure it has properties
        var scope = this._findStyleHost();
        // force scope to compute properties if they don't exist
        if (!scope._styleProperties) {
          scope._computeStyleProperties();
        }
        // start with scope style properties
        var props = Object.create(scope._styleProperties);
        // collect properties from :host and :root
        var hostAndRootProps =
          propertyUtils.hostAndRootPropertiesForScope(this);
        // mixin own host properties (lower specifity than scope props)
        this.mixin(props, hostAndRootProps.hostProps);
        // mixin properties matching this element in scope
        scopeProps = scopeProps ||
          propertyUtils.propertyDataFromStyles(scope._styles, this).properties;
        this.mixin(props, scopeProps);
        // finally mixin properties inherent to this element
        this.mixin(props, hostAndRootProps.rootProps);
        propertyUtils.mixinCustomStyle(props, this.customStyle);
        // reify properties (note: only does own properties)
        propertyUtils.reify(props);
        this._styleProperties = props;
      },

      _computeOwnStyleProperties: function() {
        var props = {};
        for (var i=0, n; i < this._ownStylePropertyNames.length; i++) {
          n = this._ownStylePropertyNames[i];
          props[n] = this._styleProperties[n];
        }
        this._ownStyleProperties = props;
      },

      _scopeCount: 0,

      _applyStyleProperties: function(info) {
        // update scope selector (needed for style transformation)
        var oldScopeSelector = this._scopeSelector;
        // note, the scope selector is incremented per class counter
        this._scopeSelector = info ? info._scopeSelector :
          this.is + '-' + this.__proto__._scopeCount++;
        var style = propertyUtils.applyElementStyle(this,
          this._styleProperties, this._scopeSelector, info && info.style);
        // apply scope selector
        if (!nativeShadow) {
          propertyUtils.applyElementScopeSelector(this, this._scopeSelector,
            oldScopeSelector, this._scopeCssViaAttr);
        }
        return style;
      },

      serializeValueToAttribute: function(value, attribute, node) {
        // override to ensure whenever classes are set, we need to shim them.
        node = node || this;
        if (attribute === 'class' && !nativeShadow) {
          // host needed to scope styling.
          // Under Shady DOM, domHost is safe to use here because we know it
          // is a Polymer element
          var host = node === this ? (this.domHost || this.dataHost) : this;
          if (host) {
            value = host._scopeElementClass(node, value);
          }
        }
        // note: using Polymer.dom here ensures that any attribute sets will
        // provoke distribution if necessary; do this if and only if necessary
        node = (this.shadyRoot && this.shadyRoot._hasDistributed) ?
          Polymer.dom(node) : node;
        serializeValueToAttribute.call(this, value, attribute, node);
      },

      _scopeElementClass: function(element, selector) {
        if (!nativeShadow && !this._scopeCssViaAttr) {
          selector = (selector ? selector + ' ' : '') + SCOPE_NAME + ' ' + this.is +
            (element._scopeSelector ? ' ' +  XSCOPE_NAME + ' ' +
            element._scopeSelector : '');
        }
        return selector;
      },

      /**
       * Re-evaluates and applies custom CSS properties based on dynamic
       * changes to this element's scope, such as adding or removing classes
       * in this element's local DOM.
       *
       * For performance reasons, Polymer's custom CSS property shim relies
       * on this explicit signal from the user to indicate when changes have
       * been made that affect the values of custom properties.
       *
       * @method updateStyles
       * @param {Object=} properties Properties object which is mixed into
       * the element's `customStyle` property. This argument provides a shortcut
       * for setting `customStyle` and then calling `updateStyles`.
      */
      updateStyles: function(properties) {
        if (properties) {
          this.mixin(this.customStyle, properties);
        }
        if (nativeVariables) {
          propertyUtils.updateNativeStyleProperties(this, this.customStyle);
        } else {
          // actually process styling changes if and only if attached
          if (this.isAttached) {
            // skip applying properties to self if not used
            if (this._needsStyleProperties()) {
              this._updateStyleProperties();
            // when an element doesn't use style properties, its own properties
            // should be invalidated so elements down the tree update ok.
            } else {
              this._styleProperties = null;
            }
          // if called when an element is not attached, invalidate
          // styling by unsetting scopeSelector.
          } else {
            this.__stylePropertiesInvalid = true;
          }
          if (this._styleCache) {
            this._styleCache.clear();
          }
          // go down...
          this._updateRootStyles();
        }
      },

      _updateRootStyles: function(root) {
        root = root || this.root;
        var c$ = Polymer.dom(root)._query(function(e) {
          return e.shadyRoot || e.shadowRoot;
        });
        for (var i=0, l= c$.length, c; (i<l) && (c=c$[i]); i++) {
          if (c.updateStyles) {
            c.updateStyles();
          }
        }
      }

    });

    /**
     * Force all custom elements using cross scope custom properties,
     * to update styling.
     */
    Polymer.updateStyles = function(properties) {
      // update default/custom styles
      styleDefaults.updateStyles(properties);
      // search the document for elements to update
      Polymer.Base._updateRootStyles(document);
    };

    var styleCache = new Polymer.StyleCache();
    Polymer.customStyleCache = styleCache;

    var SCOPE_NAME = styleTransformer.SCOPE_NAME;
    var XSCOPE_NAME = propertyUtils.XSCOPE_NAME;

  })();
