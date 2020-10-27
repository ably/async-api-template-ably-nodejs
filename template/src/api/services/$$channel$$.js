const service = module.exports = {};
{% if channel.hasPublish() %}
/**
 * {{ channel.publish().summary() }}
 * @param {object} Ably connection.
 * @param {object} message to send
 * @param {%raw%}{{%endraw%}{{channel.publish().message(0).payload().type()}}{%raw%}}{%endraw%} options.message The message to send.
{%- if channel.publish().message(0).headers() %}
{%- for fieldName, field in channel.publish().message(0).headers().properties() %}
{{ field | docline(fieldName, 'options.message.headers') }}
{%- endfor %}
{%- endif %}
{%- if channel.publish().message(0).payload() %}
{%- for fieldName, field in channel.publish().message(0).payload().properties() %}
{{ field | docline(fieldName, 'options.message.payload') }}
{%- endfor %}
{%- endif %}
 */
service.pub_{{ channelName | variablesToRedirect }} = async (ably, message) => {
  ably.channels.get('{{ channelName }}')
  .publish('Message from Ably: Implement your business logic here.');
};

{%- endif %}
{%- if channel.hasSubscribe() %}
/**
 * {{ channel.subscribe().summary() }}
 * @param {object} Ably realtime connection.
 * @param {object} options
 * @param {string} options.path The path in which the message was received.
 * @param {object} options.query The query parameters used when connecting to the server.
 * @param {%raw%}{{%endraw%}{{channel.subscribe().message(0).payload().type()}}{%raw%}}{%endraw%} options.message The received message.
{%- if channel.subscribe().message(0).headers() %}
{%- for fieldName, field in channel.subscribe().message(0).headers().properties() %}
{{ field | docline(fieldName, 'options.message.headers') }}
{%- endfor %}
{%- endif %}
{%- if channel.subscribe().message(0).payload() %}
{%- for fieldName, field in channel.subscribe().message(0).payload().properties() %}
{{ field | docline(fieldName, 'options.message.payload') }}
{%- endfor %}
{%- endif %}
 */
service.sub_{{ channelName | variablesToRedirect }} = async (ably) => {
  ably.channels.get('{{ channelName }}').subscribe(function(msg, err) {
    'Message from Ably: Implement your business logic here.'
  });
};

{%- endif %}
