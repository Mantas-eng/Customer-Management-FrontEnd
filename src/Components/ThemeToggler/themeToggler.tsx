import React, { useEffect, useState } from 'react';

const ThemeToggler = () => {
  const [storedTheme, setStoredTheme] = useState<string | null>(null);
  const [preferredTheme, setPreferredTheme] = useState<string>('light');

  useEffect(() => {
    const storedThemeFromLocalStorage = localStorage.getItem('theme');
    setStoredTheme(storedThemeFromLocalStorage);
    setPreferredTheme(getPreferredTheme(storedThemeFromLocalStorage));
  }, []);

  const getPreferredTheme = (storedTheme: string | null): string => {
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  useEffect(() => {
    if (typeof window !== 'undefined') { // Ensure we're in the browser environment
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (!(storedTheme === 'light' || storedTheme === 'dark')) {
          const newPreferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          setPreferredTheme(newPreferredTheme);
          setTheme(newPreferredTheme);
          showActiveTheme(newPreferredTheme, true);
        }
      });

      document.querySelectorAll('[data-bs-theme-value]').forEach((toggle) => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value');
          if (theme) {
            localStorage.setItem('theme', theme);
            setStoredTheme(theme);
            setPreferredTheme(theme);
            setTheme(theme);
            showActiveTheme(theme, true);
          }
        });
      });
    }
  }, [storedTheme]);

  const setTheme = (theme: string): void => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
  };

  const showActiveTheme = (theme: string, focus = false): void => {
    const themeSwitcher = document.querySelector('#bd-theme') as HTMLElement | null;

    if (!themeSwitcher) {
      return;
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text') as HTMLElement;
    const activeThemeIcon = document.querySelector('.theme-icon-active use') as SVGUseElement;
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`) as HTMLElement;
    const svgOfActiveBtn = btnToActive.querySelector('svg use')?.getAttribute('href') || '';

    document.querySelectorAll('[data-bs-theme-value]').forEach((element) => {
      element.classList.remove('active');
      element.setAttribute('aria-pressed', 'false');
    });

    btnToActive.classList.add('active');
    btnToActive.setAttribute('aria-pressed', 'true');
    activeThemeIcon.setAttribute('href', svgOfActiveBtn);
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel);

    if (focus && themeSwitcher) {
      themeSwitcher.focus();
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <button className="btn btn-secondary btn-sm" data-bs-theme-value="dark">
            Dark
          </button>
          <button className="btn btn-light btn-sm" data-bs-theme-value="light">
            Light
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggler;
