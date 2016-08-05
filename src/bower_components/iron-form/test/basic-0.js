
  suite('registration', function() {
    var f;
    test('elements can be registered', function() {
      f = fixture('Basic');

      assert.equal(f._customElements.length, 1);
      assert.equal(f.elements.length, 1);
    });

    test('elements can be unregistered', function(done) {
      f = fixture('Basic');
      var element = f.querySelector('simple-element');

      assert.equal(f._customElements.length, 1);
      assert.equal(f.elements.length, 1);

      f.removeChild(element);

      setTimeout(function() {
        assert.equal(f._customElements.length, 0);
        assert.equal(f.elements.length, 1);
        done();
      }, 200);
    });
  });

  suite('validation', function() {
    test('custom elements are validated if they don\'t have a name', function() {
      var f = fixture('FormWithRequiredCustomElements');
      assert.equal(f._customElements.length, 1);

      var simpleElement = f._customElements[0];
      assert.isFalse(!!simpleElement.name)

      // custom elements
      assert.isFalse(f.validate());
      assert.isTrue(simpleElement.invalid);

      simpleElement.value = 'batman';

      assert.isTrue(f.validate());
      assert.isFalse(simpleElement.invalid);

      // Since the elements don't have names, they don't get serialized.
      var json = f.serialize();
      assert.equal(Object.keys(json).length, 0);
    });

    test('native elements are validated if they don\'t have a name', function() {
      var f = fixture('FormWithRequiredElements');
      assert.equal(f.elements.length, 1);

      var input = f.elements[0];

      assert.isFalse(!!input.name)

      assert.isFalse(f.validate());
      assert.isFalse(input.validity.valid);

      input.value = 'robin';

      assert.isTrue(f.validate());
      assert.isTrue(input.validity.valid);

      // Since the elements don't have names, they don't get serialized.
      var json = f.serialize();
      assert.equal(Object.keys(json).length, 0);
    });

    test('custom elements are validated if they have a name', function() {
      var f = fixture('FormWithRequiredCustomElements');
      assert.equal(f._customElements.length, 1);

      var simpleElement = f._customElements[0];
      simpleElement.name = 'zig';

      assert.isFalse(f.validate());
      assert.isTrue(simpleElement.invalid);

      simpleElement.value = 'batman';

      assert.isTrue(f.validate());
      assert.isFalse(simpleElement.invalid);

      // The elements have names, so they're serialized.
      var json = f.serialize();
      assert.equal(Object.keys(json).length, 1);
    });

    test('native elements are validated if they have a name', function() {
      var f = fixture('FormWithRequiredElements');
      assert.equal(f.elements.length, 1);

      var input = f.elements[0];
      input.name = 'zag';

      assert.isFalse(f.validate());
      assert.isFalse(input.validity.valid);

      input.value = 'robin';

      assert.isTrue(f.validate());
      assert.isTrue(input.validity.valid);

      // The elements have names, so they're serialized.
      var json = f.serialize();
      assert.equal(Object.keys(json).length, 1);
    });

    test('non-required custom elements are validated', function() {
      var
        f = fixture('FormValidateNonRequiredCustomElements'),
        elements = f.getEffectiveChildren(),
        input = elements && elements[0]
      ;

      assert.equal(elements.length, 1);

      assert.isTrue(f.validate());
      assert.isTrue(input.validate());

      input.value = "abcdefg";

      assert.isFalse(f.validate());
      assert.isFalse(input.validate());
    });

    test('non-required native elements are validated', function() {
      var f = fixture('FormValidateNonRequiredElements');
      assert.equal(f.elements.length, 1);

      var input = f.elements[0];

      assert.isTrue(f.validate());
      assert.isTrue(input.validity.valid);

      input.value = "012345";

      assert.isFalse(f.validate());
      assert.isFalse(input.validity.valid);
    });
});

  suite('serializing', function() {
    var f;
    test('serializes both custom and native elements', function() {
      f = fixture('Basic');

      assert.equal(f._customElements.length, 1);
      assert.equal(f.elements.length, 1);

      var json = f.serialize();
      assert.equal(Object.keys(json).length, 2);
      assert.equal(json['zig'], 'zag');
      assert.equal(json['foo'], 'bar');
    });

    test('serializes elements with duplicate names', function() {
      f = fixture('Dupes');

      assert.equal(f._customElements.length, 3);
      assert.equal(f.elements.length, 2);

      var json = f.serialize();
      assert.equal(Object.keys(json).length, 2);
      assert.equal(json['foo'].length, 2);
      assert.equal(json['foo'][0], 'bar');
      assert.equal(json['foo'][1], 'barbar');
      assert.equal(json['zig'].length, 3);
      assert.equal(json['zig'][0], 'zig');
      assert.equal(json['zig'][1], 'zag');
      assert.equal(json['zig'][2], 'zug');
    });

    test('serializes elements with checked states', function() {
      f = fixture('CheckedStates');

      assert.equal(f._customElements.length, 0);
      assert.equal(f.elements.length, 4);

      var json = f.serialize();
      assert.equal(Object.keys(json).length, 1);
      assert.equal(json['foo'].length, 2);
      assert.equal(json['foo'][0], 'bar1');
      assert.equal(json['foo'][1], 'bar3');
    });

    test('serializes a native select element with or without multiple selection', function() {
      f = fixture('NativeSelect');

      assert.equal(f._customElements.length, 0);
      assert.equal(f.elements.length, 2);

      var json = f.serialize();
      assert.equal(Object.keys(json).length, 2);

      // Single selection.
      assert.equal(json['cheese'], 'yes');

      // Multiple selection.
      assert.equal(json['numbers'].length, 2);
      assert.equal(json['numbers'][0], 'one');
      assert.equal(json['numbers'][1], 'three');
    });

    test('does not serialize disabled elements', function() {
      f = fixture('Disabled');

      assert.equal(f._customElements.length, 0);
      assert.equal(f.elements.length, 3);

      var json = f.serialize();
      assert.equal(Object.keys(json).length, 1);
      assert.equal(json['foo'], 'bar1');
    });

    test('nested elements are only serialized once', function() {
      f = fixture('NestedDupes');

      assert.equal(f._customElements.length, 3);

      var json = f.serialize();
      assert.equal(Object.keys(json).length, 2);
      assert.equal(json['foo'], 'bar');
      assert.equal(json['zig'], 'zag');
    });


    test('nested elements can be submitted if parents aren\'t submittable', function() {
      f = fixture('NestedSubmittable');

      var json = f.serialize();
      assert.equal(Object.keys(json).length, 1);
      assert.equal(json['foo'], 'bar');
    });

  });

  suite('resetting', function () {
    test('form restores the default values if changes were made', function(done) {
      var form = fixture('FormForResetting');

      // Initial values.
      var customElement = form.querySelector('simple-element');
      var input = form.querySelector('input[name="foo"]');
      var checkbox1 = form.querySelectorAll('input[type="checkbox"]')[0];
      var checkbox2 = form.querySelectorAll('input[type="checkbox"]')[1];
      var paperInput = form.querySelector('paper-input');
      var paperTextarea = form.querySelector('paper-textarea');

      assert.equal(customElement.value, 'zag');
      assert.equal(input.value, 'bar');
      assert.isTrue(checkbox1.checked);
      assert.isFalse(checkbox2.checked);
      assert.equal(paperInput.value, 'zug');
      assert.equal(paperInput.inputElement.value, 'zug');
      assert.equal(paperTextarea.value, 'zog');
      assert.equal(paperTextarea.inputElement.textarea.value, 'zog');

      // Change the values.
      customElement.value = 'not zag';
      input.value = 'not bar';
      checkbox1.checked = false;
      checkbox2.checked = true;
      paperInput.value = 'not zug';
      paperTextarea.value = 'not zog';

      assert.equal(customElement.value, 'not zag');
      assert.equal(input.value, 'not bar');
      assert.isFalse(checkbox1.checked);
      assert.isTrue(checkbox2.checked);
      assert.equal(paperInput.value, 'not zug');
      assert.equal(paperInput.inputElement.value, 'not zug');
      assert.equal(paperTextarea.value, 'not zog');
      assert.equal(paperTextarea.inputElement.textarea.value, 'not zog');

      form.addEventListener('iron-form-reset', function(event) {
        // Restored initial values.
        assert.equal(customElement.value, 'zag');
        assert.equal(input.value, 'bar');
        assert.isTrue(checkbox1.checked);
        assert.isFalse(checkbox2.checked);
        assert.equal(paperInput.value, 'zug');
        assert.equal(paperInput.inputElement.value, 'zug');
        assert.equal(paperTextarea.value, 'zog');
        assert.equal(paperTextarea.inputElement.textarea.value, 'zog');
        done();
      });

      form.reset();
    });

    test('form restores the default values if no changes were made', function(done) {
      var form = fixture('FormForResetting');

      // Initial values.
      var customElement = form.querySelector('simple-element');
      var input = form.querySelector('input[name="foo"]');
      var checkbox1 = form.querySelectorAll('input[type="checkbox"]')[0];
      var checkbox2 = form.querySelectorAll('input[type="checkbox"]')[1];
      var paperInput = form.querySelector('paper-input');
      var paperTextarea = form.querySelector('paper-textarea');

      assert.equal(customElement.value, 'zag');
      assert.equal(input.value, 'bar');
      assert.isTrue(checkbox1.checked);
      assert.isFalse(checkbox2.checked);
      assert.equal(paperInput.value, 'zug');
      assert.equal(paperInput.inputElement.value, 'zug');
      assert.equal(paperTextarea.value, 'zog');
      assert.equal(paperTextarea.inputElement.textarea.value, 'zog');

      form.addEventListener('iron-form-reset', function(event) {
        // Restored initial values.
        assert.equal(customElement.value, 'zag');
        assert.equal(input.value, 'bar');
        assert.isTrue(checkbox1.checked);
        assert.isFalse(checkbox2.checked);
        assert.equal(paperInput.value, 'zug');
        assert.equal(paperInput.inputElement.value, 'zug');
        assert.equal(paperTextarea.value, 'zog');
        assert.equal(paperTextarea.inputElement.textarea.value, 'zog');
        done();
      });

      form.reset();
    });

    test('validation messages are cleared', function(done) {
      var form = fixture('FormWithRequiredCustomElements');
      assert.equal(form._customElements.length, 1);

      var customElement = form.querySelector('simple-element');

      assert.isFalse(form.validate());
      assert.isTrue(customElement.invalid);

      form.addEventListener('iron-form-reset', function(event) {
        // Cleared validation messages.
        assert.isFalse(customElement.invalid);
        done();
      });

      form.reset();

    });

  });

  suite('submitting', function () {
    var server;
    var form;

    setup(function() {
      server = sinon.fakeServer.create();
      server.respondWith(
        'GET',
        /\/responds_with_json.*/,
        [
          200,
          '{"Content-Type":"application/json"}',
          '{"success":true}'
        ]
      );

      server.respondWith(
        'POST',
        /\/responds_with_json.*/,
        [
          200,
          '{"Content-Type":"application/json"}',
          '{"success":true}'
        ]
      );

      server.respondWith(
        'GET',
        /\/responds_with_error.*/,
        [
          404,
          '{"Content-Type":"application/text"}',
          '{"success":false}'
        ]
      );
    });

    teardown(function() {
      server.restore();
    });

    test('does not submit forms with invalid native elements', function(done) {
      form = fixture('InvalidForm');
      var nativeElement = form.querySelector('input');
      var customElement = form.querySelector('simple-element');
      customElement.value = "foo";

      var submitted = false;
      form.addEventListener('iron-form-submit', function() {
        submitted = true;
      });

      form.addEventListener('iron-form-invalid', function() {
        expect(submitted).to.be.equal(false);
        expect(nativeElement.validity.valid).to.be.equal(false);
        expect(customElement.invalid).to.be.equal(false);
        done();
      });

      form.submit();
      server.respond();
    });

    test('can modify the request in the presubmit', function(done) {
      form = fixture('FormGet');

      var submitted = false;
      var presubmitted = false;

      form.addEventListener('iron-form-submit', function() {
        submitted = true;
      });

      form.addEventListener('iron-form-presubmit', function() {
        presubmitted = true;
        this.request.params = {batman: true};
      });

      form.addEventListener('iron-form-response', function(event) {
        expect(submitted).to.be.equal(true);
        expect(presubmitted).to.be.equal(true);

        // We have changed the json parameters
        expect(event.detail.url).to.contain('batman=true');

        var response = event.detail.response;
        expect(response).to.be.ok;
        expect(response).to.be.an('object');
        expect(response.success).to.be.equal(true);
        done();
      });

      form.submit();
      server.respond();
    });


    test('can do a custom submission in the presubmit', function(done) {
      form = fixture('FormGet');

      var presubmitted = false;

      // Since we are not using the normal form submission, these events should
      // never be called.
      var formResponseHandler = sinon.spy();
      form.addEventListener('iron-form-response', formResponseHandler);
      var formSubmitHandler = sinon.spy();
      form.addEventListener('iron-form-submit', formSubmitHandler);

      form.addEventListener('iron-form-presubmit', function(event) {
        presubmitted = true;
        event.preventDefault();

        // Your custom submission logic could go here (like using Firebase).
        // In this case, fire a custom event as a an example.
        this.fire('custom-form-submit');
      });

      form.addEventListener('custom-form-submit', function(event) {
        expect(presubmitted).to.be.equal(true);
        expect(formResponseHandler.callCount).to.be.equal(0);
        expect(formSubmitHandler.callCount).to.be.equal(0);
        done();
      });

      form.submit();
    });

    test('can submit with method=get', function(done) {
      form = fixture('FormGet');

      var submitted = false;
      form.addEventListener('iron-form-submit', function() {
        submitted = true;
      });

      form.addEventListener('iron-form-response', function(event) {
        expect(submitted).to.be.equal(true);
        expect(event.detail.url).to.contain('zig=zag');

        var response = event.detail.response;
        expect(response).to.be.ok;
        expect(response).to.be.an('object');
        expect(response.success).to.be.equal(true);
        done();
      });

      form.submit();
      server.respond();
    });

    test('can submit with method=post', function(done) {
      form = fixture('FormPost');

      var submitted = false;
      form.addEventListener('iron-form-submit', function() {
        submitted = true;
      });

      form.addEventListener('iron-form-response', function(event) {
        expect(submitted).to.be.equal(true);

        var response = event.detail.response;
        expect(response).to.be.ok;
        expect(response).to.be.an('object');
        expect(response.success).to.be.equal(true);
        done();
      });

      form.submit();
      server.respond();
    });

    test('can relay errors', function(done) {
      form = fixture('FormPost');
      form.action = "/responds_with_error";

      form.addEventListener('iron-form-error', function(event) {
        var error = event.detail;

        expect(error).to.be.ok;
        expect(error).to.be.an('object');
        expect(error.error).to.be.ok;
        done();
      });

      form.submit();
      server.respond();
    });

  });

  