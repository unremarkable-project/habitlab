'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readSyntaxTemplate = readSyntaxTemplate;

var _readtable = require('readtable');

var _utils = require('./utils');

var _immutable = require('immutable');

var _syntax = require('../syntax');

var _syntax2 = _interopRequireDefault(_syntax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const backtickEntry = {
  key: '`',
  mode: 'terminating',
  action: function readBacktick(stream, prefix, e) {
    if (prefix.isEmpty()) {
      return {
        type: _utils.LSYNTAX,
        value: stream.readString()
      };
    }

    return {
      type: _utils.RSYNTAX,
      value: stream.readString()
    };
  }
};

function readSyntaxTemplate(stream, prefix, exprAllowed, dispatchChar) {
  // return read('syntaxTemplate').first().token;
  // TODO: Can we simply tack 'syntaxTemplate' on the front and process it as a
  //       syntax macro?
  const prevTable = (0, _readtable.getCurrentReadtable)();
  (0, _readtable.setCurrentReadtable)(prevTable.extend(backtickEntry));

  const result = this.readUntil('`', stream, _immutable.List.of(updateSyntax(dispatchChar, this.readToken(stream, (0, _immutable.List)(), exprAllowed))), exprAllowed);

  (0, _readtable.setCurrentReadtable)(prevTable);
  return result;
}

function updateSyntax(prefix, syntax) {
  const token = syntax.token;

  token.value = prefix + token.value;
  token.slice.text = prefix + token.slice.text;
  token.slice.start -= 1;
  token.slice.startLocation.position -= 1;

  return syntax;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZWFkZXIvcmVhZC1kaXNwYXRjaC5qcyJdLCJuYW1lcyI6WyJyZWFkU3ludGF4VGVtcGxhdGUiLCJiYWNrdGlja0VudHJ5Iiwia2V5IiwibW9kZSIsImFjdGlvbiIsInJlYWRCYWNrdGljayIsInN0cmVhbSIsInByZWZpeCIsImUiLCJpc0VtcHR5IiwidHlwZSIsInZhbHVlIiwicmVhZFN0cmluZyIsImV4cHJBbGxvd2VkIiwiZGlzcGF0Y2hDaGFyIiwicHJldlRhYmxlIiwiZXh0ZW5kIiwicmVzdWx0IiwicmVhZFVudGlsIiwib2YiLCJ1cGRhdGVTeW50YXgiLCJyZWFkVG9rZW4iLCJzeW50YXgiLCJ0b2tlbiIsInNsaWNlIiwidGV4dCIsInN0YXJ0Iiwic3RhcnRMb2NhdGlvbiIsInBvc2l0aW9uIl0sIm1hcHBpbmdzIjoiOzs7OztRQTJCZ0JBLGtCLEdBQUFBLGtCOztBQXpCaEI7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUlBLE1BQU1DLGdCQUFnQjtBQUNwQkMsT0FBSyxHQURlO0FBRXBCQyxRQUFNLGFBRmM7QUFHcEJDLFVBQVEsU0FBU0MsWUFBVCxDQUFzQkMsTUFBdEIsRUFBMENDLE1BQTFDLEVBQWdFQyxDQUFoRSxFQUE0RTtBQUNsRixRQUFJRCxPQUFPRSxPQUFQLEVBQUosRUFBc0I7QUFDcEIsYUFBTztBQUNMQyw0QkFESztBQUVMQyxlQUFPTCxPQUFPTSxVQUFQO0FBRkYsT0FBUDtBQUlEOztBQUVELFdBQU87QUFDTEYsMEJBREs7QUFFTEMsYUFBT0wsT0FBT00sVUFBUDtBQUZGLEtBQVA7QUFJRDtBQWZtQixDQUF0Qjs7QUFrQk8sU0FBU1osa0JBQVQsQ0FBNEJNLE1BQTVCLEVBQWdEQyxNQUFoRCxFQUFzRU0sV0FBdEUsRUFBNEZDLFlBQTVGLEVBQTBLO0FBQy9LO0FBQ0E7QUFDQTtBQUNBLFFBQU1DLFlBQVkscUNBQWxCO0FBQ0Esc0NBQW9CQSxVQUFVQyxNQUFWLENBQWlCZixhQUFqQixDQUFwQjs7QUFFQSxRQUFNZ0IsU0FBUyxLQUFLQyxTQUFMLENBQ2IsR0FEYSxFQUViWixNQUZhLEVBR2IsZ0JBQUthLEVBQUwsQ0FBUUMsYUFBYU4sWUFBYixFQUEyQixLQUFLTyxTQUFMLENBQWVmLE1BQWYsRUFBdUIsc0JBQXZCLEVBQStCTyxXQUEvQixDQUEzQixDQUFSLENBSGEsRUFJYkEsV0FKYSxDQUFmOztBQU1BLHNDQUFvQkUsU0FBcEI7QUFDQSxTQUFPRSxNQUFQO0FBQ0Q7O0FBRUQsU0FBU0csWUFBVCxDQUFzQmIsTUFBdEIsRUFBOEJlLE1BQTlCLEVBQXNDO0FBQ3BDLFFBQU1DLFFBQVFELE9BQU9DLEtBQXJCOztBQUVBQSxRQUFNWixLQUFOLEdBQWNKLFNBQVNnQixNQUFNWixLQUE3QjtBQUNBWSxRQUFNQyxLQUFOLENBQVlDLElBQVosR0FBbUJsQixTQUFTZ0IsTUFBTUMsS0FBTixDQUFZQyxJQUF4QztBQUNBRixRQUFNQyxLQUFOLENBQVlFLEtBQVosSUFBcUIsQ0FBckI7QUFDQUgsUUFBTUMsS0FBTixDQUFZRyxhQUFaLENBQTBCQyxRQUExQixJQUFzQyxDQUF0Qzs7QUFFQSxTQUFPTixNQUFQO0FBQ0QiLCJmaWxlIjoicmVhZC1kaXNwYXRjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbmltcG9ydCB7IGdldEN1cnJlbnRSZWFkdGFibGUsIHNldEN1cnJlbnRSZWFkdGFibGUgfSBmcm9tICdyZWFkdGFibGUnO1xuaW1wb3J0IHsgTFNZTlRBWCwgUlNZTlRBWCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgU3ludGF4IGZyb20gJy4uL3N5bnRheCc7XG5cbmltcG9ydCB0eXBlIHsgQ2hhclN0cmVhbSB9IGZyb20gJ3JlYWR0YWJsZSc7XG5cbmNvbnN0IGJhY2t0aWNrRW50cnkgPSB7XG4gIGtleTogJ2AnLFxuICBtb2RlOiAndGVybWluYXRpbmcnLFxuICBhY3Rpb246IGZ1bmN0aW9uIHJlYWRCYWNrdGljayhzdHJlYW06IENoYXJTdHJlYW0sIHByZWZpeDogTGlzdDxTeW50YXg+LCBlOiBib29sZWFuKSB7XG4gICAgaWYgKHByZWZpeC5pc0VtcHR5KCkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IExTWU5UQVgsXG4gICAgICAgIHZhbHVlOiBzdHJlYW0ucmVhZFN0cmluZygpXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBSU1lOVEFYLFxuICAgICAgdmFsdWU6IHN0cmVhbS5yZWFkU3RyaW5nKClcbiAgICB9O1xuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVhZFN5bnRheFRlbXBsYXRlKHN0cmVhbTogQ2hhclN0cmVhbSwgcHJlZml4OiBMaXN0PFN5bnRheD4sIGV4cHJBbGxvd2VkOiBib29sZWFuLCBkaXNwYXRjaENoYXI6IHN0cmluZyk6IExpc3Q8U3ludGF4PiB8IHsgdHlwZTogdHlwZW9mIFJTWU5UQVgsIHZhbHVlOiBzdHJpbmcgfSB7XG4gIC8vIHJldHVybiByZWFkKCdzeW50YXhUZW1wbGF0ZScpLmZpcnN0KCkudG9rZW47XG4gIC8vIFRPRE86IENhbiB3ZSBzaW1wbHkgdGFjayAnc3ludGF4VGVtcGxhdGUnIG9uIHRoZSBmcm9udCBhbmQgcHJvY2VzcyBpdCBhcyBhXG4gIC8vICAgICAgIHN5bnRheCBtYWNybz9cbiAgY29uc3QgcHJldlRhYmxlID0gZ2V0Q3VycmVudFJlYWR0YWJsZSgpO1xuICBzZXRDdXJyZW50UmVhZHRhYmxlKHByZXZUYWJsZS5leHRlbmQoYmFja3RpY2tFbnRyeSkpO1xuXG4gIGNvbnN0IHJlc3VsdCA9IHRoaXMucmVhZFVudGlsKFxuICAgICdgJyxcbiAgICBzdHJlYW0sXG4gICAgTGlzdC5vZih1cGRhdGVTeW50YXgoZGlzcGF0Y2hDaGFyLCB0aGlzLnJlYWRUb2tlbihzdHJlYW0sIExpc3QoKSwgZXhwckFsbG93ZWQpKSksXG4gICAgZXhwckFsbG93ZWQpO1xuXG4gIHNldEN1cnJlbnRSZWFkdGFibGUocHJldlRhYmxlKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU3ludGF4KHByZWZpeCwgc3ludGF4KSB7XG4gIGNvbnN0IHRva2VuID0gc3ludGF4LnRva2VuO1xuXG4gIHRva2VuLnZhbHVlID0gcHJlZml4ICsgdG9rZW4udmFsdWU7XG4gIHRva2VuLnNsaWNlLnRleHQgPSBwcmVmaXggKyB0b2tlbi5zbGljZS50ZXh0O1xuICB0b2tlbi5zbGljZS5zdGFydCAtPSAxO1xuICB0b2tlbi5zbGljZS5zdGFydExvY2F0aW9uLnBvc2l0aW9uIC09IDE7XG5cbiAgcmV0dXJuIHN5bnRheDtcbn1cbiJdfQ==