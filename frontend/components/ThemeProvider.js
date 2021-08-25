import {createContext, useEffect, useState} from 'react';
import Cookie from "js-cookie";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({children, themeDarkInitial}) => {

    const [themeDark, setThemeDark] = useState(() => JSON.parse(themeDarkInitial));

    // When the app is launch we check is a theme was previously selected and save in local storage
    useEffect(() => {
        Cookie.set('themeDark', JSON.stringify(themeDark));
    }, [themeDark]);    

    const theme = {themeDark, setThemeDark};
    
    return (
        <ThemeContext.Provider value={theme}>
            <div className={`${theme.themeDark ? "theme-dark" : "theme-light"}`}>    
                {children}   
            </div>
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;