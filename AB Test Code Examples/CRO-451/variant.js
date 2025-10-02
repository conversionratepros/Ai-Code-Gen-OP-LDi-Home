(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "";
		/* all Pure helper functions */

		function waitForElement(selector, trigger) {
			var interval = setInterval(function () {
				if (
					document &&
					document.querySelector(selector) &&
					document.querySelectorAll(selector).length > 0
				) {
					clearInterval(interval);
					trigger();
				}
			}, 50);
			setTimeout(function () {
				clearInterval(interval);
			}, 15000);
		}

		function live(selector, event, callback, context) {
			function addEvent(el, type, handler) {
				if (el.attachEvent) el.attachEvent("on" + type, handler);
				else el.addEventListener(type, handler);
			}
			this &&
				this.Element &&
				(function (ElementPrototype) {
					ElementPrototype.matches =
						ElementPrototype.matches ||
						ElementPrototype.matchesSelector ||
						ElementPrototype.webkitMatchesSelector ||
						ElementPrototype.msMatchesSelector ||
						function (selector) {
							var node = this,
								nodes = (node.parentNode || node.document).querySelectorAll(selector),
								i = -1;
							while (nodes[++i] && nodes[i] != node);
							return !!nodes[i];
						};
				})(Element.prototype);
			function live(selector, event, callback, context) {
				addEvent(context || document, event, function (e) {
					var found,
						el = e.target || e.srcElement;
					while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
					if (found) callback.call(el, e);
				});
			}
			live(selector, event, callback, context);
		}

		function insertHtml(selector, content, position) {
			var el = document.querySelector(selector);
			if (!position) {
				position = "afterend";
			}
			if (el && content) {
				el.insertAdjacentHTML(position, content);
			}
		}

		function innerHTMLContent(selector, content) {
			var el = document.querySelector(selector);
			if (el) {
				el.innerHTML = content;
			}
		}

		function innerChildContent(selector, childNumber, content) {
			var el = document.querySelector(selector);
			if (el.hasChildNodes()) {
				el.childNodes[childNumber].textContent = content;
			}
		}

		function addClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.add(cls);
			}
		}


		function removeClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.contains(cls) && el.classList.remove(cls);
			}
		}



		function waitForVimeo(trigger) {
			var interval = setInterval(function () {
				if (window.Vimeo) {
					clearInterval(interval);
					trigger();
				}
			}, 50);
			setTimeout(function () {
				clearInterval(interval);
			}, 15000);
		}

		const trustedURL = self.trustedTypes ? self.trustedTypes.createPolicy('default', {
			createScriptURL: (url) => url
		}) : { createScriptURL: (url) => url };

		function vimeoScript() {
			const scriptOne = document.createElement("script");
			scriptOne.src = trustedURL.createScriptURL("https://player.vimeo.com/api/player.js");
			document.querySelector("head").appendChild(scriptOne);
		}


		var videoHTML = `<section
  class="has_eae_slider elementor-section elementor-top-section elementor-element elementor-section-boxed elementor-section-height-default elementor-section-height-default cro-rollback-videoBanner"
  data-particle_enable="false"
  data-particle-mobile-disabled="false"
  data-id=""
  data-element_type="section"
  data-settings=""
>
  <div class="elementor-container elementor-column-gap-default">
    <div
      class="has_eae_slider elementor-column elementor-col-100 elementor-top-column elementor-element"
      data-id=""
      data-element_type="column"
    >
      <div class="elementor-widget-wrap elementor-element-populated">
        <div
          class="elementor-element elementor-widget elementor-widget-heading"
          data-id=""
          data-element_type="widget"
          data-widget_type=""
        >
          <div class="elementor-widget-container">
            <h2 class="elementor-heading-title elementor-size-default">
              Take your career to the next level
            </h2>
          </div>
        </div>

        <div
          class="elementor-element elementor-widget elementor-widget-heading"
          data-id=""
          data-element_type="widget"
          data-widget_type=""
        >
          <div class="elementor-widget-container">
            <h3 class="elementor-heading-title elementor-size-default">Discover how in this 1 minute video</h3>
          </div>
        </div>
        <section
          class="has_eae_slider elementor-section elementor-inner-section elementor-element elementor-section-full_width elementor-section-height-default elementor-section-height-default"
          data-particle_enable="false"
          data-particle-mobile-disabled="false"
          data-id=""
          data-element_type="section"
        >
          <div class="elementor-container elementor-column-gap-default">
            <div
              class="has_eae_slider elementor-column elementor-col-100 elementor-top-column elementor-element"
              data-id=""
              data-element_type="column"
            >
              <div class="elementor-widget-wrap elementor-element-populated">
                <div
                  class="elementor-element elementor-widget elementor-widget-image"
                  data-id=""
                  data-element_type="widget"
                  data-widget_type=""
                >
                  <div class="elementor-widget-container cro-t-rollBack-Video">
				  <img src="https://cdn-3.convertexperiments.com/uf/1004973/10045476/LDI_181_video%20button.png" alt="Play" class="cro-rollback-videoBanner-playBtn">
                    <img
                      data-lazyloaded="1"
                      data-placeholder-resp=""
                      src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png"
                      loading="lazy"
                      decoding="async"
                      width=""
                      height=""
                      data-src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png"
                      class="attachment-large size-large entered litespeed-loaded cro-t-desktop"
                      alt=""
                      data-srcset="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png 941w, https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png 300w, https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png 150w, https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png 768w, https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png 450w, https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png 624w, https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png 50w, https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png 100w, https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png 600w"
                      data-sizes=""
                      data-ll-status="loaded"
                      sizes=""
                      srcset="
                        https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png 941w,
                        https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png 300w,
                        https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png 150w,
                        https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png 768w,
                        https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png 450w,
                        https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png 624w,
                        https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png  50w,
                        https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png 100w,
                        https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_video_img.png 600w
                      "
                    />

                    <img class="cro-t-mobile" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_mobile_video_img.svg">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</section>`;

		// https://crp-clients-images.s3.af-south-1.amazonaws.com/London_Dental_Institute/LDI_181_LDi_2024_Promo_Clinical_Training_On_Your_Terms_mobile_video_img.svg

		function init() {
			addClass('body', 'cro-t-02-rollBack-video')
			waitForElement(".elementor-section .elementor-widget-container h2", function () {
				document.querySelectorAll('.elementor-section .elementor-widget-container h2').forEach(function (e) {
					var parent = e.closest('.elementor-section')
					if (e.innerHTML.indexOf('Courses we offer') != -1) {
						parent.classList.add('cro-t-rollBack-courses')

						if (!document.querySelector(".cro-rollback-videoBanner")) {
							insertHtml(".cro-t-rollBack-courses", videoHTML, "afterend");
						}
					}
				})
			});

			waitForVimeo(function () {
				if (document.querySelector(".cro-rollback-videoBanner")) {
					var htmlStringIframe = '<iframe class="croVideo" src="https://player.vimeo.com/video/922918297?h=c2d5f53448&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;width:100%;height: 100%;" title=""></iframe>';
					document.querySelector('.cro-t-rollBack-Video').insertAdjacentHTML('afterbegin', htmlStringIframe)
				}

			})
		}

		function croEventHandkler() {
			live(".elementor-widget-container.cro-t-rollBack-Video img", "click", function () {
				addClass('.cro-t-rollBack-Video', 'cro-t-hideImg');
				waitForVimeo(function () {
					var iframe = document.querySelector('.croVideo');
					if (iframe) {
						var player = new Vimeo.Player(iframe);
						player.play();
					}

				})
			});

			live(".swiper-slide a", "click", function () {
				waitForVimeo(function () {
					var iframe = document.querySelector('.croVideo');
					if (iframe) {
						var player = new Vimeo.Player(iframe);
						player.pause();
					}

				})
			});

		
		}

		if (!window.cro_t_20) {
			vimeoScript();
			croEventHandkler();
			window.cro_t_20 = true;
		}

		waitForElement('body', init);
	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();