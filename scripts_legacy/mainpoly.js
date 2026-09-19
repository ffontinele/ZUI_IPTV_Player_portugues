/* ZUI BLACKBOX + POLYFILLS */
(function(){
  'use strict';
  function show(msg){
    try{
      var d = document.getElementById('zui-blackbox');
      if(!d){
        d = document.createElement('div');
        d.id = 'zui-blackbox';
        d.style.cssText = 'position:fixed;top:0;left:0;right:0;max-height:50%;overflow:auto;background:#900;color:#fff;font:13px/1.5 monospace;padding:10px;z-index:999999;white-space:pre-wrap;';
        (document.body||document.documentElement).appendChild(d);
      }
      d.textContent += msg + '\n';
    }catch(e){}
  }
  window.addEventListener('error', function(e){
    show('ERRO: ' + (e.message||'?') + ' @ ' + String(e.filename||'').split('/').pop() + ':' + e.lineno);
  });
  window.addEventListener('unhandledrejection', function(e){
    var r = e.reason;
    show('PROMISE: ' + ((r && (r.message || r.stack || r)) || '?'));
  });
  window.onerror = function(msg, url, line){
    show('ONERROR: ' + msg + ' @ ' + String(url||'').split('/').pop() + ':' + line);
    return false;
  };
  show('[BLACKBOX] Monitor ativo');
  /* SHIM Intl.RelativeTimeFormat */
  if (typeof Intl !== 'undefined' && !Intl.RelativeTimeFormat) {
    var F = function(locale, options){ this.locale = locale || 'en'; this.options = options || {}; };
    F.prototype.format = function(value, unit){
      var n = Math.round(value);
      var map = { second:'s', minute:'min', hour:'h', day:'d', week:'sem', month:'mes', quarter:'trim', year:'ano' };
      if (n === 0) return 'agora';
      return n < 0 ? ('ha ' + Math.abs(n) + ' ' + (map[unit]||unit)) : ('em ' + n + ' ' + (map[unit]||unit));
    };
    F.prototype.formatToParts = function(v, u){ return [{ type:'literal', value: this.format(v, u) }]; };
    F.supportedLocalesOf = function(l){ return l ? (Array.isArray(l) ? l : [l]) : []; };
    Intl.RelativeTimeFormat = F;
  }
  /* Polyfills ES5 */
  if (typeof window.console === 'undefined') { window.console = { log: function(){}, error: function(){}, warn: function(){} }; }
  if (typeof window.Promise === 'undefined') {
    window.Promise = function(executor) {
      var self = this; self._state = 0; self._value = undefined; self._handlers = [];
      function fulfill(r) { if (self._state !== 0) return; self._state = 1; self._value = r; self._notify(); }
      function reject(r) { if (self._state !== 0) return; self._state = 2; self._value = r; self._notify(); }
      self._notify = function() {
        for (var i = 0; i < self._handlers.length; i++) {
          var h = self._handlers[i];
          if (self._state === 1 && h.onFulfilled) { try { h.resolve(h.onFulfilled(self._value)); } catch(e) { h.reject(e); } }
          else if (self._state === 2 && h.onRejected) { try { h.resolve(h.onRejected(self._value)); } catch(e) { h.reject(e); } }
        }
      };
      self.then = function(f, r) {
        return new window.Promise(function(resolve, reject) {
          self._handlers.push({ onFulfilled: f, onRejected: r, resolve: resolve, reject: reject });
          if (self._state !== 0) self._notify();
        });
      };
      try { executor(fulfill, reject); } catch(e) { reject(e); }
    };
  }
  if (!Array.from) { Array.from = function(a, m, t) { var r = []; for (var i = 0; i < a.length; i++) r.push(m ? m.call(t, a[i], i) : a[i]); return r; }; }
  if (!Object.assign) { Object.assign = function(t) { for (var i = 1; i < arguments.length; i++) { var s = arguments[i]; if (s) { var k = Object.keys(s); for (var j = 0; j < k.length; j++) t[k[j]] = s[k[j]]; } } return t; }; }
})();
