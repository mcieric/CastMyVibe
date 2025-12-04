import { NextRequest, NextResponse } from 'next/server';

/**
 * Webhook endpoint for Base App events
 * Handles mini-app lifecycle events, user interactions, etc.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Log webhook event for monitoring
    console.log('Webhook received:', {
      timestamp: new Date().toISOString(),
      event: body.event,
      data: body
    });

    // Handle different webhook events
    switch (body.event) {
      case 'mini_app.opened':
        // Track when users open the mini app
        await handleAppOpened(body);
        break;
        
      case 'mini_app.closed':
        // Track when users close the mini app
        await handleAppClosed(body);
        break;
        
      case 'user.action':
        // Track user actions within the app
        await handleUserAction(body);
        break;
        
      default:
        console.log('Unknown webhook event:', body.event);
    }

    return NextResponse.json({ 
      success: true,
      message: 'Webhook processed'
    });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { success: false, error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleAppOpened(data: any) {
  // Track app opens - could store in Vercel KV or analytics
  console.log('App opened by user:', data.user?.fid);
  
  // Example: Store in KV for analytics
  // await kv.incr(`app_opens:${new Date().toISOString().split('T')[0]}`);
}

async function handleAppClosed(data: any) {
  // Track app sessions
  console.log('App closed by user:', data.user?.fid);
}

async function handleUserAction(data: any) {
  // Track specific user actions
  console.log('User action:', data.action, 'by', data.user?.fid);
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'CastMyVibe Webhook'
  });
}
