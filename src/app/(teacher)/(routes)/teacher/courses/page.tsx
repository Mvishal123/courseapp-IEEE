"use client"

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const CoursePage = () => {

  const router = useRouter()
  return (
    <div className='container pt-6'>
      
      <Button onClick={() => router.push("/teacher/courses/create")}>
        Add course
      </Button>
    </div>
  )
}

export default CoursePage