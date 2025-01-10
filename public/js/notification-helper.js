// Generate VAPID keys using web-push generate-vapid-keys
const publicVapidKey = 'YOUR_PUBLIC_VAPID_KEY';

async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered');
    return registration;
  } catch (err) {
    console.error('Service Worker registration failed:', err);
    throw err;
  }
}

async function subscribeUserToPush(registration) {
  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    
    console.log('Push notification subscription successful:', subscription);
    
    // Here you would send the subscription to your server
    await sendSubscriptionToServer(subscription);
    
    return subscription;
  } catch (err) {
    console.error('Failed to subscribe to push notifications:', err);
    throw err;
  }
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function sendSubscriptionToServer(subscription) {
  // Replace with your server endpoint
  const response = await fetch('/api/push-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription)
  });
  
  if (!response.ok) {
    throw new Error('Failed to store subscription on server');
  }
  
  return response.json();
}

// Initialize push notifications
async function initializePushNotifications() {
  try {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.log('Push notifications not supported');
      return false;
    }

    const registration = await registerServiceWorker();
    await subscribeUserToPush(registration);
    return true;
  } catch (error) {
    console.error('Error initializing push notifications:', error);
    return false;
  }
}