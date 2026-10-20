/* ===== Contact form → Google Sheet =====
 * Set "endpoint" to the full address of your published Lovable site,
 * e.g. "https://your-site.lovable.app/api/public/contact".
 * No secret keys live here; they stay on the server. */
/* Non-secret configuration only.
 * Endpoint that saves messages to the Google Sheet (served by this Lovable app).
 * If you host the static files elsewhere, use the full published URL,
 * e.g. "https://your-app.lovable.app/api/public/contact". */
window.CONTACT_CONFIG = {
  endpoint: "https://YOUR-PUBLISHED-SITE.lovable.app/api/public/contact",
  timeoutMs: 15000
};

(function () {
  "use strict";
  var form = document.getElementById("contactForm");
  if (!form) return;
  var cfg = window.CONTACT_CONFIG || {};
  var btn = document.getElementById("cf-submit");
  var status = document.getElementById("cf-status");
  var busy = false;
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var rules = {
    name: function (v) { return !v ? "Please enter your name." : v.length > 100 ? "Name is too long." : ""; },
    email: function (v) { return !v ? "Please enter your email." : !EMAIL.test(v) ? "Please enter a valid email address." : ""; },
    subject: function (v) { return !v ? "Please add a subject." : v.length > 150 ? "Subject is too long." : ""; },
    message: function (v) { return !v ? "Please write a message." : v.length < 10 ? "Message should be at least 10 characters." : v.length > 2000 ? "Message is too long." : ""; }
  };

  function check(name) {
    var input = form.elements[name];
    var msg = rules[name](input.value.trim());
    document.getElementById("cf-" + name + "-error").textContent = msg;
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (msg) input.setAttribute("aria-describedby", "cf-" + name + "-error"); else input.removeAttribute("aria-describedby");
    return !msg;
  }
  Object.keys(rules).forEach(function (n) {
    form.elements[n].addEventListener("blur", function () { check(n); });
  });

  function setStatus(text, type) { status.textContent = text; status.className = "form__status" + (type ? " is-" + type : ""); }
  function setBusy(b) { busy = b; btn.disabled = b; btn.textContent = b ? "Sending…" : "Send Message"; form.setAttribute("aria-busy", String(b)); }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (busy) return;
    var ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) { setStatus("Please fix the highlighted fields.", "error"); var bad = form.querySelector('[aria-invalid="true"]'); if (bad) bad.focus(); return; }
    if (form.elements.website.value) { form.reset(); setStatus("Thanks!", "success"); return; } // honeypot
    if (!cfg.endpoint) { setStatus("The contact form isn't connected yet. Please email amarjithanand17@gmail.com directly.", "error"); return; }

    var payload = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      subject: form.elements.subject.value.trim(),
      message: form.elements.message.value.trim(),
      website: form.elements.website.value
    };
    setBusy(true); setStatus("");
    var ctrl = "AbortController" in window ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, cfg.timeoutMs || 15000);

    // text/plain avoids a CORS preflight, which Apps Script does not support.
    fetch(cfg.endpoint, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload), signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (data) {
        if (data && data.ok) { form.reset(); setStatus("Thank you! Your message has been received — I'll get back to you soon.", "success"); }
        else throw new Error((data && data.error) || "Unknown error");
      })
      .catch(function (err) {
        console.error("Contact submission failed:", err);
        setStatus(err.name === "AbortError" ? "The request timed out. Please try again." : "Sorry, your message couldn't be sent. Please try again or email me directly.", "error");
      })
      .finally(function () { clearTimeout(timer); setBusy(false); });
  });
})();
