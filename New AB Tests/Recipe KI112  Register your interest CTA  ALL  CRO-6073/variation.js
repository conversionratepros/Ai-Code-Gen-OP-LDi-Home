(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "cro-ldi-ki112";

		/* ================= CRO + GF CONFIG ================= */
		var GF_BASE = "https://londondentalinstitute.com";
		// ----- Your GF API keys (visible to users) -----
		var GF_CONSUMER_KEY = "ck_452298797776b36ea284209c4e24cb04a2614d83";
		var GF_CONSUMER_SECRET = "cs_651176a1dec16ac92e994e33a6fd1c8ae8f1b888";
		var AUTH_HEADER = "Basic " + btoa(GF_CONSUMER_KEY + ":" + GF_CONSUMER_SECRET);

		// Map pathnames to the correct GF form IDs
		var PAGE_FORM_MAP = {
			"/aesthetic-restorative-dentistry/": 48,
			"/orthodontics-dentofacial-orthopaedics/": 47,
			"/dental-implantology-oral-surgery/": 49,
			"/dental-courses/": 7,
			"/": 7 // Home page
		};

		// Field mappings by form (defaults used if not overridden)
		var FIELD_MAP = {
			"default": { firstName: "input_1", lastName: "input_3", email: "input_2" },
			48: { firstName: "input_1", lastName: "input_3", email: "input_2" },
			47: { firstName: "input_1", lastName: "input_3", email: "input_2" },
			49: { firstName: "input_1", lastName: "input_3", email: "input_2" },
			7: { firstName: "input_1", lastName: "input_3", email: "input_2" } // Home
		};

		/* ===== Home-only fields (from your HTML) ===== */
		var HOME_RADIO_KEY = "input_25";                // radio field ID 25
		var HOME_MESSAGE_KEY = "input_5";                 // textarea field ID 5
		// var HOME_TURNSTILE_KEY = "input_30";               // Turnstile field ID 30
		var HOME_TURNSTILE_KEY = "cf-turnstile-response_7";               // Turnstile field ID 30

		var TURNSTILE_SITEKEY = "0x4AAAAAAA6F27FvQv8hKXoQ"; // from data-sitekey in your HTML

		var HOME_RADIO_CHOICES = [
			"Aesthetic and Restorative Dentistry",
			"Orthodontics and Dentofacial Orthopaedics",
			"Dental Implantology & Oral Surgery",
			"Live Events"
		];

		/* ================= HELPERS (your originals) ================= */
		function waitForElement(selector, trigger) {
			var interval = setInterval(function () {
				if (document && document.querySelector(selector) && document.querySelectorAll(selector).length > 0) {
					clearInterval(interval);
					trigger();
				}
			}, 50);
			setTimeout(function () { clearInterval(interval); }, 15000);
		}

		function live(selector, event, callback, context) {
			function addEvent(el, type, handler) {
				if (el.attachEvent) el.attachEvent("on" + type, handler);
				else el.addEventListener(type, handler);
			}
			this && this.Element && (function (ElementPrototype) {
				ElementPrototype.matches =
					ElementPrototype.matches ||
					ElementPrototype.matchesSelector ||
					ElementPrototype.webkitMatchesSelector ||
					ElementPrototype.msMatchesSelector ||
					function (selector) {
						var node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;
						while (nodes[++i] && nodes[i] != node);
						return !!nodes[i];
					};
			})(Element.prototype);

			function _live(selector, event, callback, context) {
				addEvent(context || document, event, function (e) {
					var found, el = e.target || e.srcElement;
					while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
					if (found) callback.call(el, e);
				});
			}
			_live(selector, event, callback, context);
		}

		function insertHtml(selector, content, position) {
			var el = document.querySelector(selector);
			if (!position) position = "afterend";
			if (el && content) el.insertAdjacentHTML(position, content);
		}

		function addClass(el, cls) {
			var node = document.querySelector(el);
			if (node) node.classList.add(cls);
		}

		function removeClass(el, cls) {
			var node = document.querySelector(el);
			if (node) node.classList.contains(cls) && node.classList.remove(cls);
		}

		/* ---- Turnstile loader (added) ---- */
		function loadTurnstileOnce(cb) {
			if (window.turnstile) return cb();
			var existing = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]');
			if (existing) { existing.addEventListener("load", cb); return; }
			var s = document.createElement("script");
			s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
			s.async = true; s.defer = true; s.onload = cb;
			document.head.appendChild(s);
		}

		/* ================= UI: Popup + CTA (your originals) ================= */
		var popup = '<div class="cre-t-112-lightBox">\
      <div class="cre-t-112-overlay"></div>\
      <div class="cre-t-112-modal">\
        <div class="cre-t-112-cards">\
          <div class="cre-t-112-modalBody">\
            <div class="cre-t-112-close" aria-label="Close">\
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">\
                <path d="M21.4316 21.9856L12.4316 12.9856M12.4316 12.9856L3.43164 3.9856M12.4316 12.9856L21.4317 3.9856M12.4316 12.9856L3.43164 21.9857" stroke="#1E1A34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />\
              </svg>\
            </div>\
            <h2>Register your interest</h2>\
            <div class="cro_from_wrapper"></div>\
          </div>\
        </div>\
      </div>\
    </div>';

		var croRegisterBtn = '<div class="cre-t-112-registerBtn">\
      <div class="cre-t-112-registerBtn-wrapper">\
        <div class="cre-t-112-registerBtn-inner">\
          <a class="elementor-button elementor-button-link elementor-size-sm" href="#">\
            <span class="elementor-button-content-wrapper">\
			<span class="elementor-button-icon">\
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M13 17.5L18.5 12L13 6.5M17.25 12H4.25" stroke="white" stroke-width="1.5" stroke-linecap="square"></path></svg>			</span>\
              <span class="elementor-button-text">Register your interest</span>\
            </span>\
          </a>\
        </div>\
      </div>\
    </div>';

		/* ================= GF FORM: build + submit ================= */
		function endpoint(formId) {
			return GF_BASE + "/wp-json/gf/v2/forms/" + formId + "/submissions";
		}
		function keysFor(formId) {
			return FIELD_MAP[formId] || FIELD_MAP["default"];
		}
		function currentFormId() {
			var p = location.pathname;
			if (p.slice(-1) !== "/") p += "/";
			return PAGE_FORM_MAP[p] || null;
		}

		function renderFormHTML(isHome) {
			var extraHTML = "";
			var isHomeOrCourses =
				location.pathname === "/" || location.pathname === "/dental-courses/";

			if (isHomeOrCourses) {
				// radio + message + turnstile slot for Home + Dental Courses
				extraHTML =
					'<fieldset class="cgf-row cgf-radios"><legend>Course of interest:</legend>' +
					HOME_RADIO_CHOICES.map(function (label, i) {
						var id = "cgf-radio-" + i;
						return (
							'<label class="cgf-radio">' +
							'<input type="radio" name="course" id="' +
							id +
							'" value="' +
							label.replace(/"/g, "&quot;") +
							'">' +
							'<span>' + label + '</span>' +
							'</label>'
						);
					}).join("") +
					"</fieldset>" +
					'<div class="cgf-row">' +
					'  <label for="cgf-message">Your Message <span class="cro-required">*</span></label>' +
					'  <textarea id="cgf-message" name="message" rows="4" required></textarea>' +
					"</div>" +
					'<div class="cgf-row" id="cro-turnstile-slot"></div>';
			}


			return (
				'\
				<form class="convert-gf-form" novalidate>\
				<div class="cgf-row half">\
					<label for="cgf-first">First Name <span class="cro-required">*</span></label>\
					<input id="cgf-first" name="firstName" type="text" required />\
				</div>\
				<div class="cgf-row half">\
					<label for="cgf-last">Last Name <span class="cro-required">*</span></label>\
					<input id="cgf-last" name="lastName" type="text" required />\
				</div>\
				<div class="cgf-row">\
					<label for="cgf-email">Email <span class="cro-required">*</span></label>\
					<input id="cgf-email" name="email" type="email" required />\
				</div>' +
				extraHTML +
'<div class="cro-button-parent">' +
'  <button type="submit" class="cgf-btn">' +
'    <span class="btn-text">Submit</span>' +
'    <span class="btn-icon">' +
'      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">' +
'        <path d="M13 17.5L18.5 12L13 6.5M17.25 12H4.25" stroke="white" stroke-width="1.5" stroke-linecap="square"></path>' +
'      </svg>' +
'    </span>' +
'  </button>' +
'</div>' +
'<div class="cgf-msg" aria-live="polite"></div>' +
'</form>' +
'<div class="cro_form_close_btn"><span>Close</span></div>'

			);
		}


		function mountGFForm() {
			var formId = currentFormId();
			if (!formId) return;

			var isHome = (formId === 7);
			var wrapper = document.querySelector(".cro_from_wrapper");
			if (!wrapper || wrapper.getAttribute("data-mounted") === "1") return;

			wrapper.setAttribute("data-mounted", "1");
			wrapper.innerHTML = renderFormHTML(isHome);

			var formEl = wrapper.querySelector(".convert-gf-form");
			var msg = wrapper.querySelector(".cgf-msg");
			var btn = wrapper.querySelector(".cgf-btn");
			var k = keysFor(formId);

			// --- Turnstile render (Home only) ---
			var turnstileToken = "";
			if (isHome && TURNSTILE_SITEKEY) {
				var slot = wrapper.querySelector("#cro-turnstile-slot");
				loadTurnstileOnce(function () {
					try {
						window.turnstile.render(slot, {
							sitekey: TURNSTILE_SITEKEY,
							theme: "light",
							callback: function (token) { turnstileToken = token; }
						});
					} catch (e) {
						if (debug) console.warn("Turnstile render error", e);
					}
				});
			}

			formEl.addEventListener("submit", function (e) {
				e.preventDefault();
				msg.textContent = "";
				msg.style.color = "";
				btn.disabled = true;

				var firstName = formEl.firstName.value.trim();
				var lastName = formEl.lastName.value.trim();
				var email = formEl.email.value.trim();

				// Home-only fields
				var courseVal = isHome ? (formEl.querySelector('input[name="course"]:checked') || {}).value || "" : "";
				var messageVal = isHome ? (formEl.message.value || "").trim() : "";

				// Basic validation
				if (!firstName || !lastName || !email || (isHome && !messageVal)) {
					msg.textContent = "Please complete all required fields.";
					msg.style.color = "#b00020";
					btn.disabled = false;
					return;
				}
				if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
					msg.textContent = "Please enter a valid email address.";
					msg.style.color = "#b00020";
					btn.disabled = false;
					return;
				}
				if (isHome && !turnstileToken) {
					msg.textContent = "Please complete the captcha.";
					msg.style.color = "#b00020";
					btn.disabled = false;
					return;
				}

				// Build GF payload (REST API v2)
				var payload = {};
				payload[k.firstName] = firstName;  // input_1
				payload[k.lastName] = lastName;   // input_3
				payload[k.email] = email;      // input_2

				if (isHome) {
					payload[HOME_RADIO_KEY] = courseVal;     // input_25
					payload[HOME_MESSAGE_KEY] = messageVal;    // input_5
					payload[HOME_TURNSTILE_KEY] = turnstileToken; // input_30  <-- important
				}

				fetch(endpoint(formId), {
					method: "POST",
					headers: {
						"Authorization": AUTH_HEADER,
						"Content-Type": "application/json",
						"Accept": "application/json"
					},
					body: JSON.stringify(payload),
					credentials: "include"
				})
					.then(function (res) {
						return res.json().catch(function () { return {}; })
							.then(function (data) { return { ok: res.ok, data: data, status: res.status }; });
					})
					.then(function (out) {
						var valid = out.ok && out.data && out.data.is_valid !== false;
						if (valid) {
							if (document.querySelector('.cre-t-112-modal')) {
								document.querySelector('.cre-t-112-modal').classList.add('cro_hideFields')
							}
							msg.textContent = "Thanks! Your registration was received.";
							msg.style.color = "#1b7f41";
							formEl.reset();
							// refresh token for next submit
							try { isHome && window.turnstile && window.turnstile.reset(wrapper.querySelector("#cro-turnstile-slot")); } catch (_) { }
						} else {
							msg.textContent = "Submission failed. Please try again.";
							msg.style.color = "#b00020";
							if (debug) console.warn("GF error", out);
						}
					})
					.catch(function (err) {
						msg.textContent = "Network error. Please try again.";
						msg.style.color = "#b00020";
						if (debug) console.error(err);
					})
					.finally(function () { btn.disabled = false; });
			});
		}

		/* ================= Your existing flow ================= */
		function init() {
			addClass("body", variation_name);
			addClass("body", "cre-t-112");
			addClass("body", "cre-t-112-hide");
			namingClass();
			addingSection();
		}

		function namingClass() {
			waitForElement("h1.elementor-heading-title", function () {
				document.querySelectorAll("h1.elementor-heading-title").forEach(function (e) {
					var parent = e.closest(".e-parent");
					if (e.innerHTML.indexOf("DENTAL IMPLANT COURSES") != -1 || e.innerHTML.indexOf("AESTHETIC DENTISTRY COURSES") != -1 || e.innerHTML.indexOf("ORTHODONTICS COURSES") != -1 || e.innerHTML.indexOf("POSTGRADUATE DENTAL COURSES UK") != -1 || e.innerHTML.indexOf("POSTGRADUATE DENTAL COURSES") != -1) {
						parent.classList.add("cre-ki-112-topBanner");
					}
				});
			});

			waitForElement(".e-child", function () {
				document.querySelectorAll('.cre-ki-112-topBanner .e-child').forEach(function (e) {
					if (
						e.textContent.includes('Register your interest') &&
						!e.querySelector('.e-child')
					) {
						e.classList.add('cre-ki-112-e-child');
					}
				});
			});

		}

		function CTAadding(selector) {
			waitForElement(selector, function () {
				if (!document.querySelector(".cre-t-112-registerBtn")) {
					insertHtml(selector, croRegisterBtn, "afterend");
				}
			});
		}
		function addingSection() {
			// Insert CTA next to existing button
			waitForElement('.cre-ki-112-topBanner .elementor-button.elementor-button-link[href*="/dental-courses/"]', function () {
				if (!document.querySelector(".cre-t-112-registerBtn")) {
					insertHtml('.cre-ki-112-topBanner .elementor-button.elementor-button-link[href*="/dental-courses/"]', croRegisterBtn, "afterend");
				}
			});

			CTAadding('.cre-ki-112-topBanner .elementor-button.elementor-button-link[href*="/dental-courses/"]');
			CTAadding('.cre-ki-112-topBanner .elementor-button-wrapper [href*="/diploma-in-dental-implantology-oral-surgery-programme-summary"]');
			CTAadding('.cre-ki-112-topBanner .elementor-button-wrapper [href*="/aesthetic-and-restorative-dentistry-programme-summary"]');
			CTAadding('.cre-ki-112-topBanner .elementor-button-wrapper [href*="/ortho-prospectus-download/"]');
			CTAadding('.cre-ki-112-topBanner .elementor-button-wrapper [href="#courses"]')

			// .cre-ki-112-topBanner .elementor-button-wrapper [href*="/diploma-in-dental-implantology-oral-surgery-programme-summary"]

			// .cre-ki-112-topBanner .elementor-button-wrapper [href*="/aesthetic-and-restorative-dentistry-programme-summary"]

			// .cre-ki-112-topBanner .elementor-button-wrapper [href*="/ortho-prospectus-download/"]

			// .cre-ki-112-topBanner .elementor-button-wrapper [href="#courses"]

			// Insert lightbox after footer and then mount the form inside `.cro_from_wrapper`
			waitForElement(".elementor-location-footer", function () {
				if (!document.querySelector(".cre-t-112-lightBox")) {
					insertHtml(".elementor-location-footer", popup, "afterend");
				}
				waitForElement(".cro_from_wrapper", mountGFForm);
			});

			// Add helper classes to hero button wrapper
			waitForElement(".cre-ki-112-topBanner .elementor-button-wrapper", function () {
				var btnWrappers = document.querySelectorAll(".cre-ki-112-topBanner .elementor-button-wrapper");
				btnWrappers.forEach(function (btnWrapper) {
					var parent = btnWrapper.closest(".e-parent");
					if (parent) parent.classList.add("cro-t-112-heroBanner");
				});
			});

			waitForElement(".cre-ki-112-topBanner .elementor-button-wrapper a span span.elementor-button-text", function () {
				document.querySelectorAll(".cre-ki-112-topBanner .elementor-button-wrapper a span span.elementor-button-text").forEach(function (e) {
					var parentBtn = e.closest(".elementor-button");
					if (e.innerHTML.indexOf("Apply now") != -1) {
						parentBtn.classList.add("cro-t-112-prospectus");
					}
				});
			});
		}

		function croEventHandkler() {
			live(".cre-t-112-registerBtn a", "click", function (e) {
				e.preventDefault();
				removeClass("body", "cre-t-112-hide");
			});
			live(".cre-t-112-close, .cre-t-112-overlay, .cro_form_close_btn", "click", function () {
				addClass("body", "cre-t-112-hide");
			});
		}

		if (!window.cro_t_112) {
			croEventHandkler();
			window.cro_t_112 = true;
		}

		// Boot
		waitForElement("h1.elementor-heading-title", init);
	} catch (e) {
		if (debug) console.log(e, "error in Test " + variation_name);
	}
})();