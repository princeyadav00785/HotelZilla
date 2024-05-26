'use client';

import { useEffect, useState } from 'react';
import ThemeContext from '@/context/themeContext';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Get theme from localStorage if it exists, otherwise default to false (light theme)
  const themeFromStorage: boolean =
    typeof localStorage !== 'undefined' && localStorage.getItem('hotel-theme')
      ? JSON.parse(localStorage.getItem('hotel-theme')!)
      : false;

  // State for managing the theme
  const [darkTheme, setDarkTheme] = useState<boolean>(themeFromStorage);
  // State to track if the component should render
  const [renderComponent, setRenderComponent] = useState(false);

  // useEffect runs only on the client side after the initial render
  useEffect(() => {
    // Set renderComponent to true, allowing the component to render
    setRenderComponent(true);
  }, []);

  // If renderComponent is false, return an empty fragment to prevent rendering
  if (!renderComponent) return <></>;

  // Return the context provider with the theme state
  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme ? 'dark' : ''} min-h-screen`}>
        <div className='dark:text-white dark:bg-black text-[#1E1E1E]'>
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
