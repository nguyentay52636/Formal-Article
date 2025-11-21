import { useState, useEffect, useRef, useCallback } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import baseApi from '@/apis/baseApi';

interface UseSocketOptions {
    url?: string;
    onConnected?: () => void;
    onError?: (error: any) => void;
}

export const useSocket = (options: UseSocketOptions = {}) => {
    const [isConnected, setIsConnected] = useState(false);
    const clientRef = useRef<Client | null>(null);
    const subscriptionsRef = useRef<Map<string, any>>(new Map());

    const connect = useCallback(() => {
        if (isConnected || clientRef.current?.active) return;

        const baseURL = baseApi.defaults.baseURL || "http://localhost:8000/api";
        let wsUrl = options.url || 'http://localhost:8000/ws/chat';

        // Determine WebSocket URL
        if (!options.url) {
            if (baseURL.includes('/api')) {
                wsUrl = baseURL.replace('/api', '/ws/chat');
            } else {
                wsUrl = baseURL + '/ws/chat';
            }
        }

        console.log('🔌 Connecting to WebSocket:', wsUrl);

        const client = new Client({
            webSocketFactory: () => new SockJS(wsUrl),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: (frame) => {
                console.log('✅ Socket Connected:', frame);
                setIsConnected(true);
                if (options.onConnected) options.onConnected();
            },
            onStompError: (frame) => {
                console.error('❌ Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
                if (options.onError) options.onError(frame);
            },
            onWebSocketClose: () => {
                console.log('⚠️ WebSocket Closed');
                setIsConnected(false);
            }
        });

        client.activate();
        clientRef.current = client;
    }, [isConnected, options]);

    const disconnect = useCallback(() => {
        if (clientRef.current) {
            clientRef.current.deactivate();
            console.log('🔌 Socket Disconnected');
            setIsConnected(false);
            clientRef.current = null;
            subscriptionsRef.current.clear();
        }
    }, []);

    const subscribe = useCallback((topic: string, callback: (message: any) => void) => {
        if (!clientRef.current || !isConnected) {
            console.warn(`⚠️ Cannot subscribe to ${topic}: Socket not connected`);
            return null;
        }

        // Nếu đã có subscription cho topic này, unsubscribe trước
        if (subscriptionsRef.current.has(topic)) {
            // console.log(`⚠️ Topic ${topic} already subscribed, using existing subscription`);
            return subscriptionsRef.current.get(topic);
        }

        console.log(`📡 Creating new subscription for: ${topic}`);
        const subscription = clientRef.current.subscribe(topic, (message: IMessage) => {
            try {
                const parsedBody = JSON.parse(message.body);
                callback(parsedBody);
            } catch (e) {
                // console.error("Error parsing message body:", e);
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
        if (clientRef.current && isConnected) {
            clientRef.current.publish({
                destination,
                body: JSON.stringify(body),
                headers
            });
        } else {
            console.warn(`⚠️ Cannot send to ${destination}: Socket not connected`);
        }
    }, [isConnected]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (clientRef.current) {
                clientRef.current.deactivate();
            }
        };
    }, []);

    return {
        connect,
        disconnect,
        subscribe,
        unsubscribe,
        send,
        isConnected,
        client: clientRef.current
    };
};
