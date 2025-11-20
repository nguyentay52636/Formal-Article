import { useState, useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import baseApi from '@/apis/baseApi';

interface UseSocketOptions {
    url?: string;
    onConnected?: () => void;
    onError?: (error: any) => void;
}

export const useSocket = (options: UseSocketOptions = {}) => {
    const [isConnected, setIsConnected] = useState(false);
    const stompClientRef = useRef<any>(null);
    const subscriptionsRef = useRef<Map<string, any>>(new Map());

    const connect = useCallback(() => {
        if (isConnected || stompClientRef.current) return;

        const baseURL = baseApi.defaults.baseURL || "http://localhost:8000/api";
        let wsUrl = options.url || 'http://localhost:8000/ws/chat';

        if (!options.url) {
            if (baseURL.includes('/api')) {
                wsUrl = baseURL.replace('/api', '/ws/chat');
            } else {
                wsUrl = baseURL + '/ws/chat';
            }
        }

        try {
            const socket = new SockJS(wsUrl);
            const client = Stomp.over(socket);

            client.debug = () => { };

            client.connect({}, (frame: any) => {
                console.log('✅ Socket Connected:', frame);
                setIsConnected(true);
                stompClientRef.current = client;
                if (options.onConnected) options.onConnected();
            }, (error: any) => {
                console.error('Socket Error:', error);
                setIsConnected(false);
                stompClientRef.current = null;
                subscriptionsRef.current.clear();
                if (options.onError) options.onError(error);
            });
        } catch (error) {
            console.error('Connection Failed:', error);
            if (options.onError) options.onError(error);
        }
    }, []);

    const disconnect = useCallback(() => {
        if (stompClientRef.current) {
            stompClientRef.current.disconnect(() => {
                console.log('🔌 Socket Disconnected');
                setIsConnected(false);
                stompClientRef.current = null;
                subscriptionsRef.current.clear();
            });
        }
    }, []);

    const subscribe = useCallback((topic: string, callback: (message: any) => void) => {
        if (!stompClientRef.current || !isConnected) {
            console.warn(`⚠️ Cannot subscribe to ${topic}: Socket not connected`);
            return null;
        }

        if (subscriptionsRef.current.has(topic)) {
            return subscriptionsRef.current.get(topic);
        }

        const subscription = stompClientRef.current.subscribe(topic, (message: any) => {
            try {
                const parsedBody = JSON.parse(message.body);
                callback(parsedBody);
            } catch (e) {
                console.error("Error parsing message body:", e);
                callback(message.body);
            }
        });

        subscriptionsRef.current.set(topic, subscription);
        return subscription;
    }, [isConnected]);

    const unsubscribe = useCallback((topic: string) => {
        const subscription = subscriptionsRef.current.get(topic);
        if (subscription) {
            subscription.unsubscribe();
            subscriptionsRef.current.delete(topic);
        }
    }, []);

    const send = useCallback((destination: string, body: any, headers: any = {}) => {
        if (stompClientRef.current && isConnected) {
            stompClientRef.current.send(destination, headers, JSON.stringify(body));
        } else {
            console.warn(` Cannot send to ${destination}: Socket not connected`);
        }
    }, [isConnected]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (stompClientRef.current) {
                disconnect();
            }
        };
    }, [disconnect]);

    return {
        connect,
        disconnect,
        subscribe,
        unsubscribe,
        send,
        isConnected,
        client: stompClientRef.current
    };
};
