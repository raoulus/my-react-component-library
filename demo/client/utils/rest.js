import request from 'superagent';
import ReactUpdates from 'react/lib/ReactUpdates';

// a few helper methods for a REST API

// batchedCallback batches component updates
// which occur within the callback
function batchedCallback(callback) {
  return function(err, res) {
    ReactUpdates.batchedUpdates(callback.bind(null, err, res));
  };
}

/**
 * Public function for boulding header object
 * @param {String} token User token
 * @return {Object} Resulting header object
 */
export function buildHeaderObject(token) {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export function post(path, resultHandler, headersObject) {
  resultHandler = resultHandler || ((result) => result);

  return function(options, callback) {
    request.post(path)
      .set(headersObject || buildHeaderObject())
      .type('json')
      .send(options.body)
      .end(batchedCallback(function(err, res) {
        if (err) return callback(err);
        if (res.status !== 200)
          return callback(new Error('Request failed with ' + res.status + ': ' + res.text));
        callback(null, resultHandler(res.body));
      }));
  };
}

/**
 * Promise wrapper for post request
 * @param {String} path Url which should be specified for request
 * @param {String} body Body which chould be passed
 * @param {Object} headersObject Object which containes all headers which should be used for request
 * @param {Number} timeout Number of milliseconds until drop the request
 * @return {Promise} resulting promise
 */
export function postRequest(path, body, headersObject, timeout) {
  return new Promise(function(resolve, reject) {
    let resolveTimeout;
    let r = request.post(path)
      .set(headersObject || buildHeaderObject())
      .type('json')
      .send(body)
      .end(function(err, res) {
        if (timeout) clearTimeout(resolveTimeout);
        if (err) return reject(err);
        resolve(res.body);
      });

    if (timeout) {
      resolveTimeout = setTimeout(() => {
        if (r) {
          r.abort();
        }
        reject({
          status: 408,
          message: 'Request Timeout'
        });
      }, timeout);
    }
  });
}

export function deleteRequest(path, headersObject) {
  return new Promise(function(resolve, reject) {
    request.del(path)
      .set(headersObject || buildHeaderObject())
      .end(function(err, res) {
        if (err) return reject(err);
        resolve(res.body);
      });
  });
}

export function get(url, headersObject) {
  return new Promise(function(resolve, reject) {
    request.get(url)
      .set(headersObject || buildHeaderObject())
      .type('json')
      .end(function(err, res) {
        if (err) return reject(err);
        if (res.status !== 200) return reject(new Error('Request failed with ' + res.status + ': ' + res.text));
        resolve(res.body);
      });
  });
}

export function download(url, headersObject) {
  const headers = headersObject || buildHeaderObject();
  return new Promise(function(resolve, reject) {
    request.get(url)
      .set(headers)
      .responseType('blob')
      .end(function(err, res) {
        if (err) return reject(err);
        if (res.status !== 200) return reject(new Error('Request failed with ' + res.status + ': ' + res.text));
        resolve(res.xhr.response);
      });
  });
}
