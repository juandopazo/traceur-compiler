// Copyright 2014 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {toInteger, toLength, toObject, isCallable} from './utils';

// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-22.1.3.6
export function fill(value, start = 0, end = undefined) {
  var object = toObject(this);
  var len = toLength(object.length);
  var fillStart = toInteger(start);
  var fillEnd = end !== undefined ? toInteger(end) : len;

  // set the start and end
  fillStart = fillStart < 0 ?
      Math.max(len + fillStart, 0) : Math.min(fillStart, len);
  fillEnd = fillEnd < 0 ? Math.max(len + fillEnd, 0) : Math.min(fillEnd, len);

  // set the values
  while (fillStart < fillEnd) {
    object[fillStart] = value;
    fillStart++;
  }

  return object;
}

// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-22.1.3.8
export function find(predicate, thisArg = undefined) {
  return findHelper(this, predicate, thisArg);
}

// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-22.1.3.9
export function findIndex(predicate, thisArg = undefined) {
  return findHelper(this, predicate, thisArg, true);
}

// generic implementation for find and findIndex
function findHelper(self, predicate, thisArg = undefined, returnIndex = false) {
  var object = toObject(self);
  var len = toLength(object.length);

  // predicate must be callable
  if (!isCallable(predicate)) {
    throw TypeError();
  }

  // run through until predicate returns true
  for (var i = 0; i < len; i++) {
    if (i in object) {
      var value = object[i];
      if (predicate.call(thisArg, value, i, object)) {
        return returnIndex ? i : value;
      }
    }
  }

  return returnIndex ? -1 : undefined;
}
