import { getServerSession } from 'next-auth'
import React from 'react'
import { authoption } from '../api/auth/[...nextauth]/route'

async function AboutPage() {
    const session = await getServerSession(authoption)
  return (
      <div>AboutPage
          <div>
              {JSON.stringify(session)}
          </div>
    </div>
  )
}

export default AboutPage