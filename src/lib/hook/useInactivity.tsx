'use client';

import { useEffect, useRef, useCallback } from 'react';


export const useInactivity = (
    timeout: number = 1 * 60 * 1000,
    onInactive?: () => void | null
) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isActiveRef = useRef(true);

    const resetTimer = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            isActiveRef.current = false;
            if (onInactive) {
                onInactive();
            }
        }, timeout);
    }, [timeout, onInactive]);

    const handleActivity = useCallback(() => {
        if (!isActiveRef.current) {
            isActiveRef.current = true;
        }
        resetTimer();
    }, [resetTimer]);

    useEffect(() => {
        const events: (keyof DocumentEventMap)[] = [
            'mousedown',
            'mousemove',
            'keypress',
            'scroll',
            'touchstart',
            'click',
        ];

        resetTimer();

        events.forEach(event =>
            document.addEventListener(event, handleActivity, true)
        );

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            events.forEach(event =>
                document.removeEventListener(event, handleActivity, true)
            );
        };
    }, [handleActivity, resetTimer]);

    return { resetTimer };
};
