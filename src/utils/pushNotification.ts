import webpush from 'web-push';

// Configure web-push with your VAPID keys
webpush.setVapidDetails(
  'mailto:your-email@isro.gov.in', // Replace with your email
  process.env.VAPID_PUBLIC_KEY || '',
  process.env.VAPID_PRIVATE_KEY || ''
);

// Function to send notification to a single subscription
export const sendNotification = async (subscription: PushSubscription, data: any) => {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
};

// Function to send notification to multiple subscriptions
export const sendNotificationToAll = async (subscriptions: PushSubscription[], data: any) => {
  const results = await Promise.all(
    subscriptions.map(subscription => sendNotification(subscription, data))
  );
  return results.every(result => result === true);
};

// Example notification data structure
export const createNotificationData = (title: string, body: string, url?: string) => ({
  title,
  body,
  icon: '/lovable-uploads/14c17238-81e6-4488-b71a-daad286afffa.png',
  badge: '/lovable-uploads/14c17238-81e6-4488-b71a-daad286afffa.png',
  vibrate: [100, 50, 100],
  data: {
    dateOfArrival: Date.now(),
    primaryKey: Math.random().toString(36).slice(2),
    url: url || '/' // Default to root URL instead of using self.registration
  }
});