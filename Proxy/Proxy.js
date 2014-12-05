// The Antville Project
// http://code.google.com/p/antville
//
// Copyright 2001–2014 by the Workers of Antville.
//
// Licensed under the Apache License, Version 2.0 (the ``License'');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an ``AS IS'' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Defines the Antville proxy Feature.
 */

"http://code.google.com/p/antville/wiki/ProxyFeature"

Proxy.prototype.main_action = function () {
  var url = req.data.url;
  if (!url) {
    return;
  }

  var http = new helma.Http;
  var data = http.getUrl(url);

  if (!data.content) {
    throw Error('Failed to retrieve URL.');
  }

  var callback = req.data.callback;
  if (callback) {
    res.contentType = 'text/javascript';
    res.write(JSON.pad(data.content, callback));
  } else {
    res.write(data.content);
  }
  return;
};

Proxy.prototype.getPermission = function (name) {
  return User.require(User.TRUSTED);
};
