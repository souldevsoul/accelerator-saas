import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

/**
 * Credit packages configuration
 */
export const CREDIT_PACKAGES = {
  '100': {
    credits: 100,
    priceId: process.env.STRIPE_PRICE_100!,
    amount: 999, // $9.99 in cents
  },
  '1000': {
    credits: 1000,
    priceId: process.env.STRIPE_PRICE_1000!,
    amount: 7999, // $79.99 in cents
  },
  '10000': {
    credits: 10000,
    priceId: process.env.STRIPE_PRICE_10000!,
    amount: 59999, // $599.99 in cents
  },
} as const

export type CreditPackageKey = keyof typeof CREDIT_PACKAGES

/**
 * Create a Stripe checkout session for credits purchase
 * @param userId - User ID to associate with the purchase
 * @param packageKey - Credit package key ('100', '1000', or '10000')
 * @param successUrl - URL to redirect to after successful payment
 * @param cancelUrl - URL to redirect to if payment is canceled
 * @returns Checkout session URL
 */
export async function createCheckoutSession(
  userId: string,
  packageKey: CreditPackageKey,
  successUrl: string,
  cancelUrl: string
): Promise<string> {
  const pkg = CREDIT_PACKAGES[packageKey]

  if (!pkg || !pkg.priceId) {
    throw new Error(`Invalid package key or missing price ID: ${packageKey}`)
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: pkg.priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
      credits: pkg.credits.toString(),
      packageKey,
    },
  })

  if (!session.url) {
    throw new Error('Failed to create checkout session')
  }

  return session.url
}

/**
 * Verify Stripe webhook signature
 * @param payload - Request body (raw string)
 * @param signature - stripe-signature header
 * @returns Stripe event object
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable')
  }

  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  )
}

/**
 * Get customer's payment history
 * @param customerId - Stripe customer ID
 * @returns Array of payment intents
 */
export async function getCustomerPayments(customerId: string) {
  const paymentIntents = await stripe.paymentIntents.list({
    customer: customerId,
    limit: 100,
  })

  return paymentIntents.data
}

/**
 * Create a Stripe customer
 * @param email - Customer email
 * @param userId - User ID for metadata
 * @returns Stripe customer object
 */
export async function createCustomer(email: string, userId: string) {
  return stripe.customers.create({
    email,
    metadata: {
      userId,
    },
  })
}
