const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setupProjectsDirectory = () => {
  const directory = document.querySelector('[data-projects-directory]');
  if (!directory) return;

  const desktopCityButtons = Array.from(directory.querySelectorAll('[data-city-nav]'));
  const accordionCityButtons = Array.from(directory.querySelectorAll('[data-city-toggle]'));
  const cityButtons = [...desktopCityButtons, ...accordionCityButtons];
  const cityGroups = Array.from(directory.querySelectorAll('[data-city-group]'));
  const scrollRegion = directory.querySelector('[data-projects-scroll]');
  const mobileQuery = window.matchMedia('(max-width: 720px)');

  if (!cityButtons.length || !cityGroups.length || !scrollRegion) return;

  const isMobileViewport = () => mobileQuery.matches;
  let activeCityId = '';

  const setActiveCity = (cityId, options = {}) => {
    if (!cityId) return;
    activeCityId = cityId;

    const { scrollToGroup = false } = options;

    desktopCityButtons.forEach((button) => {
      const isActive = button.getAttribute('data-city-target') === cityId;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-current', isActive ? 'true' : 'false');
    });

    accordionCityButtons.forEach((button) => {
      const isActive = button.getAttribute('data-city-target') === cityId;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    cityGroups.forEach((group) => {
      const isActive = group.getAttribute('data-city-group') === cityId;
      group.classList.toggle('is-active', isActive);

      const panel = group.querySelector('[data-city-panel]');
      if (!panel) return;
      panel.hidden = isMobileViewport() ? !isActive : false;
    });

    if (scrollToGroup) {
      const targetGroup = cityGroups.find((group) => group.getAttribute('data-city-group') === cityId);
      if (targetGroup) {
        if (!isMobileViewport()) {
          const regionRect = scrollRegion.getBoundingClientRect();
          const groupRect = targetGroup.getBoundingClientRect();
          const targetTop = Math.max(0, scrollRegion.scrollTop + (groupRect.top - regionRect.top) - 8);
          const maxTop = Math.max(0, scrollRegion.scrollHeight - scrollRegion.clientHeight);
          const clampedTop = Math.min(targetTop, maxTop);

          scrollRegion.scrollTo({
            top: clampedTop,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        }
      }
    }
  };

  const initialCityId =
    directory.getAttribute('data-initial-city') || cityButtons[0]?.getAttribute('data-city-target') || '';

  activeCityId = initialCityId;
  let isProgrammaticScroll = false;

  const activateCity = (cityId) => {
    if (!cityId) return;
    activeCityId = cityId;

    if (isMobileViewport()) {
      setActiveCity(cityId, { scrollToGroup: false });
      return;
    }

    isProgrammaticScroll = true;
    setActiveCity(cityId, { scrollToGroup: true });

    window.setTimeout(
      () => {
        isProgrammaticScroll = false;
      },
      prefersReducedMotion ? 0 : 420
    );
  };

  desktopCityButtons.forEach((button) => {
    const cityId = button.getAttribute('data-city-target');
    if (!cityId) return;

    button.addEventListener('pointerenter', () => activateCity(cityId));
    button.addEventListener('mouseenter', () => activateCity(cityId));
    button.addEventListener('focus', () => activateCity(cityId));
    button.addEventListener('click', () => activateCity(cityId));
  });

  accordionCityButtons.forEach((button) => {
    const cityId = button.getAttribute('data-city-target');
    if (!cityId) return;
    button.addEventListener('click', () => activateCity(cityId));
  });

  if (!isMobileViewport()) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll) return;

        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const mostVisible = visibleEntries[0];
        if (!mostVisible) return;

        const cityId = mostVisible.target.getAttribute('data-city-group');
        if (cityId) {
          setActiveCity(cityId, { scrollToGroup: false });
        }
      },
      {
        root: scrollRegion,
        threshold: [0.2, 0.4, 0.65]
      }
    );

    cityGroups.forEach((group) => observer.observe(group));
  }

  mobileQuery.addEventListener('change', () => {
    setActiveCity(activeCityId, { scrollToGroup: false });
  });

  setActiveCity(initialCityId, { scrollToGroup: false });
};

const setupProjectPageTransition = () => {
  const projectLinks = document.querySelectorAll('[data-project-link]');
  if (!projectLinks.length) return;

  projectLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const mouseEvent = event;
      const anchor = link;

      if (
        mouseEvent.defaultPrevented ||
        mouseEvent.button !== 0 ||
        mouseEvent.metaKey ||
        mouseEvent.ctrlKey ||
        mouseEvent.shiftKey ||
        mouseEvent.altKey
      ) {
        return;
      }

      const href = anchor.getAttribute('href');
      if (!href) return;

      mouseEvent.preventDefault();
      document.body.classList.add('is-page-transitioning');

      window.setTimeout(() => {
        window.location.href = href;
      }, prefersReducedMotion ? 0 : 260);
    });
  });
};

const setupProjectsPage = () => {
  setupProjectsDirectory();
  setupProjectPageTransition();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupProjectsPage);
} else {
  setupProjectsPage();
}
