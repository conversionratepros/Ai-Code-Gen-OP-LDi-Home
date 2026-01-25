(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "croki121";
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
        
        function insertHtml(selector, content, position) {
            var el = document.querySelector(selector);
            if (!position) {
                position = "afterend";
            }
            if (el && content) {
                el.insertAdjacentHTML(position, content);
            }
        }

        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.add(cls);
            }
        }
        
        function sectionClassAdding(){
                 waitForElement('section.has_eae_slider h4', function () {
                        document.querySelectorAll('section.has_eae_slider h4').forEach(function (e) {
                        var parent = e.closest('section');
                            if (parent && e.innerHTML.indexOf('POSTGRADUATE DENTAL COURSES UK') !== -1) {
                                parent.classList.add('croki121-hero-Section');
                                }
                        });
        });
        }
        

        var newHeader = `<div class="croki121-new-header">
        <div class="croki121-new-header-inner">
            <div class="croki121-new-header-text">
                Accelerate your dental career with <span>mentorship from world-class, internationally recognised dentists</span>
            </div>
        </div>
    </div>`;

    var newBannerImage = `<div class="croki122-hero-banner-image cro-desktop" style='display:none'>
        <img class="cro-image" src="https://media.londondentalinstitute.com/wp-content/uploads/2025/08/18134422/Ellipse-21-768x767.png" alt="">
    </div>`;

    var newBannerImageMob = `<div class="croki122-hero-banner-image cro-mobile" style='display:none'>
        <img class="cro-image" src="https://media.londondentalinstitute.com/wp-content/uploads/2025/08/18134422/Ellipse-21-768x767.png" alt="">
    </div>`;


        function init() {
            addClass("body",variation_name);
            sectionClassAdding();

            waitForElement(".croki121-hero-Section h1", function () {
                if (!document.querySelector(".croki121-new-header")) {
                    insertHtml(".croki121-hero-Section h1", newHeader, "afterend");
                }
            });

             waitForElement(".croki121-hero-Section img", function () {
                if (!document.querySelector(".croki122-hero-banner-image.cro-desktop")) {
                    insertHtml(".croki121-hero-Section img", newBannerImage, "afterend");
                }
            });

             waitForElement(".croki121-hero-Section + section img", function () {
                if (!document.querySelector(".croki122-hero-banner-image.cro-mobile")) {
                    insertHtml(".croki121-hero-Section + section img", newBannerImageMob, "afterend");
                }
            });

        }
        
        
        waitForElement('#page', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();