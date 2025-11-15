/**
 * Stripe Setup Script
 *
 * This script automatically creates products and prices in Stripe
 * Run: npx tsx scripts/setup-stripe.ts
 */

import Stripe from 'stripe'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

if (!STRIPE_SECRET_KEY || STRIPE_SECRET_KEY === 'sk_test_placeholder') {
  console.error('❌ Error: STRIPE_SECRET_KEY not found in .env.local')
  console.log('\nPlease add your Stripe secret key to .env.local:')
  console.log('STRIPE_SECRET_KEY="sk_test_..."')
  process.exit(1)
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

const PACKAGES = [
  {
    name: '100 Credits',
    credits: 100,
    price: 9.99,
    description: 'Perfect for trying out the platform - 1 MVP generation or ~3 medium tasks',
  },
  {
    name: '1000 Credits',
    credits: 1000,
    price: 79.99,
    description: 'Best value for regular users - 10 MVP generations or ~33 medium tasks (20% savings)',
  },
  {
    name: '10000 Credits',
    credits: 10000,
    price: 599.99,
    description: 'For power users and agencies - 100 MVP generations or ~333 medium tasks (40% savings)',
  },
]

async function setupStripe() {
  console.log('🚀 Setting up Stripe products and prices...\n')

  const priceIds: Record<string, string> = {}

  for (const pkg of PACKAGES) {
    try {
      console.log(`📦 Creating product: ${pkg.name}`)

      // Create product
      const product = await stripe.products.create({
        name: pkg.name,
        description: pkg.description,
        metadata: {
          credits: pkg.credits.toString(),
        },
      })

      console.log(`   ✅ Product created: ${product.id}`)

      // Create price
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(pkg.price * 100), // Convert to cents
        currency: 'usd',
        metadata: {
          credits: pkg.credits.toString(),
        },
      })

      console.log(`   ✅ Price created: ${price.id}\n`)

      priceIds[pkg.credits.toString()] = price.id
    } catch (error: any) {
      console.error(`   ❌ Error creating ${pkg.name}:`, error.message)
    }
  }

  console.log('\n✨ Setup complete! Add these to your .env.local:\n')
  console.log(`STRIPE_PRICE_100="${priceIds['100']}"`)
  console.log(`STRIPE_PRICE_1000="${priceIds['1000']}"`)
  console.log(`STRIPE_PRICE_10000="${priceIds['10000']}"`)

  console.log('\n📝 Next steps:')
  console.log('1. Copy the STRIPE_PRICE_* values above to your .env.local')
  console.log('2. Set up webhook endpoint in Stripe Dashboard:')
  console.log('   - URL: http://localhost:3000/api/stripe/webhook (for dev)')
  console.log('   - Events: checkout.session.completed')
  console.log('3. Copy the webhook secret to .env.local as STRIPE_WEBHOOK_SECRET')
  console.log('4. Restart your dev server\n')
}

setupStripe().catch((error) => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})
