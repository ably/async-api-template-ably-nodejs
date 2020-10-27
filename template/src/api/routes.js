const util = require('util');
const { Router } = require('express');
const { yellow } = require('../lib/colors');
const filenamify = require('filenamify');
const Ably = require('ably');
const path = require('path');
require('dotenv').config()


const ably = Ably.Realtime(process.env.ABLY_API_KEY);

{%- for channelName, channel in asyncapi.channels() -%}
{%- if channel.hasPublish() %}
{%- if channel.publish().id() === undefined -%}
{{ 'This template requires operationId to be set in every operation.' | logError }}
{%- endif %}
const {{ channelName | camelCase }}Service = require('./services/{{ channelName | convertToFilename }}');
{%- endif -%}

{%- if channel.hasSubscribe() %}
{%- if channel.subscribe().id() === undefined -%}
{{ 'This template requires operationId to be set in every operation.' | logError }}
{%- endif %}
{%- if channel.hasPublish() %}
{%- else %}
const {{ channelName | camelCase }}Service = require('./services/{{ channelName | convertToFilename }}');
{%- endif -%}
{%- endif -%}
{%- endfor %}

const router = Router();
module.exports = router;

router.get('/', function(req, res) {
  res.render('index', { ablyKey: process.env.ABLY_API_KEY });
});

{% for channelName, channel in asyncapi.channels() -%}
{%- if channel.hasSubscribe() %}
  {%- if channel.subscribe().summary() %}
/**
 * {{ channel.subscribe().summary() }}
 */
  {%- endif %}


router.get('/{{ channelName | variablesToUrl }}', function(req, res) {
  res.render('pages/{{ channelName | convertToFilename }}', { ablyKey: process.env.ABLY_API_KEY, params: JSON.stringify(req.params) });
  //{{ channelName | camelCase }}Service.sub_{{ channelName | variablesToRedirect }}(ably);
});

router.post('/{{ channelName | variablesToUrl }}', function(req, res) {
  {{ channelName | camelCase }}Service.pub_{{ channelName | variablesToRedirect }}(ably, msg);
});


{%- endif %}
{% endfor -%}
