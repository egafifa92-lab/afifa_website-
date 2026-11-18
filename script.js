/**
 * Hygienitech Solutions - High-Converting Lead Generation Logic
 * Houston, Texas • (713) 296-1449
 */

document.addEventListener('DOMContentLoaded', () => {
  /* -------------------------------------------------------------
     1. Sticky Navigation Bar Behavior
  ------------------------------------------------------------- */
  const header = document.getElementById('main-header');
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('shadow-md', 'py-2.5');
      header.classList.remove('py-4');
    } else {
      header.classList.remove('shadow-md', 'py-2.5');
      header.classList.add('py-4');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* -------------------------------------------------------------
     2. Mobile Hamburger Menu Toggle
  ------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', String(!isExpanded));
      mobileMenu.classList.toggle('hidden');

      if (menuIconOpen && menuIconClose) {
        menuIconOpen.classList.toggle('hidden');
        menuIconClose.classList.toggle('hidden');
      }
    });

    // Close mobile menu when clicking any nav link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        if (menuIconOpen && menuIconClose) {
          menuIconOpen.classList.remove('hidden');
          menuIconClose.classList.add('hidden');
        }
      });
    });
  }

  /* -------------------------------------------------------------
     3. Smooth Anchor Scrolling with Sticky Header Offset
  ------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#!') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* -------------------------------------------------------------
     4. FAQ Accordions (Expandable / Collapsible)
  ------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Optional: Close other open FAQ items for clean single-accordion behavior
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherTrigger = otherItem.querySelector('.faq-trigger');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  /* -------------------------------------------------------------
     5. Phone Number Input Masking (US Format: (XXX) XXX-XXXX)
  ------------------------------------------------------------- */
  const phoneInput = document.getElementById('quote-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
  }

  /* -------------------------------------------------------------
     6. Frictionless Lead Generation Form & GoHighLevel Integration
  ------------------------------------------------------------- */
  const leadForm = document.getElementById('lead-quote-form');
  const formSuccessContainer = document.getElementById('form-success-container');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('quote-name');
      const phoneInput = document.getElementById('quote-phone');
      const emailInput = document.getElementById('quote-email');
      const serviceSelect = document.getElementById('quote-service');
      const notesInput = document.getElementById('quote-notes');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showFieldError(nameInput, 'Please provide your full name');
        isValid = false;
      } else {
        clearFieldError(nameInput);
      }

      // Validate Phone
      const phoneDigits = phoneInput.value.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        showFieldError(phoneInput, 'Please enter a valid 10-digit phone number');
        isValid = false;
      } else {
        clearFieldError(phoneInput);
      }

      // Validate Service Dropdown
      if (!serviceSelect.value) {
        showFieldError(serviceSelect, 'Please select a service option');
        isValid = false;
      } else {
        clearFieldError(serviceSelect);
      }

      // Validate Email (optional, but if entered must look valid)
      if (emailInput.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
          showFieldError(emailInput, 'Please provide a valid email address');
          isValid = false;
        } else {
          clearFieldError(emailInput);
        }
      }

      if (!isValid) return;

      // Prepare payload for GoHighLevel / CRM webhook
      const leadData = {
        fullName: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        email: emailInput.value.trim() || 'Not provided',
        serviceNeeded: serviceSelect.value,
        notes: notesInput.value.trim() || 'None',
        source: 'Hygienitech Houston Website Homepage',
        timestamp: new Date().toISOString()
      };

      // Button loading state
      const originalBtnHtml = formSubmitBtn.innerHTML;
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = `
        <span class="inline-flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-near-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          PROCESSING REQUEST...
        </span>
      `;

      try {
        // GoHighLevel Webhook integration hook
        // If a GHL webhook endpoint is defined in data-webhook attribute, send data
        const ghlWebhookUrl = leadForm.getAttribute('data-webhook');
        if (ghlWebhookUrl && ghlWebhookUrl.startsWith('http')) {
          await fetch(ghlWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
          });
        } else {
          // Local fallback simulation (store locally for audit)
          console.log('[Hygienitech CRM Lead Capture]:', leadData);
          try {
            const existingLeads = JSON.parse(localStorage.getItem('hygienitech_leads') || '[]');
            existingLeads.push(leadData);
            localStorage.setItem('hygienitech_leads', JSON.stringify(existingLeads));
          } catch(err) {
            // storage silent fallback
          }
          await new Promise(resolve => setTimeout(resolve, 600)); // smooth natural transition
        }

        // Conversion tracking event
        trackConversion('quote_form_submit', {
          service: leadData.serviceNeeded,
          location: 'Houston, TX'
        });

        // Show exact required confirmation state
        leadForm.classList.add('hidden');
        if (formSuccessContainer) {
          formSuccessContainer.classList.remove('hidden');
          formSuccessContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } catch (err) {
        console.error('Lead submission error:', err);
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = originalBtnHtml;
        alert('There was an issue sending your request. Please call us directly at (713) 296-1449 for immediate assistance.');
      }
    });
  }

  // Helper functions for field errors
  function showFieldError(field, message) {
    field.classList.add('border-red-500', 'focus:ring-red-400');
    field.classList.remove('border-slate-300', 'focus:ring-[#95C11F]');
    let errorEl = field.parentElement.querySelector('.form-error-msg');
    if (!errorEl) {
      errorEl = document.createElement('p');
      errorEl.className = 'form-error-msg text-xs text-red-500 font-medium mt-1';
      field.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  function clearFieldError(field) {
    field.classList.remove('border-red-500', 'focus:ring-red-400');
    field.classList.add('border-slate-300');
    const errorEl = field.parentElement.querySelector('.form-error-msg');
    if (errorEl) errorEl.remove();
  }

  // Reset form handler if customer wants to submit another inquiry
  const resetFormBtn = document.getElementById('reset-form-btn');
  if (resetFormBtn && leadForm && formSuccessContainer) {
    resetFormBtn.addEventListener('click', () => {
      leadForm.reset();
      formSubmitBtn.disabled = false;
      formSubmitBtn.innerHTML = `REQUEST MY FREE QUOTE`;
      formSuccessContainer.classList.add('hidden');
      leadForm.classList.remove('hidden');
    });
  }

  /* -------------------------------------------------------------
     7. Conversion Tracking for All Call & Action Buttons
  ------------------------------------------------------------- */
  const trackConversion = (eventName, params = {}) => {
    // Google Tag Manager / GA4 DataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      ...params
    });

    // Console audit log for CRO testing
    console.log(`[CRO Conversion Event Tracked]: ${eventName}`, params);
  };

  // Track phone clicks across key zones
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
      const zone = this.getAttribute('data-track-zone') || 'unspecified_phone_link';
      trackConversion('phone_cta_click', {
        zone: zone,
        phoneNumber: '(713) 296-1449'
      });
    });
  });

  // Track quote request CTA clicks
  document.querySelectorAll('a[href="#quote-form"]').forEach(link => {
    link.addEventListener('click', function() {
      trackConversion('quote_cta_click', {
        buttonLabel: this.innerText.trim()
      });
    });
  });

  /* -------------------------------------------------------------
     8. Legal Policy Modals (Privacy Policy & Terms Placeholder)
  ------------------------------------------------------------- */
  const policyModal = document.getElementById('policy-modal');
  const policyTitle = document.getElementById('policy-modal-title');
  const policyBody = document.getElementById('policy-modal-body');
  const policyCloseBtn = document.getElementById('policy-modal-close');

  const policyContent = {
    privacy: {
      title: 'Privacy Policy',
      content: `
        <p class="mb-3"><strong>Hygienitech Solutions</strong> respects your privacy and is committed to protecting your personal information. This policy describes how we collect, use, and protect the information you provide when visiting our website or requesting services.</p>
        <h4 class="font-bold text-sm mb-1 text-slate-800">1. Information We Collect</h4>
        <p class="mb-3 text-sm text-slate-600">When you request a quote or contact us, we collect information such as your name, phone number, email address, property type, and details regarding your mold inspection or odor removal inquiry.</p>
        <h4 class="font-bold text-sm mb-1 text-slate-800">2. How We Use Your Information</h4>
        <p class="mb-3 text-sm text-slate-600">We use this information exclusively to communicate with you regarding your service request, answer questions, provide quotes, and coordinate property assessments. We do not sell or lease your personal information to third parties.</p>
        <h4 class="font-bold text-sm mb-1 text-slate-800">3. Contact Us</h4>
        <p class="text-sm text-slate-600">If you have any questions about this privacy policy, please contact Hygienitech Solutions at (713) 296-1449 or visit our office at 331 W Loop S, Houston, TX 77027.</p>
      `
    },
    terms: {
      title: 'Terms & Conditions',
      content: `
        <p class="mb-3">Welcome to <strong>Hygienitech Solutions</strong>. By accessing or using this website, you agree to comply with and be bound by the following terms and conditions.</p>
        <h4 class="font-bold text-sm mb-1 text-slate-800">1. Scope of Services</h4>
        <p class="mb-3 text-sm text-slate-600">Hygienitech Solutions provides professional mold inspection, mold treatment guidance, odor removal, and indoor environmental services in the Houston, Texas metropolitan area. Service availability and specific recommendations depend on individual property conditions and assessment results.</p>
        <h4 class="font-bold text-sm mb-1 text-slate-800">2. Information Accuracy</h4>
        <p class="mb-3 text-sm text-slate-600">Website content is provided for informational purposes to help property owners understand indoor environmental concerns. It does not replace an in-person visual inspection or laboratory air/surface analysis.</p>
        <h4 class="font-bold text-sm mb-1 text-slate-800">3. Contact</h4>
        <p class="text-sm text-slate-600">For inquiries regarding service terms, please call (713) 296-1449 or mail us at 331 W Loop S, Houston, TX 77027.</p>
      `
    }
  };

  document.querySelectorAll('.open-policy-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = btn.getAttribute('data-policy');
      if (policyModal && policyContent[type]) {
        policyTitle.textContent = policyContent[type].title;
        policyBody.innerHTML = policyContent[type].content;
        policyModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (policyCloseBtn && policyModal) {
    policyCloseBtn.addEventListener('click', () => {
      policyModal.classList.add('hidden');
      document.body.style.overflow = '';
    });

    policyModal.addEventListener('click', (e) => {
      if (e.target === policyModal) {
        policyModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }
});
