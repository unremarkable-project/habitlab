

  Polymer.StyleDefaults = (function() {

    var styleProperties = Polymer.StyleProperties;
    var StyleCache = Polymer.StyleCache;
    var nativeVariables = Polymer.Settings.useNativeCSSProperties;

    var api = {

      _styles: [],
      _properties: null,
      customStyle: {},
      _styleCache: new StyleCache(),
      _element: Polymer.DomApi.wrap(document.documentElement),

      addStyle: function(style) {
        this._styles.push(style);
        this._properties = null;
      },

      // NOTE: this object can be used as a styling scope so it has an api
      // similar to that of an element wrt style properties
      get _styleProperties() {
        if (!this._properties) {
          // force rules to reparse since they may be out of date
          styleProperties.decorateStyles(this._styles, this);
          // NOTE: reset cache for own properties; it may have been set when
          // an element in an import applied styles (e.g. custom-style)
          this._styles._scopeStyleProperties = null;
          this._properties = styleProperties
            .hostAndRootPropertiesForScope(this).rootProps;
          // mixin customStyle
          styleProperties.mixinCustomStyle(this._properties, this.customStyle);
          styleProperties.reify(this._properties);
        }
        return this._properties;
      },

      hasStyleProperties: function() {
        return Boolean(this._properties);
      },

      _needsStyleProperties: function() {},

      _computeStyleProperties: function() {
        return this._styleProperties;
      },

      /**
       * Re-evaluates and applies custom CSS properties to all elements in the
       * document based on dynamic changes, such as adding or removing classes.
       *
       * For performance reasons, Polymer's custom CSS property shim relies
       * on this explicit signal from the user to indicate when changes have
       * been made that affect the values of custom properties.
       *
       * @method updateStyles
       * @param {Object=} properties Properties object which is mixed into
       * the document root `customStyle` property. This argument provides a
       * shortcut for setting `customStyle` and then calling `updateStyles`.
      */
      updateStyles: function(properties) {
        // force properties update.
        this._properties = null;
        if (properties) {
          Polymer.Base.mixin(this.customStyle, properties);
        }
        // invalidate the cache
        this._styleCache.clear();
        // update any custom-styles we are tracking
        for (var i=0, s; i < this._styles.length; i++) {
          s = this._styles[i];
          s = s.__importElement || s;
          s._apply();
        }
        if (nativeVariables) {
          styleProperties.updateNativeStyleProperties(document.documentElement, this.customStyle);
        }
      }

    };

    // exports
    return api;

  })();
