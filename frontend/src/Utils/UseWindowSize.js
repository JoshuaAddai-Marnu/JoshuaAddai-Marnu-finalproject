import { useEffect, useState } from 'react';

export const useWindowSize = () => {
    const [size, setSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : undefined,
        height: typeof window !== 'undefined' ? window.innerHeight : undefined
    });

    useEffect(() => {
        let timeoutId = null;

        const updateSize = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                setSize({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }, 150); // Adjust the debounce interval (in ms) as needed
        };

        window.addEventListener('resize', updateSize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateSize);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, []);

    return size;
};
