const filter = module.exports;
const URL = require('url');
const path = require('path');
const filenamify = require('filenamify');

function port(url, defaultPort) {
  const parsed = URL.parse(url);
  return parsed.port || defaultPort || 80;
};
filter.port = port;

function pathResolve(pathName, basePath = '/') {
  return path.resolve(basePath, pathName);
};
filter.pathResolve = pathResolve;

function convertToFilename(string, options) {
  return filenamify(string, options || { replacement: '-', maxLength: 255 });
};
filter.convertToFilename = convertToFilename;

function variablesToUrl(text, options) {
  var result = text.replace(/:/g, '/');
  result = result.replace(/{/g, ':');
  result = result.replace(/\[/g, '_');
  result = result.replace(/\]/g, '_');
  result = result.replace(/}/g, '');

  return result;
};
filter.variablesToUrl = variablesToUrl;

function variablesToRedirect(text, options) {
  var result = text.replace(/:/g, '_');
  result = result.replace(/\//g, '_');
  result = result.replace(/{/g, '_');
  result = result.replace(/\[/g, '_');
  result = result.replace(/\]/g, '_');
  result = result.replace(/}/g, '');

  return result;
};
filter.variablesToRedirect = variablesToRedirect;
