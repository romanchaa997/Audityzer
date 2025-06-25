import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin users
  const hashedPassword = await bcrypt.hash('password123', 10)
  const hashedAdminPassword = await bcrypt.hash('admin123', 10)

  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@audityzer.com' },
    update: {},
    create: {
      email: 'admin@audityzer.com',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'SUPER_ADMIN'
    }
  })

  const enterpriseAdmin = await prisma.user.upsert({
    where: { email: 'enterprise@audityzer.com' },
    update: {},
    create: {
      email: 'enterprise@audityzer.com',
      name: 'Enterprise Admin',
      password: hashedAdminPassword,
      role: 'ADMIN'
    }
  })

  const securityAdmin = await prisma.user.upsert({
    where: { email: 'security@audityzer.com' },
    update: {},
    create: {
      email: 'security@audityzer.com',
      name: 'Security Admin',
      password: hashedAdminPassword,
      role: 'ADMIN'
    }
  })

  console.log('✅ Created admin users')

  console.log('🎉 Database seeding completed successfully!')
  console.log('\n📊 Enterprise Master Admin Portal is ready with:')
  console.log('   • 3 Admin users (Super Admin, Enterprise Admin, Security Admin)')
  console.log('\n🔐 Login Credentials:')
  console.log('   • Super Admin: admin@audityzer.com / password123')
  console.log('   • Enterprise Admin: enterprise@audityzer.com / admin123')
  console.log('   • Security Admin: security@audityzer.com / admin123')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
